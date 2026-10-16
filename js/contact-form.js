/* =========================================================
   CandeMayStudio — formulario de contacto
   Validación, preselección de servicio, envío y confirmación.
   ========================================================= */

import { CATEGORIES, SERVICES, ADVICE_OPTION, getServiceById } from './services-data.js';
import { SITE_CONFIG, buildWhatsAppUrl } from './site-config.js';

const MESSAGE_MAX = 500;

const PATTERNS = {
  name: /^[\p{L}\s]+$/u,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phoneChars: /^[+\d\s\-()]+$/
};

/* ===== Reglas de validación (devuelven el mensaje de error o '') ===== */
const validators = {
  nombre(value) {
    const name = value.trim().replace(/\s+/g, ' ');
    if (!name) return 'Contanos tu nombre y apellido.';
    if (name.length < 3) return 'El nombre es muy corto, ingresá al menos 3 letras.';
    if (!PATTERNS.name.test(name)) return 'Usá solo letras y espacios, por favor.';
    if (name.split(' ').length < 2) return 'Ingresá tu nombre y apellido, por ejemplo: Ana Pérez.';
    return '';
  },

  email(value) {
    const email = value.trim();
    if (!email) return 'Necesitamos tu correo para responderte.';
    if (!PATTERNS.email.test(email)) return 'Ingresá un correo válido, por ejemplo nombre@mail.com';
    return '';
  },

  telefono(value) {
    const phone = value.trim();
    if (!phone) return 'Dejanos un teléfono para coordinar tu turno.';
    const digits = phone.replace(/\D/g, '');
    if (!PATTERNS.phoneChars.test(phone) || digits.length < 8 || digits.length > 15) {
      return 'Ingresá un teléfono válido, por ejemplo +54 9 379 412-3456';
    }
    return '';
  },

  servicio(value) {
    return value ? '' : 'Elegí un servicio, o la opción de asesoramiento si no estás segura/o.';
  },

  horario(values) {
    return values.length ? '' : 'Marcá al menos un horario que te quede cómodo.';
  },

  mensaje(value) {
    return value.length > MESSAGE_MAX ? `El mensaje puede tener hasta ${MESSAGE_MAX} caracteres.` : '';
  }
};

/* ===== Envío (desacoplado: cambiar el proveedor en site-config.js) ===== */
function formatForWhatsApp(data) {
  const lines = [
    '¡Hola! Quiero hacer una consulta:',
    `• Nombre: ${data.nombre}`,
    `• Email: ${data.email}`,
    `• Teléfono: ${data.telefono}`,
    `• Servicio: ${data.servicioNombre}`,
    `• Horario: ${data.horario.join(', ')}`
  ];
  if (data.dias.length) lines.push(`• Días: ${data.dias.join(', ')}`);
  if (data.mensaje) lines.push(`• Mensaje: ${data.mensaje}`);
  return lines.join('\n');
}

const providers = {
  simulation() {
    // Para probar el estado de error: agregar ?simular=error a la URL
    const shouldFail = new URLSearchParams(window.location.search).get('simular') === 'error';
    return new Promise((resolve, reject) => {
      setTimeout(() => (shouldFail ? reject(new Error('Simulated error')) : resolve()), 1200);
    });
  },

  async formspree(data) {
    if (!SITE_CONFIG.formspreeEndpoint) throw new Error('Formspree endpoint missing');
    const response = await fetch(SITE_CONFIG.formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        horario: data.horario.join(', '),
        dias: data.dias.join(', '),
        _subject: `Nueva consulta: ${data.servicioNombre}`
      })
    });
    if (!response.ok) throw new Error(`Formspree error ${response.status}`);
  },

  async whatsapp(data) {
    const url = buildWhatsAppUrl(formatForWhatsApp(data));
    if (!url) throw new Error('WhatsApp number missing');
    window.open(url, '_blank', 'noopener');
  }
};

export function sendForm(data) {
  const provider = providers[SITE_CONFIG.formProvider] ?? providers.simulation;
  return provider(data);
}

/* ===== Inicialización ===== */
function populateServiceSelect(select) {
  CATEGORIES.forEach((category) => {
    const group = document.createElement('optgroup');
    group.label = category.label;
    SERVICES.filter((service) => service.categoria === category.id).forEach((service) => {
      group.append(new Option(service.nombre, service.id));
    });
    select.append(group);
  });
  select.append(new Option(ADVICE_OPTION.nombre, ADVICE_OPTION.id));
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const select = form.elements.servicio;
  const message = form.elements.mensaje;
  const counter = form.querySelector('[data-counter]');
  const horarioGroup = form.querySelector('[data-choices="horario"]');
  const submitBtn = form.querySelector('[data-submit]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const statusEl = form.querySelector('[data-form-status]');
  const successEl = document.querySelector('[data-form-success]');
  const successText = document.querySelector('[data-success-text]');
  const liveEl = document.querySelector('[data-form-live]');
  const errorFields = new Set(); // campos que ya mostraron un error → validan en tiempo real

  populateServiceSelect(select);

  /* --- Helpers de campos --- */
  const getValue = (name) => {
    if (name === 'horario' || name === 'dias') {
      return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
    }
    return form.elements[name].value;
  };

  const getFieldTarget = (name) => (name === 'horario' ? horarioGroup : form.elements[name]);

  const showError = (name, error) => {
    const target = getFieldTarget(name);
    const errorEl = document.getElementById(`${name}-error`);
    errorEl.textContent = error;
    if (error) {
      target.setAttribute('aria-invalid', 'true');
      errorFields.add(name);
    } else {
      target.removeAttribute('aria-invalid');
    }
  };

  const validateField = (name) => {
    const error = validators[name](getValue(name));
    showError(name, error);
    return !error;
  };

  /* --- Validación en tiempo real --- */
  ['nombre', 'email', 'telefono'].forEach((name) => {
    const input = form.elements[name];
    input.addEventListener('blur', () => {
      if (input.value.trim() || errorFields.has(name)) validateField(name);
    });
    input.addEventListener('input', () => {
      if (errorFields.has(name)) validateField(name);
    });
  });

  select.addEventListener('change', () => validateField('servicio'));

  horarioGroup.addEventListener('change', (event) => {
    // "Indistinto" excluye a las demás opciones y viceversa
    const changed = event.target;
    if (changed.checked) {
      const isAny = changed.value === 'Indistinto';
      horarioGroup.querySelectorAll('input').forEach((input) => {
        if (input !== changed && (isAny || input.value === 'Indistinto')) input.checked = false;
      });
    }
    if (errorFields.has('horario')) validateField('horario');
  });

  /* --- Contador del mensaje --- */
  const updateCounter = () => {
    const length = message.value.length;
    counter.textContent = `${length} / ${MESSAGE_MAX}`;
    counter.classList.toggle('is-near-limit', length >= MESSAGE_MAX - 50);
  };
  message.addEventListener('input', () => {
    updateCounter();
    if (errorFields.has('mensaje')) validateField('mensaje');
  });
  updateCounter();

  /* --- Preselección de servicio (botones "Consultar" y ?servicio=id) --- */
  const preselect = (serviceId) => {
    if (!getServiceById(serviceId)) return false;
    select.value = serviceId;
    validateField('servicio');
    return true;
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-servicio]');
    if (!trigger) return;
    resetToForm();
    preselect(trigger.dataset.servicio);
  });

  const urlService = new URLSearchParams(window.location.search).get('servicio');
  if (urlService && preselect(urlService)) {
    requestAnimationFrame(() => document.getElementById('contacto')?.scrollIntoView());
  }

  /* --- Estado de envío --- */
  const setLoading = (isLoading) => {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle('is-loading', isLoading);
    submitLabel.textContent = isLoading ? 'Enviando…' : 'Enviar consulta';
  };

  const showSendError = () => {
    statusEl.replaceChildren('No pudimos enviar tu consulta. Probá de nuevo en unos minutos');
    const waUrl = buildWhatsAppUrl('¡Hola! Quería hacer una consulta sobre un tratamiento.');
    if (waUrl) {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'escribinos por WhatsApp';
      statusEl.append(' o ', link, '.');
    } else {
      statusEl.append('.');
    }
  };

  const showSuccess = (data) => {
    const firstName = data.nombre.split(' ')[0];
    const strong = document.createElement('strong');
    strong.textContent = data.servicioNombre;
    successText.replaceChildren(
      `¡Gracias, ${firstName}! Recibimos tu consulta sobre `,
      strong,
      '. Te vamos a contactar a la brevedad para coordinar tu turno. 🌿'
    );
    form.hidden = true;
    successEl.hidden = false;
    successEl.focus();
    liveEl.textContent = successText.textContent;
  };

  function resetToForm() {
    if (form.hidden) {
      form.reset();
      errorFields.clear();
      ['nombre', 'email', 'telefono', 'servicio', 'horario', 'mensaje'].forEach((name) => showError(name, ''));
      updateCounter();
      successEl.hidden = true;
      form.hidden = false;
      liveEl.textContent = '';
    }
  }

  document.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    resetToForm();
    form.elements.nombre.focus();
  });

  /* --- Submit --- */
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusEl.textContent = '';

    // Honeypot: si viene completo, se descarta en silencio
    if (form.elements.website.value) return;

    const fieldNames = ['nombre', 'telefono', 'email', 'servicio', 'horario', 'mensaje'];
    const invalid = fieldNames.filter((name) => !validateField(name));

    if (invalid.length) {
      const first = invalid[0] === 'horario'
        ? horarioGroup.querySelector('input')
        : form.elements[invalid[0]];
      first.focus();
      liveEl.textContent = `Revisá ${invalid.length === 1 ? 'el campo marcado' : `los ${invalid.length} campos marcados`}.`;
      return;
    }

    const serviceId = getValue('servicio');
    const data = {
      nombre: getValue('nombre').trim().replace(/\s+/g, ' '),
      email: getValue('email').trim(),
      telefono: getValue('telefono').trim(),
      servicio: serviceId,
      servicioNombre: getServiceById(serviceId)?.nombre ?? serviceId,
      horario: getValue('horario'),
      dias: getValue('dias'),
      mensaje: getValue('mensaje').trim()
    };

    setLoading(true);
    try {
      await sendForm(data);
      showSuccess(data);
    } catch (error) {
      console.error(error);
      showSendError();
    } finally {
      setLoading(false);
    }
  });
}

initContactForm();

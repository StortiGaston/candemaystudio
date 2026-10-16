/* =========================================================
   CandeMayStudio — interacciones generales
   ========================================================= */

import { CATEGORIES, SERVICES, HOMECARE_BRANDS } from './services-data.js';
import { SITE_CONFIG, buildWhatsAppUrl } from './site-config.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopQuery = window.matchMedia('(min-width: 900px)');

/* ===== Header: fondo al hacer scroll ===== */
function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ===== Menú mobile ===== */
function initNavigation() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  const setOpen = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', isOpen);
    header.classList.toggle('is-open', isOpen);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });

  desktopQuery.addEventListener('change', () => setOpen(false));
}

/* ===== Link activo según la sección visible ===== */
function initActiveLink() {
  const links = [...document.querySelectorAll('.site-nav__link')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
          if (isCurrent) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ===== Animaciones de aparición ===== */
let revealObserver;

function observeReveal(elements) {
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => revealObserver.observe(el));
}

/* ===== Servicios: tabs + cards ===== */
function createServiceCard(service) {
  const category = CATEGORIES.find((cat) => cat.id === service.categoria);
  const card = document.createElement('article');
  card.className = 'service-card reveal';
  card.dataset.category = service.categoria;

  const titleId = `service-${service.id}-title`;
  card.setAttribute('aria-labelledby', titleId);

  card.innerHTML = `
    <span class="eyebrow service-card__category"></span>
    <h3 class="service-card__title" id="${titleId}"></h3>
    <p class="service-card__description"></p>
    ${service.nota ? '<p class="service-card__note"></p>' : ''}
    ${service.objetivo ? '<p class="service-card__goal"><strong>Objetivo</strong><span></span></p>' : ''}
    <a class="btn btn--ghost btn--small service-card__action" href="#contacto">Consultar</a>
  `;

  // Textos con textContent para no interpretar HTML del contenido
  card.querySelector('.service-card__category').textContent = category?.label ?? '';
  card.querySelector('.service-card__title').textContent = service.nombre;
  card.querySelector('.service-card__description').textContent = service.descripcion;
  if (service.nota) card.querySelector('.service-card__note').textContent = service.nota;
  if (service.objetivo) card.querySelector('.service-card__goal span').textContent = service.objetivo;

  const action = card.querySelector('.service-card__action');
  action.dataset.servicio = service.id;
  action.setAttribute('aria-label', `Consultar por ${service.nombre}`);

  return card;
}

function initServices() {
  const filtersEl = document.querySelector('[data-service-filters]');
  const gridEl = document.querySelector('[data-service-grid]');
  if (!filtersEl || !gridEl) return;

  const tabs = [{ id: 'todos', label: 'Todos' }, ...CATEGORIES].map((cat, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'filters__tab';
    tab.id = `tab-${cat.id}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', gridEl.id);
    tab.setAttribute('aria-selected', String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.dataset.filter = cat.id;
    tab.textContent = cat.label;
    filtersEl.append(tab);
    return tab;
  });

  const cards = SERVICES.map(createServiceCard);
  gridEl.append(...cards);
  gridEl.setAttribute('aria-labelledby', tabs[0].id);
  observeReveal(cards);

  const selectTab = (tab) => {
    tabs.forEach((t) => {
      const isSelected = t === tab;
      t.setAttribute('aria-selected', String(isSelected));
      t.tabIndex = isSelected ? 0 : -1;
    });
    gridEl.setAttribute('aria-labelledby', tab.id);

    const filter = tab.dataset.filter;
    cards.forEach((card) => {
      card.hidden = filter !== 'todos' && card.dataset.category !== filter;
      card.classList.add('is-visible');
    });
  };

  filtersEl.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab) selectTab(tab);
  });

  // Navegación con flechas entre tabs (patrón WAI-ARIA)
  filtersEl.addEventListener('keydown', (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -current, End: tabs.length - 1 - current };
    if (!(event.key in keys)) return;

    event.preventDefault();
    const next = tabs[(current + keys[event.key] + tabs.length) % tabs.length];
    next.focus();
    selectTab(next);
  });
}

/* ===== Marcas de homecare ===== */
function initBrands() {
  const list = document.querySelector('[data-homecare-brands]');
  if (!list) return;

  HOMECARE_BRANDS.forEach((brand) => {
    const item = document.createElement('li');
    item.className = 'brands__item';
    item.textContent = brand;
    list.append(item);
  });
}

/* ===== Galería + lightbox ===== */
function initGallery() {
  const gallery = document.querySelector('[data-gallery]');
  const dialog = document.querySelector('[data-lightbox]');
  if (!gallery || !dialog || typeof dialog.showModal !== 'function') return;

  const items = [...gallery.querySelectorAll('.gallery__item')];
  const mediaEl = dialog.querySelector('[data-lightbox-media]');
  const captionEl = dialog.querySelector('[data-lightbox-caption]');
  let currentIndex = 0;
  let lastTrigger = null;

  const show = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const media = item.querySelector('img, .media-placeholder');
    mediaEl.replaceChildren(media.cloneNode(true));
    captionEl.textContent = item.dataset.caption ?? '';
  };

  items.forEach((item, index) => {
    item.setAttribute('aria-label', `Ampliar imagen: ${item.dataset.caption ?? ''}`);
    item.addEventListener('click', () => {
      lastTrigger = item;
      show(index);
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(currentIndex - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(currentIndex + 1));

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });

  // Cerrar al hacer clic en el fondo
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => lastTrigger?.focus());
}

/* ===== WhatsApp ===== */
function initWhatsApp() {
  const url = buildWhatsAppUrl(SITE_CONFIG.whatsappGreeting);
  if (!url) return;

  const floatBtn = document.querySelector('[data-whatsapp-float]');
  if (floatBtn) {
    floatBtn.href = url;
    floatBtn.target = '_blank';
    floatBtn.rel = 'noopener';
    floatBtn.hidden = false;
  }

  document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

/* ===== Año dinámico ===== */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

initHeaderScroll();
initNavigation();
initActiveLink();
initServices();
initBrands();
initGallery();
initWhatsApp();
initYear();
observeReveal([...document.querySelectorAll('.reveal:not(.service-card)')]);

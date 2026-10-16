/* =========================================================
   Datos de contacto y configuración del sitio
   TODO: completar con los datos reales del cliente.
   ========================================================= */

export const SITE_CONFIG = {
  // Número en formato internacional sin "+", espacios ni guiones (ej. '5493794123456').
  // Si queda vacío, se ocultan el botón flotante y los enlaces de WhatsApp.
  whatsappNumber: '',

  // Mensaje inicial del botón flotante de WhatsApp
  whatsappGreeting: '¡Hola! Quería hacer una consulta sobre los tratamientos de CandeMayStudio.',

  // Servicio de envío del formulario: 'simulation' | 'formspree' | 'whatsapp'
  formProvider: 'simulation',

  // Endpoint público de Formspree (ej. 'https://formspree.io/f/xxxxxxx'). No es una clave privada.
  formspreeEndpoint: ''
};

export function buildWhatsAppUrl(text) {
  if (!SITE_CONFIG.whatsappNumber) return '';
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

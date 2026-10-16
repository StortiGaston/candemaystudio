/* =========================================================
   Servicios — fuente única de verdad
   Se usan para renderizar las cards y las <option> del formulario.
   ========================================================= */

export const CATEGORIES = [
  { id: 'faciales', label: 'Faciales' },
  { id: 'fotonicos-corporales', label: 'Fotónicos y Corporales' },
  { id: 'labios', label: 'Labios' },
  { id: 'productos', label: 'Productos y Complementos' }
];

export const SERVICES = [
  /* ===== Faciales ===== */
  {
    id: 'higiene-basica',
    categoria: 'faciales',
    nombre: 'Higiene Facial Básica / Express',
    descripcion: 'Limpieza profunda de cutis ideal para mantenimiento regular o preparar la piel. Incluye higiene, exfoliación suave, hidratación y protección solar.',
    objetivo: 'Refrescar, iluminar y oxigenar el rostro en poco tiempo.',
    nota: 'No incluye extracciones.'
  },
  {
    id: 'higiene-profunda',
    categoria: 'faciales',
    nombre: 'Higiene Facial Profunda con Extracciones',
    descripcion: 'Protocolo completo de descongestión e higiene. Incluye limpieza, exfoliación, extracción de comedones/impurezas, descongestión, alta frecuencia/máscara específica según el biotipo cutáneo, sérum sellador y protección solar.',
    objetivo: 'Remover impurezas acumuladas, purificar los poros y dejar la piel suave y renovada.'
  },
  {
    id: 'exosomas',
    categoria: 'faciales',
    nombre: 'Tratamientos Específicos & Exosomas (Manual)',
    descripcion: 'Protocolo de nutrición y regeneración celular avanzada mediante la aplicación manual de concentrados cosméticos de última tecnología (exosomas) combinados con activos específicos según la necesidad de la piel (antiedad, manchas, hidratación intensiva).',
    objetivo: 'Estimular la renovación celular, mejorar la textura y recuperar el resplandor natural.'
  },
  {
    id: 'acne',
    categoria: 'faciales',
    nombre: 'Tratamiento para Acné',
    descripcion: 'Protocolo específico y purificante orientado a pieles con brotes, seborrea o tendencia acneica. Incluye higiene profunda, control bacteriano, extracciones cuidadosas y activos antiinflamatorios y seborreguladores.',
    objetivo: 'Reducir la inflamación, limpiar en profundidad los poros, calmar brotes y prevenir nuevas lesiones.'
  },
  {
    id: 'rosacea',
    categoria: 'faciales',
    nombre: 'Tratamiento para Rosácea',
    descripcion: 'Protocolo facial ultrasensible y descongestivo diseñado específicamente para pieles con rojeces, cuperosis e hiperreactividad. Se utilizan productos específicos sin fragancias irritantes y activos calmantes.',
    objetivo: 'Disminuir el eritema (rojez), calmar la sensación de calor o tirantez y fortalecer la barrera cutánea.'
  },
  {
    id: 'manchas',
    categoria: 'faciales',
    nombre: 'Tratamiento para Manchas (Despigmentante)',
    descripcion: 'Protocolo enfocado en inhibir la síntesis de melanina y unificar el tono cutáneo, combinando activos antioxidantes, exfoliantes y despigmentantes seguros.',
    objetivo: 'Aclarar hiperpigmentaciones (melasma, manchas solares, post-inflamatorias) y aportar luminosidad homogénea.'
  },
  {
    id: 'anti-age',
    categoria: 'faciales',
    nombre: 'Tratamiento para Signos de Edad (Anti-Age)',
    descripcion: 'Protocolo de estimulación y nutrición intensiva diseñado para combatir la flacidez, las líneas de expresión y la pérdida de elasticidad.',
    objetivo: 'Reafirmar los tejidos, nutrir en profundidad y devolverle densidad y vitalidad al rostro.'
  },
  {
    id: 'punta-diamante',
    categoria: 'faciales',
    nombre: 'Punta de Diamante',
    descripcion: 'Exfoliación mecánica de precisión mediante microdermoabrasión con puntas de diamante y succión al vacío.',
    objetivo: 'Pulir la capa más superficial de la piel, remover impurezas, alisar la textura y estimular la regeneración celular.'
  },

  /* ===== Fotónicos y Corporales ===== */
  // TODO: confirmar con el cliente si Masoterapia LED y Fototerapia LED se unifican.
  {
    id: 'masoterapia-led',
    categoria: 'fotonicos-corporales',
    nombre: 'Masoterapia LED',
    descripcion: 'Terapia lumínica complementaria que utiliza fotones de distintas longitudes de onda (colores de luces LED) según el efecto biológico que se busque en la piel.',
    objetivo: 'Potenciar otros tratamientos aportando efectos bactericidas (luz azul), calmantes, estimulantes del colágeno (luz roja) o descongestivos de manera no invasiva.'
  },
  {
    id: 'fototerapia-led',
    categoria: 'fotonicos-corporales',
    nombre: 'Fototerapia LED',
    descripcion: 'Terapia lumínica complementaria y no invasiva que utiliza fotones de distintas longitudes de onda (como luz roja para estimular colágeno, o luz azul con efecto bactericida) según la necesidad del paciente.',
    objetivo: 'Potenciar los protocolos en gabinete, calmar inflamaciones, estimular la regeneración tisular o tratar afecciones específicas de manera indolora.'
  },
  {
    id: 'fotorejuvenecimiento',
    categoria: 'fotonicos-corporales',
    nombre: 'Fotorejuvenecimiento',
    descripcion: 'Tratamiento no invasivo mediante tecnología de luz que estimula la producción natural de colágeno y elastina, atenuando líneas de expresión y mejorando el tono uniforme del rostro.',
    objetivo: 'Rejuvenecer la piel, aportar firmeza y luminosidad.'
  },
  {
    id: 'vela-velvet',
    categoria: 'fotonicos-corporales',
    nombre: 'Tratamiento Corporal Vela Velvet',
    descripcion: 'Protocolo corporal remodelador que combina tecnologías para trabajar sobre la celulitis, la flacidez y la adiposidad localizada, además de favorecer el drenaje linfático.',
    objetivo: 'Modelar la silueta, mejorar la firmeza y suavizar la textura de la piel corporal.'
  },
  {
    id: 'depilacion-definitiva',
    categoria: 'fotonicos-corporales',
    nombre: 'Depilación Definitiva',
    descripcion: 'Sesiones de depilación láser progresiva y segura para distintas zonas corporales y faciales, adaptadas según la época del año y las necesidades de cada paciente.',
    objetivo: 'Eliminación duradera del vello e higienización de la piel.'
  },

  /* ===== Labios ===== */
  {
    id: 'bb-lips',
    categoria: 'labios',
    nombre: 'BB Lips',
    descripcion: 'Tratamiento de micropigmentación semipermanente de labios que utiliza activos nutritivos y color con pigmentos seguros para dar un efecto de "labios maquillados" sutil, hidratados y con tono uniforme.',
    objetivo: 'Mejorar el color natural de los labios, disimular pequeñas asimetrías o palidez y aportar un aspecto saludable sin necesidad de maquillaje diario.'
  },
  {
    id: 'hidra-lips',
    categoria: 'labios',
    nombre: 'Hidra Lips',
    descripcion: 'Protocolo de hidratación profunda y regeneración labial mediante la técnica de microneedling (Dermapen) combinada con ácido hialurónico, péptidos y vitaminas, sin modificar el color ni dar volumen artificial.',
    objetivo: 'Reparar labios resecos o agrietados, devolver la suavidad, retener la humedad y lograr una textura tersa y rejuvenecida.'
  },

  /* ===== Productos y Complementos ===== */
  {
    id: 'homecare',
    categoria: 'productos',
    nombre: 'Asesoramiento Cosmiátrico y Venta de Cuidado en Casa (Homecare)',
    descripcion: 'Evaluación del biotipo cutáneo y armado de rutinas domiciliarias personalizadas con líneas de marcas profesionales (Lidherma, Libra, Biobellus, Prodermic, etc.).'
  }
];

/* Opción extra del formulario para quien no sabe qué elegir */
export const ADVICE_OPTION = {
  id: 'asesoramiento',
  nombre: 'No estoy segura/o, quiero asesoramiento'
};

export const HOMECARE_BRANDS = ['Lidherma', 'Libra', 'Biobellus', 'Prodermic'];

export function getServiceById(id) {
  if (id === ADVICE_OPTION.id) return ADVICE_OPTION;
  return SERVICES.find((service) => service.id === id);
}

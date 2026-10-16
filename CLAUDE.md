# CLAUDE.md — CandeMayStudio

Guía de proyecto para desarrollar el sitio web de **CandeMayStudio**, estudio de estética y cosmiatría. Leé este archivo completo antes de escribir código. Todo el contenido visible del sitio va en **español rioplatense** (Argentina), con un tono cálido, cercano y profesional.

---

## 1. Resumen del proyecto

Sitio web institucional (one-page con anclas, o multipágina liviana) con estética **elegante, armoniosa y moderna** que transmita **tranquilidad, cuidado personal y profesionalismo**.

### Objetivos
1. **Dar a conocer los servicios**: presentar todos los tratamientos de forma clara y atractiva.
2. **Atraer nuevos clientes**: diseño cuidado y contenido visual que despierte interés.
3. **Fortalecer la identidad del negocio**: imagen digital profesional que transmita confianza, bienestar y belleza.
4. **Responsive**: funcionar perfecto en celulares, tablets y computadoras (mobile-first).

### Filosofía de la marca (usar como base del texto "Nosotras / Filosofía")
> Queremos que cada persona que nos elija encuentre un espacio donde pueda dedicarse tiempo, sentirse cómoda y disfrutar de cuidarse. Nos gusta acompañar a cada cliente en su experiencia, escuchando sus necesidades y ofreciendo tratamientos que se adapten a lo que busca. Creemos que la belleza va más allá de lo estético, también tiene que ver con sentirse bien con uno mismo. Por eso, buscamos brindar una atención cercana y personalizada, en un ambiente cálido y agradable, donde cada visita sea un momento para relajarse, renovarse y salir sintiéndose mejor.

Palabras clave de tono: *calma, bienestar, cercanía, personalizado, renovarse, confianza, naturalidad*.

---

## 2. Stack técnico

- **HTML5 semántico + CSS3 + JavaScript vanilla (ES6+)**. Sin frameworks ni build step salvo que se pida explícitamente.
- CSS con **custom properties** (variables) para colores, tipografías y espaciados.
- Layout con **Flexbox y CSS Grid**. Sin librerías de UI.
- JS en módulos simples (`type="module"`) o un único `main.js` ordenado por funciones.
- Debe poder abrirse con un servidor estático simple (Live Server, `npx serve`, etc.).

### Estructura de carpetas sugerida
```
candemaystudio/
├── index.html
├── CLAUDE.md
├── assets/
│   ├── img/
│   │   ├── logo/          # logo en SVG/PNG (versión color, blanca, isotipo)
│   │   ├── servicios/
│   │   ├── galeria/
│   │   └── homecare/
│   ├── fonts/             # fuentes con licencia (.woff2) si no están en Google Fonts
│   └── icons/             # íconos SVG lineales
├── css/
│   ├── base.css           # reset, variables, tipografía
│   ├── layout.css         # header, footer, grillas, secciones
│   ├── components.css     # botones, cards, formulario, modales
│   └── responsive.css     # (opcional) ajustes por breakpoint
└── js/
    ├── main.js            # menú, scroll suave, animaciones de aparición
    ├── services-data.js   # datos de servicios (fuente única de verdad)
    └── contact-form.js    # validación y envío del formulario
```

---

## 3. Identidad visual

### 3.1 Paleta de colores

| Rol | Nombre | HEX | Uso |
|---|---|---|---|
| Primario | Verde salvia | `#899388` | Fondos de sección alternos, botones, detalles, íconos |
| Secundario | Rosa nude | `#C5B0B2` | Fondos suaves, hovers, bordes, acentos |
| Texto principal | Negro suave | `#111111` | Cuerpo de texto |
| Texto de acento | Marrón chocolate | `#3E2A2B` | Títulos, subtítulos, footer |

Derivados permitidos (tintes y sombras de la misma paleta, nunca colores nuevos saturados):

```css
:root {
  /* Marca */
  --color-salvia: #899388;
  --color-salvia-dark: #6E786D;   /* hover de botones salvia, texto sobre claro */
  --color-salvia-light: #DDE1DC;  /* fondos de sección */
  --color-nude: #C5B0B2;
  --color-nude-light: #F1E9E9;    /* fondos de cards / secciones */
  --color-black-soft: #111111;
  --color-chocolate: #3E2A2B;

  /* Neutros */
  --color-cream: #FAF7F5;         /* fondo general del sitio */
  --color-white: #FFFFFF;

  /* Estados del formulario (versiones suaves, sin rojos agresivos) */
  --color-error: #A5544F;
  --color-success: #5F7A5E;
}
```

**Reglas de color**
- Evitar contrastes agresivos: fondo general crema/blanco cálido, nunca blanco puro con negro puro en grandes bloques.
- Texto sobre salvia `#899388`: usar **chocolate `#3E2A2B`** o blanco sólo en tamaños grandes/negrita. Verificar contraste mínimo **WCAG AA (4.5:1 texto normal, 3:1 texto grande)**. Para botones salvia con texto blanco, usar `--color-salvia-dark` como fondo.
- Rosa nude es de acento y fondo, no para texto de párrafo.

### 3.2 Tipografías

| Jerarquía | Fuente indicada | Uso |
|---|---|---|
| Títulos principales (display) | **Burgues Script**, Molenilo o Rocking Horse (script/cursiva) | Hero, títulos de sección, nombre de marca. Solo tamaños grandes, pocas palabras. |
| Subtítulos | **TT Corals** o **Alice** (serif elegante) | H2/H3, nombres de servicios, citas |
| Cuerpo | **Montserrat** | Párrafos, botones, formulario, navegación |

**Notas de implementación**
- **Alice** y **Montserrat** están en Google Fonts → cargarlas desde ahí.
- **Burgues Script, Molenilo, Rocking Horse y TT Corals** son fuentes comerciales: si el cliente entrega los archivos con licencia web, colocarlos en `assets/fonts/` como `.woff2` y declararlos con `@font-face` + `font-display: swap`.
- Mientras no estén los archivos, usar estos *fallbacks* de Google Fonts: **Pinyon Script** o **Great Vibes** para el script, **Alice** para subtítulos.

```css
:root {
  --font-script: 'Burgues Script', 'Pinyon Script', cursive;
  --font-serif: 'TT Corals', 'Alice', Georgia, serif;
  --font-sans: 'Montserrat', system-ui, sans-serif;
}
```

**Reglas tipográficas**
- La script **nunca** en párrafos, botones, labels ni textos menores a ~32px.
- Cuerpo: Montserrat 400, 16–18px, `line-height: 1.6–1.7`.
- Subtítulos y navegación: se puede usar Montserrat 500 en mayúsculas con `letter-spacing: 0.1–0.15em` para detalles finos.
- Escala fluida con `clamp()` para que se adapte a cada dispositivo.

### 3.3 Estilo fotográfico

- Iluminación **natural y difusa**, tonos cálidos, sin flash duro ni filtros saturados.
- **Primeros planos de texturas**: cremas, emulsiones, sérums, gotas.
- **Elementos orgánicos de apoyo**: hojas, eucalipto, flores secas, piedras, lino, madera clara.
- Mostrar **técnicas manuales, masajes y aparatología permitida** en un contexto de confort y confianza.
- Coherencia entre servicios, tienda/homecare y galería de resultados.
- Evitar: fotos de stock genéricas con poses forzadas, clínicas frías, agujas o imágenes invasivas, colores estridentes.

**Implementación de imágenes**
- Formato **WebP** (con fallback JPG si hace falta), `loading="lazy"` excepto la del hero.
- Siempre `width`/`height` declarados y `alt` descriptivo en español.
- Se puede aplicar un velo suave (`overlay` salvia o nude al 15–30%) para unificar fotos de distintas fuentes.
- Mientras no haya fotos reales, usar placeholders con fondo `--color-nude-light` y un comentario `<!-- TODO: foto real -->`.

### 3.4 Logo
- El logo debe ir en `assets/img/logo/`. Preferir **SVG**. Prever versión sobre fondo claro y sobre fondo salvia.
- Ubicación: header (izquierda en desktop, centrado o izquierda en mobile), footer y favicon.
- Respetar área de resguardo; no deformarlo ni aplicarle sombras.
- ⚠️ El archivo del logo **aún no está en el proyecto**: pedirlo antes de maquetar el header y extraer de él cualquier detalle de estilo (trazos, ornamentos) que deba repetirse en el sitio.

### 3.5 Lenguaje visual general
- Mucho **espacio en blanco**, ritmo pausado, secciones respiradas.
- Bordes redondeados suaves (`border-radius: 12–24px`), formas orgánicas (arcos en imágenes, por ejemplo `border-radius: 200px 200px 16px 16px`).
- Sombras muy sutiles (`0 8px 30px rgba(62, 42, 43, 0.08)`).
- Íconos **lineales finos**, en salvia o chocolate.
- Animaciones suaves y lentas (fade-up con `IntersectionObserver`, 400–700ms, `ease-out`). Respetar `prefers-reduced-motion`.
- Divisores decorativos delicados (líneas finas, pequeños ornamentos botánicos en SVG).

---

## 4. Estructura del sitio (secciones)

1. **Header / navegación** fija, con fondo crema translúcido al hacer scroll. Links: Inicio · Nosotras · Servicios · Homecare · Galería · Contacto. Menú hamburguesa en mobile, accesible (`aria-expanded`, cierre con Esc).
2. **Hero**: título en script (ej. "Un espacio para vos"), bajada en serif, foto de textura o ambiente, CTA principal "Pedí tu turno" (→ #contacto) y secundario "Ver servicios".
3. **Nosotras / Filosofía**: texto de la sección 1 de este archivo, foto de técnica manual, 3 pilares con ícono: *Atención personalizada · Ambiente cálido · Bienestar integral*.
4. **Servicios**: agrupados por categoría con filtros/tabs (Faciales · Fotónicos y Corporales · Labios · Productos y Complementos). Cards con nombre, descripción breve, objetivo y botón "Consultar" que lleva al formulario **con el servicio ya seleccionado**.
5. **Homecare / Asesoramiento cosmiátrico**: explicación del servicio y marcas con las que se trabaja.
6. **Galería de resultados**: grilla de fotos (antes/después si el cliente lo autoriza) con lightbox simple.
7. **Contacto**: formulario + datos de contacto + horarios + mapa (opcional) + botón de WhatsApp.
8. **Footer**: logo, redes, dirección, horarios, links rápidos, © año dinámico.
9. Botón flotante de **WhatsApp** (opcional, confirmar número con el cliente).

---

## 5. Servicios (contenido oficial)

> Guardar estos datos en `js/services-data.js` como array de objetos `{ id, categoria, nombre, descripcion, objetivo, nota? }` y renderizar las cards y las `<option>` del formulario desde ahí. **Una sola fuente de verdad.**

### Servicios Faciales

**Higiene Facial Básica / Express**
- Descripción: Limpieza profunda de cutis ideal para mantenimiento regular o preparar la piel. Incluye higiene, exfoliación suave, hidratación y protección solar.
- Nota: No incluye extracciones.
- Objetivo: Refrescar, iluminar y oxigenar el rostro en poco tiempo.

**Higiene Facial Profunda con Extracciones**
- Descripción: Protocolo completo de descongestión e higiene. Incluye limpieza, exfoliación, extracción de comedones/impurezas, descongestión, alta frecuencia/máscara específica según el biotipo cutáneo, sérum sellador y protección solar.
- Objetivo: Remover impurezas acumuladas, purificar los poros y dejar la piel suave y renovada.

**Tratamientos Específicos & Exosomas (Manual)**
- Descripción: Protocolo de nutrición y regeneración celular avanzada mediante la aplicación manual de concentrados cosméticos de última tecnología (exosomas) combinados con activos específicos según la necesidad de la piel (antiedad, manchas, hidratación intensiva).
- Objetivo: Estimular la renovación celular, mejorar la textura y recuperar el resplandor natural.

**Tratamiento para Acné**
- Descripción: Protocolo específico y purificante orientado a pieles con brotes, seborrea o tendencia acneica. Incluye higiene profunda, control bacteriano, extracciones cuidadosas y activos antiinflamatorios y seborreguladores.
- Objetivo: Reducir la inflamación, limpiar en profundidad los poros, calmar brotes y prevenir nuevas lesiones.

**Tratamiento para Rosácea**
- Descripción: Protocolo facial ultrasensible y descongestivo diseñado específicamente para pieles con rojeces, cuperosis e hiperreactividad. Se utilizan productos específicos sin fragancias irritantes y activos calmantes.
- Objetivo: Disminuir el eritema (rojez), calmar la sensación de calor o tirantez y fortalecer la barrera cutánea.

**Tratamiento para Manchas (Despigmentante)**
- Descripción: Protocolo enfocado en inhibir la síntesis de melanina y unificar el tono cutáneo, combinando activos antioxidantes, exfoliantes y despigmentantes seguros.
- Objetivo: Aclarar hiperpigmentaciones (melasma, manchas solares, post-inflamatorias) y aportar luminosidad homogénea.

**Tratamiento para Signos de Edad (Anti-Age)**
- Descripción: Protocolo de estimulación y nutrición intensiva diseñado para combatir la flacidez, las líneas de expresión y la pérdida de elasticidad.
- Objetivo: Reafirmar los tejidos, nutrir en profundidad y devolverle densidad y vitalidad al rostro.

**Punta de Diamante**
- Descripción: Exfoliación mecánica de precisión mediante microdermoabrasión con puntas de diamante y succión al vacío.
- Objetivo: Pulir la capa más superficial de la piel, remover impurezas, alisar la textura y estimular la regeneración celular.

### Servicios Fotónicos y Corporales

**Masoterapia LED**
- Descripción: Terapia lumínica complementaria que utiliza fotones de distintas longitudes de onda (colores de luces LED) según el efecto biológico que se busque en la piel.
- Objetivo: Potenciar otros tratamientos aportando efectos bactericidas (luz azul), calmantes, estimulantes del colágeno (luz roja) o descongestivos de manera no invasiva.

**Fototerapia LED**
- Descripción: Terapia lumínica complementaria y no invasiva que utiliza fotones de distintas longitudes de onda (como luz roja para estimular colágeno, o luz azul con efecto bactericida) según la necesidad del paciente.
- Objetivo: Potenciar los protocolos en gabinete, calmar inflamaciones, estimular la regeneración tisular o tratar afecciones específicas de manera indolora.

**Fotorejuvenecimiento**
- Descripción: Tratamiento no invasivo mediante tecnología de luz que estimula la producción natural de colágeno y elastina, atenuando líneas de expresión y mejorando el tono uniforme del rostro.
- Objetivo: Rejuvenecer la piel, aportar firmeza y luminosidad.

**Tratamiento Corporal Vela Velvet**
- Descripción: Protocolo corporal remodelador que combina tecnologías para trabajar sobre la celulitis, la flacidez y la adiposidad localizada, además de favorecer el drenaje linfático.
- Objetivo: Modelar la silueta, mejorar la firmeza y suavizar la textura de la piel corporal.

**Depilación Definitiva**
- Descripción: Sesiones de depilación láser progresiva y segura para distintas zonas corporales y faciales, adaptadas según la época del año y las necesidades de cada paciente.
- Objetivo: Eliminación duradera del vello e higienización de la piel.

### Labios

**BB Lips**
- Descripción: Tratamiento de micropigmentación semipermanente de labios que utiliza activos nutritivos y color con pigmentos seguros para dar un efecto de "labios maquillados" sutil, hidratados y con tono uniforme.
- Objetivo: Mejorar el color natural de los labios, disimular pequeñas asimetrías o palidez y aportar un aspecto saludable sin necesidad de maquillaje diario.

**Hidra Lips**
- Descripción: Protocolo de hidratación profunda y regeneración labial mediante la técnica de microneedling (Dermapen) combinada con ácido hialurónico, péptidos y vitaminas, sin modificar el color ni dar volumen artificial.
- Objetivo: Reparar labios resecos o agrietados, devolver la suavidad, retener la humedad y lograr una textura tersa y rejuvenecida.

### Productos y Complementos

**Asesoramiento Cosmiátrico y Venta de Cuidado en Casa (Homecare)**
- Descripción: Evaluación del biotipo cutáneo y armado de rutinas domiciliarias personalizadas con líneas de marcas profesionales (Lidherma, Libra, Biobellus, Prodermic, etc.).

> **A confirmar con el cliente:** "Masoterapia LED" y "Fototerapia LED" tienen descripciones muy parecidas. Preguntar si son dos servicios distintos o si se unifican en uno solo antes de publicar. No inventar precios, duraciones ni resultados garantizados.

---

## 6. Sección de contacto (requisito principal)

### 6.1 Objetivo
Una sección de contacto **atractiva, fácil de usar y funcional** que facilite la comunicación entre la estética y sus clientes: consultas y solicitudes de turno.

### 6.2 Campos del formulario

| Campo | `name` | Tipo | Obligatorio | Validación |
|---|---|---|---|---|
| Nombre y apellido | `nombre` | `text` | Sí | Mínimo 3 caracteres, al menos 2 palabras, solo letras/espacios/acentos/ñ |
| Correo electrónico | `email` | `email` | Sí | Formato válido (regex + `type="email"`) |
| Número de teléfono | `telefono` | `tel` | Sí | 8 a 15 dígitos; aceptar `+`, espacios, guiones y paréntesis (ej. `+54 9 379 412-3456`) |
| Servicio o tratamiento de interés | `servicio` | `select` (agrupado con `<optgroup>` por categoría) | Sí | Distinto de la opción vacía. Incluir opción "No estoy segura/o, quiero asesoramiento" |
| Horarios disponibles | `horario` | checkboxes o select (Mañana · Mediodía · Tarde · Indistinto) + días opcionales | Sí (al menos uno) | Al menos una opción marcada |
| Mensaje o consulta | `mensaje` | `textarea` | No (recomendado) | Máximo 500 caracteres con contador visible |

Agregar también:
- Campo *honeypot* oculto anti-spam (`name="website"`, si viene completo, descartar el envío).
- Checkbox opcional de aceptación de privacidad si se decide almacenar datos.

### 6.3 Diseño
- Layout en 2 columnas en desktop (info de contacto + imagen a un lado, formulario al otro); 1 columna en mobile.
- Fondo `--color-nude-light` o `--color-salvia-light`; formulario en card crema con bordes redondeados y sombra sutil.
- Título de sección en script (ej. "Reservá tu momento"), bajada en serif.
- Inputs: altura cómoda (≥ 48px), bordes finos nude, foco con borde salvia y `box-shadow` suave. Labels siempre visibles (no solo placeholder).
- Botón "Enviar consulta" en salvia oscuro con texto blanco; hover más suave; estado `disabled` + spinner mientras se envía.
- Mensajes de error debajo de cada campo, color `--color-error`, tono amable (ej. "Ingresá un correo válido, por ejemplo nombre@mail.com").

### 6.4 Funcionamiento (JavaScript, `js/contact-form.js`)
1. Poblar el `<select>` de servicios desde `services-data.js`.
2. Si la URL o el botón "Consultar" de una card trae un servicio (`?servicio=id` o `data-servicio`), preseleccionarlo y hacer scroll al formulario.
3. Validación **en tiempo real** (`blur` e `input` después del primer error) y **al enviar** (`submit` con `preventDefault`).
4. Usar `novalidate` en el `<form>` para controlar los mensajes propios, pero mantener los atributos `required`, `type`, `minlength`, `maxlength` como base semántica.
5. Accesibilidad: `aria-invalid="true"` en campos con error, `aria-describedby` apuntando al mensaje de error, mover el foco al primer campo inválido al enviar, región `aria-live="polite"` para el mensaje final.
6. Envío:
   - Implementar una función `sendForm(data)` desacoplada para poder cambiar el servicio de envío fácilmente.
   - Opción por defecto (hasta que el cliente decida): **simulación** con `Promise` + `setTimeout`.
   - Opciones reales a ofrecer: **Formspree**, **EmailJS**, o armar un enlace **WhatsApp** (`https://wa.me/<número>?text=...`) con los datos codificados con `encodeURIComponent`.
   - Nunca exponer claves privadas en el frontend.
7. **Mensaje de confirmación** tras el envío exitoso: reemplazar el formulario (o mostrar un panel) con algo como:
   > "¡Gracias, {nombre}! Recibimos tu consulta sobre **{servicio}**. Te vamos a contactar a la brevedad para coordinar tu turno. 🌿"
   Con botón "Enviar otra consulta" que resetea el formulario.
8. Manejo de error de envío: mensaje amable y opción de reintentar o escribir por WhatsApp.

### 6.5 Pruebas del formulario
Probar y dejar registro (checklist en el PR o en un `TESTING.md`):
- [ ] Envío con todos los campos vacíos → muestra todos los errores y foco en el primero.
- [ ] Emails inválidos: `ana@`, `ana.com`, `ana@mail`, con espacios → error.
- [ ] Email válido con subdominio/`+` → acepta.
- [ ] Teléfono con letras o menos de 8 dígitos → error.
- [ ] Servicio sin seleccionar → error.
- [ ] Ningún horario marcado → error.
- [ ] Mensaje > 500 caracteres → bloqueado por contador.
- [ ] Preselección del servicio desde una card.
- [ ] Mensaje de confirmación y reseteo.
- [ ] Navegación solo con teclado y lector de pantalla básico.
- [ ] Dispositivos: 360px (Android), 390px (iPhone), 768px (tablet), 1024px, 1440px. Chrome, Safari iOS, Firefox, Edge.
- [ ] Teclado correcto en mobile (`inputmode`, `type="tel"`, `type="email"`, `autocomplete`).

---

## 7. Responsive

- **Mobile-first**. Breakpoints de referencia:
  - `min-width: 600px` → tablet chica
  - `min-width: 900px` → tablet/laptop
  - `min-width: 1200px` → desktop
- Contenedor máximo `1200px`, padding lateral `clamp(16px, 5vw, 48px)`.
- Sin scroll horizontal en ningún ancho.
- Áreas táctiles mínimas de 44×44px.
- Imágenes con `srcset`/`sizes` cuando haya varias resoluciones.

---

## 8. Calidad, accesibilidad y SEO

- HTML semántico: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`. Un solo `h1`.
- `lang="es-AR"` en `<html>`.
- Contraste WCAG AA; foco visible personalizado (anillo salvia), nunca `outline: none` sin reemplazo.
- `prefers-reduced-motion` desactiva animaciones.
- Meta tags: `title` ("CandeMayStudio | Estética y cosmiatría"), `description`, Open Graph (imagen, título, descripción), favicon desde el logo.
- Datos estructurados JSON-LD tipo `BeautySalon` (completar dirección/teléfono cuando el cliente los pase).
- Performance: fuentes con `preconnect` y `font-display: swap`, imágenes optimizadas, JS con `defer`. Objetivo Lighthouse ≥ 90 en todas las categorías.

---

## 9. Convenciones de código

- Indentación de 2 espacios. Comillas simples en JS, dobles en HTML.
- Clases en CSS con **BEM** (`.service-card`, `.service-card__title`, `.service-card--featured`).
- Nombres de variables y funciones JS en inglés; textos y contenido en español.
- No usar `!important` salvo casos justificados.
- No usar estilos inline ni `onclick` en HTML; eventos con `addEventListener`.
- Comentar secciones de CSS con encabezados (`/* ===== Hero ===== */`).
- Todo texto visible fácil de editar (preferir datos en JS o HTML claro, no textos enterrados en lógica).

---

## 10. Pendientes a confirmar con el cliente

- [ ] Archivo del **logo** (idealmente SVG) y sus variantes.
- [ ] Archivos de fuentes con licencia web (Burgues Script / Molenilo / Rocking Horse, TT Corals).
- [ ] Datos de contacto reales: teléfono/WhatsApp, email, dirección, horarios de atención, redes sociales.
- [ ] Servicio de envío del formulario (Formspree, EmailJS, WhatsApp o backend propio).
- [ ] Fotos reales de gabinete, tratamientos, productos y resultados (con autorización de las clientas para antes/después).
- [ ] ¿Masoterapia LED y Fototerapia LED se unifican?
- [ ] ¿Se publican precios/duraciones o solo "consultar"?
- [ ] ¿La sección Homecare será solo informativa o una tienda con productos?

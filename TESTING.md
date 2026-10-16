# Pruebas — CandeMayStudio

Verificado con Chrome headless (puppeteer) sobre `python3 -m http.server`. Los ítems sin marcar necesitan prueba manual.

## Formulario de contacto
- [x] Envío con todos los campos vacíos → muestra todos los errores y foco en el primero (Nombre).
- [x] Emails inválidos: `ana@`, `ana.com`, `ana@mail`, con espacios → error.
- [x] Email válido con subdominio/`+` (`ana+spa@sub.mail.com.ar`) → acepta.
- [x] Teléfono con letras o menos de 8 dígitos → error. `+54 9 379 412-3456` y `(0379) 4123456` → aceptan.
- [x] Servicio sin seleccionar → error.
- [x] Ningún horario marcado → error.
- [x] Mensaje > 500 caracteres → bloqueado por `maxlength` (contador muestra 500 / 500).
- [x] Preselección del servicio desde una card ("Consultar") y desde `?servicio=<id>`.
- [x] Mensaje de confirmación con nombre y servicio, y reseteo con "Enviar otra consulta".
- [x] Estado de error de envío (`/?simular=error`) → mensaje amable y botón habilitado para reintentar.
- [ ] Navegación solo con teclado y lector de pantalla (VoiceOver / NVDA).
- [ ] Teclado correcto en mobile real (`type="tel"`, `type="email"`, `inputmode`, `autocomplete`).

## Responsive
- [x] Sin scroll horizontal en 360, 390, 768 y 1440px.
- [ ] 1024px y dispositivos reales: Chrome, Safari iOS, Firefox, Edge.

## Navegación
- [x] Menú mobile abre/cierra y se cierra con Esc.
- [x] Filtro de servicios por categoría (tabs con flechas ← →).

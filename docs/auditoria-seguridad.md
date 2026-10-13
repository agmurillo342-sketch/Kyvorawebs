# Auditoría de seguridad de Kyvorawebs

## Alcance

Revisión estática del sitio publicado desde `main`, incluyendo `index.html`, `script.js`, `style.css`, recursos locales y el configurador de propuestas.

## APIs y secretos

- No se encontraron endpoints propios, llamadas `fetch`/XHR, SDKs de backend, claves API, tokens ni secretos en el repositorio.
- El configurador no envía datos a un servidor de Kyvora: construye un enlace `wa.me` en el navegador.
- Se corrigió la codificación del mensaje con `URLSearchParams` para evitar que datos con caracteres especiales rompan la URL.
- Siguen existiendo dependencias externas: Google Fonts, Unsplash y WhatsApp. Su disponibilidad, privacidad y cambios de terceros deben revisarse antes de una publicación definitiva.

## Riesgos pendientes

- El formulario recopila nombre, teléfono, correo y descripción del negocio, pero el sitio aún necesita una política de privacidad y consentimiento visibles antes de tratar esos datos.
- Las métricas, testimonios, precios y tiempos comerciales deben ser confirmados por Kyvora antes de publicarse.
- La auditoría estática no demuestra seguridad de la cuenta de WhatsApp, Vercel, GitHub ni de servicios externos.

## Estado

No se detectó una vulnerabilidad de servidor porque este repositorio no contiene un servidor ni una API propia. Esto no equivale a una garantía de seguridad completa: falta la verificación manual en navegador y la comprobación de configuración de las cuentas y despliegues.


# Belisse Glam

Sitio de Belén (React + Vite, CSS puro). Para verlo: `npm install` y luego `npm run dev`.

## Estructura

```
index.html            título, favicon (public/logo.jpg) y fuentes
public/logo.jpg       favicon
src/
  main.jsx            punto de entrada
  index.css           variables de la paleta, reset y estilos base
  App.css             estilos de cada sección
  App.jsx             contenido: datos editables arriba, componentes abajo
  assets/
    brand/            logo, foto del Hero y foto de la carta
    services/         portadas de los servicios (+ placeholder.svg)
    backgrounds/      fondo de la sección de servicios
    gallery/<slug>/   fotos de la galería de cada servicio
    projects/         fotos de la sección Proyectos
```

## Qué editar y dónde (arriba de `src/App.jsx`)

- **WhatsApp, Instagram y catálogo de Canva:** constantes `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `INSTAGRAM_URL`, `CATALOG_URL`.
- **Servicios:** arreglo `services` (nombre, descripción, precio, portada). Si `price` está vacío se muestra "Valor en catálogo". El `slug` enlaza con la carpeta de fotos y no se cambia.
- **Portada vs galería:** `image` es la portada y solo se ve en la tarjeta. Al hacer clic en la foto se abre `/#/galeria/<slug>` en otra pestaña con las fotos de `src/assets/gallery/<slug>/`, sin repetir la portada.
- **Fotos de la galería:** copia jpg, png o webp a `src/assets/gallery/<slug>/`. Si la carpeta solo tiene los `ejemplo-N.svg`, se muestran esos; con fotos reales, las reemplazan. Si no hay nada, aparece "Pronto subiremos las fotos".
- **Proyectos:** copia fotos reales a `src/assets/projects/`.
- **Testimonios:** arreglo `testimonials`. Vacío = la sección no se muestra.
- **Fondo de servicios:** cambia `src/assets/backgrounds/fondo-servicios.jpg` (o el import).

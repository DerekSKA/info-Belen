# Belisse Glam

Sitio de Belén (React + Vite, CSS puro). Para verlo: `npm install` y luego `npm run dev`.

## Estructura

```
index.html                 título, favicon (public/logo.jpg), meta y fuentes (Bodoni Moda + Hanken Grotesk)
public/logo.jpg            favicon
src/
  main.jsx                 punto de entrada
  App.jsx                  arma la página y las rutas de galería
  data.js                  TODO lo editable: contacto, servicios, precios, proyectos
  hooks.js                 ruta por hash, sección activa del menú, visibilidad
  index.css                tokens del sistema de diseño (color, tipo, espacio, movimiento) y reinicio
  App.css                  importa los estilos de src/styles/
  styles/                  base · nav-hero · about-services · projects-contact-footer · gallery
  components/              SiteHeader, Hero, About, Services, Projects, Contact, SiteFooter,
                           FloatingWhatsApp, GalleryPages, ui (iconos y botón)
  assets/
    brand/                 logo, foto del Hero y retrato de Belén
    services/              portadas de los servicios
    gallery/<slug>/        fotos de la galería de cada servicio
    proyectos/<Carpeta>/   fotos y videos de cada proyecto (cada carpeta es una tarjeta)
```

## Qué editar y dónde (`src/data.js`)

- **WhatsApp, Instagram y catálogo:** `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `INSTAGRAM_URL`, `CATALOG_URL`.
- **Servicios y precios:** arreglo `services`. El `slug` enlaza con la carpeta de fotos y no se cambia. `group` los ubica en Rostro, Cuerpo o Mirada (`serviceGroups`).
- **Portadas:** `cover` es el nombre del archivo en `src/assets/services/`. Si falta, se muestra el sello de la marca. Para Ondas Rusas: solo equipo, agrega `servicio-03.jpg`.
- **Fotos de un servicio:** copia jpg, png o webp a `src/assets/gallery/<slug>/`. El enlace "Ver fotos" del servicio aparece solo cuando hay fotos reales (los `ejemplo-N.svg` son marcadores).
- **Proyectos:** crea una carpeta en `src/assets/proyectos/` con sus fotos y videos. La portada es la foto que termina en `-01`. Nombres con tilde: `PROJECT_TITLES`. Orden: `PROJECT_ORDER`.
- **Carta de Belén:** texto en `src/components/About.jsx`.
- **Colores, tipografía y espacios:** tokens al inicio de `src/index.css`.

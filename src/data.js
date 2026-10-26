// =====================================================================
// DATOS EDITABLES Y HELPERS DE ASSETS
// Todo lo que Belén puede querer cambiar (contacto, servicios, precios,
// proyectos) está en este archivo. Los componentes solo lo muestran.
// =====================================================================

/* ---------- Contacto ---------- */
export const WHATSAPP_NUMBER = "56974526058"; // +56 9 7452 6058
export const PHONE_DISPLAY = "+56 9 7452 6058";
export const WHATSAPP_MESSAGE =
  "¡Hola, Belén! Conocí Belisse Glam a través de tu página web y me gustaría consultar por tus servicios.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
// Enlace de WhatsApp con el nombre del servicio ya escrito en el mensaje.
export const whatsappForService = (title) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola, Belén! Vi tu página web y me gustaría agendar una hora para el servicio "${title}". ¿Qué disponibilidad tienes?`,
  )}`;
export const INSTAGRAM_URL = "https://www.instagram.com/belisse.glam/";
export const CATALOG_URL = "https://canva.link/8njdqur15jd2cz0";
export const CURRENT_YEAR = new Date().getFullYear();

/* ---------- Navegación ---------- */
export const navLinks = [
  { id: "sobre-mi", label: "Quién soy" },
  { id: "servicios", label: "Servicios y precios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];
export const SECTION_IDS = ["inicio", ...navLinks.map((link) => link.id)];

/* ---------- Servicios y precios ----------
   "slug" enlaza con la carpeta de fotos src/assets/gallery/<slug>/: no lo cambies.
   "cover" es el nombre de la portada en src/assets/services/ (sin extensión).
   "group" agrupa los servicios en la lista (ver serviceGroups).
   prices: lista de { label, value }. results: los resultados de cada lámina. */
export const serviceGroups = [
  { id: "rostro", title: "Rostro" },
  { id: "cuerpo", title: "Cuerpo" },
  { id: "mirada", title: "Mirada" },
];

export const services = [
  {
    slug: "piel-de-seda",
    group: "rostro",
    title: "Piel de Seda",
    line: "Línea Hydra Boost",
    steps: ["Hidratación", "Nutrir", "Proteger"],
    description:
      "Hidratación profunda que transforma tu piel: suavidad que se siente, brillo que se ve y esa tersura de seda desde la primera sesión. Un cuidado completo que rellena, nutre y deja tu piel radiante, fresca y renovada.",
    results: ["Suavidad de seda", "Brillo natural", "Piel hidratada y tersa"],
    prices: [
      { label: "Valor", value: "$29.990" },
      { label: "Pack de 3", value: "$80.000" },
    ],
    duration: "",
    cover: "servicio-01",
    alt: "Piel de Seda, tratamiento de hidratación profunda",
  },
  {
    slug: "basic-glow",
    group: "rostro",
    title: "Basic Glow",
    line: "Frescura al instante",
    steps: ["Limpieza", "Exfoliación", "Frescura"],
    description:
      "Un cuidado esencial que devuelve frescura, suavidad y brillo natural. Sin productos agresivos, perfecto para mantener tu piel sana, luminosa y lista para brillar.",
    results: ["Piel limpia y fresca", "Luminosidad inmediata", "Tono uniforme"],
    prices: [{ label: "Valor", value: "$25.000" }],
    duration: "30-40 min",
    cover: "servicio-02",
    alt: "Basic Glow, limpieza facial",
  },
  {
    slug: "ondas-rusas-solo-equipo",
    group: "cuerpo",
    title: "Ondas Rusas: solo equipo",
    line: "Solo equipo",
    steps: ["Tonificar", "Reafirmar", "Activar"],
    description:
      "Reafirma, tonifica y activa tu silueta. Las ondas rusas trabajan para darte firmeza, mejorar la circulación y reducir la flacidez y celulitis, sin productos extra. Resultados visibles desde la primera sesión.",
    results: ["Firmeza visible", "Activa circulación", "Tonifica y define"],
    prices: [
      { label: "1 sesión", value: "$25.000" },
      { label: "4 sesiones", value: "$90.000" },
      { label: "8 sesiones", value: "$130.000" },
    ],
    duration: "45 min",
    cover: "servicio-03", // cuando agregues servicio-03.jpg (o .jpeg) a src/assets/services/, aparece sola
    alt: "Ondas Rusas, solo equipo",
  },
  {
    slug: "ondas-rusas-firmeza-silueta",
    group: "cuerpo",
    title: "Ondas Rusas: Firmeza & Silueta",
    line: "Firmeza & Silueta",
    steps: ["Activar", "Moldear", "Reafirmar"],
    description:
      "Tratamiento completo que combina ondas rusas + línea reductora reafirmante. Activa, moldea, reafirma y fija resultados para una silueta más definida y piel más firme. Resultados visibles desde la primera sesión.",
    results: ["Silueta más definida", "Piel firme y suave", "Resultados duraderos"],
    prices: [
      { label: "1 sesión", value: "$32.000" },
      { label: "4 sesiones", value: "$90.000" },
      { label: "8 sesiones", value: "$160.000" },
    ],
    duration: "45-60 min",
    cover: "servicio-04",
    alt: "Ondas Rusas, firmeza y silueta",
  },
  {
    slug: "lifting-de-pestanas",
    group: "mirada",
    title: "Lifting de pestañas",
    line: "Técnica clásica",
    steps: ["Curvatura", "Definición", "Nutrición"],
    description: "Realza tu mirada y descubre la belleza de los pequeños detalles.",
    results: ["Pestañas más largas y curvadas naturalmente", "Mirada más abierta y descansada"],
    prices: [
      { label: "Precio normal", value: "$20.000" },
      { label: "Precio amigas", value: "$16.000" },
    ],
    duration: "",
    cover: "servicio-05",
    alt: "Lifting de pestañas",
  },
];

/* ---------- Portadas de servicios ----------
   Acepta jpg, jpeg, png o webp. Si el archivo aún no existe, getCover devuelve
   undefined y la tarjeta muestra el sello de la marca (no se rompe nada). */
const coverFiles = import.meta.glob("./assets/services/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const coverByName = {};
Object.entries(coverFiles).forEach(([path, src]) => {
  coverByName[path.split("/").pop().replace(/\.[^.]+$/, "")] = src;
});
export const getCover = (service) => coverByName[service.cover];

/* ---------- Galerías de servicios ----------
   Copia las fotos a src/assets/gallery/<slug>/ (jpg, png, webp) y aparecen solas.
   Mientras la carpeta solo tenga los "ejemplo-N.svg", esos son marcadores de posición. */
const galleryFiles = import.meta.glob("./assets/gallery/*/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});
const galleryBySlug = {};
Object.entries(galleryFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([path, src]) => {
    const [, , , slug, file] = path.split("/");
    (galleryBySlug[slug] ||= []).push({ src, file });
  });

const realPhotos = (service) => (galleryBySlug[service.slug] || []).filter((f) => !f.file.endsWith(".svg"));
// ¿Ya hay fotos reales? Solo entonces la lista de servicios ofrece "Ver fotos".
export const hasRealGallery = (service) => realPhotos(service).length > 0;
export const getGallery = (service) => {
  const files = galleryBySlug[service.slug] || [];
  const real = realPhotos(service);
  return (real.length ? real : files).map((f) => f.src);
};

/* ---------- Proyectos (portafolio) ----------
   Cada carpeta de src/assets/proyectos/<Carpeta>/ es una tarjeta automática.
   - Portada: la foto que termina en "-01" (ej: novia-01.jpg). Si no hay, la primera foto.
   - Al abrir la tarjeta se ven todas las fotos y videos (jpg, jpeg, png, webp, mp4, webm).
   - Para agregar un proyecto nuevo basta con crear otra carpeta con sus fotos. */
const projectFiles = import.meta.glob("./assets/proyectos/*/*.{jpg,jpeg,png,webp,mp4,webm}", {
  eager: true,
  query: "?url",
  import: "default",
});

// Nombres con tilde u otro formato (clave = carpeta en minúsculas, sin tildes y con guiones).
const PROJECT_TITLES = {
  arlequin: "Arlequín",
  "body-paint": "Body paint",
  "efectos-especiales": "Efectos especiales",
  "maquillaje-artistico": "Maquillaje artístico",
  "maquillaje-audiovisual": "Maquillaje audiovisual",
  "maquillaje-envejecimiento": "Maquillaje de envejecimiento",
  novias: "Novias",
  pestanas: "Pestañas",
};

// Orden de las tarjetas (nombres de carpeta como arriba). Las que no estén aquí van al final.
const PROJECT_ORDER = [];

const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const projectsBySlug = {};
Object.entries(projectFiles)
  .sort(([a], [b]) => a.localeCompare(b, "es", { numeric: true }))
  .forEach(([path, src]) => {
    const [, , , folder, file] = path.split("/");
    const slug = slugify(folder);
    projectsBySlug[slug] ||= {
      slug,
      title: PROJECT_TITLES[slug] || folder.replace(/[-_]+/g, " "),
      media: [],
    };
    projectsBySlug[slug].media.push({
      src,
      name: file.replace(/\.[^.]+$/, ""),
      isVideo: /\.(mp4|webm)$/i.test(file),
    });
  });

export const projects = Object.values(projectsBySlug)
  .map((project) => {
    const images = project.media.filter((m) => !m.isVideo);
    const cover = images.find((m) => /-0?1$/.test(m.name)) || images[0];
    // La galería muestra todas las fotos y videos de la carpeta, con la portada primero.
    const gallery = cover ? [cover, ...project.media.filter((m) => m !== cover)] : project.media;
    const photos = gallery.filter((m) => !m.isVideo).length;
    const videos = gallery.length - photos;
    const summary = [photos > 0 && plural(photos, "foto", "fotos"), videos > 0 && plural(videos, "video", "videos")]
      .filter(Boolean)
      .join(" y ");
    return { ...project, cover: cover?.src, gallery, summary };
  })
  .sort((a, b) => {
    const ia = PROJECT_ORDER.indexOf(a.slug);
    const ib = PROJECT_ORDER.indexOf(b.slug);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    return a.title.localeCompare(b.title, "es");
  });

/* ---------- Testimonios ----------
   Solo reseñas reales y autorizadas. Hoy no se usan: no hay sección de comentarios.
   Formato si se agregan: { quote: "…", name: "Nombre", service: "Servicio" } */
export const testimonials = [];

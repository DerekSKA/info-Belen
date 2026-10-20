import { useEffect, useRef, useState } from "react";

// Marca
import heroLogo from "./assets/brand/logo.jpg"; // emblema del Hero y navbar
import heroPhoto from "./assets/brand/hero-photo.jpeg"; // foto vertical del Hero
import belenImage from "./assets/brand/belen.png"; // foto de la carta "Quién soy"

// Portadas de servicios (solo se ven en la tarjeta; no se repiten en la galería)
import servicePlaceholder from "./assets/services/placeholder.svg";
import coverLimpiezaFacial from "./assets/services/limpieza-facial.jpg";
import coverOndasRusas from "./assets/services/ondas-rusas.jpg";

// Fondo de la sección de servicios
import servicesBg from "./assets/backgrounds/fondo-servicios.jpg";

import "./index.css";
import "./App.css";

/* ---------- DATOS EDITABLES ---------- */
const WHATSAPP_NUMBER = "56974526058"; // +56 9 7452 6058
const WHATSAPP_MESSAGE =
  "¡Hola, Belén! Conocí Belisse Glam a través de tu página web y me gustaría consultar por tus servicios.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
// Enlace de WhatsApp con el nombre del servicio ya escrito en el mensaje.
const whatsappForService = (title) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola, Belén! Vi tu página web y me gustaría agendar una hora para el servicio "${title}". ¿Qué disponibilidad tienes?`,
  )}`;
const CURRENT_YEAR = new Date().getFullYear();
const INSTAGRAM_URL = "https://www.instagram.com/belisse.glam/";
const CATALOG_URL = "https://canva.link/8njdqur15jd2cz0";

// Servicios y precios (según las láminas de cada servicio).
// "slug" enlaza con la carpeta de fotos src/assets/gallery/<slug>/: no lo cambies.
// prices: lista de { label, value }. results: los 3 resultados de cada lámina.
const services = [
  {
    slug: "piel-de-seda",
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
    image: servicePlaceholder, // reemplazar por la portada real
    alt: "Piel de Seda, tratamiento de hidratación profunda",
  },
  {
    slug: "basic-glow",
    title: "Basic Glow",
    line: "Frescura al instante",
    steps: ["Limpieza", "Exfoliación", "Frescura"],
    description:
      "Un cuidado esencial que devuelve frescura, suavidad y brillo natural. Sin productos agresivos, perfecto para mantener tu piel sana, luminosa y lista para brillar.",
    results: ["Piel limpia y fresca", "Luminosidad inmediata", "Tono uniforme"],
    prices: [{ label: "Valor", value: "$25.000" }],
    duration: "30-40 min",
    image: coverLimpiezaFacial,
    alt: "Basic Glow, limpieza facial",
  },
  {
    slug: "ondas-rusas-solo-equipo",
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
    image: servicePlaceholder, // reemplazar por la portada real
    alt: "Ondas Rusas, solo equipo",
  },
  {
    slug: "ondas-rusas-firmeza-silueta",
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
    image: coverOndasRusas,
    alt: "Ondas Rusas, firmeza y silueta",
  },
  {
    slug: "lifting-de-pestanas",
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
    image: servicePlaceholder, // reemplazar por la portada real
    alt: "Lifting de pestañas",
  },
];

// Galerías: copia las fotos de cada servicio a src/assets/gallery/<slug>/ (jpg, png, webp) y aparecen solas.
// Mientras la carpeta solo tenga los "ejemplo-N.svg", se muestran esos; al agregar fotos reales, los reemplazan.
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

// La portada (service.image) solo se muestra en la tarjeta; la galería no la repite.
const getGallery = (service) => {
  const files = galleryBySlug[service.slug] || [];
  const real = files.filter((f) => !f.file.endsWith(".svg"));
  return (real.length ? real : files).map((f) => f.src);
};

// Comentarios: solo reseñas reales y autorizadas. Si queda vacío, la sección no se muestra.
// Formato: { quote: "…", name: "Nombre", service: "Servicio" }
const testimonials = [];

// Destellos que salen del sobre al abrir la carta (posición final y retraso).
const letterSparks = [
  { x: "-110px", y: "-130px", d: "0.55s", size: 14 },
  { x: "-50px", y: "-175px", d: "0.7s", size: 10 },
  { x: "10px", y: "-150px", d: "0.6s", size: 16 },
  { x: "70px", y: "-185px", d: "0.8s", size: 11 },
  { x: "125px", y: "-120px", d: "0.65s", size: 13 },
];

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Quién soy" },
  { href: "#servicios", label: "Servicios y precios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

/* ---------- COMPONENTES ---------- */
function Sparkle({ className = "", size = 20 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 1.5C13.15 7.45 16.55 10.85 22.5 12C16.55 13.15 13.15 16.55 12 22.5C10.85 16.55 7.45 13.15 1.5 12C7.45 10.85 10.85 7.45 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Arrow({ direction = "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 2C6.5 2 2 6.5 2 12.04c0 1.77.46 3.5 1.34 5.02L2 22l5.06-1.33a10 10 0 0 0 4.98 1.32h.01c5.54 0 10.04-4.5 10.04-10.04 0-2.68-1.04-5.2-2.94-7.1A9.97 9.97 0 0 0 12.04 2zm0 18.3h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3 .79.8-2.93-.2-.31a8.3 8.3 0 0 1-1.27-4.47c0-4.58 3.73-8.3 8.32-8.3 2.22 0 4.3.87 5.87 2.43a8.25 8.25 0 0 1 2.43 5.88c0 4.58-3.73 8.3-8.41 8.3z" />
    </svg>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <Sparkle size={13} />
      <span>{children}</span>
    </p>
  );
}

function Button({ children, href, variant = "dusty", className = "", external = false }) {
  return (
    <a
      className={`button button-${variant} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <Sparkle size={16} />
    </a>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <a
        className="service-media"
        href={`#/galeria/${service.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver todas las fotos de ${service.title}`}
      >
        <img src={service.image} alt={service.alt} loading="lazy" />
        <span className="service-media-hint">Ver fotos</span>
      </a>

      <h3>{service.title}</h3>
      <p className="service-line">{service.line}</p>
      <p className="service-steps">{service.steps.join("  ·  ")}</p>
      <div className="service-results">
        <span className="service-block-title">Resultados</span>
        <ul>
          {service.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>

      <dl className="service-prices">
        {service.prices.map((price) => (
          <div key={price.label}>
            <dt>{price.label}</dt>
            <dd>{price.value}</dd>
          </div>
        ))}
        {service.duration && (
          <div className="service-duration">
            <dt>Duración</dt>
            <dd>{service.duration}</dd>
          </div>
        )}
      </dl>

      <a
        className="service-link service-link-whatsapp"
        href={whatsappForService(service.title)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar por ${service.title} en WhatsApp`}
      >
        <WhatsAppIcon size={17} />
        <span>Consultar por WhatsApp</span>
      </a>
    </article>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
    >
      <WhatsAppIcon size={30} />
      <span className="whatsapp-float-label">Escríbeme</span>
    </a>
  );
}

function GalleryPage({ slug }) {
  const service = services.find((s) => s.slug === slug);
  const photos = service ? getGallery(service) : [];

  return (
    <>
      <header className="site-nav gallery-nav">
        <a className="site-brand" href={window.location.pathname}>
          <img className="site-logo" src={heroLogo} alt="" />
          Belisse Glam
        </a>
        <a className="site-cta" href={window.location.pathname}>
          Volver al inicio
        </a>
      </header>

      <main className="gallery-main section-space">
        <div className="section-heading">
          <Eyebrow>GALERÍA</Eyebrow>
          <h1 className="section-title">{service ? service.title : "Galería no encontrada"}</h1>
          {service && <p className="section-intro">{service.description}</p>}
        </div>

        <nav className="gallery-chips" aria-label="Otras galerías">
          {services.map((s) => (
            <a key={s.slug} className={s.slug === slug ? "is-current" : ""} href={`#/galeria/${s.slug}`}>
              {s.title}
            </a>
          ))}
        </nav>

        {photos.length > 0 ? (
          <div className="projects-gallery gallery-grid">
            {photos.map((src, index) => (
              <figure className="project-item" key={src}>
                <img src={src} alt={`${service.title}, foto ${index + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <Sparkle size={22} />
            <p>Pronto subiremos las fotos de este servicio. Mientras tanto, puedes ver más en Instagram.</p>
            <Button href={INSTAGRAM_URL} variant="outline" external>
              Ver Instagram
            </Button>
          </div>
        )}

        <div className="gallery-actions">
          <Button href={service ? whatsappForService(service.title) : WHATSAPP_URL} variant="dusty" external>
            Consultar por WhatsApp
          </Button>
          <Button href={window.location.pathname} variant="outline">
            Volver al inicio
          </Button>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-bottom">
          <span>© {CURRENT_YEAR} Belisse Glam</span>
          <span>Hecho con cariño <span aria-hidden="true">♡</span></span>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const portfolioRef = useRef(null);
  const [portfolioCanPrev, setPortfolioCanPrev] = useState(false);
  const [portfolioCanNext, setPortfolioCanNext] = useState(true);
  const letterRef = useRef(null);
  const [letterOpen, setLetterOpen] = useState(false);

  const toggleLetter = () => {
    const opening = !letterOpen;
    setLetterOpen(opening);
    if (opening) {
      setTimeout(() => letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 900);
    }
  };

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash);
      if (window.location.hash.startsWith("#/galeria/")) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const updatePortfolioArrows = () => {
    const el = portfolioRef.current;
    if (!el) return;
    setPortfolioCanPrev(el.scrollLeft > 8);
    setPortfolioCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const onResize = () => {
      updateArrows();
      updatePortfolioArrows();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollPortfolio = (direction) => {
    const el = portfolioRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const scrollServices = (direction) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };
  const currentTestimonial = testimonials[testimonialIndex];

  const changeTestimonial = (direction) =>
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  const closeMenu = () => setMenuOpen(false);

  if (route.startsWith("#/galeria/")) {
    return <GalleryPage slug={route.replace("#/galeria/", "")} />;
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="site-nav">
        <a className="site-brand" href="#inicio" onClick={closeMenu}>
          <img className="site-logo" src={heroLogo} alt="" />
          Belisse Glam
        </a>

        <nav className={`site-links ${menuOpen ? "site-links-open" : ""}`} aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="site-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Escríbeme
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="inicio">
          <div className={`hero-card ${heroPhoto ? "hero-card-photo" : ""}`}>
            <div className="hero-copy">
            <img className="hero-emblem" src={heroLogo} alt="Logo de Belisse Glam" />
            <p className="hero-badge">BEAUTY · SKINCARE · SELF LOVE</p>

            <h1>
              La belleza de
              <br />
              <span className="script-word">sentirte tú.</span>
            </h1>

            <p className="hero-text">
              Un espacio para cuidarte con calma, celebrar tu esencia y convertir los pequeños detalles en momentos
              especiales.
            </p>

            <div className="hero-actions">
              <Button href="#servicios" variant="dusty">
                Ver servicios y precios
              </Button>
              <Button href={WHATSAPP_URL} variant="outline" external>
                Contactar por WhatsApp
              </Button>
            </div>
            </div>

            {heroPhoto && (
              <figure className="hero-photo">
                <Sparkle className="hero-sparkle hero-sparkle-top" size={26} />
                <Sparkle className="hero-sparkle hero-sparkle-bottom" size={20} />
                <img src={heroPhoto} alt="Belén, cosmetóloga y maquilladora" />
              </figure>
            )}
          </div>
        </section>

        {/* QUIÉN SOY (carta en un sobre) */}
        <section className="mail-section section-space" id="sobre-mi">
          <div className="section-heading">
            <Eyebrow>QUIÉN SOY</Eyebrow>
            <h2 className="section-title">
              Una carta <span className="script-word">para ti.</span>
            </h2>
            <p className="section-intro">Ábrela para conocerme un poquito.</p>
          </div>

          <div className={`mail ${letterOpen ? "is-open" : ""}`}>
            <div className="mail-letter-wrap" id="carta-belen" ref={letterRef} aria-hidden={!letterOpen}>
              <div className="mail-letter-clip">
                <article className="mail-letter">
                  <div className="mail-scroll" tabIndex={letterOpen ? 0 : -1} aria-label="Carta de Belén">
                    <div className="mail-head">
                      <img className="mail-photo" src={belenImage} alt="Retrato de Belén" loading="lazy" />
                      <h3 className="mail-title">
                        Hola, soy <span className="script-word">Belén.</span>
                      </h3>
                    </div>
                    <p className="mail-lead">
                      Bienvenidas a Belisse.glam, un lugar donde la creatividad, la técnica y la pasión se unen para dar
                      vida a distintas formas de expresión a través de la belleza.
                    </p>
                    <p>
                      Soy cosmetóloga y maquilladora, y he creado este espacio con el propósito de compartir mi trabajo
                      ofreciendo experiencias que combinan el cuidado de la piel con el arte del maquillaje.
                    </p>
                    <p>
                      Aquí encontrarás tratamientos faciales enfocados en el bienestar y las necesidades de cada piel,
                      cuidados que buscan devolverle luminosidad, hidratación y vitalidad, además de servicios de
                      pestañas que realzan la mirada y complementan la belleza de cada persona.
                    </p>
                    <p>
                      Pero la belleza también es arte, transformación y libertad creativa. Por eso, este espacio abarca
                      desde maquillajes sociales, elegantes y delicados, ideales para acompañarte en momentos
                      especiales, hasta propuestas artísticas, caracterizaciones y maquillajes de fantasía que exploran
                      el lado más creativo, intenso e incluso aterrador de este oficio.
                    </p>
                    <p>
                      Cada servicio representa una oportunidad para crear, experimentar y cuidar cada detalle,
                      entendiendo que detrás de cada piel, cada mirada y cada maquillaje existe una historia diferente.
                    </p>
                    <p>
                      Mi objetivo es seguir creciendo, perfeccionando mis técnicas y entregando un trabajo realizado con
                      dedicación, responsabilidad y amor por lo que hago.
                    </p>
                    <p>
                      Gracias por ser parte de este espacio, por acompañarme en este camino y por permitirme compartir
                      con ustedes cada proceso, cada creación y cada nuevo desafío.
                    </p>
                    <a className="text-link" href="#contacto" tabIndex={letterOpen ? 0 : -1}>
                      Conversemos <Arrow />
                    </a>
                  </div>
                </article>
              </div>
            </div>

            <div className="envelope" aria-hidden="true" onClick={toggleLetter}>
              <span className="envelope-back" />
              <span className="envelope-flap" />
              <span className="envelope-front" />
              <span className="envelope-label">Para ti</span>
              <span className="envelope-seal">
                <Sparkle size={18} />
              </span>
              <div className="mail-burst">
                {letterSparks.map((spark) => (
                  <span key={spark.x} style={{ "--x": spark.x, "--y": spark.y, "--d": spark.d }}>
                    <Sparkle size={spark.size} />
                  </span>
                ))}
              </div>
            </div>

            <button
              className="button button-dusty mail-button"
              type="button"
              aria-expanded={letterOpen}
              aria-controls="carta-belen"
              onClick={toggleLetter}
            >
              <span>{letterOpen ? "Cerrar carta" : "Abrir carta"}</span>
              <Sparkle size={16} />
            </button>
          </div>
        </section>

        {/* SERVICIOS Y PRECIOS */}
        <section
          className="services section-space"
          id="servicios"
          style={{ backgroundImage: `url(${servicesBg})` }}
        >
          <div className="section-heading">
            <Eyebrow>SERVICIOS Y PRECIOS</Eyebrow>
            <h2 className="section-title">
              Un espacio para <span className="script-word">ti.</span>
            </h2>
            <p className="section-intro">
              Desliza para conocer todos los servicios, con sus resultados y valores. Cuando elijas el tuyo, agenda directo por WhatsApp.
            </p>
            <div className="service-stamp">
              <span>BEAUTY</span>
              <Sparkle size={18} />
              <span>WITH LOVE</span>
            </div>
          </div>

          <div className="services-carousel">
            {canPrev && (
              <button className="services-arrow services-arrow-prev" type="button" aria-label="Ver servicios anteriores" onClick={() => scrollServices(-1)}>
                <Arrow direction="left" />
              </button>
            )}

            <div className="services-track" ref={trackRef} onScroll={updateArrows}>
              {services.map((service) => (
                <ServiceCard service={service} key={service.slug} />
              ))}
            </div>

            {canNext && (
              <button className="services-arrow services-arrow-next" type="button" aria-label="Ver más servicios" onClick={() => scrollServices(1)}>
                <Arrow />
              </button>
            )}
          </div>

          <div className="services-bottom">
            <p>¿Tienes dudas o no sabes cuál elegir? Escríbeme y te ayudo.</p>
            <Button href={WHATSAPP_URL} variant="dusty" external>
              Agenda conmigo
            </Button>
            <Button href={CATALOG_URL} variant="outline" external>
              Ver catálogo completo
            </Button>
          </div>
        </section>

        {/* PROYECTOS: mismas tarjetas que los servicios; la foto abre la galería en otra pestaña */}
        <section className="projects portfolio section-space" id="proyectos">
          <div className="section-heading">
            <Eyebrow>PROYECTOS</Eyebrow>
            <h2 className="section-title">
              Trabajos que <span className="script-word">hablan.</span>
            </h2>
            <p className="section-intro">Toca una tarjeta para ver las fotos de cada servicio.</p>
          </div>

          <div className="services-carousel">
            {portfolioCanPrev && (
              <button className="services-arrow services-arrow-prev" type="button" aria-label="Ver trabajos anteriores" onClick={() => scrollPortfolio(-1)}>
                <Arrow direction="left" />
              </button>
            )}

            <div className="services-track" ref={portfolioRef} onScroll={updatePortfolioArrows}>
              {services.map((service) => (
                <article className="service-card portfolio-card" key={service.slug}>
                  <a
                    className="service-media"
                    href={`#/galeria/${service.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver todas las fotos de ${service.title}`}
                  >
                    <img src={service.image} alt={service.alt} loading="lazy" />
                    <span className="service-media-hint">Ver fotos</span>
                  </a>
                  <h3>{service.title}</h3>
                  <p className="service-line">{service.line}</p>
                  <a
                    className="service-link service-link-outline"
                    href={`#/galeria/${service.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VER FOTOS <Arrow />
                  </a>
                </article>
              ))}
            </div>

            {portfolioCanNext && (
              <button className="services-arrow services-arrow-next" type="button" aria-label="Ver más trabajos" onClick={() => scrollPortfolio(1)}>
                <Arrow />
              </button>
            )}
          </div>

          <div className="services-bottom">
            <p>Mira más trabajos recientes en mi Instagram.</p>
            <Button href={INSTAGRAM_URL} variant="outline" external>
              Ver Instagram
            </Button>
          </div>
        </section>

        {/* COMENTARIOS (solo si hay reseñas reales) */}
        {testimonials.length > 0 && (
          <section className="testimonials section-space" id="testimonios">
            <Eyebrow light>PALABRAS QUE ABRAZAN</Eyebrow>
            <h2 className="testimonial-heading">
              Historias que <span className="script-word">inspiran.</span>
            </h2>

            <div className="testimonial-carousel">
              <button className="testimonial-arrow" type="button" aria-label="Ver testimonio anterior" onClick={() => changeTestimonial(-1)}>
                <Arrow direction="left" />
              </button>

              <div className="testimonial-content" aria-live="polite">
                <span className="quote-mark">“</span>
                <blockquote key={testimonialIndex}>{currentTestimonial.quote}</blockquote>
                <p className="testimonial-name">{currentTestimonial.name}</p>
                <p className="testimonial-service">{currentTestimonial.service}</p>
              </div>

              <button className="testimonial-arrow" type="button" aria-label="Ver siguiente testimonio" onClick={() => changeTestimonial(1)}>
                <Arrow />
              </button>
            </div>
          </section>
        )}

        {/* CONTACTO */}
        <section className="contact section-space" id="contacto">
          <div className="contact-layout">
            <div className="contact-copy">
              <Eyebrow>EL PRIMER PASO ES TUYO</Eyebrow>
              <h2 className="section-title">
                Regálate algo <span className="script-word">bonito.</span>
              </h2>
              <p className="body-copy">
                ¿Quieres saber más sobre los servicios o reservar una hora? Escríbeme y conversemos para encontrar lo
                ideal para ti.
              </p>

              <div className="contact-actions">
                <Button href={WHATSAPP_URL} variant="dusty" external>
                  Hablemos por WhatsApp
                </Button>
                <Button href={INSTAGRAM_URL} variant="outline" external>
                  Ver Instagram
                </Button>
              </div>

              <p className="contact-note">
                <Sparkle size={15} />
                +56 9 7452 6058
              </p>
            </div>

            <div className="contact-visual">
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1000&q=85"
                alt="Ambiente relajante inspirado en un ritual de bienestar"
                loading="lazy"
              />
              <div className="contact-image-caption">
                <span className="script-word">slow beauty</span>
                <span>HAZ UNA PAUSA</span>
              </div>
              <Sparkle className="contact-sparkle" size={26} />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-script">Belisse Glam</span>
          </a>
          <p className="footer-message">La belleza de cuidarte, un momento a la vez.</p>
          <nav className="footer-links" aria-label="Navegación del pie de página">
            <a href="#sobre-mi">Quién soy</a>
            <a href="#servicios">Servicios y precios</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#contacto">Contacto</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {CURRENT_YEAR} Belisse Glam</span>
          <span>Hecho con cariño <span aria-hidden="true">♡</span></span>
        </div>
      </footer>
      <FloatingWhatsApp />
    </>
  );
}

export default App;
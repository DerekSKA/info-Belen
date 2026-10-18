import { useEffect, useRef, useState } from "react";
import belenImage from "./assets/belen.png";
import heroLogo from "./assets/hero.jpg";
import ondarusa from "./assets/Ondas-rusas.png";
import facial from "./assets/Limpieza-facial.png";
// Fondo de la sección de servicios: reemplaza este archivo (o cambia el import) por la imagen que elija Belén.
import servicesBg from "./assets/services-bg-placeholder.svg";
import servicePlaceholder from "./assets/service-placeholder.svg";
import "./index.css";
import "./App.css";

/* ---------- DATOS EDITABLES ---------- */
const WHATSAPP_NUMBER = "56974526058"; // +56 9 7452 6058
const WHATSAPP_MESSAGE =
  "¡Hola, Belén! Conocí Belisse Glam a través de tu página web y me gustaría consultar por tus servicios.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const INSTAGRAM_URL = "https://www.instagram.com/belisse.glam/";
const CATALOG_URL = "https://canva.link/8njdqur15jd2cz0";

// Catálogo: agrega aquí el precio real de cada servicio (ej: price: "$25.000").
// Si price está vacío, se muestra "Valor en catálogo".
const services = [
  {
    title: "Lifting de pestañas",
    description: "Realza tu mirada y descubre la belleza de los pequeños detalles.",
    price: "",
    image: servicePlaceholder, // reemplazar por la foto real
    alt: "Lifting de pestañas",
  },
  {
    title: "Limpieza facial",
    description: "Un ritual de cuidado para consentir tu piel y regalarte una pausa.",
    price: "",
    image: facial,
    alt: "Tratamiento facial y cuidado de la piel",
  },
  {
    title: "Ondas rusas",
    description: "Detalles delicados que acompañan tu estilo y resaltan tu esencia.",
    price: "",
    image: ondarusa,
    alt: "Servicio de ondas rusas",
  },
  // SERVICIOS DE EJEMPLO: reemplaza nombre, descripción, precio e imagen por los reales.
  { title: "Nuevo servicio 04", description: "Texto de ejemplo: describe aquí el servicio.", price: "", image: servicePlaceholder, alt: "Nuevo servicio" },
  { title: "Nuevo servicio 05", description: "Texto de ejemplo: describe aquí el servicio.", price: "", image: servicePlaceholder, alt: "Nuevo servicio" },
  { title: "Nuevo servicio 06", description: "Texto de ejemplo: describe aquí el servicio.", price: "", image: servicePlaceholder, alt: "Nuevo servicio" },
];

// Proyectos: basta con copiar fotos reales a src/assets/projects/ (jpg, png, webp).
const projectFiles = import.meta.glob("./assets/projects/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const projects = Object.entries(projectFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({ src, alt: `Trabajo de Belisse Glam ${index + 1}`, key: path }));

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
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
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scrollServices = (direction) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };
  const currentTestimonial = testimonials[testimonialIndex];

  const changeTestimonial = (direction) =>
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  const closeMenu = () => setMenuOpen(false);

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
          <div className="hero-card">
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
              Desliza para conocer todos los servicios. Consulta los valores en el catálogo o escríbeme por WhatsApp.
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
                <article className="service-card" key={service.title}>
                  <div className="service-media">
                    <img src={service.image} alt={service.alt} loading="lazy" />
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-desc">{service.description}</p>
                  <span className="service-price">{service.price || "Valor en catálogo"}</span>
                  <a className="service-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    CONSULTAR <Arrow />
                  </a>
                </article>
              ))}
            </div>

            {canNext && (
              <button className="services-arrow services-arrow-next" type="button" aria-label="Ver más servicios" onClick={() => scrollServices(1)}>
                <Arrow />
              </button>
            )}
          </div>

          <div className="services-bottom">
            <p>Revisa el catálogo completo con todos los servicios y valores.</p>
            <Button href={CATALOG_URL} variant="dusty" external>
              Ver catálogo de precios
            </Button>
          </div>
        </section>

        {/* PROYECTOS */}
        <section className="projects section-space" id="proyectos">
          <div className="section-heading">
            <Eyebrow>PROYECTOS</Eyebrow>
            <h2 className="section-title">
              Trabajos que <span className="script-word">hablan.</span>
            </h2>
            <p className="section-intro">Una selección de mis trabajos realizados.</p>
          </div>

          {projects.length > 0 ? (
            <div className="projects-gallery">
              {projects.map((project) => (
                <figure className="project-item" key={project.key}>
                  <img src={project.src} alt={project.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          ) : (
            <div className="projects-empty">
              <Sparkle size={22} />
              <p>Estoy preparando esta galería. Mientras tanto, puedes ver mis trabajos más recientes en Instagram.</p>
              <Button href={INSTAGRAM_URL} variant="outline" external>
                Ver Instagram
              </Button>
            </div>
          )}
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
          <span>© {new Date().getFullYear()} Belisse Glam</span>
          <span>Hecho con cariño <span aria-hidden="true">♡</span></span>
        </div>
      </footer>
    </>
  );
}

export default App;
import { useState } from "react";
import belenImage from "./assets/belen.png";
import "./index.css";
import "./App.css";

/* ---------- DATOS EDITABLES ---------- */
const WHATSAPP_NUMBER = "56974526058"; // +56 9 7452 6058
const WHATSAPP_MESSAGE =
  "¡Hola, Belén! 😊 Conocí Belisse Glam a través de tu página web y me gustaría consultar por tus servicios.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const INSTAGRAM_URL = "https://www.instagram.com/belisse.glam/";
const CATALOG_URL = "https://canva.link/8njdqur15jd2cz0";

// Catálogo: agrega aquí el precio real de cada servicio (ej: price: "$25.000").
// Si price está vacío, se muestra "Valor en catálogo".
const services = [
  {
    number: "01",
    title: "Lifting de pestañas",
    description: "Realza tu mirada y descubre la belleza de los pequeños detalles.",
    price: "",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=85",
    alt: "Inspiración de belleza y cuidado de pestañas",
  },
  {
    number: "02",
    title: "Limpieza facial",
    description: "Un ritual de cuidado para consentir tu piel y regalarte una pausa.",
    price: "",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
    alt: "Tratamiento facial y cuidado de la piel",
  },
  {
    number: "03",
    title: "Maquillaje",
    description: "Detalles delicados que acompañan tu estilo y resaltan tu esencia.",
    price: "",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85",
    alt: "Cosméticos y maquillaje en tonos suaves",
  },
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
  const currentTestimonial = testimonials[testimonialIndex];

  const changeTestimonial = (direction) =>
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <main>
        {/* NAVBAR + HERO */}
        <section className="hero" id="inicio">
          <div className="hero-glow" aria-hidden="true">
            <span className="glow glow-outer" />
            <span className="glow glow-mid" />
            <span className="glow glow-core" />
          </div>

          <header className="site-nav">
            <a className="site-brand" href="#inicio" onClick={closeMenu}>
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

          <div className="hero-content">
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
              <Button href="#servicios" variant="glass">
                Ver servicios y precios
              </Button>
              <Button href={WHATSAPP_URL} variant="ghost" external>
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* QUIÉN SOY */}
        <section className="about section-space" id="sobre-mi">
          <div className="about-layout">
            <div className="about-visual">
              <div className="about-image-frame">
                <img src={belenImage} alt="Retrato de Belén" loading="lazy" />
              </div>
              <Sparkle className="about-sparkle about-sparkle-top" size={27} />
              <Sparkle className="about-sparkle about-sparkle-bottom" size={19} />
              <div className="about-stamp">
                <span className="about-stamp-script">con cariño</span>
                <Sparkle size={17} />
                <span>EN CADA DETALLE</span>
              </div>
            </div>

            <div className="about-copy">
              <Eyebrow>UN POQUITO SOBRE MÍ</Eyebrow>
              <h2 className="section-title">
                Hola, soy <span className="script-word">Belén.</span>
              </h2>
              <p className="about-lead">Creo que cuidarte también es una forma de quererte.</p>
              <p className="body-copy">
                Soy Belén, y este espacio nace de mi interés por la estética, el cuidado personal y los pequeños
                detalles que nos hacen sentir bien.
              </p>
              <p className="body-copy">
                Quiero que cada experiencia sea cercana y personalizada, un lugar donde puedas sentirte cómoda,
                escuchada y acompañada mientras te regalas un momento para ti.
              </p>
              <div className="about-mini">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=85"
                  alt="Productos de cuidado facial en tonos naturales"
                  loading="lazy"
                />
                <div>
                  <span className="about-mini-script">Tu momento.</span>
                  <p>Tu pausa, tu cuidado, tu esencia.</p>
                </div>
              </div>
              <a className="text-link" href="#contacto">
                Conversemos <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* SERVICIOS Y PRECIOS */}
        <section className="services section-space" id="servicios">
          <div className="section-heading">
            <Eyebrow>SERVICIOS Y PRECIOS</Eyebrow>
            <h2 className="section-title">
              Un espacio para <span className="script-word">ti.</span>
            </h2>
            <p className="section-intro">
              Servicios pensados para acompañarte, cuidarte y resaltar tu belleza natural. Consulta los valores en el
              catálogo o escríbeme por WhatsApp.
            </p>
            <div className="service-stamp">
              <span>BEAUTY</span>
              <Sparkle size={18} />
              <span>WITH LOVE</span>
            </div>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <img src={service.image} alt={service.alt} loading="lazy" />
                <div className="service-overlay" />
                <span className="service-number">{service.number}</span>
                <Sparkle className="service-card-sparkle" size={21} />

                <div className="service-card-content">
                  <span className="service-price">{service.price || "Valor en catálogo"}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a className="service-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    CONSULTAR POR WHATSAPP <Arrow />
                  </a>
                </div>
              </article>
            ))}
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
import { useState } from "react";
import heroImage from "./assets/hero.jpg";
import belenImage from "./assets/belen.png";
import "./index.css";
import "./App.css";

const services = [
  {
    number: "01",
    title: "Lifting de pestañas",
    description:
      "Realza tu mirada y descubre la belleza de los pequeños detalles.",
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=85",
    alt: "Inspiración de belleza y cuidado de pestañas",
  },
  {
    number: "02",
    title: "Limpieza facial",
    description:
      "Un ritual de cuidado para consentir tu piel y regalarte una pausa.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
    alt: "Tratamiento facial y cuidado de la piel",
  },
  {
    number: "03",
    title: "Maquillaje",
    description:
      "Detalles delicados que acompañan tu estilo y resaltan tu esencia.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85",
    alt: "Cosméticos y maquillaje en tonos cálidos",
  },
];

const packages = [
  {
    name: "Pack Esencial",
    subtitle: "Una pausa para ti",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85",
    benefits: [
      "Orientación personalizada",
      "Servicio de belleza seleccionado",
      "Atención cercana y dedicada",
    ],
    price: "Consultar valor",
    featured: false,
  },
  {
    name: "Pack Ritual",
    subtitle: "Una experiencia completa",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
    benefits: [
      "Evaluación personalizada",
      "Limpieza facial o servicio acordado",
      "Recomendaciones de cuidado",
      "Un momento dedicado a ti",
    ],
    price: "Consultar valor",
    featured: true,
  },
];

const testimonials = [
  {
    quote:
      "Me encantó la dedicación y la atención en cada detalle. Fue un momento para desconectarme y dedicarme tiempo a mí.",
    name: "Nombre de clienta",
    service: "Experiencia de belleza",
  },
  {
    quote:
      "Una experiencia muy bonita. Me sentí cómoda, escuchada y acompañada durante todo el servicio.",
    name: "Nombre de clienta",
    service: "Cuidado personal",
  },
  {
    quote:
      "Se nota el cariño con el que trabaja. Me encantó poder regalarme un momento de cuidado y tranquilidad.",
    name: "Nombre de clienta",
    service: "Ritual de skincare",
  },
];

function Sparkle({ className = "", size = 20 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 1.5C13.15 7.45 16.55 10.85 22.5 12C16.55 13.15 13.15 16.55 12 22.5C10.85 16.55 7.45 13.15 1.5 12C7.45 10.85 10.85 7.45 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Arrow({ direction = "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path
          d="M19 12H5M12 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12h14m-7-7 7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
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

function Button({
  children,
  href,
  variant = "dusty",
  className = "",
}) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      <span>{children}</span>
      <Sparkle size={16} />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const currentTestimonial = testimonials[testimonialIndex];

  const changeTestimonial = (direction) => {
    setTestimonialIndex(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <main>
        {/* HERO */}
        <section
          className="hero"
          id="inicio"
          style={{ "--hero-image": `url("${heroImage}")` }}
        >
          <div className="hero-overlay" />

          <header className="navbar">
            <a className="brand" href="#inicio" onClick={closeMenu}>
              <span className="brand-script">Belén</span>
              <span className="brand-caption">BEAUTY STUDIO</span>
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

            <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
              <a href="#inicio" onClick={closeMenu}>
                Inicio
              </a>
              <a href="#sobre-mi" onClick={closeMenu}>
                Sobre mí
              </a>
              <a href="#servicios" onClick={closeMenu}>
                Servicios
              </a>
              <a href="#paquetes" onClick={closeMenu}>
                Paquetes
              </a>
              <a href="#contacto" onClick={closeMenu}>
                Contacto
              </a>
            </nav>

            <a className="navbar-contact" href="#contacto">
              Hablemos <Arrow />
            </a>
          </header>

          <div className="hero-content">
            <Eyebrow light>BEAUTY · SKINCARE · SELF LOVE</Eyebrow>

            <h1>
              La belleza de
              <br />
              <span className="script-word">sentirte tú.</span>
            </h1>

            <p>
              Un espacio para cuidarte con calma, celebrar tu esencia y
              convertir los pequeños detalles en momentos especiales.
            </p>

            <Button href="#servicios" variant="glass">
              Descubre mis servicios
            </Button>
          </div>

          <div className="hero-side-detail" aria-hidden="true">
            <Sparkle size={25} />
            <span>UN RITUAL PARA TI</span>
          </div>

          <div className="hero-bottom">
            <span>BEAUTY RITUALS</span>
            <span className="hero-bottom-center">Belleza consciente</span>
            <span>MADE WITH LOVE ♡</span>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section className="about section-space" id="sobre-mi">
          <div className="about-layout">
            <div className="about-visual">
              <div className="about-image-frame">
                <img
                  src= {belenImage}
                  alt="Retrato de inspiración para la sección sobre Belén"
                  loading="lazy"
                />
              </div>

              <Sparkle className="about-sparkle about-sparkle-top" size={27} />
              <Sparkle
                className="about-sparkle about-sparkle-bottom"
                size={19}
              />

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

              <p className="about-lead">
                Creo que cuidarte también es una forma de quererte.
              </p>

              <p className="body-copy">
                Soy Belén, y este espacio nace de mi interés por la estética,
                el cuidado personal y los pequeños detalles que nos hacen
                sentir bien.
              </p>

              <p className="body-copy">
                Quiero que cada experiencia sea cercana y personalizada, un
                lugar donde puedas sentirte cómoda, escuchada y acompañada
                mientras te regalas un momento para ti.
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

        {/* SERVICIOS */}
        <section className="services section-space" id="servicios">
          <div className="section-heading">
            <Eyebrow>PEQUEÑOS RITUALES, GRANDES MOMENTOS</Eyebrow>

            <h2 className="section-title">
              Un espacio para <span className="script-word">ti.</span>
            </h2>

            <p className="section-intro">
              Servicios pensados para acompañarte, cuidarte y resaltar tu
              belleza natural.
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
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                />

                <div className="service-overlay" />

                <span className="service-number">{service.number}</span>
                <Sparkle className="service-card-sparkle" size={21} />

                <div className="service-card-content">
                  <span className="service-kicker">TU RITUAL DE BELLEZA</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <a className="service-link" href="#paquetes">
                    DESCUBRIR MÁS <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="services-bottom">
            <p>Tu próximo momento favorito comienza aquí.</p>
            <Button href="#contacto" variant="dusty">
              Encuentra tu ritual
            </Button>
          </div>
        </section>

        {/* PAQUETES */}
        <section className="packages section-space" id="paquetes">
          <div className="packages-inner">
            <div className="section-heading">
              <Eyebrow>ELIGE TU EXPERIENCIA</Eyebrow>

              <h2 className="section-title">
                Un regalo para <span className="script-word">ti misma.</span>
              </h2>

              <p className="section-intro">
                Encuentra una experiencia pensada para tus necesidades y tu
                forma de cuidarte.
              </p>
            </div>

            <div className="package-grid">
              {packages.map((pack) => (
                <article
                  className={`package-card ${
                    pack.featured ? "package-featured" : ""
                  }`}
                  key={pack.name}
                >
                  <div className="package-image">
                    <img
                      src={pack.image}
                      alt={pack.subtitle}
                      loading="lazy"
                    />

                    <Sparkle
                      className="package-image-sparkle"
                      size={23}
                    />

                    {pack.featured && (
                      <span className="package-badge">EXPERIENCIA ESPECIAL</span>
                    )}
                  </div>

                  <div className="package-content">
                    <span className="package-kicker">BEAUTY EXPERIENCE</span>
                    <h3>{pack.name}</h3>
                    <p className="package-subtitle">{pack.subtitle}</p>

                    <div className="package-divider" />

                    <ul className="benefit-list">
                      {pack.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>

                    <div className="package-price">
                      <span>VALOR DEL PACK</span>
                      <strong>{pack.price}</strong>
                    </div>

                    <Button
                      href="#contacto"
                      variant={pack.featured ? "espresso" : "package-outline"}
                      className="package-button"
                    >
                      Consultar paquete
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <p className="package-note">
              Los servicios, valores y disponibilidad se confirman al momento
              de agendar.
            </p>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="testimonials section-space" id="testimonios">
          <div className="testimonial-decoration testimonial-decoration-left">
            <Sparkle size={25} />
          </div>

          <Eyebrow light>PALABRAS QUE ABRAZAN</Eyebrow>

          <h2 className="testimonial-heading">
            Historias que <span className="script-word">inspiran.</span>
          </h2>

          <div className="testimonial-carousel">
            <button
              className="testimonial-arrow"
              type="button"
              aria-label="Ver testimonio anterior"
              onClick={() => changeTestimonial(-1)}
            >
              <Arrow direction="left" />
            </button>

            <div className="testimonial-content" aria-live="polite">
              <span className="quote-mark">“</span>

              <blockquote key={testimonialIndex}>
                {currentTestimonial.quote}
              </blockquote>

              <div className="testimonial-stars" aria-label="Detalle decorativo">
                <Sparkle size={15} />
                <Sparkle size={19} />
                <Sparkle size={15} />
              </div>

              <p className="testimonial-name">{currentTestimonial.name}</p>
              <p className="testimonial-service">
                {currentTestimonial.service}
              </p>
            </div>

            <button
              className="testimonial-arrow"
              type="button"
              aria-label="Ver siguiente testimonio"
              onClick={() => changeTestimonial(1)}
            >
              <Arrow />
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((testimonial, index) => (
              <button
                key={`${testimonial.service}-${index}`}
                className={`testimonial-dot ${
                  index === testimonialIndex ? "active" : ""
                }`}
                type="button"
                aria-label={`Ver testimonio ${index + 1}`}
                aria-current={
                  index === testimonialIndex ? "true" : undefined
                }
                onClick={() => setTestimonialIndex(index)}
              />
            ))}
          </div>

          <div className="testimonial-decoration testimonial-decoration-right">
            <Sparkle size={21} />
          </div>
        </section>

        {/* CONTACTO */}
        <section className="contact section-space" id="contacto">
          <div className="contact-layout">
            <div className="contact-copy">
              <Eyebrow>EL PRIMER PASO ES TUYO</Eyebrow>

              <h2 className="section-title">
                Regálate algo <span className="script-word">bonito.</span>
              </h2>

              <p className="body-copy">
                ¿Quieres saber más sobre los servicios o reservar una
                experiencia? Escríbeme y conversemos para encontrar lo ideal
                para ti.
              </p>

              <Button href="https://wa.me/569XXXXXXXX" variant="espresso">
                Hablemos por WhatsApp
              </Button>

              <p className="contact-note">
                <Sparkle size={15} />
                Atención cercana, pensada para ti.
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

              <Sparkle
                className="contact-sparkle"
                size={26}
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-script">Belén</span>
            <span className="brand-caption">BEAUTY STUDIO</span>
          </a>

          <p className="footer-message">
            La belleza de cuidarte, un momento a la vez.
          </p>

          <nav className="footer-links" aria-label="Navegación del pie de página">
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#servicios">Servicios</a>
            <a href="#paquetes">Paquetes</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Belén Beauty Studio</span>
          <span>Hecho con cariño <span aria-hidden="true">♡</span></span>
        </div>
      </footer>
    </>
  );
}

export default App;
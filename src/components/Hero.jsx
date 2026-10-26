import { BrandSeal, Button, WhatsAppIcon } from "./ui.jsx";
import heroPhoto from "../assets/brand/hero-photo.jpeg";
import { WHATSAPP_URL } from "../data.js";

// Lo que se ofrece, tomado de los servicios y proyectos reales de la página.
const offer = [
  { href: "#servicios", title: "Cuidado de la piel", text: "Tratamientos faciales y corporales: Piel de Seda, Basic Glow y Ondas Rusas." },
  { href: "#servicios", title: "Pestañas", text: "Lifting para realzar la mirada con un acabado natural." },
  { href: "#proyectos", title: "Maquillaje", text: "Social, artístico, de fantasía y efectos especiales." },
];

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__grid container">
        <div className="hero__copy">
          <p className="hero__kicker" data-rise>
            Cosmetología y maquillaje con Belén
          </p>
          <h1 className="hero__title" id="hero-title" data-rise>
            La belleza de sentirte tú.
          </h1>
          <p className="hero__text" data-rise>
            Un espacio para cuidarte con calma, celebrar tu esencia y convertir los pequeños detalles en momentos
            especiales.
          </p>
          <div className="hero__actions" data-rise>
            <Button href="#servicios" variant="solid">
              Ver servicios y precios
            </Button>
            <Button href={WHATSAPP_URL} variant="line" external icon={<WhatsAppIcon size={18} />}>
              Escribir por WhatsApp
            </Button>
          </div>
        </div>

        <figure className="hero__figure" data-rise>
          <img
            className="hero__photo"
            src={heroPhoto}
            alt="Belén, cosmetóloga y maquilladora, en su estudio"
            width="768"
            height="1365"
            fetchPriority="high"
          />
          <BrandSeal className="hero__seal" />
        </figure>
      </div>

      <nav className="hero__offer container" aria-label="Qué encontrarás aquí">
        <ul>
          {offer.map((item) => (
            <li key={item.title}>
              <a href={item.href}>
                <span className="hero__offer-title">{item.title}</span>
                <span className="hero__offer-text">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

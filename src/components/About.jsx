import { useState } from "react";
import belenImage from "../assets/brand/belen.png";

// Texto original de la carta de Belén. Los dos primeros párrafos se ven siempre; el resto se despliega.
const intro = [
  "Bienvenidas a Belisse.glam, un lugar donde la creatividad, la técnica y la pasión se unen para dar vida a distintas formas de expresión a través de la belleza.",
  "Soy cosmetóloga y maquilladora, y he creado este espacio con el propósito de compartir mi trabajo ofreciendo experiencias que combinan el cuidado de la piel con el arte del maquillaje.",
];
const rest = [
  "Aquí encontrarás tratamientos faciales enfocados en el bienestar y las necesidades de cada piel, cuidados que buscan devolverle luminosidad, hidratación y vitalidad, además de servicios de pestañas que realzan la mirada y complementan la belleza de cada persona.",
  "Pero la belleza también es arte, transformación y libertad creativa. Por eso, este espacio abarca desde maquillajes sociales, elegantes y delicados, ideales para acompañarte en momentos especiales, hasta propuestas artísticas, caracterizaciones y maquillajes de fantasía que exploran el lado más creativo, intenso e incluso aterrador de este oficio.",
  "Cada servicio representa una oportunidad para crear, experimentar y cuidar cada detalle, entendiendo que detrás de cada piel, cada mirada y cada maquillaje existe una historia diferente.",
  "Mi objetivo es seguir creciendo, perfeccionando mis técnicas y entregando un trabajo realizado con dedicación, responsabilidad y amor por lo que hago.",
  "Gracias por ser parte de este espacio, por acompañarme en este camino y por permitirme compartir con ustedes cada proceso, cada creación y cada nuevo desafío.",
];

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section className="about" id="sobre-mi" aria-labelledby="about-title">
      <div className="about__grid container">
        <figure className="about__figure">
          <img
            src={belenImage}
            alt="Retrato de Belén"
            width="1080"
            height="1080"
            loading="lazy"
          />
          <figcaption>Belén, cosmetóloga y maquilladora</figcaption>
        </figure>

        <div className="about__body">
          <h2 className="display" id="about-title">
            Hola, soy Belén.
          </h2>

          <div className="about__text">
            <p className="about__lead">{intro[0]}</p>
            <p>{intro[1]}</p>

            <div className={`about__more ${open ? "is-open" : ""}`}>
              <div id="carta-belen" className="about__more-inner" inert={!open}>
                {rest.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="about__actions">
            <button
              className="link-button"
              type="button"
              aria-expanded={open}
              aria-controls="carta-belen"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Leer menos" : "Seguir leyendo"}
            </button>
            <a className="link" href="#contacto">
              Conversemos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

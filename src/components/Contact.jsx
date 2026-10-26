import { Button, WhatsAppIcon } from "./ui.jsx";
import contactPhoto from "../assets/services/limpieza-facial.jpg";
import { INSTAGRAM_URL, PHONE_DISPLAY, WHATSAPP_NUMBER, WHATSAPP_URL } from "../data.js";

export default function Contact() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="contact__grid container">
        <div className="contact__copy">
          <h2 className="display" id="contact-title">
            Regálate algo bonito.
          </h2>
          <p className="contact__text">
            ¿Quieres saber más sobre los servicios o reservar una hora? Escríbeme y conversemos para encontrar lo
            ideal para ti.
          </p>

          <div className="contact__actions">
            <Button href={WHATSAPP_URL} variant="solid" external icon={<WhatsAppIcon size={18} />}>
              Hablemos por WhatsApp
            </Button>
            <Button href={INSTAGRAM_URL} variant="line" external>
              Ver Instagram
            </Button>
          </div>

          <p className="contact__phone">
            O llámame al <a className="link" href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a>
          </p>
        </div>

        <figure className="contact__figure">
          <img
            src={contactPhoto}
            alt="Mujer recostada con una mascarilla facial y la cabeza envuelta en una toalla"
            width="794"
            height="1123"
            loading="lazy"
          />
          <figcaption>Haz una pausa.</figcaption>
        </figure>
      </div>
    </section>
  );
}

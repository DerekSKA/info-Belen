import { WhatsAppIcon } from "./ui.jsx";
import { WHATSAPP_URL } from "../data.js";
import { useInView } from "../hooks.js";

// Botón flotante: se esconde cuando la sección Contacto ya ofrece el mismo botón.
export default function FloatingWhatsApp({ hideNearContact = false }) {
  const contactVisible = useInView("contacto");
  const hidden = hideNearContact && contactVisible;

  return (
    <a
      className={`wa-float ${hidden ? "is-hidden" : ""}`}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp (se abre en otra pestaña)"
      tabIndex={hidden ? -1 : undefined}
    >
      <WhatsAppIcon size={28} />
      <span className="wa-float__label">Escríbeme</span>
    </a>
  );
}

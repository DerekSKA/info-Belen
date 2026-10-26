import { BrandSeal } from "./ui.jsx";
import { CATALOG_URL, CURRENT_YEAR, INSTAGRAM_URL, WHATSAPP_URL } from "../data.js";

export default function SiteFooter({ showBackToTop = true }) {
  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__brand">
          <BrandSeal className="footer__seal" />
          <div>
            <p className="footer__name">Belisse Glam</p>
            <p className="footer__message">La belleza de cuidarte, un momento a la vez.</p>
          </div>
        </div>

        <nav className="footer__links" aria-label="Enlaces del pie de página">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram<span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp<span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
          <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer">
            Catálogo<span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
          {showBackToTop && <a href="#inicio">Volver arriba</a>}
        </nav>
      </div>

      <div className="footer__legal container">
        <p>© {CURRENT_YEAR} Belisse Glam</p>
        <p>Hecho con cariño</p>
      </div>
    </footer>
  );
}

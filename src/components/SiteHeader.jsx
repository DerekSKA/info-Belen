import { useEffect, useRef, useState } from "react";
import { BrandSeal } from "./ui.jsx";
import { navLinks, SECTION_IDS, WHATSAPP_URL } from "../data.js";
import { useActiveSection } from "../hooks.js";

// variant "home": menú completo con enlaces a secciones. variant "gallery": solo marca y "Volver al inicio".
export default function SiteHeader({ variant = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const active = useActiveSection(SECTION_IDS);
  const closeMenu = () => setMenuOpen(false);

  // Escape cierra el menú móvil y devuelve el foco al botón.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  if (variant === "gallery") {
    return (
      <header className="nav">
        <div className="nav__bar container">
          <a className="nav__brand" href={window.location.pathname}>
            <BrandSeal className="nav__seal" />
            <span>Belisse Glam</span>
          </a>
          <a className="btn btn--line btn--sm" href={window.location.pathname}>
            Volver al inicio
          </a>
        </div>
      </header>
    );
  }

  return (
    <header className="nav">
      <div className="nav__bar container">
        <a className="nav__brand" href="#inicio" onClick={closeMenu}>
          <BrandSeal className="nav__seal" />
          <span>Belisse Glam</span>
        </a>

        <nav
          id="menu-principal"
          className={`nav__links ${menuOpen ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a className="nav__links-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Escríbeme por WhatsApp
          </a>
        </nav>

        <a className="btn btn--solid btn--sm nav__cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Escríbeme
          <span className="sr-only"> por WhatsApp (se abre en otra pestaña)</span>
        </a>

        <button
          ref={toggleRef}
          className="nav__toggle"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

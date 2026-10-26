import { useEffect } from "react";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import FloatingWhatsApp from "./FloatingWhatsApp.jsx";
import { Button, WhatsAppIcon } from "./ui.jsx";
import {
  INSTAGRAM_URL,
  WHATSAPP_URL,
  getGallery,
  projects,
  services,
  whatsappForService,
} from "../data.js";

// Estructura común de las páginas de galería (servicios y proyectos). Cada item: { src, isVideo, alt }.
function GalleryLayout({ pageTitle, title, description, tabs, items, whatsappHref }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${pageTitle} | Belisse Glam`;
    return () => {
      document.title = previous;
    };
  }, [pageTitle]);

  return (
    <>
      <SiteHeader variant="gallery" />

      <main className="gallery container" id="contenido">
        <header className="gallery__head">
          <h1 className="display">{title}</h1>
          {description && <p className="gallery__intro">{description}</p>}
        </header>

        <nav className="gallery__tabs" aria-label="Otras galerías">
          {tabs.map((tab) => (
            <a key={tab.href} href={tab.href} aria-current={tab.current ? "page" : undefined}>
              {tab.label}
            </a>
          ))}
        </nav>

        {items.length > 0 ? (
          <ul className="gallery__wall">
            {items.map((item) => (
              <li key={item.src}>
                {item.isVideo ? (
                  <video src={item.src} controls playsInline preload="metadata" aria-label={item.alt} />
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="gallery__empty">
            <p>Pronto subiremos las fotos de este trabajo. Mientras tanto, puedes ver más en Instagram.</p>
            <Button href={INSTAGRAM_URL} variant="line" external>
              Ver Instagram
            </Button>
          </div>
        )}

        <div className="gallery__actions">
          <Button href={whatsappHref} variant="solid" external icon={<WhatsAppIcon size={18} />}>
            Consultar por WhatsApp
          </Button>
          <Button href={window.location.pathname} variant="line">
            Volver al inicio
          </Button>
        </div>
      </main>

      <SiteFooter showBackToTop={false} />
      <FloatingWhatsApp />
    </>
  );
}

// Galería de un servicio: #/galeria/<slug>
export function GalleryPage({ slug }) {
  const service = services.find((s) => s.slug === slug);
  const photos = service ? getGallery(service) : [];

  return (
    <GalleryLayout
      pageTitle={service ? service.title : "Galería no encontrada"}
      title={service ? service.title : "Galería no encontrada"}
      description={service?.description}
      tabs={services.map((s) => ({ label: s.title, href: `#/galeria/${s.slug}`, current: s.slug === slug }))}
      items={photos.map((src, index) => ({ src, isVideo: false, alt: `${service.title}, foto ${index + 1}` }))}
      whatsappHref={service ? whatsappForService(service.title) : WHATSAPP_URL}
    />
  );
}

// Galería de un proyecto del portafolio: #/proyecto/<slug>
export function ProjectPage({ slug }) {
  const project = projects.find((p) => p.slug === slug);

  return (
    <GalleryLayout
      pageTitle={project ? project.title : "Galería no encontrada"}
      title={project ? project.title : "Galería no encontrada"}
      description={project?.summary}
      tabs={projects.map((p) => ({ label: p.title, href: `#/proyecto/${p.slug}`, current: p.slug === slug }))}
      items={(project?.gallery || []).map((m, index) => ({
        src: m.src,
        isVideo: m.isVideo,
        alt: `${project.title}, ${m.isVideo ? "video" : "foto"} ${index + 1}`,
      }))}
      whatsappHref={project ? whatsappForService(project.title) : WHATSAPP_URL}
    />
  );
}

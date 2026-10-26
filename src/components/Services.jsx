import { BrandSeal, Button, WhatsAppIcon } from "./ui.jsx";
import {
  CATALOG_URL,
  WHATSAPP_URL,
  getCover,
  hasRealGallery,
  serviceGroups,
  services,
  whatsappForService,
} from "../data.js";

function ServiceRow({ service }) {
  const cover = getCover(service);
  const withPhotos = hasRealGallery(service);

  const media = cover ? (
    <img src={cover} alt={service.alt} width="600" height="800" loading="lazy" />
  ) : (
    <span className="svc__empty">
      <BrandSeal />
    </span>
  );

  return (
    <li className="svc">
      <div className="svc__media">
        {withPhotos ? (
          <a href={`#/galeria/${service.slug}`} target="_blank" rel="noopener noreferrer">
            {media}
            <span className="sr-only">Ver todas las fotos de {service.title} (se abre en otra pestaña)</span>
          </a>
        ) : (
          media
        )}
      </div>

      <div className="svc__body">
        <h4 className="svc__title">{service.title}</h4>
        <p className="svc__line">
          {service.line}. {service.steps.join(", ")}.
        </p>
        <p className="svc__description">{service.description}</p>
        <ul className="svc__results" aria-label={`Resultados de ${service.title}`}>
          {service.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>

      <div className="svc__buy">
        <dl className="svc__prices">
          {service.prices.map((price) => (
            <div key={price.label}>
              <dt>{price.label}</dt>
              <dd>{price.value}</dd>
            </div>
          ))}
          {service.duration && (
            <div className="svc__duration">
              <dt>Duración</dt>
              <dd>{service.duration}</dd>
            </div>
          )}
        </dl>

        <a
          className="btn btn--solid btn--sm"
          href={whatsappForService(service.title)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={17} />
          <span>Agendar por WhatsApp</span>
          <span className="sr-only"> {service.title} (se abre en otra pestaña)</span>
        </a>
        {withPhotos && (
          <a className="link svc__photos" href={`#/galeria/${service.slug}`} target="_blank" rel="noopener noreferrer">
            Ver fotos<span className="sr-only"> de {service.title} (se abre en otra pestaña)</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function Services() {
  return (
    <section className="services" id="servicios" aria-labelledby="services-title">
      <div className="container">
        <header className="section-head">
          <h2 className="display" id="services-title">
            Servicios y precios
          </h2>
          <p className="section-head__intro">
            Cada servicio indica sus resultados, su valor y su duración. Cuando elijas el tuyo, agenda directo por
            WhatsApp: el mensaje ya lleva el nombre del servicio.
          </p>
        </header>

        {serviceGroups.map((group) => {
          const items = services.filter((service) => service.group === group.id);
          if (!items.length) return null;
          return (
            <section className="svc-group" key={group.id} aria-labelledby={`grupo-${group.id}`}>
              <h3 className="svc-group__title" id={`grupo-${group.id}`}>
                {group.title}
              </h3>
              <ul className="svc-group__list">
                {items.map((service) => (
                  <ServiceRow service={service} key={service.slug} />
                ))}
              </ul>
            </section>
          );
        })}

        <footer className="services__help">
          <p>¿Tienes dudas o no sabes cuál elegir? Escríbeme y te ayudo.</p>
          <div className="services__help-actions">
            <Button href={WHATSAPP_URL} variant="solid" external icon={<WhatsAppIcon size={18} />}>
              Agenda conmigo
            </Button>
            <Button href={CATALOG_URL} variant="line" external>
              Ver catálogo completo
            </Button>
          </div>
        </footer>
      </div>
    </section>
  );
}

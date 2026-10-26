import { Button } from "./ui.jsx";
import { INSTAGRAM_URL, projects } from "../data.js";

export default function Projects() {
  return (
    <section className="projects" id="proyectos" aria-labelledby="projects-title">
      <div className="container">
        <header className="section-head">
          <h2 className="display" id="projects-title">
            Trabajos que hablan
          </h2>
          <p className="section-head__intro">
            El lado creativo del oficio: caracterización, fantasía, efectos especiales, audiovisual y novias. Abre un
            trabajo para ver todas sus fotos y videos.
          </p>
        </header>

        {projects.length > 0 ? (
          <ul className="projects__grid">
            {projects.map((project) => (
              <li key={project.slug}>
                <a className="project" href={`#/proyecto/${project.slug}`} target="_blank" rel="noopener noreferrer">
                  <span className="project__media">
                    {project.cover && <img src={project.cover} alt="" loading="lazy" />}
                  </span>
                  <span className="project__title">{project.title}</span>
                  {project.summary && <span className="project__summary">{project.summary}</span>}
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="projects__empty">
            Estoy preparando esta galería. Mientras tanto, puedes ver mis trabajos más recientes en Instagram.
          </p>
        )}

        <div className="projects__more">
          <p>Mira más trabajos recientes en mi Instagram.</p>
          <Button href={INSTAGRAM_URL} variant="light" external>
            Ver Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}

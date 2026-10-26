import { useEffect, useState } from "react";

// Ruta por hash: "#/galeria/<slug>" y "#/proyecto/<slug>" son páginas de galería.
export function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash);
      if (/^#\/(galeria|proyecto)\//.test(window.location.hash)) window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

// Devuelve el id de la sección que cruza el centro de la pantalla (para el estado activo del menú).
export function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// ¿Está visible el elemento con ese id? (se usa para ocultar el botón flotante junto a Contacto)
export function useInView(id) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return inView;
}

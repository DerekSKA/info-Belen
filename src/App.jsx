import SiteHeader from "./components/SiteHeader.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";
import { GalleryPage, ProjectPage } from "./components/GalleryPages.jsx";
import { useHashRoute } from "./hooks.js";

import "./index.css";
import "./App.css";

export default function App() {
  const route = useHashRoute();

  if (route.startsWith("#/galeria/")) return <GalleryPage slug={route.replace("#/galeria/", "")} />;
  if (route.startsWith("#/proyecto/")) return <ProjectPage slug={route.replace("#/proyecto/", "")} />;

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingWhatsApp hideNearContact />
    </>
  );
}

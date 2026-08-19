import { useEffect, useState } from "react";
import "./styles/global.css";
import { useLenis } from "./hooks/useLenis";
import { ScrollTrigger } from "./animations/gsap";
import Background from "./components/Background/Background";
import Cursor from "./components/Cursor/Cursor";
import Nav from "./components/Nav/Nav";
import Loader from "./components/UI/Loader";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Gallery from "./components/Gallery/Gallery";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  // Sections mount with content already in the DOM (no images to wait
  // on), so ScrollTrigger needs a refresh once the loader's layout
  // changes settle and again on window resize/orientation change.
  useEffect(() => {
    if (!loaded) return;
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 50);
    window.addEventListener("resize", refresh);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", refresh);
    };
  }, [loaded]);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      <Background />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

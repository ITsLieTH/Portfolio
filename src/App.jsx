import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Graphics from "./components/GraphicDesign/GraphicDesign";
import Contact from "./components/Contact/Contact";
import { pageTransition } from "./animations";
import Ambient from "./components/Ambient/Ambient";

function App() {
  const [active, setActive] = useState("Home");

  const renderPage = () => {
    if (active === "Home") return <Hero onNavigate={setActive} />;
    if (active === "About") return <About onNavigate={setActive} />;
    if (active === "Skills") return <Skills />;
    if (active === "Projects") return <Projects />;
    if (active === "Graphics") return <Graphics />;
    if (active === "Contact") return <Contact />;

    return null;
  };

  return (
    <div
      className="app-layout"
      style={{
        position: "relative",
        isolation: "isolate",
        minHeight: "100vh",
      }}
    >
      <Ambient />

      <Navbar active={active} onNavigate={setActive} />

      <main className="app-main" style={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

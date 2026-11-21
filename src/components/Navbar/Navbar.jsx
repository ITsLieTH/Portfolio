import { motion } from "framer-motion";
import "./Navbar.css";

const NAV_ITEMS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Graphics",
  "Contact",
];

function Navbar({ active, onNavigate }) {
  return (
    <motion.nav
      className="navbar"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {/* LEFT — BRAND */}
      <motion.div
        className="navbar-left"
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="navbar-brand"
          onClick={() => onNavigate("Home")}
        >
          <span className="navbar-name">LAITH</span>
          <span className="navbar-role">DEVELOPER / DESIGNER</span>
        </button>
      </motion.div>

      {/* CENTER — SECTIONS (row 2 on phones) */}
      <div className="navbar-center">
        {NAV_ITEMS.map((item, index) => {
          const isActive = active === item;

          return (
            <motion.div
              key={item}
              className="navbar-group"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.25 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                className={`navbar-link ${isActive ? "active" : ""}`}
                onClick={() => onNavigate(item)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="navbar-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="navbar-label">{item}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* RIGHT — RESUME */}
      <motion.div
        className="navbar-right"
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="/Laith-CV.pdf"
          download="Laith-CV.pdf"
          className="navbar-resume"
        >
          <span>Resume</span>
        </a>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
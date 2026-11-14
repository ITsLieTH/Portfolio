import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../../animations";
import uiUxImage from "../../assets/Graphic Design/Graphics Section-01.webp";
import brandImage from "../../assets/Graphic Design/Graphics Section-02.webp";
import socialImage from "../../assets/Graphic Design/Graphics Section-03.webp";
import artImage from "../../assets/Graphic Design/Graphics Section-04.webp";
import printsImage from "../../assets/Graphic Design/Graphics Section-05.webp";
import "./GraphicDesign.css";

const CATEGORIES = [
  {
    name: "UI/UX",
    image: uiUxImage,
    description:
      "Interface design and user experience, focused on clarity, usability, and thoughtful interactions.",
  },
  {
    name: "Brand Design",
    image: brandImage,
    description:
      "Logos, visual identities, and brand systems built around a clear and consistent visual language.",
  },
  {
    name: "Social Media",
    image: socialImage,
    description:
      "Social media content and campaign visuals designed to communicate clearly and capture attention.",
  },
  {
    name: "Art Design",
    image: artImage,
    description:
      "Original digital artwork exploring composition, visual storytelling, and creative expression.",
  },
  {
    name: "Prints",
    image: printsImage,
    description:
      "Print and editorial layouts, including event programs and other designed materials.",
  },
];

function GraphicDesign() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = CATEGORIES[activeIndex];

  // Load all images up front so switching never waits on the network or decoding.
  useEffect(() => {
    CATEGORIES.forEach((category) => {
      const img = new Image();
      img.src = category.image;
    });
  }, []);

  const showPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + CATEGORIES.length) % CATEGORIES.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % CATEGORIES.length);
  };

  return (
    <motion.section
      className="gd"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.header className="gd-header" variants={fadeUpItem}>
        <div className="gd-heading">
          <p className="gd-label">SELECTED CREATIVE WORK</p>

          <h2 className="gd-title">
            Graphic Design<span>.</span>
          </h2>

          <p className="gd-description">
            Visual identities, digital experiences, and creative work shaped by
            thoughtful design and attention to detail.
          </p>
        </div>

        <a
          className="gd-behance"
          href="#"
          aria-disabled="true"
          tabIndex={-1}
          onClick={(event) => event.preventDefault()}
        >
          Explore on Behance
          <ArrowUpRight size={17} aria-hidden="true" />
          <span className="gd-coming-soon">COMING SOON</span>
        </a>
      </motion.header>

      <motion.article className="gd-feature" variants={fadeUpItem}>
        <div className="gd-feature-info">
          <p className="gd-label">
            CATEGORY {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(CATEGORIES.length).padStart(2, "0")}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.name}
              className="gd-category-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <h3 className="gd-category-title">{activeCategory.name}</h3>

              <div className="gd-divider" />

              <p className="gd-text">{activeCategory.description}</p>
            </motion.div>
          </AnimatePresence>

          <p className="gd-note">Selected work · Portfolio 2026</p>

          <div className="gd-navigation">
            <button
              type="button"
              className="gd-nav-button"
              onClick={showPrevious}
              aria-label="Previous category"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <span className="gd-counter">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="gd-counter-divider">/</span>
              {String(CATEGORIES.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="gd-nav-button"
              onClick={showNext}
              aria-label="Next category"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Glass card stays fixed. Only the image inside it changes. */}
        <div className="gd-artwork-wrapper">
          <div className="gd-artwork">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeCategory.image}
                src={activeCategory.image}
                alt={`${activeCategory.name} design showcase`}
                className="gd-artwork-image"
                draggable="false"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.012 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
}

export default GraphicDesign;

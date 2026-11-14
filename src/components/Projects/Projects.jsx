import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { staggerContainer, fadeUpItem } from "../../animations";
import "./Projects.css";

const campusImages = Object.values(
  import.meta.glob(
    "../../assets/Projects/Project Campus/Project Campus™ *.webp",
    {
      eager: true,
      import: "default",
    },
  ),
).sort((a, b) => {
  const numberA = Number(a.match(/(\d+)\.webp$/)?.[1] || 0);
  const numberB = Number(b.match(/(\d+)\.webp$/)?.[1] || 0);

  return numberA - numberB;
});

const vacationImages = Object.values(
  import.meta.glob("../../assets/Projects/Vacation Schedular/*.webp", {
    eager: true,
    import: "default",
  }),
).sort((a, b) => {
  const numberA = Number(a.match(/(\d+)\.webp$/)?.[1] || 0);
  const numberB = Number(b.match(/(\d+)\.webp$/)?.[1] || 0);

  return numberA - numberB;
});

const PROJECTS = [
  {
    id: "project-campus",
    year: "2026",
    type: "GRADUATION PROJECT",
    title: "Project Campus",
    subtitle: "A Unified Academic Social Platform",

    description:
      "Project Campus is a unified academic social platform that centralizes university communication, collaboration, and verified information in one structured environment. It connects students, instructors, universities, and organizations through dedicated academic spaces, communities, announcements, and discussions while reducing reliance on fragmented informal channels. A role-based verification system helps maintain the credibility and integrity of the platform.",

    role: [
      "Idea Owner",
      "Software Engineering",
      "System Analysis and Documentation",
      "UI/UX Design",
    ],

    stack: [
      "React",
      "Tailwind CSS",
      "Django",
      "Django REST Framework",
      "Django Channels",
      "PostgreSQL",
      "JWT",
    ],

    images: campusImages,
    showThumbnails: true,

    github: "https://github.com/AyhamAlsayyed/Project-Campus",
    report: "/project-campus-report.pdf",
  },

  {
    id: "vacation-scheduling",
    year: "2026",
    type: "INTERNAL BUSINESS SYSTEM",
    title: "Vacation Scheduling System",
    subtitle: "Employee Vacation Balance Management & Scheduling",

    description:
      "An internal business system designed to reduce the accumulation of unused employee vacation balances carried forward into the following year. The system uses configurable business rules to determine how vacation balances should be scheduled and distributes vacation periods across a defined timeframe while considering staffing requirements and operational constraints.",

    role: [
      "Requirements Analysis",
      "Workflow & Business Rules Design",
      "System Analysis",
      "UI/UX Design",
      "Testing & Edge-Case Validation",
      "Technical Documentation",
      "AI-Assisted Development",
    ],

    stack: ["Django", "MySQL", "Bootstrap"],

    images: vacationImages,
    showThumbnails: false,
    confidential: true,
  },
];

function ProjectGallery({ project }) {
  const [current, setCurrent] = useState(0);

  const total = project.images.length;

  const previousImage = () => {
    setCurrent((current) => (current === 0 ? total - 1 : current - 1));
  };

  const nextImage = () => {
    setCurrent((current) => (current === total - 1 ? 0 : current + 1));
  };

  if (!total) return null;

  return (
    <div className="pj-showcase">
      <div className="pj-showcase-head">
        <div className="pj-showcase-label">
          <span>
            {project.id === "project-campus"
              ? "PROJECT CAMPUS™"
              : "VACATION SCHEDULER"}
          </span>
          <i />
          <span>VISUAL PRESENTATION</span>
        </div>

        <div className="pj-showcase-count">
          <strong>{String(current + 1).padStart(2, "0")}</strong>
          <span>/</span>
          <span>{String(total).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="pj-stage">
        <AnimatePresence mode="wait">
          <motion.img
            key={project.images[current]}
            src={project.images[current]}
            alt={`${project.title} preview ${current + 1}`}
            className={`pj-main-image ${
              project.id === "vacation-scheduling" ? "pj-vacation-image" : ""
            }`}
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.012,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </AnimatePresence>

        <div className="pj-stage-shade" />

        {total > 1 && (
          <div className="pj-stage-index">
            <span>SLIDE</span>
            <strong>{String(current + 1).padStart(2, "0")}</strong>
          </div>
        )}

        {total > 1 && (
          <div className="pj-stage-controls">
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} strokeWidth={1.4} />
            </button>

            <button type="button" onClick={nextImage} aria-label="Next slide">
              <ChevronRight size={18} strokeWidth={1.4} />
            </button>
          </div>
        )}
      </div>

      {project.showThumbnails && (
        <div className="pj-index">
          <div className="pj-index-line" />

          <div className="pj-thumbnail-track">
            {project.images.map((image, index) => (
              <button
                type="button"
                key={image}
                className={`pj-index-item ${current === index ? "active" : ""}`}
                onClick={() => setCurrent(index)}
                aria-label={`View slide ${index + 1}`}
                aria-current={current === index ? "true" : undefined}
              >
                <img src={image} alt="" className="pj-thumbnail" />

                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>

          <div className="pj-index-line" />
        </div>
      )}
    </div>
  );
}

function ProjectDetails({ project }) {
  return (
    <aside className="pj-details">
      <div className="pj-detail-block pj-role-block">
        <div className="pj-detail-heading">
          <span>01</span>
          <span>MY ROLE</span>
        </div>

        <div className="pj-role-grid">
          {project.role.map((role) => (
            <div className="pj-role" key={role}>
              <span>{role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pj-detail-block pj-stack-block">
        <div className="pj-detail-heading">
          <span>02</span>
          <span>TECHNOLOGY</span>
        </div>

        <div className="pj-tech-list">
          {project.stack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>

      {!project.confidential && (
        <div className="pj-detail-block pj-resources">
          <div className="pj-detail-heading">
            <span>03</span>
            <span>RESOURCES</span>
          </div>

          <div className="pj-resource-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-resource-github"
            >
              <FaGithub size={15} />
              <span>GitHub</span>
            </a>

            <a href={project.report} download className="pj-resource-report">
              <FileDown size={15} strokeWidth={1.6} />
              <span>Project Report</span>
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}

function ProjectBlock({ project }) {
  const isConfidential = project.confidential;

  return (
    <motion.article className="pj-project" variants={fadeUpItem}>
      <div className="pj-project-top">
        <div className="pj-project-meta">
          <span className="pj-project-type">{project.type}</span>

          <span className="pj-project-rule" />

          <span className="pj-project-year">{project.year}</span>
        </div>
      </div>

      <div className="pj-project-heading">
        <div>
          <h2>{project.title}</h2>
          <p>{project.subtitle}</p>
        </div>

        {!isConfidential && <span className="pj-project-symbol">™</span>}
      </div>

      <p className="pj-project-description">{project.description}</p>

      <div className="pj-project-layout">
        <ProjectGallery project={project} />
        <ProjectDetails project={project} />
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <motion.section
      className="pj-page"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div className="pj-intro" variants={fadeUpItem}>
        <div className="pj-label">
          <span>03</span>
          <span>PROJECTS</span>
        </div>

        <div className="pj-title">
          <span>BUILDING</span>

          <span className="pj-title-muted">WITH PURPOSE</span>
        </div>

        <div className="pj-intro-bottom">
          <p className="pj-description">
            Selected development work combining software engineering, system
            thinking, and visual design.
          </p>

          <span className="pj-intro-note">SOFTWARE · DESIGN · SYSTEMS</span>
        </div>
      </motion.div>

      <div className="pj-projects">
        {PROJECTS.map((project) => (
          <ProjectBlock key={project.id} project={project} />
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
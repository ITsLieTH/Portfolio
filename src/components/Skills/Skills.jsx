
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Server,
  Settings,
  BrainCircuit,
} from "lucide-react";
import { staggerContainer, fadeUpItem } from "../../animations";
import "./Skills.css";

const SKILLS = [
  {
    number: "01",
    title: "Development",
    icon: Code2,
    items: [
      "JavaScript",
      "React",
      "Python",
      "Node.js",
      "SQL",
      "HTML",
      "CSS",
    ],
  },
  {
    number: "02",
    title: "DevOps & Infrastructure",
    icon: Server,
    items: ["Linux", "OpenStack", "Networking", "Git"],
  },
  {
    number: "03",
    title: "Design & Creativity",
    icon: Palette,
    items: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Branding",
      "Visual Identity",
    ],
  },
  {
    number: "04",
    title: "Engineering Foundations",
    icon: Settings,
    items: [
      "Problem Solving",
      "Software Engineering",
      "Data Structures & Algorithms",
      "System Analysis",
      "Requirements Analysis",
      "Workflow Design",
    ],
  },
  {
    number: "05",
    title: "AI & Emerging Technologies",
    icon: BrainCircuit,
    items: [
      "AI-Assisted Development",
      "Prompt Engineering",
      "AI Tool Coordination",
    ],
  },
];

function Skills() {
  return (
    <motion.section
      className="skills"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div className="skills-intro" variants={fadeUpItem}>
        <div className="skills-label">SKILLS</div>

        <div className="skills-title">
          <span>TOOLS</span>
          <span className="skills-cross">×</span>
          <span>EXPERTISE</span>
        </div>

        <p className="skills-description">
          My work spans software development, DevOps infrastructure, and graphic
          design, supported by software engineering fundamentals and
          AI-assisted workflows.
        </p>
      </motion.div>

      <div className="skills-index">
        {SKILLS.map(({ number, title, icon: Icon, items }) => (
          <motion.div
            className="skills-row"
            key={title}
            variants={fadeUpItem}
          >
            <div className="skills-row-header">
              <span className="skills-number">{number}</span>

              <div className="skills-category">
                <span className="skills-category-icon">
                  <Icon size={17} strokeWidth={1.5} />
                </span>

                <span>{title.toUpperCase()}</span>
              </div>
            </div>

            <div className="skills-items">
              {items.map((item) => (
                <div className="skill" key={item}>
                  <span className="skill-name">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Skills;

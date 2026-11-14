import { motion } from "framer-motion";
import { staggerContainer, fadeUpItem } from "../../animations";
import myPhoto from "../../assets/Personal pictures/Me1.jpeg";
import "./About.css";

function About({ onNavigate }) {
  return (
    <motion.section
      className="about"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div className="about-intro" variants={fadeUpItem}>
        <div className="about-label">ABOUT ME</div>

        <div className="about-title">
          <span>DEVELOPER</span>
          <span className="about-title-divider" />
          <span>DESIGNER</span>
        </div>

        <p className="about-description">
          I think in systems and I design for people. I enjoy problems that
          need both an engineering answer and a creative one.
        </p>
      </motion.div>

      <div className="about-main">
        <motion.div className="about-profile" variants={fadeUpItem}>
          <div className="about-photo">
            <img src={myPhoto} alt="Laith" />
          </div>
        </motion.div>

        <div className="about-details">
          <motion.div className="about-detail" variants={fadeUpItem}>
            <div className="about-detail-number">01</div>

            <div className="about-detail-content">
              <h4>DESIGN</h4>

              <p>
                Visual design, branding, and UI/UX, focused on clear
                communication, thoughtful experiences, and attention to detail.
              </p>
            </div>
          </motion.div>

          <motion.div className="about-detail" variants={fadeUpItem}>
            <div className="about-detail-number">02</div>

            <div className="about-detail-content">
              <h4>SOFTWARE DEVELOPMENT</h4>

              <p>
                Full-stack development, software engineering principles, and
                building applications from first concept to implementation.
              </p>
            </div>
          </motion.div>

          <motion.div className="about-detail" variants={fadeUpItem}>
            <div className="about-detail-number">03</div>

            <div className="about-detail-content">
              <h4>DEVOPS & INFRASTRUCTURE</h4>

              <p>
                Currently expanding my work into infrastructure, deployment
                workflows, and the tools that keep systems reliable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="about-cta" variants={fadeUpItem}>
        <p>Want to build something together?</p>

        <button
          type="button"
          className="about-cta-link"
          onClick={() => onNavigate("Contact")}
        >
          <span>Get in touch</span>
          <span aria-hidden="true">→</span>
        </button>
      </motion.div>
    </motion.section>
  );
}

export default About;
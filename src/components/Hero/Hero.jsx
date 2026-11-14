import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./Hero.css";
import myPhoto from "../../assets/Personal pictures/Me4.png";
import SocialLinks from "../SocialLinks/SocialLinks";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Hebron",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(time);

  return <span className="hero-clock">{formatted} · Ramallah Time</span>;
}

function Hero({ onNavigate }) {
  return (
    <section className="hero">
      {/* =========================
          HERO CARD
      ========================== */}

      <motion.div
        className="hero-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-label-row">
          <p className="hero-label">PORTFOLIO / 2026</p>

          <span className="hero-index">01</span>
        </div>

        <div className="hero-divider" />

        {/* Name */}

        <div className="hero-name-row">
          <h1 className="hero-name">LAITH</h1>

          <p className="hero-fullname">KHALDOUN ABU ARRAH</p>

          <span className="hero-date">06 · APR · 2004</span>
        </div>

        {/* Professional identity */}

        <div className="hero-intro">
          <p className="hero-eyebrow">
            DEVOPS SPECIALIST · FULL-STACK DEVELOPMENT · GRAPHIC DESIGN
          </p>

          <h2 className="hero-title">
            Building digital experiences
            <br />
            where <span>technology</span> meets design.
          </h2>

          <p className="hero-description">
            I'm a DevOps Specialist at Jawwal with a background in full-stack
            development and graphic design. I enjoy solving problems, building
            software, and combining technical thinking with creative execution.
          </p>
        </div>

        {/* Metadata */}

        <div className="hero-meta-row">
          <p className="hero-location">Palestine · Ramallah</p>

          <LiveClock />
        </div>

        {/* Actions */}

        <div className="hero-actions">
          <button className="hero-link" onClick={() => onNavigate("Projects")}>
            <span>View Projects</span>
            <span className="hero-link-arrow">↗</span>
          </button>

          <button
            className="hero-about-link"
            onClick={() => onNavigate("About")}
          >
            About Me
          </button>
        </div>

        {/* Social links (tablet and phone only, inside the card) */}

        <div className="hero-socials-inline">
          <SocialLinks />
        </div>
      </motion.div>

      {/* =========================
          HERO RIGHT (desktop only)
      ========================== */}

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-photo">
          <img src={myPhoto} alt="Laith" className="hero-photo-img" />
        </div>

        <SocialLinks />
      </motion.div>
    </section>
  );
}

export default Hero;
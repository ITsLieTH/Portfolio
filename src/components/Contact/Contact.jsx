import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import SocialLinks from "../SocialLinks/SocialLinks";
import myPhoto from "../../assets/Personal pictures/Me3.png";
import "./Contact.css";

function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xljjvqkr", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (response.ok) {
        e.target.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact">
      <div className="contact-intro">
        <div className="contact-label">CONTACT</div>

        <div className="contact-title">
          <span>
            LET'S <strong>WORK</strong>
          </span>

          <span>
            <strong>TOGETHER</strong>
          </span>
        </div>

        <p className="contact-description">
          Have a project, opportunity, or idea in mind? I'd love to hear about
          it.
        </p>
      </div>

      <div className="contact-details">
        <a href="mailto:lietha.arrah12@gmail.com" className="contact-detail">
          <div className="contact-detail-icon">
            <Mail size={16} strokeWidth={1.5} />
          </div>

          <div className="contact-detail-content">
            <span>EMAIL</span>
            <strong>lietha.arrah12@gmail.com</strong>
          </div>
        </a>

        <a href="tel:+972569376251" className="contact-detail">
          <div className="contact-detail-icon">
            <Phone size={16} strokeWidth={1.5} />
          </div>

          <div className="contact-detail-content">
            <span>PHONE</span>
            <strong>+972 569 376 251</strong>
          </div>
        </a>

        <div className="contact-detail">
          <div className="contact-detail-icon">
            <MapPin size={16} strokeWidth={1.5} />
          </div>

          <div className="contact-detail-content">
            <span>BASED IN</span>
            <strong>RAMALLAH, PALESTINE</strong>
          </div>
        </div>
      </div>

      <div className="contact-main">
        <div className="contact-left">
          <div className="contact-message">
            <span className="contact-message-number">01</span>

            <div className="contact-message-content">
              <h3>
                LET'S START A
                <br />
                CONVERSATION.
              </h3>

              <p>
                Whether you're looking for a developer, a designer, or someone
                who can bridge both worlds, feel free to reach out.
              </p>
            </div>

            <div className="contact-profile">
              <img src={myPhoto} alt="Laith" />

              <div className="contact-profile-info">
                <strong>LAITH ABU ARRAH</strong>
                <span>DEVELOPER × DESIGNER</span>
              </div>
            </div>

            {/* Inside the card: shown at 900px and below */}
            <div className="contact-socials-inline">
              <SocialLinks />
            </div>
          </div>

          {/* Separate box: hidden at 900px and below */}
          <div className="contact-socials-outer">
            <SocialLinks />
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-header">
            <span>02</span>
            <span>YOUR MESSAGE</span>
          </div>

          {status === "sent" ? (
            <div className="contact-sent">
              <div className="contact-sent-mark">✓</div>

              <span className="contact-sent-label">MESSAGE RECEIVED</span>

              <h3>THANK YOU</h3>

              <p>
                Your message is on its way. I usually reply within a day or two.
              </p>

              <button
                type="button"
                className="contact-sent-again"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="name">NAME</label>

                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">EMAIL</label>

                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="subject">SUBJECT</label>

                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="message">MESSAGE</label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={status === "sending"}
              >
                <span>
                  {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
                </span>
              </button>

              {status === "error" && (
                <p className="contact-error">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
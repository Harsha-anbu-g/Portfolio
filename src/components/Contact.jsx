import { useState } from "react";
import profile from "../data/profile";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const mailtoLink = `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject || `Portfolio contact from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="clark-section" style={{ background: "#f8f6f1" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading">Contact</span>
          <span className="section-label">Reach Out</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>

          {/* ── Left: info ── */}
          <div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#555", marginBottom: "2.5rem" }}>
              I'm open to full-time and part-time opportunities in full-stack development.
              Whether it's a quick question or a project idea — feel free to reach out.
            </p>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "0.2rem" }}>Email</p>
                <a href={`mailto:${profile.contact.email}`} style={{ fontSize: "0.9rem", color: "#1d1d1b", textDecoration: "none", fontWeight: 500 }}>
                  {profile.contact.email}
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "0.2rem" }}>Phone</p>
                <a href={`tel:${profile.contact.phone}`} style={{ fontSize: "0.9rem", color: "#1d1d1b", textDecoration: "none", fontWeight: 500 }}>
                  {profile.contact.phone}
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "0.2rem" }}>Location</p>
                <span style={{ fontSize: "0.9rem", color: "#1d1d1b", fontWeight: 500 }}>Montreal, Quebec, Canada</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280", marginBottom: "0.2rem" }}>LinkedIn</p>
                <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "#1d1d1b", textDecoration: "none", fontWeight: 500 }}>
                  harsha-anbu-gowri
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ border: "none", cursor: "pointer", width: "100%", justifyContent: "center" }}
            >
              {sent ? "Message Sent ✓" : "Send Message"}
              {!sent && (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .contact-form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

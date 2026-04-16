import profile from "../data/profile";

export default function About() {
  return (
    <section id="about" className="clark-section" style={{ background: "#f8f6f1" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.25fr",
          gap: "5rem",
          alignItems: "start",
        }}>

          {/* ── Left: photo stack ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Main professional photo */}
            <div className="about-photo-wrap">
              <img
                src="/photo.jpg"
                alt={profile.name}
                style={{ width: "100%", height: 460, objectFit: "cover", objectPosition: "top center", display: "block" }}
              />
            </div>

            {/* LinkedIn cover card */}
            <div style={{
              position: "relative",
              borderRadius: "2px",
              overflow: "visible",
            }}>
              {/* Orange border frame — same as main photo */}
              <div style={{
                position: "absolute",
                top: -10,
                left: -10,
                right: 10,
                bottom: 10,
                border: "3px solid #6366F1",
                borderRadius: "2px",
                zIndex: 0,
                pointerEvents: "none",
              }} />
              <img
                src="/linkedin coverpic.jpeg"
                alt="LinkedIn profile banner"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  borderRadius: "2px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>

          {/* ── Right: content ── */}
          <div style={{ position: "relative", paddingTop: "1rem" }}>
            <span className="ghost-heading">About</span>

            <span className="section-label">Who Am I</span>
            <h2 className="section-title">About Me</h2>

            <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "#555", marginBottom: "1.75rem" }}>
              {profile.about}
            </p>

            <ul className="about-info-list">
              <li>
                <span className="info-label">Name</span>
                <span className="info-value">{profile.name}</span>
              </li>
              <li>
                <span className="info-label">Location</span>
                <span className="info-value">Montreal, Canada</span>
              </li>
              <li>
                <span className="info-label">Email</span>
                <span className="info-value">
                  <a href={`mailto:${profile.contact.email}`} style={{ color: "#6366F1", textDecoration: "none" }}>
                    {profile.contact.email}
                  </a>
                </span>
              </li>
              <li>
                <span className="info-label">Phone</span>
                <span className="info-value">{profile.contact.phone}</span>
              </li>
              <li>
                <span className="info-label">Status</span>
                <span className="info-value" style={{ color: "#6366F1", fontWeight: 600 }}>Open to work</span>
              </li>
            </ul>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Download CV
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
                style={{ color: "#1d1d1b", borderColor: "rgba(0,0,0,0.25)" }}
              >
                LinkedIn
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: "5rem",
          background: "#6366F1",
          borderRadius: "4px",
          overflow: "hidden",
        }}>
          {[
            { value: "2+", label: "Years Experience" },
            { value: "3+", label: "Projects Built" },
            { value: "15+", label: "Technologies" },
            { value: "Master's", label: "Degree" },
          ].map((stat, i) => (
            <div key={i} className="stat-item" style={{
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none",
            }}>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          #about > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

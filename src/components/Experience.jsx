import profile from "../data/profile";

export default function Experience() {
  return (
    <section id="experience" className="clark-section" style={{ background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading">Resume</span>
          <span className="section-label">My Story</span>
          <h2 className="section-title">Experience &amp; Education</h2>
        </div>

        {/* Two columns */}
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

          {/* ── Left: Experience ── */}
          <div>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#1d1d1b",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{
                width: 32, height: 32,
                background: "#F96D00",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Work Experience
            </h3>

            {profile.experience.map((job, i) => (
              <div key={i} className="resume-wrap">
                <span className="resume-date">{job.period}</span>
                <h4 className="resume-role">{job.role}</h4>
                <p className="resume-place">{job.company} · {job.location}</p>
                <ul className="resume-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Right: Education ── */}
          <div>
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#1d1d1b",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{
                width: 32, height: 32,
                background: "#F96D00",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </span>
              Education
            </h3>

            {profile.education.map((edu, i) => (
              <div key={i} className="resume-wrap">
                <span className="resume-date">{edu.period}</span>
                <h4 className="resume-role">{edu.degree}</h4>
                <p className="resume-place">{edu.school} · {edu.location}</p>
                {edu.detail && (
                  <ul className="resume-bullets">
                    <li>{edu.detail}</li>
                  </ul>
                )}
              </div>
            ))}

            {/* Certifications */}
            <div style={{ marginTop: "2.5rem" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1d1d1b", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Certifications
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {profile.certifications.map((cert, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.85rem",
                    color: cert.status === "in-progress" ? "#6b7280" : "#212529",
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: cert.status === "completed" ? "#F96D00" : "#d1d5db",
                    }} />
                    {cert.name}
                    {cert.status === "in-progress" && (
                      <span style={{ fontSize: "0.7rem", color: "#F96D00", fontWeight: 600 }}>In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
        .dark .resume-role { color: #f0f0ef; }
        .dark .resume-wrap { border-left-color: rgba(255,255,255,0.1); }
      `}</style>
      <style>{`
        @media (max-width: 768px) {
          #experience > div > div.exp-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

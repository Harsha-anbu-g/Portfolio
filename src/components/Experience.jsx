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
              color: "#221E16",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{
                width: 32, height: 32,
                background: "#9C7A2A",
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
                <span className="resume-date" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {job.period}
                </span>
                <h4 className="resume-role">{job.role}</h4>
                <p className="resume-place">
                  {job.website ? (
                    <a href={job.website} target="_blank" rel="noopener noreferrer" className="place-link">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )} ·{" "}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", whiteSpace: "nowrap" }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                </p>
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
              color: "#221E16",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <span style={{
                width: 32, height: 32,
                background: "#9C7A2A",
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
                <span className="resume-date" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {edu.period}
                </span>
                <h4 className="resume-role">{edu.degree}</h4>
                <p className="resume-place">
                  {edu.website ? (
                    <a href={edu.website} target="_blank" rel="noopener noreferrer" className="place-link">
                      {edu.school}
                    </a>
                  ) : (
                    edu.school
                  )} ·{" "}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", whiteSpace: "nowrap" }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {edu.location}
                  </span>
                </p>
                {edu.detail && (
                  <ul className="resume-bullets">
                    <li>{edu.detail}</li>
                  </ul>
                )}
              </div>
            ))}

            {/* Certifications */}
            <div style={{ marginTop: "2.5rem" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#221E16", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
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
                    {cert.badge ? (
                      <img
                        src={cert.badge}
                        alt={`${cert.name} badge`}
                        loading="lazy"
                        style={{ width: 40, height: 40, flexShrink: 0, objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                        background: cert.status === "completed" ? "#9C7A2A" : "#d1d5db",
                      }} />
                    )}
                    {cert.name}
                    {cert.status === "in-progress" && (
                      <span style={{ fontSize: "0.7rem", color: "#8A6D1B", fontWeight: 600 }}>In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #experience .place-link {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px dotted currentColor;
          transition: border-bottom-color 0.2s;
        }
        #experience .place-link:hover {
          border-bottom-style: solid;
        }
        @media (max-width: 768px) {
          #experience .exp-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

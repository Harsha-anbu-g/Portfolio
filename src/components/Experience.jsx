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
                {/* Von Restorff: four entries share one treatment; the own product is
                    the odd one out, so a recruiter reads it as a venture, not a job. */}
                {job.ownVenture && (
                  <span className="resume-own-tag">
                    <span aria-hidden="true">★ </span>Own product
                  </span>
                )}
                <h4 className="resume-role">{job.role}</h4>
                <p className="resume-place">
                  {/* Fitts: when the entry has its own links row below, the domain link there
                      is the target. A second link 5px above it would be a duplicate. */}
                  {job.website && !(job.instagram || job.linkedin) ? (
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
                {/* Own-brand surfaces. Only entries that declare social accounts get this
                    row, so employers keep the plain company link they had. */}
                {(job.instagram || job.linkedin) && (
                  <div className="resume-links">
                    {job.website && (
                      <a href={job.website} target="_blank" rel="noopener noreferrer" className="resume-domain">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="9.5" />
                          <path d="M2.5 12h19M12 2.5c2.5 2.6 2.5 16.4 0 19M12 2.5c-2.5 2.6-2.5 16.4 0 19" />
                        </svg>
                        {new URL(job.website).hostname}
                      </a>
                    )}
                    {job.instagram && (
                      <a href={job.instagram} target="_blank" rel="noopener noreferrer" className="resume-social">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        Instagram
                      </a>
                    )}
                    {job.linkedin && (
                      <a href={job.linkedin} target="_blank" rel="noopener noreferrer" className="resume-social">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
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
                {edu.period && (
                  <span className="resume-date" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {edu.period}
                  </span>
                )}
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

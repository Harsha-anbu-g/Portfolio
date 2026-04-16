import profile from "../data/profile";

export default function Projects() {
  const [quiz, risk, docker] = profile.projects;

  return (
    <section id="projects" className="clark-section" style={{ background: "#1d1d1b" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading" style={{ color: "rgba(255,255,255,0.04)" }}>Projects</span>
          <span className="section-label">What I've Built</span>
          <h2 className="section-title" style={{ color: "#fff" }}>My Projects</h2>
        </div>

        {/* Grid: quiz app wide on top, risk + docker below */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

          {/* ── Quiz App — full width ── */}
          <div className="project-card" style={{ gridColumn: "1 / -1", aspectRatio: "16/7" }}>
            <img
              src={quiz.image}
              alt={quiz.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
            <div className="project-overlay" />
            <div className="project-info">
              <p className="project-category">{quiz.tech.join(" · ")}</p>
              <h3 className="project-title">{quiz.title}</h3>
              <div className="project-links">
                {quiz.github && (
                  <a href={quiz.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Risk Game — SVG map card ── */}
          <div className="project-card">
            <img
              src={risk.image}
              alt={risk.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div className="project-overlay" />
            <div className="project-info">
              <p className="project-category">{risk.tech.join(" · ")}</p>
              <h3 className="project-title">{risk.title}</h3>
              <div className="project-links">
                {risk.github && (
                  <a href={risk.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Docker / MPI — logo on dark card ── */}
          <div className="project-card" style={{ background: "#0d1117" }}>
            {/* Dark gradient background */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 30% 40%, rgba(30,90,160,0.25) 0%, #0a0f1a 70%)",
            }} />
            {/* Subtle grid */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(0,120,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,120,212,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }} />
            {/* Docker logo centered */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img
                src={docker.image}
                alt="Docker"
                style={{
                  width: "55%",
                  maxWidth: 220,
                  objectFit: "contain",
                  opacity: 0.75,
                  filter: "drop-shadow(0 0 20px rgba(0,120,212,0.4))",
                }}
              />
            </div>
            <div className="project-overlay" />
            <div className="project-info">
              <p className="project-category">{docker.tech.join(" · ")}</p>
              <h3 className="project-title">{docker.title}</h3>
              <div className="project-links">
                {docker.github && (
                  <a href={docker.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* View all link */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white"
          >
            View All on GitHub
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #projects > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

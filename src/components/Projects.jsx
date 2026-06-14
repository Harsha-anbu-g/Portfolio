import profile from "../data/profile";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function ProjectCard({ project, wide = false }) {
  return (
    <div style={{
      background: "#252523",
      borderRadius: 8,
      overflow: "hidden",
      display: "flex",
      flexDirection: wide ? "row" : "column",
      border: "1px solid rgba(255,255,255,0.07)",
      transition: "border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,109,0,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Image */}
      <div style={{
        flexShrink: 0,
        width: wide ? "55%" : "100%",
        height: wide ? 280 : 200,
        overflow: "hidden",
        background: "#1a1a18",
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: wide ? "2rem" : "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        flex: 1,
      }}>
        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#F96D00",
              background: "rgba(249,109,0,0.1)",
              border: "1px solid rgba(249,109,0,0.25)",
              borderRadius: 3,
              padding: "0.2rem 0.55rem",
            }}>{t}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: wide ? "1.25rem" : "1rem",
          fontWeight: 700,
          color: "#fff",
          margin: 0,
          lineHeight: 1.3,
        }}>{project.title}</h3>

        {/* Description */}
        <p style={{
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.6)",
          margin: 0,
          lineHeight: 1.6,
          flex: 1,
        }}>{project.bullets[0]}</p>

        {/* Links — always visible */}
        <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#fff",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 4,
                padding: "0.45rem 0.9rem",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              <GithubIcon /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#fff",
                background: "#F96D00",
                border: "1px solid #F96D00",
                borderRadius: 4,
                padding: "0.45rem 0.9rem",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <ExternalIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [, quiz, face, docker] = profile.projects;

  return (
    <section id="projects" className="clark-section" style={{ background: "#1d1d1b" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading" style={{ color: "rgba(255,255,255,0.04)" }}>Projects</span>
          <span className="section-label">What I've Built</span>
          <h2 className="section-title" style={{ color: "#fff" }}>More Projects</h2>
        </div>

        {/* Quiz + Face + Docker — three columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
          <ProjectCard project={quiz} />
          <ProjectCard project={face} />
          <ProjectCard project={docker} />
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
        /* Tablet — drop the project grid to two columns */
        @media (max-width: 1000px) {
          #projects > div > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        /* Mobile — stack the grid */
        @media (max-width: 768px) {
          #projects > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

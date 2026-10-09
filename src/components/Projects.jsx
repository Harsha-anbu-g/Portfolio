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

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.5 12h19M12 2.5c2.5 2.6 2.5 16.4 0 19M12 2.5c-2.5 2.6-2.5 16.4 0 19" />
  </svg>
);

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/* The project's own address, shown as readable text under the title. */
const cardDomainStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  alignSelf: "flex-start",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#8A6D1B",
  textDecoration: "none",
  borderBottom: "1px solid rgba(156, 122, 42, 0.4)",
  paddingBottom: "0.08rem",
  marginTop: "-0.35rem",
};

/* Ghost button look, shared by the GitHub link and the icon-only social links. */
const ghostLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "#221E16",
  background: "rgba(34, 30, 22, 0.06)",
  border: "1px solid rgba(34, 30, 22, 0.14)",
  borderRadius: 4,
  padding: "0.55rem 0.95rem",
  minHeight: 40,
  boxSizing: "border-box",
  textDecoration: "none",
  transition: "background 0.2s, border-color 0.2s",
};

const ghostHoverIn = canHover
  ? e => { e.currentTarget.style.background = "rgba(34, 30, 22, 0.14)"; e.currentTarget.style.borderColor = "rgba(34, 30, 22, 0.35)"; }
  : undefined;
const ghostHoverOut = canHover
  ? e => { e.currentTarget.style.background = "rgba(34, 30, 22, 0.06)"; e.currentTarget.style.borderColor = "rgba(34, 30, 22, 0.14)"; }
  : undefined;

function ProjectCard({ project, wide = false, imageFit = "cover" }) {
  const imageLink = project.live || project.github;
  return (
    <div style={{
      background: "#FFFDF9",
      borderRadius: 8,
      overflow: "hidden",
      display: "flex",
      flexDirection: wide ? "row" : "column",
      border: "1px solid rgba(34, 30, 22, 0.06)",
      transition: "border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={canHover ? e => { e.currentTarget.style.borderColor = "rgba(156, 122, 42,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; } : undefined}
      onMouseLeave={canHover ? e => { e.currentTarget.style.borderColor = "rgba(34, 30, 22, 0.06)"; e.currentTarget.style.transform = "translateY(0)"; } : undefined}
    >
      {/* Image — clicking opens the project's live site (or GitHub) */}
      <a
        href={imageLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        style={{
          display: "block",
          flexShrink: 0,
          width: wide ? "55%" : "100%",
          height: wide ? 280 : 200,
          overflow: "hidden",
          background: "#EFE9DD",
          cursor: "pointer",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: imageFit,
            objectPosition: "center",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={canHover ? e => { e.currentTarget.style.transform = "scale(1.04)"; } : undefined}
          onMouseLeave={canHover ? e => { e.currentTarget.style.transform = "scale(1)"; } : undefined}
        />
      </a>

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
              color: "#8A6D1B",
              background: "rgba(156, 122, 42,0.1)",
              border: "1px solid rgba(156, 122, 42,0.25)",
              borderRadius: 3,
              padding: "0.2rem 0.55rem",
            }}>{t}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: wide ? "1.25rem" : "1rem",
          fontWeight: 700,
          color: "#221E16",
          margin: 0,
          lineHeight: 1.3,
        }}>{project.title}</h3>

        {/* Its own address, so the domain is readable and not hidden behind a button */}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="card-domain"
            style={cardDomainStyle}
          >
            <GlobeIcon />
            {new URL(project.live).hostname}
          </a>
        )}

        {/* Description */}
        <p style={{
          fontSize: "0.9rem",
          color: "rgba(34, 30, 22, 0.72)",
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
              className="card-link"
              style={ghostLinkStyle}
              onMouseEnter={ghostHoverIn}
              onMouseLeave={ghostHoverOut}
            >
              <GithubIcon /> GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#FAF7F1",
                background: "#221E16",
                border: "1px solid #221E16",
                borderRadius: 4,
                padding: "0.55rem 0.95rem",
                minHeight: 40,
                boxSizing: "border-box",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={canHover ? e => { e.currentTarget.style.opacity = "0.85"; } : undefined}
              onMouseLeave={canHover ? e => { e.currentTarget.style.opacity = "1"; } : undefined}
            >
              <ExternalIcon /> Open Live Website
            </a>
          )}
          {/* Brand accounts, icon-only so the card stays readable at grid width. */}
          {project.instagram && (
            <a
              href={project.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on Instagram`}
              className="card-link"
              style={{ ...ghostLinkStyle, padding: "0.55rem 0.7rem", minWidth: 40, justifyContent: "center" }}
              onMouseEnter={ghostHoverIn}
              onMouseLeave={ghostHoverOut}
            >
              <InstagramIcon />
            </a>
          )}
          {project.linkedin && (
            <a
              href={project.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on LinkedIn`}
              className="card-link"
              style={{ ...ghostLinkStyle, padding: "0.55rem 0.7rem", minWidth: 40, justifyContent: "center" }}
              onMouseEnter={ghostHoverIn}
              onMouseLeave={ghostHoverOut}
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [towin, quiz, face, docker] = profile.projects;

  return (
    <section id="projects" className="clark-section" style={{ background: "#FAF7F1" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading" style={{ color: "rgba(34, 30, 22, 0.06)" }}>Projects</span>
          <span className="section-label" style={{ color: "#8A6D1B" }}>What I've Built</span>
          <h2 className="section-title" style={{ color: "#221E16" }}>More Projects</h2>
        </div>

        {/* Towinly + Quiz + Face + Docker — 2×2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <ProjectCard project={towin} imageFit="contain" />
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

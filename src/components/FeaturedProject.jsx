import profile from "../data/profile";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function FeaturedProject() {
  const towin = profile.projects[0];
  const [overview, ...details] = towin.bullets;

  const featureTitles = [
    "Progressive Trust Journey",
    "Real-Time & Safety",
    "Event-Driven Backend",
    "AI-Accelerated Workflow",
    "Automated Quality & Security",
    "Production Architecture",
  ];
  const features = details.map((text, i) => ({ title: featureTitles[i] ?? "", text }));

  return (
    <section id="featured" className="featured-section">
      <div className="featured-inner">
        {/* Heading */}
        <div className="featured-head">
          <span className="featured-tag">★ Featured Project</span>
          <h2 className="featured-title">ToWin</h2>
          <p className="featured-subtitle">A Trust-Based Social Platform</p>
        </div>

        {/* Big clickable preview */}
        <a
          href={towin.live}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-preview"
          aria-label="Open ToWin live website"
        >
          <img src={towin.image} alt={towin.title} loading="lazy" decoding="async" />
          <span className="featured-preview-cta">
            Open Live <ExternalIcon />
          </span>
        </a>

        {/* Overview */}
        <p className="featured-overview">{overview}</p>

        {/* Feature details */}
        <div className="featured-features">
          {features.map((f) => (
            <div key={f.title} className="featured-feature">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="featured-tech">
          {towin.tech.map((t) => (
            <span key={t} className="featured-tech-item">{t}</span>
          ))}
        </div>

        {/* Big CTA buttons */}
        <div className="featured-actions">
          <a href={towin.live} target="_blank" rel="noopener noreferrer" className="featured-btn featured-btn-primary">
            <ExternalIcon /> Open Live Website
          </a>
          <a href={towin.github} target="_blank" rel="noopener noreferrer" className="featured-btn featured-btn-ghost">
            <GithubIcon /> View Source
          </a>
        </div>

        {/* Small card → the interactive system-architecture diagram viewer.
            Plain anchor to a static file (public/architecture.html). */}
        <a
          href="/architecture.html"
          target="_blank"
          rel="noopener noreferrer"
          className="featured-arch"
          aria-label="Open the ToWin system architecture diagrams"
        >
          <span className="featured-arch-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="2.5" width="6" height="4" rx="1" />
              <rect x="2.5" y="17.5" width="6" height="4" rx="1" />
              <rect x="15.5" y="17.5" width="6" height="4" rx="1" />
              <path d="M12 6.5v4M5.5 17.5v-3h13v3" />
            </svg>
          </span>
          <span className="featured-arch-text">
            <span className="featured-arch-title">System Architecture</span>
            <span className="featured-arch-sub">Interactive diagrams — request flow, database, trust engine &amp; module maps</span>
          </span>
          <svg className="featured-arch-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        {/* Link to the rest of the projects */}
        <div className="featured-more">
          <a href="#projects" className="featured-more-link">
            More Projects
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .featured-section {
          background: #F3EEE4;
          padding: 5.5rem 0;
          border-top: 1px solid rgba(34, 30, 22, 0.06);
          border-bottom: 1px solid rgba(34, 30, 22, 0.06);
        }
        .featured-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 5%;
        }
        .featured-head {
          text-align: center;
          margin-bottom: 2.75rem;
        }
        .featured-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8A6D1B;
          background: rgba(156, 122, 42,0.1);
          border: 1px solid rgba(156, 122, 42,0.3);
          border-radius: 999px;
          padding: 0.4rem 1.1rem;
          margin-bottom: 1.25rem;
        }
        .featured-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 600;
          color: #221E16;
          margin: 0 0 0.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .featured-subtitle {
          font-size: clamp(1rem, 2.2vw, 1.3rem);
          color: rgba(34, 30, 22, 0.60);
          margin: 0;
          font-weight: 400;
        }
        .featured-preview {
          display: block;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(34, 30, 22, 0.06);
          box-shadow: 0 24px 60px rgba(0,0,0,0.45);
          margin-bottom: 2.75rem;
          background: #EFE9DD;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .featured-preview img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 520px;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s ease;
        }
        @media (hover: hover) {
          .featured-preview:hover {
            transform: translateY(-3px);
            border-color: rgba(156, 122, 42,0.5);
          }
          .featured-preview:hover img {
            transform: scale(1.02);
          }
        }
        .featured-preview-cta {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #FAF7F1;
          background: rgba(22, 19, 16, 0.88);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }
        .featured-overview {
          max-width: 800px;
          margin: 0 auto 3rem;
          text-align: center;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          line-height: 1.75;
          color: rgba(34, 30, 22, 0.72);
        }
        .featured-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .featured-feature {
          background: #FFFDF9;
          border: 1px solid rgba(34, 30, 22, 0.06);
          border-radius: 10px;
          padding: 1.5rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        @media (hover: hover) {
          .featured-feature:hover {
            border-color: rgba(156, 122, 42,0.35);
            transform: translateY(-2px);
          }
        }
        .featured-feature h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #221E16;
          margin: 0 0 0.6rem;
          padding-left: 0.85rem;
          position: relative;
        }
        .featured-feature h3::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.15rem;
          bottom: 0.15rem;
          width: 3px;
          background: #9C7A2A;
          border-radius: 2px;
        }
        .featured-feature p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(34, 30, 22, 0.60);
          margin: 0;
        }
        .featured-tech {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
          max-width: 680px;
          margin: 0 auto 2.75rem;
        }
        .featured-tech-item {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(34, 30, 22, 0.82);
          background: rgba(34, 30, 22, 0.04);
          border: 1px solid rgba(34, 30, 22, 0.12);
          border-radius: 8px;
          padding: 0.45rem 0.9rem;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        @media (hover: hover) {
          .featured-tech-item:hover {
            border-color: rgba(156, 122, 42, 0.55);
            background: rgba(156, 122, 42, 0.08);
            transform: translateY(-1px);
          }
        }
        .featured-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .featured-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.95rem 2.2rem;
          border-radius: 6px;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        @media (hover: hover) {
          .featured-btn:hover {
            transform: translateY(-2px);
          }
        }
        .featured-btn-primary {
          color: #FAF7F1;
          background: #221E16;
          border: 2px solid #221E16;
        }
        .featured-btn-primary:hover {
          background: #3A342A;
          border-color: #3A342A;
        }
        .featured-btn-ghost {
          color: #221E16;
          background: transparent;
          border: 2px solid rgba(34, 30, 22, 0.25);
        }
        .featured-btn-ghost:hover {
          background: rgba(34, 30, 22, 0.14);
          border-color: rgba(34, 30, 22, 0.35);
        }
        .featured-more {
          text-align: right;
          margin-top: 2.5rem;
        }
        .featured-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(34, 30, 22, 0.72);
          text-decoration: none;
          transition: color 0.2s ease, gap 0.2s ease;
        }
        @media (hover: hover) {
          .featured-more-link:hover {
            color: #8A6D1B;
            gap: 0.7rem;
          }
        }

        .featured-arch {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 640px;
          margin: 1.75rem auto 0;
          padding: 1rem 1.25rem;
          background: #FFFDF9;
          border: 1px solid rgba(34, 30, 22, 0.06);
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        @media (hover: hover) {
          .featured-arch:hover {
            transform: translateY(-2px);
            border-color: rgba(156, 122, 42,0.5);
            background: #FFFDF9;
          }
          .featured-arch:hover .featured-arch-arrow {
            transform: translateX(3px);
            color: #8A6D1B;
          }
        }
        .featured-arch-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 9px;
          color: #8A6D1B;
          background: rgba(156, 122, 42,0.1);
          border: 1px solid rgba(156, 122, 42,0.25);
        }
        .featured-arch-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
          text-align: left;
        }
        .featured-arch-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #221E16;
        }
        .featured-arch-sub {
          font-size: 0.82rem;
          line-height: 1.45;
          color: rgba(34, 30, 22, 0.60);
        }
        .featured-arch-arrow {
          flex-shrink: 0;
          margin-left: auto;
          color: rgba(34, 30, 22, 0.55);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .featured-arch,
          .featured-arch-arrow {
            transition: border-color 0.2s ease, color 0.2s ease;
          }
          .featured-arch:hover {
            transform: none;
          }
          .featured-arch:hover .featured-arch-arrow {
            transform: none;
          }
        }

        @media (max-width: 900px) {
          .featured-features {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .featured-section {
            padding: 3.5rem 0;
          }
          .featured-title {
            font-size: 2rem;
          }
          .featured-preview img {
            max-height: 220px;
            object-position: top left;
          }
          .featured-overview {
            font-size: 0.92rem;
          }
          .featured-actions {
            flex-direction: column;
          }
          .featured-btn {
            width: 100%;
            justify-content: center;
          }
          .featured-arch {
            padding: 0.9rem 1rem;
            gap: 0.85rem;
          }
          .featured-arch-sub {
            font-size: 0.78rem;
          }
          .featured-more {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}

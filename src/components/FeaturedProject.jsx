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
  /* Show the domain exactly as registered, derived from the live URL so the two never drift apart. */
  const liveDomain = new URL(towin.live).hostname;

  const featureTitles = [
    "Progressive Trust Journey",
    "Real-Time & Safety",
    "Event-Driven Backend",
    "AI-Accelerated Workflow",
    "Automated Quality & Security",
    "iOS App in TestFlight",
  ];
  const features = details.map((text, i) => ({ title: featureTitles[i] ?? "", text }));

  return (
    <section id="featured" className="featured-section">
      <div className="featured-inner">
        {/* Heading */}
        <div className="featured-head">
          <span className="featured-tag">★ Featured Project</span>
          <h2 className="featured-title">
            <img src="/towin-logo.png" alt="" aria-hidden="true" className="featured-title-logo" />
            Towinly
          </h2>
          <p className="featured-subtitle">Connecting Older People With Younger Helpers Nearby</p>
          <div className="featured-links">
            <a
              href={towin.live}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-domain"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M2.5 12h19M12 2.5c2.5 2.6 2.5 16.4 0 19M12 2.5c-2.5 2.6-2.5 16.4 0 19" />
              </svg>
              {liveDomain}
            </a>
            <span className="featured-links-divider" aria-hidden="true" />
            <a
              href={towin.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-social"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a
              href={towin.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-social"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
          <p className="featured-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            Opens on laptops and phones. The iOS app is in TestFlight.
          </p>
        </div>

        {/* Big clickable preview */}
        <a
          href={towin.live}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-preview"
          aria-label="Open Towinly live website"
        >
          <img src={towin.image} alt={towin.title} loading="lazy" decoding="async" />
          <span className="featured-preview-cta">
            Open Live <ExternalIcon />
          </span>
        </a>

        {/* Project scale — real numbers measured from the Towinly repository */}
        <div className="featured-metrics">
          {towin.metrics.map((m) => (
            <div key={m.label} className="featured-metric">
              <span className="featured-metric-value">{m.value}</span>
              <span className="featured-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
        <p className="featured-metrics-note">{towin.metricsNote}</p>

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
            <GithubIcon /> Web Source
          </a>
          <a href={towin.appGithub} target="_blank" rel="noopener noreferrer" className="featured-btn featured-btn-ghost">
            <GithubIcon /> iOS App Source
          </a>
        </div>

        {/* Small card → the interactive system-architecture diagram viewer.
            Plain anchor to a static file (public/architecture.html). */}
        <a
          href="/architecture.html"
          target="_blank"
          rel="noopener noreferrer"
          className="featured-arch"
          aria-label="Open the Towinly system architecture diagrams"
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

        {/* Matching card → the walkthrough video, played on LinkedIn. */}
        <a
          href={towin.video}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-arch featured-arch-video"
          aria-label="Watch the Towinly walkthrough video on LinkedIn"
        >
          <span className="featured-arch-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="M10.2 9.3l4.6 2.7-4.6 2.7z" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span className="featured-arch-text">
            <span className="featured-arch-title">Watch the Walkthrough</span>
            <span className="featured-arch-sub">12-minute demo on LinkedIn — the trust ladder, messaging &amp; SOS flow in action</span>
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3em;
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 600;
          color: #221E16;
          margin: 0 0 0.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        /* Towinly turtle mark — sized in em so it tracks the title on mobile */
        .featured-title-logo {
          width: 1em;
          height: 1em;
          border-radius: 22%;
          background: #FFFFFF;
          border: 1px solid rgba(34, 30, 22, 0.1);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }
        .featured-subtitle {
          font-size: clamp(1rem, 2.2vw, 1.3rem);
          color: rgba(34, 30, 22, 0.60);
          margin: 0;
          font-weight: 400;
        }
        /* Domain + social row. Wraps to its own lines on narrow screens. */
        .featured-links {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.4rem 1.1rem;
          margin-top: 0.85rem;
        }
        .featured-domain {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #8A6D1B;
          text-decoration: none;
          border-bottom: 1px solid rgba(156, 122, 42, 0.4);
          padding-bottom: 0.12rem;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .featured-domain svg {
          flex-shrink: 0;
        }
        @media (hover: hover) {
          .featured-domain:hover {
            color: #221E16;
            border-color: rgba(34, 30, 22, 0.55);
          }
        }
        .featured-links-divider {
          width: 1px;
          height: 0.95rem;
          background: rgba(34, 30, 22, 0.18);
        }
        /* Towinly's own brand accounts. Quieter than the domain so it stays primary. */
        .featured-social {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(34, 30, 22, 0.62);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .featured-social svg {
          flex-shrink: 0;
        }
        @media (hover: hover) {
          .featured-social:hover {
            color: #8A6D1B;
          }
        }
        .featured-note {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin: 0.9rem auto 0;
          font-size: 0.8rem;
          font-weight: 500;
          color: #8A6D1B;
          background: rgba(156, 122, 42, 0.1);
          border: 1px solid rgba(156, 122, 42, 0.28);
          border-radius: 999px;
          padding: 0.4rem 0.95rem;
          line-height: 1.4;
        }
        .featured-note svg {
          flex-shrink: 0;
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
        /* Scale strip. The 1px grid gap doubles as the hairline between cells. */
        .featured-metrics {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1px;
          background: rgba(34, 30, 22, 0.10);
          border: 1px solid rgba(34, 30, 22, 0.10);
          border-radius: 10px;
          overflow: hidden;
        }
        .featured-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 1.2rem 0.5rem;
          background: #FFFDF9;
          text-align: center;
        }
        .featured-metric-value {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2.6vw, 1.9rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.01em;
          color: #8A6D1B;
        }
        .featured-metric-label {
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.35;
          color: rgba(34, 30, 22, 0.55);
        }
        .featured-metrics-note {
          text-align: center;
          font-size: 0.8rem;
          line-height: 1.55;
          color: rgba(34, 30, 22, 0.52);
          margin: 0.9rem auto 2.75rem;
          max-width: 620px;
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
        /* Sits directly under the architecture card, so the two read as a pair. */
        .featured-arch-video { margin-top: 0.75rem; }
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
          .featured-metrics {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .featured-section {
            padding: 3.5rem 0;
          }
          .featured-title {
            font-size: 2rem;
          }
          /* The row wraps on phones, where a vertical rule reads as a stray mark. */
          .featured-links-divider {
            display: none;
          }
          .featured-links {
            gap: 0.35rem 0.9rem;
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
          .featured-metric {
            padding: 1rem 0.4rem;
          }
          .featured-metrics-note {
            font-size: 0.76rem;
            margin-bottom: 2.25rem;
          }
        }
        @media (max-width: 520px) {
          .featured-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

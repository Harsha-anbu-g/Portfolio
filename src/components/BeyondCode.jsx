import profile from "../data/profile";

const { reading, travel, fitness, sports, journaling, languages, funDetail, contentCreation } =
  profile.beyondCode;

const levelStyle = {
  Fluent:   { bg: "rgba(34,197,94,0.12)",  color: "#15803d", border: "rgba(34,197,94,0.25)" },
  Moderate: { bg: "rgba(234,179,8,0.12)",  color: "#a16207", border: "rgba(234,179,8,0.25)" },
  Learning: { bg: "rgba(59,130,246,0.12)", color: "#1d4ed8", border: "rgba(59,130,246,0.25)" },
};

/* Shared 24-viewbox stroke icon */
const Icon = ({ size = 18, color = "#9C7A2A", width = 2, children, style }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0, ...style }}
  >
    {children}
  </svg>
);

const paths = {
  bookOpen: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  bookClosed: (
    <>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </>
  ),
  pin: (
    <>
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  translate: <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />,
  heart: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
  board: <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />,
  pencil: <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  crown: (
    <>
      <path d="M4 17L3 8l5 3 4-7 4 7 5-3-1 9H4z" />
      <path d="M5 21h14" />
    </>
  ),
  racket: (
    <>
      <ellipse cx="13.5" cy="9.5" rx="4.8" ry="6.3" transform="rotate(45 13.5 9.5)" />
      <path d="M9 14L3.5 19.5" />
      <circle cx="5.5" cy="8" r="1.4" />
    </>
  ),
  coffee: (
    <>
      <path d="M17 8h1a4 4 0 010 8h-1M3 8h14v6a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <path d="M7 3v2m4-2v2" />
    </>
  ),
  camera: (
    <>
      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  external: <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />,
};

const InstagramGlyph = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

function Block({ area, icon, title, meta, children }) {
  return (
    <div className="bc-block" style={{ gridArea: area }}>
      <div className="bc-head">
        <Icon>{icon}</Icon>
        <h3 className="bc-title">{title}</h3>
        {meta && <span className="bc-meta">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

const chip = (label) => (
  <span key={label} className="bc-chip">{label}</span>
);

export default function BeyondCode() {
  const placeCount = Object.values(travel.places).reduce((n, cities) => n + cities.length, 0);
  const countryCount = Object.keys(travel.places).length;

  return (
    <section id="beyond-code" className="clark-section" style={{ background: "#FAF7F1" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>

        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading">Life</span>
          <span className="section-label">Off The Clock</span>
          <h2 className="section-title">Beyond Code</h2>
          <p style={{ fontSize: "0.9rem", color: "#6E6659", marginTop: "-0.5rem" }}>
            The habits, interests and values that shape how I think and work.
          </p>
        </div>

        {/* Bento grid */}
        <div className="bc-grid">

          {/* ── Reading ── */}
          <Block area="reading" icon={paths.bookOpen} title="Reading" meta={`${reading.books.length} books`}>
            <p className="bc-intro">{reading.intro}</p>
            <div>
              {reading.books.map((b) => (
                <div key={b.title} className="bc-book">
                  <Icon size={13} width={1.8} color="rgba(156, 122, 42, 0.8)" style={{ marginTop: 3 }}>
                    {paths.bookClosed}
                  </Icon>
                  <div>
                    <p className="bc-book-title">{b.title}</p>
                    <p className="bc-book-author">{b.author}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="bc-note">{reading.note}</p>
          </Block>

          {/* ── Travel ── */}
          <Block area="travel" icon={paths.pin} title="Travel" meta={`${placeCount} places · ${countryCount} countries`}>
            <p className="bc-intro">{travel.intro}</p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {Object.entries(travel.places).map(([country, cities]) => (
                <div key={country} style={{ flex: "1 1 200px" }}>
                  <p className="bc-country">
                    <Icon size={12} width={2.2}>{paths.pin}</Icon>
                    {country}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {cities.map(chip)}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bc-link"
            >
              <InstagramGlyph size={13} />
              Travel moments on Instagram
            </a>
          </Block>

          {/* ── Languages ── */}
          <Block area="langs" icon={paths.translate} title="Languages" meta={`${languages.length}`}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {languages.map((lang) => {
                const s = levelStyle[lang.level] || levelStyle.Learning;
                return (
                  <div key={lang.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "rgba(34, 30, 22, 0.85)" }}>
                      {lang.name}
                    </span>
                    <span style={{
                      fontSize: "0.68rem", fontWeight: 600,
                      background: s.bg, color: s.color,
                      border: `1px solid ${s.border}`,
                      borderRadius: "999px", padding: "0.18rem 0.6rem",
                    }}>
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </Block>

          {/* ── Sports ── */}
          <Block area="sports" icon={paths.board} title="Sports & Strategy">
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
              <span className="bc-sport">
                <Icon size={15} width={1.8}>{paths.racket}</Icon>
                Badminton
              </span>
              <span className="bc-sport">
                <Icon size={15} width={1.8}>{paths.crown}</Icon>
                Chess
              </span>
            </div>
            <a
              href={sports.chessLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bc-btn"
            >
              <Icon size={13} width={2} color="currentColor">{paths.external}</Icon>
              Chess.com Profile
            </a>
          </Block>

          {/* ── Journaling ── */}
          <Block area="journal" icon={paths.pencil} title="Journaling & Habits">
            <p className="bc-intro">{journaling.note}</p>
            <div style={{ borderRadius: 6, overflow: "hidden", border: "1px solid rgba(34, 30, 22, 0.1)" }}>
              {journaling.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Habit tracker ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 240, objectPosition: "top" }}
                />
              ))}
            </div>
          </Block>

          {/* ── Fitness ── */}
          <Block area="fitness" icon={paths.heart} title="Fitness & Lifestyle">
            <p className="bc-intro">{fitness.intro}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {fitness.activities.map(chip)}
            </div>
            <p className="bc-note">{fitness.note}</p>
          </Block>
        </div>

        {/* ── Closing strip ── */}
        <div className="bc-closing">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <p className="bc-closing-line" style={{ fontSize: "0.92rem", fontWeight: 500, color: "rgba(34, 30, 22, 0.8)" }}>
              <Icon size={15} width={1.8}>{paths.coffee}</Icon>
              {funDetail}
            </p>
            <p className="bc-closing-line" style={{ fontSize: "0.85rem", color: "rgba(34, 30, 22, 0.6)", maxWidth: 560 }}>
              <Icon size={15} width={1.8}>{paths.camera}</Icon>
              {contentCreation}
            </p>
          </div>

          <a
            href={profile.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bc-btn bc-btn-lg"
          >
            <InstagramGlyph size={17} />
            Connect on Instagram
          </a>
        </div>
      </div>

      <style>{`
        .bc-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: 1.05fr 0.95fr 1fr;
          grid-template-areas:
            "reading travel  travel"
            "reading langs   sports"
            "journal fitness fitness";
        }
        .bc-block {
          background: #FFFDF9;
          border: 1px solid rgba(34, 30, 22, 0.08);
          border-radius: 8px;
          padding: 1.6rem;
          transition: border-color 0.25s ease;
        }
        @media (hover: hover) {
          .bc-block:hover {
            border-color: rgba(156, 122, 42, 0.4);
          }
        }
        .bc-head {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.1rem;
        }
        .bc-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #221E16;
          margin: 0;
          letter-spacing: 0.01em;
        }
        .bc-meta {
          margin-left: auto;
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(34, 30, 22, 0.5);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .bc-intro {
          font-size: 0.875rem;
          color: rgba(34, 30, 22, 0.65);
          line-height: 1.7;
          margin: 0 0 1.1rem;
        }
        .bc-note {
          font-size: 0.75rem;
          font-style: italic;
          color: rgba(34, 30, 22, 0.55);
          line-height: 1.6;
          margin: 1.1rem 0 0;
        }
        .bc-book {
          display: flex;
          gap: 0.65rem;
          align-items: flex-start;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(34, 30, 22, 0.07);
        }
        .bc-book:last-child {
          border-bottom: none;
        }
        .bc-book-title {
          font-size: 0.84rem;
          font-weight: 600;
          color: #221E16;
          margin: 0;
          line-height: 1.35;
        }
        .bc-book-author {
          font-size: 0.72rem;
          color: rgba(34, 30, 22, 0.55);
          margin: 0.15rem 0 0;
        }
        .bc-country {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8A6D1B;
          margin: 0 0 0.6rem;
        }
        .bc-chip {
          display: inline-block;
          padding: 0.3rem 0.7rem;
          background: rgba(34, 30, 22, 0.04);
          border: 1px solid rgba(34, 30, 22, 0.12);
          border-radius: 3px;
          font-size: 0.76rem;
          font-weight: 500;
          color: rgba(34, 30, 22, 0.8);
        }
        .bc-sport {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          background: rgba(156, 122, 42, 0.08);
          border: 1px solid rgba(156, 122, 42, 0.25);
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #221E16;
        }
        .bc-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #8A6D1B;
          text-decoration: none;
          margin-top: 1.1rem;
        }
        @media (hover: hover) {
          .bc-link:hover {
            text-decoration: underline;
          }
        }
        .bc-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #221E16;
          text-decoration: none;
          background: rgba(34, 30, 22, 0.05);
          border: 1px solid rgba(34, 30, 22, 0.18);
          border-radius: 4px;
          padding: 0.5rem 1rem;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        @media (hover: hover) {
          .bc-btn:hover {
            background: rgba(34, 30, 22, 0.1);
            border-color: rgba(34, 30, 22, 0.35);
          }
        }
        .bc-btn-lg {
          font-size: 0.875rem;
          padding: 0.85rem 1.8rem;
          border-color: rgba(34, 30, 22, 0.35);
        }
        .bc-closing {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(34, 30, 22, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .bc-closing-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 1000px) {
          .bc-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "reading travel"
              "reading langs"
              "journal sports"
              "journal fitness";
          }
        }
        @media (max-width: 640px) {
          .bc-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "reading"
              "travel"
              "langs"
              "fitness"
              "sports"
              "journal";
          }
          .bc-block {
            padding: 1.35rem;
          }
          .bc-closing {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bc-block, .bc-btn {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

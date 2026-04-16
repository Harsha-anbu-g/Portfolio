import profile from "../data/profile";

const { reading, travel, fitness, sports, journaling, languages, funDetail } =
  profile.beyondCode;

const levelStyle = {
  Fluent:   { bg: "rgba(34,197,94,0.12)",  color: "#16a34a", border: "rgba(34,197,94,0.25)" },
  Moderate: { bg: "rgba(234,179,8,0.12)",  color: "#b45309", border: "rgba(234,179,8,0.25)" },
  Learning: { bg: "rgba(59,130,246,0.12)", color: "#2563eb", border: "rgba(59,130,246,0.25)" },
};

function BeyondCard({ icon, title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "6px",
      padding: "1.75rem",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        marginBottom: "1.25rem",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "#F96D00",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: "0.75rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#F96D00",
        }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

const tag = (label, key) => (
  <span key={key} style={{
    display: "inline-block",
    padding: "0.3rem 0.75rem",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "3px",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.75)",
  }}>
    {label}
  </span>
);

export default function BeyondCode() {
  return (
    <section id="beyond-code" className="clark-section" style={{ background: "#131311" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>

        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading" style={{ color: "rgba(255,255,255,0.04)" }}>Life</span>
          <span className="section-label">Off The Clock</span>
          <h2 className="section-title" style={{ color: "#fff" }}>Beyond Code</h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", marginTop: "-0.5rem" }}>
            The habits, interests and values that shape how I think and work.
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>

          {/* ── Reading ── */}
          <BeyondCard title="Reading" icon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem", lineHeight: 1.7 }}>
              {reading.intro}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {reading.books.map((b) => (
                <div key={b.title} style={{
                  padding: "0.6rem 0.9rem",
                  background: "rgba(99,102,241,0.07)",
                  borderLeft: "2px solid #F96D00",
                  borderRadius: "0 3px 3px 0",
                }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", marginBottom: "0.1rem" }}>{b.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>by {b.author}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: "rgba(255,255,255,0.3)", marginTop: "1rem", lineHeight: 1.6 }}>
              {reading.note}
            </p>
          </BeyondCard>

          {/* ── Travel ── */}
          <BeyondCard title="Travel" icon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              {travel.intro}
            </p>
            {Object.entries(travel.places).map(([country, cities]) => (
              <div key={country} style={{ marginBottom: "1.1rem" }}>
                <p style={{
                  fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.12em", color: "#F96D00", marginBottom: "0.6rem",
                }}>
                  {country}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {cities.map((c) => tag(c, c))}
                </div>
              </div>
            ))}
            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontSize: "0.78rem", fontWeight: 600, color: "#F96D00",
                textDecoration: "none", marginTop: "0.75rem",
              }}
            >
              Travel moments on Instagram →
            </a>
          </BeyondCard>

          {/* ── Languages ── */}
          <BeyondCard title="Languages" icon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          }>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {languages.map((lang) => {
                const s = levelStyle[lang.level] || levelStyle.Learning;
                return (
                  <div key={lang.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
                      {lang.name}
                    </span>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 600,
                      background: s.bg, color: s.color,
                      border: `1px solid ${s.border}`,
                      borderRadius: "999px", padding: "0.2rem 0.65rem",
                    }}>
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </BeyondCard>

          {/* ── Fitness ── */}
          <BeyondCard title="Fitness & Lifestyle" icon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem", lineHeight: 1.7 }}>
              {fitness.intro}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
              {fitness.activities.map((a) => tag(a, a))}
            </div>
            <p style={{ fontSize: "0.78rem", fontStyle: "italic", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
              {fitness.note}
            </p>
          </BeyondCard>

          {/* ── Sports ── */}
          <BeyondCard title="Sports & Strategy" icon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
          }>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {sports.items.map((s) => (
                <div key={s} style={{
                  padding: "0.75rem 1.25rem",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "4px",
                  fontSize: "0.875rem", fontWeight: 600, color: "#fff",
                }}>
                  {s}
                </div>
              ))}
            </div>
            <a
              href={sports.chessLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontSize: "0.82rem", fontWeight: 600,
                color: "#fff", textDecoration: "none",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "3px",
                padding: "0.5rem 1rem",
                transition: "background 0.2s",
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Chess.com Profile
            </a>
          </BeyondCard>

          {/* ── Journaling ── */}
          <BeyondCard title="Journaling & Habits" icon={
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: "1.25rem", lineHeight: 1.7 }}>
              {journaling.note}
            </p>
            <div style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              {journaling.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Habit tracker ${i + 1}`}
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                />
              ))}
            </div>
          </BeyondCard>
        </div>

        {/* ── Fun detail + Instagram CTA ── */}
        <div style={{
          marginTop: "3rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: "1rem", fontWeight: 500,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.05em",
          }}>
            ☕ {funDetail}
          </p>

          <a
            href={profile.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.65rem",
              padding: "0.85rem 2rem",
              borderRadius: "4px",
              fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "none",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
          >
            <svg width="18" height="18" fill="rgba(255,255,255,0.65)" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Connect on Instagram
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #beyond-code > div > div:nth-child(3) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #beyond-code > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

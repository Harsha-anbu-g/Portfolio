import profile from "../data/profile";

const semesterColors = {
  "Winter 2025": "#F96D00",
  "Summer 2025": "#F96D00",
  "Fall 2025":   "#F96D00",
  "Winter 2026": "#F96D00",
};

export default function Coursework() {
  return (
    <section id="coursework" className="clark-section" style={{ background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>

        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading">Courses</span>
          <span className="section-label">Concordia University</span>
          <h2 className="section-title">Relevant Coursework</h2>
          <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "-0.5rem" }}>
            Master's in Applied Computer Science — key courses across all semesters
          </p>
        </div>

        {/* Semester blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {profile.coursework.map((sem, si) => {
            const color = semesterColors[sem.semester] || "#F96D00";
            return (
              <div key={si}>
                {/* Semester label */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  marginBottom: "1.25rem",
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: color, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color,
                  }}>
                    {sem.semester}
                  </span>
                  {sem.current && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: "0.4rem",
                      fontSize: "0.7rem", fontWeight: 600,
                      background: "rgba(99,102,241,0.1)",
                      color: "#F96D00",
                      border: "1px solid rgba(99,102,241,0.25)",
                      borderRadius: "999px",
                      padding: "0.2rem 0.75rem",
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "#F96D00",
                        animation: "pulse-dot 2s infinite",
                      }} />
                      Current
                    </span>
                  )}
                  <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.07)" }} />
                </div>

                {/* Course cards */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem",
                }}>
                  {sem.courses.map((course, ci) => (
                    <div
                      key={ci}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1.1rem 1.25rem",
                        border: `1px solid ${sem.current ? "rgba(99,102,241,0.2)" : "rgba(0,0,0,0.08)"}`,
                        borderRadius: "4px",
                        background: sem.current ? "rgba(99,102,241,0.03)" : "#fafaf9",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                        cursor: "default",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = color;
                        e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.06)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = sem.current ? "rgba(99,102,241,0.2)" : "rgba(0,0,0,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Icon circle */}
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                        background: color + "18",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>

                      {/* Text */}
                      <div>
                        <p style={{
                          fontSize: "0.875rem", fontWeight: 600,
                          color: "#1d1d1b", marginBottom: "0.2rem", lineHeight: 1.3,
                        }}>
                          {course.name}
                        </p>
                        <p style={{
                          fontSize: "0.75rem", fontWeight: 500,
                          color, fontFamily: "monospace",
                          letterSpacing: "0.04em",
                        }}>
                          {course.code}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: "3rem",
          padding: "1.25rem 1.5rem",
          background: "rgba(99,102,241,0.05)",
          border: "1px solid rgba(99,102,241,0.15)",
          borderRadius: "4px",
          display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
            background: "#F96D00",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1d1d1b", marginBottom: "0.15rem" }}>
              Completed 40 / 45 credits
            </p>
            <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
              Master of Applied Computer Science · Concordia University, Montreal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

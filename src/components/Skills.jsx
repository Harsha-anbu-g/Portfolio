const skillBars = [
  { name: "Java", percent: 92 },
  { name: "Spring Boot", percent: 89 },
  { name: "React", percent: 85 },
  { name: "JavaScript", percent: 88 },
  { name: "TypeScript", percent: 76 },
  { name: "RESTful APIs", percent: 90 },
  { name: "PostgreSQL / MySQL", percent: 82 },
  { name: "AWS (EC2, S3, IAM)", percent: 70 },
  { name: "Docker", percent: 78 },
  { name: "JUnit & Testing", percent: 81 },
];

export default function Skills() {
  return (
    <section id="skills" className="clark-section" style={{ background: "#f8f6f1" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        {/* Heading */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <span className="ghost-heading">Skills</span>
          <span className="section-label">What I Know</span>
          <h2 className="section-title">My Skills</h2>
        </div>

        {/* Progress bars — two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem" }}>
          {skillBars.map((skill, i) => (
            <div key={i} className="progress-wrap">
              <div className="progress-label">
                <span>{skill.name}</span>
                <span style={{ color: "#1D4ED8" }}>{skill.percent}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    width: `${skill.percent}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges row */}
        <div style={{ marginTop: "3.5rem", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "2.5rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "1rem" }}>
            Also comfortable with
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {["Hibernate", "JDBC", "Spring MVC", "JWT Auth", "Git / GitHub", "CI/CD", "Agile / Scrum", "OOP Design", "Figma", "Power BI", "Alteryx"].map((tag) => (
              <span key={tag} style={{
                display: "inline-block",
                padding: "0.35rem 0.85rem",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "3px",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#555",
                background: "#fff",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #skills > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

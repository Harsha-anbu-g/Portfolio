import { CAST, ROLE_LABEL, WORKED_EXAMPLE, DEMO_NOTE } from "../../data/towinly/cast";
import Icon from "../icons";

/* The three one-tap demo seats, one card each with its own Try button. `only` narrows the
   cards to one role on the Helpers and Family tabs. */
export default function DemoCast({ only = "all" }) {
  const people = only === "all" ? CAST : CAST.filter((p) => p.role === only);

  return (
    <div className="cast">
      <ul className="cast-grid">
        {people.map((p) => (
          <li key={p.role} className="cast-card">
            <span className={`role role-${p.role}`}>{ROLE_LABEL[p.role]}</span>
            <strong>{p.name}{p.age ? `, ${p.age}` : ""}</strong>
            <span className="cast-city"><Icon name="globe" size={14} /> {p.city}</span>
            <span className="cast-line">{p.line}</span>
            <a className="btn-ink" href={p.href} target="_blank" rel="noopener noreferrer">
              {p.tryLabel}
            </a>
          </li>
        ))}
      </ul>
      <p className="cast-note">{DEMO_NOTE}</p>
      {only === "all" && (
        <div className="cast-example">
          <h4>A worked example on the demo</h4>
          {WORKED_EXAMPLE.map((p) => <p key={p}>{p}</p>)}
        </div>
      )}
    </div>
  );
}

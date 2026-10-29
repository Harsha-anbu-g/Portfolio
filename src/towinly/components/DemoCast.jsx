import { useState } from "react";
import { CAST, ROLE_LABEL, TRY_LINKS, WORKED_EXAMPLE, DEMO_NOTE } from "../../data/towinly/cast";
import Icon from "../icons";

const FILTERS = [
  { key: "all", label: "Everyone" },
  { key: "elder", label: "Elders" },
  { key: "helper", label: "Helpers" },
  { key: "family", label: "Family" },
];

export default function DemoCast({ only = "all" }) {
  const [filter, setFilter] = useState(only);
  const people = filter === "all" ? CAST : CAST.filter((p) => p.role === filter);
  const tries = only === "all" ? TRY_LINKS : TRY_LINKS.filter((t) => t.role === only);

  return (
    <div className="cast">
      <div className="cast-try">
        {tries.map((t) => (
          <a key={t.role} className="btn-ink" href={t.href} target="_blank" rel="noopener noreferrer">
            {t.label}
            <span className="btn-ink-sub">{t.who}</span>
          </a>
        ))}
      </div>
      <p className="cast-note">{DEMO_NOTE}</p>
      {only === "all" && (
        <div className="cast-example">
          <h4>A worked example on the demo</h4>
          {WORKED_EXAMPLE.map((p) => <p key={p}>{p}</p>)}
        </div>
      )}
      <div className="cast-filters" role="group" aria-label="Show">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" className="chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <ul className="cast-grid">
        {people.map((p) => (
          <li key={p.name + p.role} className="cast-card">
            <span className={`role role-${p.role}`}>{ROLE_LABEL[p.role]}</span>
            <strong>{p.name}{p.age ? `, ${p.age}` : ""}</strong>
            <span className="cast-city"><Icon name="globe" size={14} /> {p.city}</span>
            <span className="cast-line">{p.line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { CAST, ROLE_LABEL } from "../../data/towinly/cast";
import Icon from "../icons";

/* The three one-tap demo seats, one row each with its own Try button. `only` narrows the
   rows to one role on the Helpers and Family tabs. */
export default function DemoCast({ only = "all" }) {
  const people = only === "all" ? CAST : CAST.filter((p) => p.role === only);
  return (
    <ul className="cast-grid">
      {people.map((p, i) => (
        <li key={p.role} className="cast-card" style={{ "--i": i }}>
          <span className="cast-who">
            <span className={`role role-${p.role}`}>{ROLE_LABEL[p.role]}</span>
            <strong>
              {p.name}
              {p.age ? `, ${p.age}` : ""}
            </strong>
            <span className="cast-city">
              <Icon name="globe" size={14} /> {p.city}
            </span>
            <span className="cast-line">{p.line}</span>
          </span>
          <a className="btn-ink" href={p.href} target="_blank" rel="noopener noreferrer">
            {p.tryLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}

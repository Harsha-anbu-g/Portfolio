import { FACTS } from "../../data/towinly/facts";

export default function StatTiles() {
  return (
    <ul className="stat-tiles">
      {FACTS.map((fact) => (
        <li key={fact.label} className="stat-tile">
          <span className="stat-tile-value">{fact.value}</span>
          <span className="stat-tile-label">{fact.label}</span>
          <span className="stat-tile-asof">as of {fact.asOf}</span>
        </li>
      ))}
    </ul>
  );
}

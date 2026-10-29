import { useState } from "react";
import { SCORE_PARTS, SCORE_MAX, SCORE_TIERS } from "../../data/towinly/score";

/* Tap the three parts of a Trust Score and watch the 15 cells fill. */
export default function TrustScoreMeter() {
  const [on, setOn] = useState(() => Object.fromEntries(SCORE_PARTS.map((p) => [p.key, false])));
  const total = SCORE_PARTS.reduce((sum, p) => sum + (on[p.key] ? p.points : 0), 0);
  const toggle = (key) => setOn((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="score">
      <div className="score-parts">
        {SCORE_PARTS.map((part) => (
          <button
            key={part.key}
            type="button"
            className="score-part"
            aria-pressed={on[part.key]}
            onClick={() => toggle(part.key)}
          >
            <span className="score-points">+{part.points}</span>
            <span className="score-title">{part.title}</span>
            <span className="score-body">{part.body}</span>
          </button>
        ))}
      </div>
      <div className="score-bar" role="img" aria-label={`${total} of ${SCORE_MAX} points`}>
        {Array.from({ length: SCORE_MAX }, (_, i) => (
          <span key={i} className="score-cell" data-on={i < total} />
        ))}
      </div>
      <p className="score-formula" aria-live="polite">
        <strong>{total}</strong> of {SCORE_MAX}. Three plus seven plus five: up to 15 points per person you help.
      </p>
      <dl className="score-tiers">
        {SCORE_TIERS.map((tier) => (
          <div key={tier.name}>
            <dt>{tier.name}</dt>
            <dd>{tier.range}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

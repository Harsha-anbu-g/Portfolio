import { useRef, useState } from "react";
import { LADDER, LADDER_RULE, LADDER_COUNT } from "../../data/towinly/ladder";

/* The seven steps as a tap-through. One rung at a time, so a reader learns what each
   step is and what it opens, instead of seeing seven words in a row. */
export default function TrustLadder({ compact = false }) {
  const [index, setIndex] = useState(0);
  const refs = useRef([]);
  const rung = LADDER[index];

  const onKeyDown = (event, i) => {
    const next = { ArrowRight: (i + 1) % LADDER_COUNT, ArrowDown: (i + 1) % LADDER_COUNT, ArrowLeft: (i - 1 + LADDER_COUNT) % LADDER_COUNT, ArrowUp: (i - 1 + LADDER_COUNT) % LADDER_COUNT, Home: 0, End: LADDER_COUNT - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    refs.current[next]?.focus();
    setIndex(next);
  };

  return (
    <div className={`ladder${compact ? " ladder-compact" : ""}`}>
      <div className="rungs" role="tablist" aria-label="The seven steps of the Trust Ladder">
        {LADDER.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`rung-${r.id}`}
            aria-selected={i === index}
            aria-controls="rung-panel"
            tabIndex={i === index ? 0 : -1}
            className="rung"
            data-done={i < index}
            onClick={() => setIndex(i)}
            onKeyDown={(event) => onKeyDown(event, i)}
          >
            <span className="rung-num" aria-hidden="true">{i + 1}</span>
            <span className="rung-name">{r.name}</span>
          </button>
        ))}
      </div>
      <div className="rung-panel" id="rung-panel" role="tabpanel" aria-labelledby={`rung-${rung.id}`} aria-live="polite">
        <p className="rung-stage">Step {index + 1} of {LADDER_COUNT}</p>
        <h4>{rung.name}</h4>
        <p>{rung.what}</p>
        <p className="rung-unlock"><strong>What opens:</strong> {rung.unlocks}</p>
        {!compact && <p className="rung-rule">{LADDER_RULE}</p>}
      </div>
    </div>
  );
}

import { useRef, useState } from "react";
import { LADDER, LADDER_RULE, LADDER_COUNT } from "../../data/towinly/ladder";

const STEP_KEYS = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 };

/* A real ladder, climbed from the bottom: Just Connected is the first rung and Fully Trusted
   the top one. The rails fill up to the rung you pick. Arrow up climbs, arrow down steps back. */
export default function TrustLadder({ compact = false }) {
  const [index, setIndex] = useState(0);
  const refs = useRef([]);
  const rung = LADDER[index];

  const onKeyDown = (event, i) => {
    let target;
    if (event.key in STEP_KEYS) target = i + STEP_KEYS[event.key];
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = LADDER_COUNT - 1;
    else return;
    event.preventDefault();
    target = Math.max(0, Math.min(LADDER_COUNT - 1, target));
    refs.current[target]?.focus();
    setIndex(target);
  };

  return (
    <div className={`ladder${compact ? " ladder-compact" : ""}`}>
      <div className="ladder-frame">
        <div className="rungs-wrap">
          <span className="ladder-rails" aria-hidden="true" />
          <span className="ladder-climb" aria-hidden="true" style={{ transform: `scaleY(${(index + 1) / LADDER_COUNT})` }} />
          <div className="rungs" role="tablist" aria-orientation="vertical" aria-label="The seven steps of the Trust Ladder, from the bottom up">
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
                style={{ "--i": i }}
                onClick={() => setIndex(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <span className="rung-bar" aria-hidden="true" />
                <span className="rung-num" aria-hidden="true">{i + 1}</span>
                <span className="rung-name">{r.name}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="ladder-start" aria-hidden="true">Start here</p>
      </div>
      <div className="rung-panel" id="rung-panel" role="tabpanel" aria-labelledby={`rung-${rung.id}`} aria-live="polite">
        <p className="rung-stage">Step {index + 1} of {LADDER_COUNT}</p>
        <h4>{rung.name}</h4>
        <p>{rung.what}</p>
        <p className="rung-unlock">
          <strong>What opens:</strong> {rung.unlocks}
        </p>
        {!compact && <p className="rung-rule">{LADDER_RULE}</p>}
      </div>
    </div>
  );
}

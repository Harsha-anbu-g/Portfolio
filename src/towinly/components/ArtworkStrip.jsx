import { useState } from "react";
import { PROBLEM_RUN, ORIGIN_RUN, ONLINE_ROW } from "../../data/towinly/artworks";
import { TOWINLY_INSTAGRAM } from "../../data/towinly/links";

const SETS = { problem: PROBLEM_RUN, origin: ORIGIN_RUN, online: ONLINE_ROW };

function Artwork({ art, eager = false }) {
  return (
    <img
      src={`/towinly/social/${art.file}.webp`}
      width={art.w}
      height={art.h}
      alt={art.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

/* The problem run: four cards, each opens its caption with a tap. */
function ProblemStrip() {
  const [open, setOpen] = useState(null);
  return (
    <div className="art-strip">
      {PROBLEM_RUN.map((art) => {
        const isOpen = open === art.post;
        return (
          <article key={art.post} className="art-card" data-open={isOpen}>
            <Artwork art={art} />
            <h4>{art.title}</h4>
            <button type="button" className="chip" aria-expanded={isOpen} aria-controls={`art-${art.post}`} onClick={() => setOpen(isOpen ? null : art.post)}>
              {isOpen ? "Close" : "Read it"}
            </button>
            <div id={`art-${art.post}`} className="art-caption" hidden={!isOpen}>
              {art.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* "How Towinly began": six parts, artwork beside the full caption, nothing hidden. */
function OriginRun() {
  return (
    <ol className="origin-run">
      {ORIGIN_RUN.map((art) => (
        <li key={art.post} className="origin-part">
          <div className="origin-art"><Artwork art={art} /></div>
          <div className="origin-text">
            <p className="page-eyebrow">Part {art.part} of 6</p>
            <h4>{art.title}</h4>
            {art.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* The row at the end: each artwork opens the Instagram account. */
function OnlineRow() {
  return (
    <ul className="online-row">
      {ONLINE_ROW.map((art) => (
        <li key={art.post}>
          <a href={TOWINLY_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label={`${art.title} on Instagram`}>
            <Artwork art={art} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ArtworkStrip({ set }) {
  if (!SETS[set]) return null;
  if (set === "problem") return <ProblemStrip />;
  if (set === "origin") return <OriginRun />;
  return <OnlineRow />;
}

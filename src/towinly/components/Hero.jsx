import { photo, photoSrc } from "../../data/towinly/photos";

const COLLAGE = ["walk-autumn-pair", "teapot-two-cups", "sprout-hands"].map(photo);

export default function Hero({ compact, onHome }) {
  return (
    <header className="page-hero page-wrap" data-compact={compact}>
      <div className="hero-text">
        <img src="/towin-logo.png" width="64" height="64" alt="" className="page-mark" />
        <p className="page-eyebrow">A page about one app</p>
        <h1>Why Towinly</h1>
        <p className="tagline">
          It takes <em>two</em> To Win.
        </p>
        <p className="page-lead">
          Towinly connects elders with younger helpers nearby, and makes trust grow one step at a
          time. Pick who you are, then swipe through the cards.
        </p>
        {compact && (
          <button type="button" className="page-choose-again" onClick={onHome}>
            Choose who you are
          </button>
        )}
      </div>
      {!compact && (
        <div className="hero-collage" aria-hidden="true">
          {COLLAGE.map((p, i) => (
            <img
              key={p.file}
              className={`collage-img collage-${i}`}
              src={photoSrc(p.file)}
              width={p.w}
              height={p.h}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
      )}
    </header>
  );
}

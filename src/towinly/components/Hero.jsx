export default function Hero({ compact, onHome }) {
  return (
    <header className="page-hero page-wrap" data-compact={compact}>
      <img src="/towin-logo.png" width="72" height="72" alt="" className="page-mark" />
      <p className="page-eyebrow">A page about one app</p>
      <h1>Why Towinly</h1>
      <p className="tagline">
        It takes <em>two</em> To Win.
      </p>
      <p className="page-lead">
        Towinly connects elders with younger helpers nearby, and makes trust grow one step at a
        time. Pick who you are and the page speaks to you.
      </p>
      {compact && (
        <button type="button" className="page-choose-again" onClick={onHome}>
          Choose who you are
        </button>
      )}
    </header>
  );
}

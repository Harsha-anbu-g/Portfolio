const VALUES = [
  "Trust grows slowly: seven steps, and a yes from both at every one.",
  "Neither side shares anything personal until trust has grown.",
  "Either side can pause or stop at any time.",
  "Both sides win.",
];

/* The same closing card every Towinly post and reel ends on. */
export default function ClosingCard() {
  return (
    <div className="closing">
      <img src="/towin-logo.png" width="64" height="64" alt="" />
      <p className="tagline">It takes <em>two</em> To Win.</p>
      <p className="closing-line">Elders and younger helpers, nearby.</p>
      <ul className="closing-values">
        {VALUES.map((v) => <li key={v}>{v}</li>)}
      </ul>
    </div>
  );
}

/* Every card in the tab, numbered, so a reader can jump straight to one. */
export default function DeckContents({ cards, current, onPick }) {
  return (
    <ol className="contents">
      {cards.map((card, i) => (
        <li key={card.id}>
          <button
            type="button"
            className="contents-item"
            aria-current={i === current ? "true" : undefined}
            onClick={() => onPick(card.id)}
          >
            <span className="contents-num">{i + 1}</span>
            <span className="contents-title">{card.title}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

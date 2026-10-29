import { forwardRef } from "react";
import Visual from "./Visual";
import Icon from "../icons";

/* One card: a label, a title, a line or two, and one picture. The rest of the words wait
   behind Read more, so the card reads at a glance. */
const Card = forwardRef(function Card({ card, dir, headingRef, onMore, dragHandlers }, ref) {
  return (
    <article
      ref={ref}
      className="card"
      data-dir={dir}
      aria-roledescription="card"
      aria-label={`${card.index + 1} of ${card.total}: ${card.title}`}
      {...dragHandlers}
    >
      <div className="card-words">
        <p className="card-eyebrow">{card.label}</p>
        <h2 ref={headingRef} tabIndex={-1} className="card-title">{card.title}</h2>
        <div className="card-lead">
          {card.lead.filter(Boolean).map((p) => <p key={p}>{p}</p>)}
        </div>
        {(card.sheet || card.html || card.links.length > 0) && (
          <div className="card-actions">
            {(card.sheet || card.html) && (
              <button type="button" className="btn-more" onClick={onMore}>
                Read more <Icon name="plus" size={16} />
              </button>
            )}
            {card.links.map((link) => {
              const outside = link.href.startsWith("http");
              return (
                <a key={link.href} className="card-link" href={link.href} {...(outside ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
      <Visual card={card} />
    </article>
  );
});

export default Card;

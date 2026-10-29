import { useCallback, useEffect, useRef, useState } from "react";
import { DECKS } from "../../data/towinly/deck";
import { TABS, TAB_DATA } from "../../data/towinly/tabs";
import { photoSrc } from "../../data/towinly/photos";
import Card from "./Card";
import Sheet from "./Sheet";
import DeckContents from "./DeckContents";
import AiHtml from "./AiHtml";
import Icon from "../icons";

const SWIPE_DISTANCE = 80; // px
const SWIPE_VELOCITY = 0.11; // px per ms: a quick flick is enough
const EDGE_DAMPING = 0.25; // past the first or last card the card follows the finger less

function imageUrls(card) {
  if (!card) return [];
  const v = card.visual;
  const urls = [];
  if (v.bg) urls.push(photoSrc(v.bg));
  if (v.kind === "photo") urls.push(photoSrc(v.photo));
  if (v.kind === "art") urls.push(`/towinly/social/${v.art.file}.webp`);
  if (v.kind === "shots") urls.push(`/towinly/shots/${v.shots[0]}.webp`);
  return urls;
}

const barHeight = () => document.querySelector(".tabbar")?.offsetHeight ?? 56;

/* One tab as a deck: one card on screen, arrows and a progress bar under it, swipe on touch,
   arrow keys on a keyboard, Read more and All cards as sheets. */
export default function Deck({ tabId, cardId, onCardChange, onNextTab, headingRef, deckRef }) {
  const cards = DECKS[tabId];
  const found = cards.findIndex((c) => c.id === cardId);
  const index = found < 0 ? 0 : found;
  const card = cards[index];
  const tabIndex = TABS.findIndex((t) => t.id === tabId);
  const tab = TABS[tabIndex];
  const nextTab = TABS[tabIndex + 1];
  const isLast = index === cards.length - 1;
  const canNext = !isLast || Boolean(nextTab);

  const [dir, setDir] = useState("none");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const cardRef = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);

  const goTo = useCallback(
    (i, how) => {
      if (i < 0 || i >= cards.length) return;
      setDir(how);
      moved.current = true;
      onCardChange(cards[i].id);
    },
    [cards, onCardChange]
  );

  const next = useCallback(
    (how = "next") => {
      if (!isLast) goTo(index + 1, how);
      else if (nextTab) onNextTab(nextTab.id);
    },
    [goTo, index, isLast, nextTab, onNextTab]
  );

  const prev = useCallback((how = "prev") => goTo(index - 1, how), [goTo, index]);

  // Arrow keys anywhere on the page, except inside a tab list or an open sheet. A key press
  // swaps the card without the slide: keyboard actions repeat and should feel instant.
  useEffect(() => {
    const onKey = (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (sheetOpen || listOpen) return;
      if (event.target.closest?.('[role="tablist"], input, textarea, select, dialog')) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next("key");
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev("key");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, sheetOpen, listOpen]);

  // Load the next card's picture ahead of time so a swipe never waits for it.
  useEffect(() => {
    imageUrls(cards[index + 1]).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [cards, index]);

  // After a change, keep the top of the card in view (on phones a card can be taller than the screen).
  useEffect(() => {
    if (!moved.current || !deckRef.current) return;
    const top = deckRef.current.getBoundingClientRect().top;
    if (top < barHeight()) window.scrollTo({ top: top + window.scrollY - barHeight() - 8, behavior: "instant" });
  }, [index, deckRef]);

  function endDrag(event) {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    if (d.axis !== "x") return;
    const el = cardRef.current;
    el.classList.remove("is-dragging");
    const velocity = Math.abs(d.dx) / Math.max(1, performance.now() - d.t);
    const intent = Math.abs(d.dx) > SWIPE_DISTANCE || velocity > SWIPE_VELOCITY;
    const forward = d.dx < 0;
    if (intent && (forward ? canNext : index > 0)) {
      el.style.transition = "";
      el.style.transform = "";
      if (forward) next("next");
      else prev("prev");
      return;
    }
    el.style.transition = "transform 220ms var(--ease-out)";
    el.style.transform = "";
  }

  // Touch and pen only: on a laptop the arrows and keys do the job, and a mouse drag
  // would fight text selection.
  const dragHandlers = {
    onPointerDown(event) {
      if (event.pointerType === "mouse" || drag.current) return; // a second finger never takes over
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, t: performance.now(), axis: null, dx: 0 };
    },
    onPointerMove(event) {
      const d = drag.current;
      if (!d || d.id !== event.pointerId) return;
      const dx = event.clientX - d.x;
      const dy = event.clientY - d.y;
      if (!d.axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (d.axis === "x") {
          try {
            cardRef.current.setPointerCapture(event.pointerId); // keep the drag even if the finger leaves the card
          } catch {
            // the pointer is already gone; the drag still works without capture
          }
          cardRef.current.style.transition = "none";
          cardRef.current.classList.add("is-dragging");
        }
      }
      if (d.axis !== "x") return;
      const blocked = (dx > 0 && index === 0) || (dx < 0 && !canNext);
      d.dx = dx;
      cardRef.current.style.transform = `translateX(${blocked ? dx * EDGE_DAMPING : dx}px)`;
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };

  const pick = (id) => {
    setListOpen(false);
    setDir("none");
    moved.current = true;
    onCardChange(id);
  };

  return (
    <div className="deck" ref={deckRef} data-accent={tab.accent} data-size={TAB_DATA[tabId].bodySize === "lg" ? "lg" : "md"}>
      <Card
        key={card.id}
        ref={cardRef}
        card={card}
        dir={dir}
        headingRef={headingRef}
        onMore={() => setSheetOpen(true)}
        dragHandlers={dragHandlers}
      />
      <div className="deck-controls">
        <button type="button" className="deck-btn" onClick={() => prev()} disabled={index === 0} aria-label="Previous card">
          <Icon name="back" size={22} />
        </button>
        <div className="deck-progress" aria-hidden="true">
          <span className="deck-count">
            {index + 1} / {cards.length}
          </span>
          <span className="deck-bar">
            <span style={{ transform: `scaleX(${(index + 1) / cards.length})` }} />
          </span>
        </div>
        <button type="button" className="deck-contents" onClick={() => setListOpen(true)}>
          <Icon name="list" size={18} />
          <span>All cards</span>
        </button>
        <button
          type="button"
          className="deck-btn deck-next"
          onClick={() => next()}
          disabled={!canNext}
          aria-label={isLast && nextTab ? `Next: ${nextTab.label}` : "Next card"}
        >
          {isLast && nextTab && <span className="deck-next-label">Next: {nextTab.short}</span>}
          <Icon name="arrow" size={22} />
        </button>
      </div>
      <p className="vh" aria-live="polite">{`Card ${index + 1} of ${cards.length}: ${card.title}`}</p>
      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={card.title} accent={tab.accent}>
        {card.html ? <AiHtml html={card.html} /> : (card.sheet || []).map((p) => <p key={p}>{p}</p>)}
      </Sheet>
      <Sheet open={listOpen} onClose={() => setListOpen(false)} title={`${TAB_DATA[tabId].title}: all cards`} accent={tab.accent}>
        <DeckContents cards={cards} current={index} onPick={pick} />
      </Sheet>
    </div>
  );
}

import { useEffect, useRef } from "react";
import useTabRoute from "./useTabRoute";
import { TABS } from "../data/towinly/tabs";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import ReaderChooser from "./components/ReaderChooser";
import TabBar from "./components/TabBar";
import Deck from "./components/Deck";
import Footer from "./components/Footer";

export default function TowinlyPage() {
  const { tab, section, go, replace, home } = useTabRoute();
  const barRef = useRef(null);
  const deckRef = useRef(null);
  const headingRef = useRef(null);
  const current = TABS.find((t) => t.id === tab);

  // When a tab opens (from the chooser, the bar, or a link), bring its deck to the top under
  // the sticky bar and move focus to the card's title so screen readers follow. Jumps are
  // instant; it runs again once the web fonts are in, since they reflow the text above.
  useEffect(() => {
    if (!tab) return;
    let cancelled = false;
    const place = () => {
      const deck = deckRef.current;
      if (!deck) return;
      const barH = barRef.current?.offsetHeight ?? 56;
      const top = deck.getBoundingClientRect().top + window.scrollY - barH - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    };
    const frame = requestAnimationFrame(() => {
      place();
      headingRef.current?.focus({ preventScroll: true });
      document.fonts?.ready.then(() => {
        if (!cancelled) place();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [tab]);

  return (
    <>
      <TopBar />
      <main className="page" data-accent={current?.accent}>
        <Hero compact={!!tab} onHome={home} />
        <ReaderChooser hidden={!!tab} onSelect={go} />
        <TabBar active={tab} onSelect={go} barRef={barRef} />
        {current && (
          <section className="panel" id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`}>
            <Deck
              key={current.id}
              tabId={current.id}
              cardId={section}
              onCardChange={replace}
              onNextTab={go}
              headingRef={headingRef}
              deckRef={deckRef}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

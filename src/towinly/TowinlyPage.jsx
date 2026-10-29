import { useEffect, useRef } from "react";
import useTabRoute from "./useTabRoute";
import { TABS, TAB_DATA } from "../data/towinly/tabs";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import ReaderChooser from "./components/ReaderChooser";
import TabBar from "./components/TabBar";
import TabPanel from "./components/TabPanel";
import AiTab from "./components/AiTab";
import Footer from "./components/Footer";

export default function TowinlyPage() {
  const { tab, section, go, home } = useTabRoute();
  const barRef = useRef(null);
  const headingRef = useRef(null);
  const current = TABS.find((t) => t.id === tab);

  // After a change: scroll the target into view (the section, or the panel heading so the
  // bar sits at the top) and move focus there so screen readers follow. The scroll runs
  // again once the web fonts are in, because the swap reflows the text above the target.
  useEffect(() => {
    if (!tab) return;
    let cancelled = false;
    const target = () => (section ? document.getElementById(section) : headingRef.current);
    // Instant on purpose: a tab or section change is a jump, and index.css's smooth
    // scrolling would animate thousands of pixels and get cut short by the second call.
    const scrollTo = () => target()?.scrollIntoView({ block: "start", behavior: "instant" });
    const frame = requestAnimationFrame(() => {
      const el = target();
      if (!el) return;
      scrollTo();
      if (!el.hasAttribute("tabindex")) el.tabIndex = -1;
      el.focus({ preventScroll: true });
      document.fonts?.ready.then(() => {
        if (!cancelled) scrollTo();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [tab, section]);

  return (
    <>
      <TopBar />
      <main className="page">
        <Hero compact={!!tab} onHome={home} />
        <ReaderChooser hidden={!!tab} onSelect={go} />
        <TabBar active={tab} onSelect={go} barRef={barRef} />
        {current && (
          <section
            className="panel"
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            key={current.id}
          >
            {current.id === "ai" ? (
              <AiTab data={TAB_DATA.ai} headingRef={headingRef} />
            ) : (
              <TabPanel data={TAB_DATA[current.id]} headingRef={headingRef} />
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

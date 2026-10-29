import { useCallback, useEffect, useState } from "react";
import { TABS } from "../data/towinly/tabs";
import { CARD_INDEX } from "../data/towinly/deck";

const TAB_IDS = new Set(TABS.map((t) => t.id));

/** "#elders" → that tab; "#ladder" → the tab whose deck holds that card; else the chooser. */
export function resolveHash(raw) {
  const id = (raw || "").replace(/^#/, "");
  if (!id) return { tab: null, section: null };
  if (TAB_IDS.has(id)) return { tab: id, section: null };
  const tab = CARD_INDEX[id];
  return tab ? { tab, section: id } : { tab: null, section: null };
}

export default function useTabRoute() {
  const [route, setRoute] = useState(() => resolveHash(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(resolveHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // A new tab is a new history entry, so Back returns to the previous tab.
  const go = useCallback((id) => {
    if (window.location.hash === `#${id}`) setRoute(resolveHash(`#${id}`));
    else window.location.hash = id;
  }, []);

  // Moving between cards replaces the entry: Back leaves the tab instead of
  // stepping through every card, and the address still names the card on screen.
  const replace = useCallback((id) => {
    window.history.replaceState(null, "", `#${id}`);
    setRoute(resolveHash(`#${id}`));
  }, []);

  const home = useCallback(() => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setRoute({ tab: null, section: null });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return { ...route, go, replace, home };
}

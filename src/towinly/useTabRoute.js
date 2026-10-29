import { useCallback, useEffect, useState } from "react";
import { TABS, SECTION_INDEX } from "../data/towinly/tabs";

const TAB_IDS = new Set(TABS.map((t) => t.id));

/** "#elders" → that tab; "#ladder" → the tab that holds it; anything else → the chooser. */
export function resolveHash(raw) {
  const id = (raw || "").replace(/^#/, "");
  if (!id) return { tab: null, section: null };
  if (TAB_IDS.has(id)) return { tab: id, section: null };
  const tab = SECTION_INDEX[id];
  return tab ? { tab, section: id } : { tab: null, section: null };
}

export default function useTabRoute() {
  const [route, setRoute] = useState(() => resolveHash(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(resolveHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Setting location.hash adds a history entry and fires hashchange, so the browser's
  // back and forward buttons move between tabs for free.
  const go = useCallback((id) => {
    if (window.location.hash === `#${id}`) setRoute(resolveHash(`#${id}`));
    else window.location.hash = id;
  }, []);

  const home = useCallback(() => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setRoute({ tab: null, section: null });
    window.scrollTo({ top: 0 });
  }, []);

  return { ...route, go, home };
}

import { useEffect, useRef } from "react";
import { TABS } from "../../data/towinly/tabs";
import Icon from "../icons";

export default function TabBar({ active, onSelect, barRef }) {
  const refs = useRef([]);
  const activeIndex = Math.max(0, TABS.findIndex((t) => t.id === active));

  // Keep the active tab visible inside the horizontal scroller on phones.
  useEffect(() => {
    if (!active) return;
    refs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active, activeIndex]);

  const onKeyDown = (event, index) => {
    const n = TABS.length;
    const next = { ArrowRight: (index + 1) % n, ArrowLeft: (index - 1 + n) % n, Home: 0, End: n - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    refs.current[next]?.focus();
    onSelect(TABS[next].id);
  };

  return (
    <div className="tabbar" ref={barRef}>
      <div className="tabbar-inner" role="tablist" aria-label="Who are you?">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (refs.current[index] = el)}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={active === tab.id ? `panel-${tab.id}` : undefined}
            tabIndex={index === activeIndex ? 0 : -1}
            className="tab"
            data-accent={tab.accent}
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

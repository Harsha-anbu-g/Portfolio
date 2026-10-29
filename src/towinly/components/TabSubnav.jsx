import { useEffect, useState } from "react";

const BAR_HEIGHT = 56;

/* The section covering the most of the viewport below the sticky bar is current. */
function sectionInView(elements) {
  const bottom = window.innerHeight;
  return elements.reduce(
    (best, el) => {
      const rect = el.getBoundingClientRect();
      const visible = Math.min(rect.bottom, bottom) - Math.max(rect.top, BAR_HEIGHT);
      return visible > best.visible ? { id: el.id, visible } : best;
    },
    { id: "", visible: 0 }
  ).id;
}

export default function TabSubnav({ sections }) {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurrent(sectionInView(elements)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <nav className="subnav" aria-label="On this page">
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={current === s.id ? "true" : undefined}>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

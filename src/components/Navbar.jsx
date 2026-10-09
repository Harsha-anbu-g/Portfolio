import { useState, useEffect } from "react";
import profile from "../data/profile";

const NAV_HEIGHT = 70;

/* Jakob: one-page sites mark the section in view. The section covering the
   most viewport below the fixed bar is current; the hero counts so that no
   link lights up while the top of the page dominates. */
function sectionInView(sections) {
  const viewportBottom = window.innerHeight;
  return sections.reduce(
    (best, section) => {
      const rect = section.getBoundingClientRect();
      const visible = Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, NAV_HEIGHT);
      return visible > best.visible ? { id: section.id, visible } : best;
    },
    { id: "", visible: 0 }
  ).id;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = ["#home", ...profile.navLinks.map((link) => link.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setActiveId(sectionInView(sections));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkProps = (href) =>
    activeId === href.slice(1) ? { className: "active", "aria-current": "true" } : {};

  return (
    <nav className={`clark-nav${scrolled ? " scrolled" : ""}`}>
      <div className="clark-nav-inner">
        <a href="#home" className="clark-logo">
          Harsha<span>.</span>
        </a>

        {/* Desktop links */}
        <ul className="clark-nav-links hidden md:flex">
          {profile.navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} {...linkProps(link.href)}>{link.label}</a>
            </li>
          ))}
          <li>
            <a
              href="/Harshavardhan_AG_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#F0EAE0",
                color: "#201C15",
                padding: "0.4rem 1.1rem",
                borderRadius: "999px",
                letterSpacing: "0.05em",
              }}
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center gap-1.5 p-3 min-h-11 min-w-11"
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#F0EAE0",
              transition: "transform 0.3s",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#F0EAE0",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#F0EAE0",
              transition: "transform 0.3s",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="clark-mobile-menu md:hidden">
          {profile.navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} {...linkProps(link.href)}>
              {link.label}
            </a>
          ))}
          <a
            href="/Harshavardhan_AG_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#C9A227" }}
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}

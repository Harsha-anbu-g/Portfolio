import { useState, useEffect } from "react";
import profile from "../data/profile";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a
              href="/Harshavardhan_AnbuchezhianGowri_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#F96D00",
                color: "#fff",
                padding: "0.4rem 1rem",
                borderRadius: "3px",
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
              background: "#fff",
              transition: "transform 0.3s",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#fff",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#fff",
              transition: "transform 0.3s",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="clark-mobile-menu md:hidden">
          {profile.navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="/Harshavardhan_AnbuchezhianGowri_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#F96D00" }}
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}

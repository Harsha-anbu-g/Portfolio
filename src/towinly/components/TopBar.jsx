import { TOPBAR_LINKS } from "../../data/towinly/links";
import Icon from "../icons";

export default function TopBar() {
  return (
    <nav className="page-topbar" aria-label="Site">
      <div className="page-wrap page-topbar-inner">
        <a href="/" className="page-brand">
          <Icon name="back" size={16} />
          Harsha<span>.</span>
        </a>
        <span className="page-topbar-name">Why Towinly</span>
        <ul className="page-topbar-links">
          {TOPBAR_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                <Icon name={link.icon} size={16} />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

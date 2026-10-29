import { TOWINLY_LINKS, HARSHA_LINKS } from "../../data/towinly/links";
import Icon from "../icons";

function LinkList({ title, links }) {
  return (
    <div className="social-group">
      <h4>{title}</h4>
      <ul>
        {links.map((link) => {
          const outside = link.href.startsWith("http");
          return (
            <li key={link.href}>
              <a href={link.href} {...(outside ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon name={link.icon} size={18} />
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SocialRow() {
  return (
    <div className="social-row">
      <LinkList title="Towinly" links={TOWINLY_LINKS} />
      <LinkList title="Harsha" links={HARSHA_LINKS} />
    </div>
  );
}

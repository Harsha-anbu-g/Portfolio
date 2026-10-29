import Disclosure from "./Disclosure";
import PhoneGallery from "./PhoneGallery";
import Extra from "./Extra";
import Icon from "../icons";
import { shots } from "../../data/towinly/screenshots";

/* One section of a tab: a linkable heading, two to four plain paragraphs, the screens,
   the interactive piece, and the detail behind "More about this". */
export default function Chapter({ section }) {
  const { id, title, body = [], more = [], links = [] } = section;
  return (
    <section className={`chapter${section.shots ? " has-shots" : ""}`} id={id} aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} tabIndex={-1}>
        {title}
        <a className="anchor" href={`#${id}`} aria-label={`Link to ${title}`}>
          <Icon name="link" size={16} />
        </a>
      </h3>
      {body.map((p) => <p key={p}>{p}</p>)}
      {section.shots && <PhoneGallery shots={shots(section.shots)} label={title} />}
      <Extra section={section} />
      {more.length > 0 && (
        <Disclosure summary="More about this">
          {more.map((p) => <p key={p}>{p}</p>)}
        </Disclosure>
      )}
      {links.length > 0 && (
        <p className="chapter-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label} <Icon name="arrow" size={14} />
            </a>
          ))}
        </p>
      )}
    </section>
  );
}

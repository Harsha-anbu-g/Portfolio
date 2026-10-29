import { ONLINE_ROW } from "../../data/towinly/artworks";
import { TOWINLY_INSTAGRAM } from "../../data/towinly/links";

/* The Instagram artworks in a grid; each opens the account. */
export default function ArtworkStrip() {
  return (
    <ul className="online-row">
      {ONLINE_ROW.map((art, i) => (
        <li key={art.post} style={{ "--i": i }}>
          <a href={TOWINLY_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label={`${art.title} on Instagram`}>
            <img src={`/towinly/social/${art.file}.webp`} width={art.w} height={art.h} alt="" loading="lazy" decoding="async" />
          </a>
        </li>
      ))}
    </ul>
  );
}

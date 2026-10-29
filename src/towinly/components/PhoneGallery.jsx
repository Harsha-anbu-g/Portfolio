import { useState } from "react";

/* One iPhone frame showing the active screen, a thumbnail strip to change it. Arrow keys
   work anywhere inside the figure; every image declares its size so nothing jumps. */
export default function PhoneGallery({ shots, label }) {
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  const move = (delta) => setIndex((i) => (i + delta + shots.length) % shots.length);

  return (
    <figure
      className="gallery"
      aria-label={`Screens: ${label}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") move(1);
        if (event.key === "ArrowLeft") move(-1);
      }}
    >
      <div className="phone">
        <img
          key={shot.file}
          src={`/towinly/shots/${shot.file}.webp`}
          width={shot.w}
          height={shot.h}
          alt={shot.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="gallery-caption">{shot.caption}</figcaption>
      {shots.length > 1 && (
        <div className="thumbs" role="group" aria-label="Choose a screen">
          {shots.map((s, i) => (
            <button
              key={s.file}
              type="button"
              className="thumb"
              aria-pressed={i === index}
              aria-label={s.caption}
              onClick={() => setIndex(i)}
            >
              <img src={`/towinly/shots/${s.file}.webp`} width={s.w} height={s.h} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}

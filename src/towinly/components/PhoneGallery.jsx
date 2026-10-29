import { useState } from "react";

/* One phone, sized to the card's height so it never outgrows the words beside it. Dots
   under it switch between the screens of that card. */
export default function PhoneGallery({ shots, label }) {
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  return (
    <figure className="gallery" aria-label={`Screens: ${label}`}>
      <div className="phone">
        <img key={shot.file} src={`/towinly/shots/${shot.file}.webp`} width={shot.w} height={shot.h} alt={shot.alt} decoding="async" />
      </div>
      <figcaption className="gallery-meta">
        <span className="gallery-caption">{shot.caption}</span>
        {shots.length > 1 && (
          <span className="gallery-dots" role="group" aria-label="Choose a screen">
            {shots.map((s, i) => (
              <button
                key={s.file}
                type="button"
                className="gallery-dot"
                aria-pressed={i === index}
                aria-label={s.caption}
                onClick={() => setIndex(i)}
              />
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

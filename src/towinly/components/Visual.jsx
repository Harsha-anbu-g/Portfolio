import PhoneGallery from "./PhoneGallery";
import TrustLadder from "./TrustLadder";
import TrustScoreMeter from "./TrustScoreMeter";
import DemoCast from "./DemoCast";
import Timeline from "./Timeline";
import StatTiles from "./StatTiles";
import ArchitectureFigure from "./ArchitectureFigure";
import ArtworkStrip from "./ArtworkStrip";
import ClosingCard from "./ClosingCard";
import Compare from "./Compare";
import { shots } from "../../data/towinly/screenshots";
import { photo, photoSrc } from "../../data/towinly/photos";

function PhotoImg({ name, className, decorative = false, eager = false }) {
  const p = photo(name);
  if (!p) return null;
  return (
    <img
      className={className}
      src={photoSrc(p.file)}
      width={p.w}
      height={p.h}
      alt={decorative ? "" : p.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function Widget({ name, section }) {
  if (name === "ladder") return <TrustLadder />;
  if (name === "ladder-compact") return <TrustLadder compact />;
  if (name === "score") return <TrustScoreMeter />;
  if (name === "cast") return <DemoCast />;
  if (name.startsWith("cast:")) return <DemoCast only={name.slice(5)} />;
  if (name === "timeline") return <Timeline />;
  if (name === "stats") return <StatTiles />;
  if (name === "architecture") return <ArchitectureFigure />;
  if (name === "closing") return <ClosingCard />;
  if (name === "compare") return <Compare rows={section.compare} />;
  if (name === "artworks:online") return <ArtworkStrip />;
  if (name === "steps") {
    return (
      <ol className="reunion-steps">
        {(section.steps || []).map((step, i) => <li key={step} style={{ "--i": i }}>{step}</li>)}
      </ol>
    );
  }
  if (name === "list") {
    return (
      <ul className="plain-list">
        {(section.items || []).map((item, i) => <li key={item} style={{ "--i": i }}>{item}</li>)}
      </ul>
    );
  }
  return null;
}

function Foreground({ visual, title }) {
  if (visual.kind === "shots") return <PhoneGallery shots={shots(visual.shots)} label={title} />;
  if (visual.kind === "photo") return <PhotoImg name={visual.photo} className="visual-photo" eager />;
  if (visual.kind === "founder") {
    return <img className="visual-photo" src="/harsha-photo.webp" width="1536" height="1024" alt="Harshavardhan Anbu Gowri, who built Towinly." decoding="async" />;
  }
  if (visual.kind === "art") {
    const art = visual.art;
    return <img className="visual-art" src={`/towinly/social/${art.file}.webp`} width={art.w} height={art.h} alt={art.alt} decoding="async" />;
  }
  if (visual.kind === "panel") {
    return (
      <div className="visual-panel">
        <p className="panel-big">{visual.big}</p>
        <p className="panel-small">{visual.small}</p>
      </div>
    );
  }
  if (visual.kind === "widget") return <Widget name={visual.name} section={visual.section} />;
  return null;
}

/* The picture side of a card. A photo behind a phone or a number gets a coloured scrim in
   the tab's colour so whatever sits on top stays readable. */
export default function Visual({ card }) {
  const { visual } = card;
  return (
    <div className="card-visual" data-tone={visual.tone} data-kind={visual.kind}>
      {visual.bg && <PhotoImg name={visual.bg} className="visual-bg" decorative eager />}
      {visual.bg && <span className="visual-scrim" aria-hidden="true" />}
      <div className="visual-fg">
        <Foreground visual={visual} title={card.title} />
      </div>
    </div>
  );
}

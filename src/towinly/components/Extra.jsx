import TrustLadder from "./TrustLadder";
import TrustScoreMeter from "./TrustScoreMeter";
import DemoCast from "./DemoCast";
import Timeline from "./Timeline";
import StatTiles from "./StatTiles";
import ArchitectureFigure from "./ArchitectureFigure";
import ArtworkStrip from "./ArtworkStrip";
import SocialRow from "./SocialRow";
import ClosingCard from "./ClosingCard";

/* The one switch from a section's `extra` word to the interactive piece it carries. */
export default function Extra({ section }) {
  const { extra } = section;
  if (!extra) return null;
  if (extra === "ladder") return <TrustLadder />;
  if (extra === "ladder-compact") return <TrustLadder compact />;
  if (extra === "score") return <TrustScoreMeter />;
  if (extra === "cast") return <DemoCast />;
  if (extra.startsWith("cast:")) return <DemoCast only={extra.slice(5)} />;
  if (extra === "timeline") return <Timeline />;
  if (extra === "stats") return <StatTiles />;
  if (extra === "architecture") return <ArchitectureFigure />;
  if (extra.startsWith("artworks:")) return <ArtworkStrip set={extra.slice(9)} />;
  if (extra === "social") return <SocialRow />;
  if (extra === "closing") return <ClosingCard />;
  if (extra === "steps") return <ol className="reunion-steps">{(section.steps || []).map((s) => <li key={s}>{s}</li>)}</ol>;
  if (extra === "list") return <ul className="plain-list">{(section.items || []).map((s) => <li key={s}>{s}</li>)}</ul>;
  return null;
}

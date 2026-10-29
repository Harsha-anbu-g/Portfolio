import { TIMELINE } from "../../data/towinly/timeline";

export default function Timeline() {
  return (
    <ol className="page-timeline">
      {TIMELINE.map((item) => (
        <li key={item.when}>
          <span className="tl-when">{item.when}</span>
          <span className="tl-what">{item.what}</span>
        </li>
      ))}
    </ol>
  );
}

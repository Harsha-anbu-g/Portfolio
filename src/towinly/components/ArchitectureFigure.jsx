/* One picture of the system. Boxes are real pieces; the text under it says the same for
   screen readers, and the link opens the detailed Mermaid diagrams page. */
const BOX = { rx: 8, fill: "#FFFDF9", stroke: "#9C7A2A", strokeWidth: 1.2 };
const BAND = { rx: 8, fill: "#F3EEE4", stroke: "rgba(34,30,22,0.12)", strokeWidth: 1 };
const TEXT = { fontFamily: "Poppins, sans-serif", fontSize: 13, fill: "#221E16", textAnchor: "middle" };
const SMALL = { ...TEXT, fontSize: 11, fill: "#4A443A" };

function Box({ x, y, w, h, title, sub, band }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} {...(band ? BAND : BOX)} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 5)} {...TEXT}>{title}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 14} {...SMALL}>{sub}</text>}
    </g>
  );
}

export default function ArchitectureFigure() {
  return (
    <figure className="arch">
      <svg viewBox="0 0 680 400" role="img" aria-labelledby="arch-title arch-desc" className="arch-svg">
        <title id="arch-title">How Towinly is put together</title>
        <desc id="arch-desc">
          Three clients, the iPhone app, the web app and the phone web build, talk to one Spring Boot API on
          Railway. The API uses PostgreSQL with pgvector, Redis, S3 for ID photos, Twilio for SMS and OpenAI for
          Ask AI. Vercel hosts the web, EAS builds the iPhone app.
        </desc>
        <Box x={20} y={20} w={640} h={92} title="" band />
        <text x={340} y={40} {...SMALL}>What people use</text>
        <Box x={40} y={52} w={180} h={48} title="iPhone app" sub="React Native, Expo, EAS" />
        <Box x={250} y={52} w={180} h={48} title="Web app" sub="React 19, Vite, Vercel" />
        <Box x={460} y={52} w={180} h={48} title="Phone web" sub="towinly.com/app" />
        <path d="M130 100v40M340 100v40M550 100v40" stroke="#9C7A2A" strokeWidth={1.4} fill="none" markerEnd="url(#arrow)" />
        <Box x={120} y={150} w={440} h={60} title="Spring Boot API, Java 21, on Railway" sub="129 REST endpoints, WebSocket chat, push, scheduled jobs, 108 MCP tools generated from it" />
        <path d="M200 210v40M340 210v40M480 210v40" stroke="#9C7A2A" strokeWidth={1.4} fill="none" markerEnd="url(#arrow)" />
        <Box x={20} y={260} w={640} h={120} title="" band />
        <text x={340} y={280} {...SMALL}>What it stands on</text>
        <Box x={40} y={292} w={150} h={48} title="PostgreSQL" sub="with pgvector" />
        <Box x={205} y={292} w={110} h={48} title="Redis" sub="cache" />
        <Box x={330} y={292} w={100} h={48} title="S3" sub="ID photos" />
        <Box x={445} y={292} w={100} h={48} title="Twilio" sub="SMS" />
        <Box x={560} y={292} w={80} h={48} title="OpenAI" sub="Ask AI" />
        <text x={340} y={366} {...SMALL}>Tests: JUnit 5 and Mockito on the API, Jest on the app, GitHub Actions on every push</text>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0L8 4 0 8z" fill="#9C7A2A" />
          </marker>
        </defs>
      </svg>
      <figcaption>
        One API serves every client. <a href="/architecture.html">The detailed diagrams</a> show the request
        flow, the database and the trust engine.
      </figcaption>
    </figure>
  );
}

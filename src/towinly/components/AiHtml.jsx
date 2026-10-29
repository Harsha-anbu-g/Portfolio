import "../ai-casestudy.css";

/* One section of the AI case study, rendered as it was written. The HTML is this site's own
   static file, so it is trusted; its styles are scoped under .ai-tab. */
export default function AiHtml({ html }) {
  return <div className="ai-tab" dangerouslySetInnerHTML={{ __html: html }} />;
}

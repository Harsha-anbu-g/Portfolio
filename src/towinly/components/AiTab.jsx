import { AI_FRAGMENT } from "../../data/towinly/ai";
import TabSubnav from "./TabSubnav";
import "../ai-casestudy.css";

/* The old case-study page, moved in whole. Its words are already checked, so they are
   rendered as they were written, with the page's own sub-nav in place of its old one. */
export default function AiTab({ data, headingRef }) {
  return (
    <>
      <div className="page-wrap panel-head">
        <h2 ref={headingRef} tabIndex={-1} className="panel-title">{data.title}</h2>
        <p className="panel-lead">{data.lead}</p>
      </div>
      <div className="page-wrap tab-layout">
        <TabSubnav sections={data.sections} />
        <div className="ai-tab" dangerouslySetInnerHTML={{ __html: AI_FRAGMENT }} />
      </div>
    </>
  );
}

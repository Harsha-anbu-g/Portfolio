import TabSubnav from "./TabSubnav";
import Chapter from "./Chapter";

export default function TabPanel({ data, headingRef }) {
  return (
    <>
      <div className="page-wrap panel-head">
        <h2 ref={headingRef} tabIndex={-1} className="panel-title">{data.title}</h2>
        {data.lead && <p className="panel-lead">{data.lead}</p>}
      </div>
      <div className="page-wrap tab-layout">
        <TabSubnav sections={data.sections} />
        <div className={`prose-col${data.bodySize === "lg" ? " prose-lg" : ""}`}>
          {data.sections.map((section) => <Chapter key={section.id} section={section} />)}
        </div>
      </div>
    </>
  );
}

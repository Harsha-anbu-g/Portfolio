/* Matching apps on the left, Towinly on the right, one row per difference. */
export default function Compare({ rows = [] }) {
  return (
    <div className="compare" role="table" aria-label="Matching apps compared with Towinly">
      <div className="compare-row compare-head" role="row">
        <span role="columnheader">Matching apps</span>
        <span role="columnheader">Towinly</span>
      </div>
      {rows.map(([them, us], i) => (
        <div className="compare-row" role="row" key={them} style={{ "--i": i }}>
          <span role="cell">{them}</span>
          <span role="cell">{us}</span>
        </div>
      ))}
    </div>
  );
}

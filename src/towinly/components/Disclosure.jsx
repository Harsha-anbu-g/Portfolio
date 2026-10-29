/* A native <details>, so it works with the keyboard and screen readers for free. */
export default function Disclosure({ summary, children }) {
  return (
    <details className="more">
      <summary>{summary}</summary>
      <div className="more-body">{children}</div>
    </details>
  );
}

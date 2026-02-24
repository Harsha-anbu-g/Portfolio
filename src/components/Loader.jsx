import { useState, useEffect } from "react";

export default function Loader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    const hideTimer = setTimeout(() => setHidden(true), 1300);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`page-loader ${loaded ? "loaded" : ""}`}>
      <div className="spinner" />
    </div>
  );
}

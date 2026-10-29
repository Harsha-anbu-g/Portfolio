import { useEffect, useId, useRef } from "react";
import Icon from "../icons";

/* A native <dialog>: focus stays inside, Esc closes it, and the page behind is inert. A tap
   on the dimmed backdrop closes it too. On phones it rises as a bottom sheet. */
export default function Sheet({ open, onClose, title, accent, children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      data-accent={accent}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="sheet-head">
        <h2 id={titleId}>{title}</h2>
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={20} />
        </button>
      </div>
      <div className="sheet-body">{open ? children : null}</div>
    </dialog>
  );
}

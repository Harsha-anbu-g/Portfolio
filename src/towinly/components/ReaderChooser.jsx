import { TABS } from "../../data/towinly/tabs";
import Icon from "../icons";

/* The front door: six big cards, the elder's first and widest. Picking one opens that tab
   and this block folds away; the sticky bar under it keeps all six reachable. */
export default function ReaderChooser({ hidden, onSelect }) {
  return (
    <div className="chooser page-wrap" hidden={hidden}>
      <h2 className="chooser-title">Who are you?</h2>
      <div className="chooser-grid">
        {TABS.map((tab) => (
          <button key={tab.id} type="button" className="choose" onClick={() => onSelect(tab.id)}>
            <span className="choose-icon">
              <Icon name={tab.icon} size={22} />
            </span>
            <span className="choose-text">
              <span className="choose-title">{tab.label}</span>
              <span className="choose-blurb">{tab.blurb}</span>
            </span>
            <span className="choose-arrow">
              <Icon name="arrow" size={18} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

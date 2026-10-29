import { TABS } from "../../data/towinly/tabs";
import { photo, photoSrc } from "../../data/towinly/photos";
import Icon from "../icons";

/* The front door: six cards, each in its tab's colour with its own photo. Picking one opens
   that tab's deck; the sticky bar keeps all six reachable afterwards. */
export default function ReaderChooser({ hidden, onSelect }) {
  return (
    <div className="chooser page-wrap" hidden={hidden}>
      <h2 className="chooser-title">Who are you?</h2>
      <div className="chooser-grid">
        {TABS.map((tab, i) => {
          const p = photo(tab.photo);
          return (
            <button key={tab.id} type="button" className="choose" data-accent={tab.accent} style={{ "--i": i }} onClick={() => onSelect(tab.id)}>
              <span className="choose-photo">
                {p && <img src={photoSrc(p.file)} width={p.w} height={p.h} alt="" loading="lazy" decoding="async" />}
              </span>
              <span className="choose-body">
                <span className="choose-icon">
                  <Icon name={tab.icon} size={20} />
                </span>
                <span className="choose-title">{tab.label}</span>
                <span className="choose-blurb">{tab.blurb}</span>
              </span>
              <span className="choose-arrow">
                <Icon name="arrow" size={18} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

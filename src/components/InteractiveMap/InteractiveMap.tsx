import type { JSX } from "react/jsx-runtime";
import { Place } from "../../models/Place";
import type { SearchableEntry } from "../../models/types";
import { useTypewriter } from "../../hooks/useTypewriter";
import { assetUrl } from "../../lib/assetUrl";
import style from "./InteractiveMap.module.css";

interface InteractiveMapProps {
  places: Place[];
  selected: SearchableEntry | null;
  onSelect: (entry: SearchableEntry) => void;
}

function InteractiveMap({ places, selected, onSelect }: InteractiveMapProps): JSX.Element {
  const cardText = selected
    ? selected instanceof Place
      ? selected.description
      : selected.dialogueLines.join("\n\n")
    : "";
  const { displayed } = useTypewriter(cardText);

  return (
    <div className={style.stage}>
      <div className={style.scrollArea}>
        <div className={style.mapWrap}>
          <img src={assetUrl("images/mapa-mundi.png")} alt="Mapa-múndi de Hunter x Hunter" className={style.mapImage} />
          {places.map((place) => (
            <button
              key={place.id}
              type="button"
              className={place.id === selected?.id ? style.pinActive : style.pin}
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
              onClick={() => onSelect(place)}
              title={place.name}
            >
              <span className={style.pinDot} />
              <span className={style.pinLabel}>{place.name}</span>
            </button>
          ))}
        </div>

        <div className={style.panel}>
          {selected ? (
            <div className={style.card}>
              <div className={style.cardHeader}>
                <span className={style.cardName}>{selected.name}</span>
                {selected.badge && <span className={style.cardKind}>{selected.badge}</span>}
              </div>
              <p className={style.cardText}>{displayed}</p>
            </div>
          ) : (
            <div className={style.hint}>&gt; Clique em um pin para consultar o Hunter Maps...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;

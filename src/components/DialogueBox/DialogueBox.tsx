import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import type { SearchableEntry } from "../../models/types";
import Barman from "../Barman/Barman";
import { useTypewriter } from "../../hooks/useTypewriter";
import { assetUrl } from "../../lib/assetUrl";
import style from "./DialogueBox.module.css";

interface DialogueBoxProps {
  entry: SearchableEntry | null;
}

function DialogueBox({ entry }: DialogueBoxProps): JSX.Element {
  const entryId = entry?.id ?? null;
  const [trackedId, setTrackedId] = useState<string | null>(entryId);
  const [pageIndex, setPageIndex] = useState(0);

  if (entryId !== trackedId) {
    setTrackedId(entryId);
    setPageIndex(0);
  }

  const pageText = entryId === trackedId ? (entry?.dialogueLines[pageIndex] ?? "") : "";
  const hasNextPage = entry ? pageIndex < entry.dialogueLines.length - 1 : false;
  const { displayed, isTyping, skip } = useTypewriter(pageText);

  function handleBoxClick(): void {
    if (isTyping) {
      skip();
    } else if (hasNextPage) {
      setPageIndex((index) => index + 1);
    }
  }

  return (
    <div className={style.stage}>
      <Barman talking={isTyping} />
      {entry && (
        <div className={style.reference}>
          {entry.image ? (
            <img src={assetUrl(entry.image)} alt={entry.name} className={style.referenceImage} />
          ) : (
            <div className={style.referenceBadge}>
              <span>{entry.badge ?? "SEM DADOS"}</span>
            </div>
          )}
        </div>
      )}
      <div className={style.box} onClick={handleBoxClick} role="button" tabIndex={0}>
        {entry ? (
          <>
            <p className={style.name}>{entry.name}</p>
            <p className={style.text}>{displayed}</p>
            {!isTyping && hasNextPage && <p className={style.hint}>▼ CONTINUAR</p>}
            {!isTyping && !hasNextPage && <p className={style.cursor}>█</p>}
          </>
        ) : (
          <p className={style.placeholder}>&gt; Selecione um registro no painel lateral para consultar o terminal...</p>
        )}
      </div>
    </div>
  );
}

export default DialogueBox;

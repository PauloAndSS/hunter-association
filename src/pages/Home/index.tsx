import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import Sidebar from "../../components/Sidebar/Sidebar";
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import InteractiveMap from "../../components/InteractiveMap/InteractiveMap";
import { categories, places } from "../../models/registry";
import type { CategoryKey, SearchableEntry } from "../../models/types";
import style from "./index.module.css";

function HomePage(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(categories[0].key);
  const [selected, setSelected] = useState<SearchableEntry | null>(null);

  function handleCategoryChange(category: CategoryKey): void {
    setActiveCategory(category);
    setSelected(null);
  }

  return (
    <div className={style.layout}>
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        selectedId={selected?.id ?? null}
        onSelect={setSelected}
      />
      <main className={style.main}>
        {activeCategory === "mapa" ? (
          <InteractiveMap places={places} selected={selected} onSelect={setSelected} />
        ) : (
          <DialogueBox entry={selected} />
        )}
      </main>
    </div>
  );
}

export default HomePage;

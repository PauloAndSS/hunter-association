import { useMemo, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { categories } from "../../models/registry";
import type { CategoryKey, SearchableEntry } from "../../models/types";
import { createBlockedEntry, isBlockedQuery } from "../../lib/accessControl";
import { clearSession, getSession } from "../../lib/session";
import style from "./Sidebar.module.css";

interface SidebarProps {
  activeCategory: CategoryKey;
  onCategoryChange: (category: CategoryKey) => void;
  selectedId: string | null;
  onSelect: (entry: SearchableEntry) => void;
}

function Sidebar({ activeCategory, onCategoryChange, selectedId, onSelect }: SidebarProps): JSX.Element {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const session = getSession();

  const activeGroup = categories.find((category) => category.key === activeCategory) ?? categories[0];

  const activeEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (isBlockedQuery(normalized)) return [createBlockedEntry(activeGroup.key)];
    if (!normalized) return activeGroup.entries;
    return activeGroup.entries.filter((entry) => entry.searchText.includes(normalized));
  }, [activeGroup, query]);

  function handleLogout(): void {
    clearSession();
    navigate("/login", { replace: true });
  }

  return (
    <aside className={style.sidebar}>
      <div className={style.brandRow}>
        <h2 className={style.title}>HUNTER-NET</h2>
        <span className={style.tag}>{activeGroup.tag}</span>
      </div>

      <div className={style.tabs}>
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className={category.key === activeCategory ? style.tabActive : style.tab}
            onClick={() => onCategoryChange(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <input
        className={style.search}
        type="search"
        placeholder="Pesquisar registros..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <ul className={style.results}>
        {activeEntries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              className={entry.id === selectedId ? style.resultActive : style.result}
              onClick={() => onSelect(entry)}
            >
              {entry.name}
            </button>
          </li>
        ))}
        {activeEntries.length === 0 && <li className={style.empty}>Nenhum registro encontrado.</li>}
      </ul>

      {session && (
        <div className={style.session}>
          <div className={style.sessionInfo}>
            <span className={style.sessionLabel}>Autenticado como</span>
            <span className={style.sessionName}>{session.name}</span>
          </div>
          <button type="button" className={style.logout} onClick={handleLogout}>
            SAIR
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;

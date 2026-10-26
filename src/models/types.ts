export type CategoryKey =
  | "jogadores"
  | "npcs"
  | "clas"
  | "organizacoes"
  | "trabalhos"
  | "banco"
  | "mapa";

export interface SearchableEntry {
  id: string;
  name: string;
  category: CategoryKey;
  /** Portrait image shown in the reference panel. Leave empty to fall back to `badge`. */
  image?: string;
  /** Short label shown in the reference panel when there is no portrait (e.g. license nº, rarity class). */
  badge?: string;
  searchText: string;
  dialogueLines: string[];
}

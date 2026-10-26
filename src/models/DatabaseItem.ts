import type { CategoryKey, SearchableEntry } from "./types";

export interface DatabaseItemData {
  id: string;
  name: string;
  rarity: string;
  description: string;
  stats?: string[];
}

export class DatabaseItem implements SearchableEntry {
  readonly category: CategoryKey = "banco";
  id: string;
  name: string;
  rarity: string;
  description: string;
  stats: string[];

  constructor(data: DatabaseItemData) {
    this.id = data.id;
    this.name = data.name;
    this.rarity = data.rarity;
    this.description = data.description;
    this.stats = data.stats ?? [];
  }

  get badge(): string {
    return this.rarity.toUpperCase();
  }

  get searchText(): string {
    return `${this.name} ${this.rarity} ${this.description}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    return [`${this.name.toUpperCase()} — ${this.rarity}`, this.description, ...this.stats];
  }
}

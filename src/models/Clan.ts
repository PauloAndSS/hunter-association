import type { CategoryKey, SearchableEntry } from "./types";

export interface ClanData {
  id: string;
  name: string;
  epithet: string;
  description: string;
}

export class Clan implements SearchableEntry {
  readonly category: CategoryKey = "clas";
  id: string;
  name: string;
  epithet: string;
  description: string;

  constructor(data: ClanData) {
    this.id = data.id;
    this.name = data.name;
    this.epithet = data.epithet;
    this.description = data.description;
  }

  get badge(): string {
    return this.epithet.toUpperCase();
  }

  get searchText(): string {
    return `${this.name} ${this.epithet} ${this.description}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    return [`${this.name.toUpperCase()} — ${this.epithet}`, this.description];
  }
}

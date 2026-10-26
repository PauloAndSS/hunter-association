import type { CategoryKey, SearchableEntry } from "./types";

export interface NPCData {
  id: string;
  name: string;
  role: string;
  alias: string;
  description: string;
  image: string;
}

export class NPC implements SearchableEntry {
  readonly category: CategoryKey = "npcs";
  id: string;
  name: string;
  role: string;
  alias: string;
  description: string;
  image: string;

  constructor(data: NPCData) {
    this.id = data.id;
    this.name = data.name;
    this.role = data.role;
    this.alias = data.alias;
    this.description = data.description;
    this.image = data.image;
  }

  get searchText(): string {
    return `${this.name} ${this.role} ${this.alias} ${this.description}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    const lines = [`${this.name.toUpperCase()} — ${this.role}`];
    if (this.alias) lines.push(`Também conhecido(a) como ${this.alias}.`);
    lines.push(this.description);
    return lines;
  }
}

import type { CategoryKey, SearchableEntry } from "./types";

export interface OrganizationData {
  id: string;
  name: string;
  tag: string;
  description: string;
  threatLevel: string;
}

export class Organization implements SearchableEntry {
  readonly category: CategoryKey = "organizacoes";
  id: string;
  name: string;
  tag: string;
  description: string;
  threatLevel: string;

  constructor(data: OrganizationData) {
    this.id = data.id;
    this.name = data.name;
    this.tag = data.tag;
    this.description = data.description;
    this.threatLevel = data.threatLevel;
  }

  get badge(): string {
    return this.tag.toUpperCase();
  }

  get searchText(): string {
    return `${this.name} ${this.tag} ${this.description}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    return [
      `${this.name.toUpperCase()} — ${this.tag}`,
      this.description,
      `Nível de ameaça: ${this.threatLevel}.`,
    ];
  }
}

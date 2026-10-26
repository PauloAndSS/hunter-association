import type { CategoryKey, SearchableEntry } from "./types";

export interface PlaceData {
  id: string;
  name: string;
  kind: string;
  x: number;
  y: number;
  description: string;
}

export class Place implements SearchableEntry {
  readonly category: CategoryKey = "mapa";
  id: string;
  name: string;
  kind: string;
  x: number;
  y: number;
  description: string;

  constructor(data: PlaceData) {
    this.id = data.id;
    this.name = data.name;
    this.kind = data.kind;
    this.x = data.x;
    this.y = data.y;
    this.description = data.description;
  }

  get badge(): string {
    return this.kind.toUpperCase();
  }

  get searchText(): string {
    return `${this.name} ${this.kind} ${this.description}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    return [`${this.name.toUpperCase()} — ${this.kind}`, this.description];
  }
}

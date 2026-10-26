import type { CategoryKey, SearchableEntry } from "./types";

export interface HunterData {
  id: string;
  name: string;
  licenseNumber: number;
  clan: string;
  status: string;
  notes: string;
}

export class Hunter implements SearchableEntry {
  readonly category: CategoryKey = "jogadores";
  id: string;
  name: string;
  licenseNumber: number;
  clan: string;
  status: string;
  notes: string;

  constructor(data: HunterData) {
    this.id = data.id;
    this.name = data.name;
    this.licenseNumber = data.licenseNumber;
    this.clan = data.clan;
    this.status = data.status;
    this.notes = data.notes;
  }

  get badge(): string {
    return `Nº ${this.licenseNumber}`;
  }

  get searchText(): string {
    return `${this.name} ${this.clan}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    return [
      `${this.name.toUpperCase()} — Licença Nº ${this.licenseNumber}`,
      `Status: ${this.status}. Vínculo: ${this.clan}.`,
      this.notes,
    ];
  }
}

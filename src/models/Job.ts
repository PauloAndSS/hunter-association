import type { CategoryKey, SearchableEntry } from "./types";

export interface JobData {
  id: string;
  name: string;
  pay: string;
  payShort: string;
  description: string;
}

export class Job implements SearchableEntry {
  readonly category: CategoryKey = "trabalhos";
  id: string;
  name: string;
  pay: string;
  payShort: string;
  description: string;

  constructor(data: JobData) {
    this.id = data.id;
    this.name = data.name;
    this.pay = data.pay;
    this.payShort = data.payShort;
    this.description = data.description;
  }

  get badge(): string {
    return this.payShort.toUpperCase();
  }

  get searchText(): string {
    return `${this.name} ${this.description}`.toLowerCase();
  }

  get dialogueLines(): string[] {
    return [this.name.toUpperCase(), this.description, `Remuneração média: ${this.pay}.`];
  }
}

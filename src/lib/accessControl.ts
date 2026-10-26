import type { SearchableEntry } from "../models/types";

const BLOCKED_PATTERN = /\bnen\b/i;

export function isBlockedQuery(query: string): boolean {
  return BLOCKED_PATTERN.test(query.trim());
}

export function createBlockedEntry(category: SearchableEntry["category"]): SearchableEntry {
  return {
    id: "nen-principles-blocked",
    name: "Nen_Principles.dat",
    category,
    badge: "ACESSO NEGADO",
    searchText: "nen",
    dialogueLines: [
      "ERRO 404: ARQUIVO NÃO ENCONTRADO.",
      "Nen_Principles.dat está protegido por critérios de segurança da Associação Hunter.",
      "ACESSO NEGADO. Esta consulta foi registrada pelo sistema.",
    ],
  };
}

import jogadoresData from "../data/jogadores.json";
import npcsData from "../data/npcs.json";
import clasData from "../data/clas.json";
import organizacoesData from "../data/organizacoes.json";
import trabalhosData from "../data/trabalhos.json";
import bancoData from "../data/banco.json";
import reliquiasData from "../data/reliquias.json";
import mapaData from "../data/mapa.json";
import { Hunter, type HunterData } from "./Hunter";
import { NPC, type NPCData } from "./NPC";
import { Clan, type ClanData } from "./Clan";
import { Organization, type OrganizationData } from "./Organization";
import { Job, type JobData } from "./Job";
import { DatabaseItem, type DatabaseItemData } from "./DatabaseItem";
import { Place, type PlaceData } from "./Place";
import type { CategoryKey, SearchableEntry } from "./types";

export const hunters: Hunter[] = (jogadoresData as HunterData[]).map((data) => new Hunter(data));
export const npcs: NPC[] = (npcsData as NPCData[]).map((data) => new NPC(data));
export const clans: Clan[] = (clasData as ClanData[]).map((data) => new Clan(data));
export const organizations: Organization[] = (organizacoesData as OrganizationData[]).map(
  (data) => new Organization(data),
);
export const jobs: Job[] = (trabalhosData as JobData[]).map((data) => new Job(data));
export const databaseItems: DatabaseItem[] = [
  ...(bancoData as DatabaseItemData[]).map((data) => new DatabaseItem(data)),
  ...(reliquiasData as DatabaseItemData[]).map((data) => new DatabaseItem(data)),
];
export const places: Place[] = (mapaData as PlaceData[]).map((data) => new Place(data));

export interface CategoryGroup {
  key: CategoryKey;
  label: string;
  tag: string;
  entries: SearchableEntry[];
}

export const categories: CategoryGroup[] = [
  { key: "jogadores", label: "Jogadores", tag: "SISTEMA", entries: hunters },
  { key: "npcs", label: "NPCs", tag: "DIRETÓRIO", entries: npcs },
  { key: "clas", label: "Clãs", tag: "LORE", entries: clans },
  { key: "organizacoes", label: "Organizações", tag: "SUBMUNDO", entries: organizations },
  { key: "trabalhos", label: "Trabalhos", tag: "MERCADO", entries: jobs },
  { key: "banco", label: "Banco de Dados", tag: "BANCO DE DADOS", entries: databaseItems },
  { key: "mapa", label: "Mapa", tag: "SISTEMA", entries: places },
];

# HUNTER-NET // Terminal

Terminal interativo da Associação Hunter para a campanha de RPG — React + TypeScript + Vite.

## Acesso

O terminal exige autenticação (Nome do Jogador + Número da Licença). Contas ativas: Hydon Zoldyck (131),
Kuroyami Hoshigaki (191), Akashi (250), Boris (19), Kaminari Kirigaku (23).

## Estrutura

- `src/data/*.json` — conteúdo da campanha (jogadores, NPCs, clãs, organizações, trabalhos, banco de dados, mapa).
- `src/models/*` — classes que adaptam cada JSON para a interface comum `SearchableEntry`.
- `src/components/InteractiveMap` — mapa-múndi com pins clicáveis (`/public/images/mapa-mundi.png`).
- `src/pages/Login` — portal de autenticação.
- `src/pages/Home` — terminal principal (barra lateral de categorias + leitor de registros).

Consultas pela palavra "Nen" retornam `ERRO 404` propositalmente — é uma trava de imersão do sistema,
não um bug.

## Rodando localmente

```
npm install
npm run dev
```

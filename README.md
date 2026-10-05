# MU Nightmare — protótipo React

React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui (Radix).

## Executar

```sh
npm install
npm run dev -- --host 0.0.0.0
```

Conta demo: `demo` / `Nightmare123`. Cada nova conta começa com dados de demonstração. Não use informações reais: a persistência é localStorage, inclusive credenciais fictícias. Nenhum backend, download de jogo ou pagamento real.

## Verificação

```sh
npm run build
npm run typecheck
npm test
```

## Organização

- `components/ui`: componentes shadcn gerados via CLI.
- `components/shared`: Field, PageHeading, ItemArt, AuthGate, Checkout.
- `components/layout` e `components/home`: composição e navegação.
- `features/account` e `features/market`: fluxos específicos.
- `pages`: orquestração de cada tela.
- `types`: contratos de domínio.
- `lib`: reducer de regras, persistência e utilitários.
- `store`: contexto que liga UI, regras e persistência.
- `data`: mocks, produtos, eventos e notícias.

Catálogo interativo: `/components`. Tokens no `src/index.css`: base de 4 px, gaps de 24 px, seções de 64 px (40 no mobile), margem lateral compartilhada `--layout-gutter`, de 20 a 64 px conforme a largura da tela.

## Referências

Amostra original encontrada em `C:/Users/dmsce/Downloads/nightmare-amostra.html` e copiada em `references/`. Preservados: header, navegação por grupos, busca, carrossel loja/Season 6 com pausa e paginação, faixa de notícias e caminhos principais. O Fortnite inspira a densidade de navegação, destaque editorial e catálogo visual; assets próprios em SVG.

Site antigo auditado: https://munightmare.site/ e suas páginas públicas. Veja `docs/coverage.md`.

## Limitações de integração

Todos os fluxos usam dados locais. Interface PT/EN com preferência persistida; nomes de itens/classes e moedas permanecem no formato do jogo. Agenda, preços e recompensas são demonstrativos. Políticas são resumos para revisão, não cópias legais integrais. Download é um arquivo de texto demo. Sem convite Discord real: o site antigo usa placeholder.

Checkout modela confirmação, cancelamento, expiração, estorno e falha de entrega. Reserva PIX de 15 minutos é local ao navegador e não coordena clientes reais. Pagamentos e Mercado Pago não enviam requests externos. VIP do mesmo nível acumula períodos de 30 dias; uma integração real precisa validar benefícios no servidor.

Testes de navegador: `npm run test:e2e` (Chromium via Playwright). O catálogo está em `/components`.

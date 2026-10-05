# Validação — 04/10/2026

- Build de produção e TypeScript: aprovados (`npm run build`).
- Lint: aprovado, sem warnings (`npm run lint`).
- Regras de domínio: 10 testes aprovados (`npm test`).
- Navegador Chromium: 5 testes aprovados (`npm run test:e2e`).

## Caminhos verificados

Conta demo → compra em NC → entrega no banco do site → anúncio → cancelamento → compra de moedas → persistência após reload.

Compra em reais → reserva PIX → cancelamento → anúncio liberado → nova reserva → confirmação simulada → entrega do item.

Carrossel, pausa, catálogo/dialog, navegação mobile, ausência de overflow em 390 px e 320 px, mudança PT/EN e persistência de idioma.

Todas as 17 rotas públicas foram renderizadas sem erros de JavaScript. Domínio testa também saldo insuficiente, crédito único, requisitos PIX, exclusividade da reserva, expiração, estorno, liquidação de oferta, cestas de joias e renovação de VIP.

Evidências visuais: `home-desktop.png`, `home-mobile.png`, `marketplace-desktop.png`.

## Ajuste de enquadramento — 05/10/2026

Carrossel com altura independente do conteúdo e recorte de arte ancorado no topo. Hero, header, notícias e rodapé usam a mesma margem lateral. Cards de notícias com proporção 16:9 e gap de 16 px. A altura desktop reserva a área da primeira fileira conforme a largura dos cards.

Em 1910 × 915 px, os dois slides mantêm exatamente a mesma geometria e a fileira termina dentro do viewport. Margens alinhadas verificadas em 320, 390, 768, 1280 e 1440 px. Build, lint e os cinco testes de navegador aprovados. Captura da primeira tela em `home-first-viewport.png`.

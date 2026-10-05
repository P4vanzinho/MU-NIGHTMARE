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

## Esteira de notícias e status — 05/10/2026

Oito testes de navegador aprovados, incluindo movimento contínuo, pausa e retomada, acesso à notícia, preferência de movimento reduzido e detalhes do servidor em 320 px. Após o ajuste de foco por teclado, os três testes específicos passaram novamente. Build e lint aprovados. Header com 112 px; ausência de overflow em 320, 390, 1440 e 1910 px. Capturas desktop, mobile e primeira tela atualizadas.

## Navegação pública e conta — 05/10/2026

Header simplificado: Rankings, Eventos, Loja e Reportar bug. Menu da conta condicionado à sessão, com sair no desktop/mobile. Políticas no rodapé, Discord direcionado à comunidade enquanto o convite oficial não está configurado. Idioma de 16 px com padding e busca desktop ampliada. Eyebrows e descrições do PageHeading removidos nas páginas e catálogo.

Nove testes existentes passaram; dois testes novos verificam login/logout, ausência de opções privadas para visitantes, políticas no rodapé e ausência de overflow em 320, 390, 768, 1280, 1440 e 1910 px. Build e lint aprovados.

## Footer compartilhado e recompensas — 05/10/2026

Terceiro destaque do hero apresenta recompensas por reporte de bugs e abre /bugreport. Card da comunidade removido da home. Footer compartilhado para público e conta: marca, Discord, reporte, download, navegação e voltar ao topo. Espaço final da home reduzido a 32 px. Catálogo público e seus arquivos removidos; componentes reutilizáveis do produto preservados.

Onze testes existentes e dois novos passaram. Novos testes cobrem CTA do destaque, igualdade do footer entre visitante e conta demo, remoção do catálogo e geometria no desktop/mobile. Build e lint aprovados.

## Selects, foco e footer — 05/10/2026

FormSelect compartilhado baseado no Select shadcn/Radix substitui os selects nativos de ranking, mercado, moedas, joias, personagens e doação. Mantém nome/valor no FormData e reset do formulário. Ranking com busca e filtro de 36 px. Foco com ring/outline de 1 px em cinza-violeta; primária passa de amarelo ácido para violeta #b7a0ef.

Footer com marca/social, grupos Jogo e Comunidade e bloco legal discreto, sem altura fixa ou opções adicionais. Referência solicitada: https://www.fortnite.com/ (captura visual bloqueada por verificação de segurança). Pesquisa da paleta: https://blog.adobe.com/en/publish/2020/12/04/modern-gothic-design-explores-empowers-with-futuristic-noir .

Build e lint aprovados. Quatorze testes de navegador passaram na execução geral; os dois testes específicos passaram após corrigir o seletor do formulário no teste. Verificados filtro por classe, altura comum, foco sutil, envio FormData e reset.

## Promoções e blog — 05/10/2026

Componentes compartilhados SectionIntro, ImagePromotion e InfiniteConveyor. Home com duas promoções de produtos reais do mock (VIP FULL e 2.200 Coins), CTAs destacam o produto na loja. Eventos passam a esteira contínua com pausa, teclado e movimento reduzido, sem Agenda. Aparência dos cards de notícias preservada.

Blog interno com feed, busca/categoria, artigos com capa e parágrafos, publicação/edição pela conta demo (dono), curtidas únicas por usuário, comentários e exclusão pelo autor/dono, compartilhamento e persistência local. Visitantes leem; jogadores comuns interagem sem controles editoriais. Não há backend ou permissão real de administrador.

Quinze testes existentes aprovados e três testes novos aprovados após corrigir a consulta do PIN no teste. Verificados promos, loop de eventos, publicação/edição, curtidas/comentários após reload e leitor sem permissão editorial. Build e lint aprovados. Layout sem overflow em 320, 390 e 1440 px.

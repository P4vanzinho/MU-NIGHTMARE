# Cobertura das referências

Auditoria em 04/10/2026. HTML original arquivado em `references/nightmare-amostra.html`.

## Amostra aprovada

Header com marca, Servidor, Rankings, Eventos, Conta, Loja, Novidades, Mais, busca, entrar e baixar; grupos em menus acessíveis. Carrossel Loja / Season 6, anterior/próximo, dots, pausa e rotação de 6 segundos. Notícias em esteira contínua com pausa; a cópia visual do loop fica oculta da árvore de acessibilidade e da navegação por teclado. Mesma paleta escura, CTA amarelo, hero azul/violeta e Almendra na marca.

## Site antigo e equivalentes

- Início/status/rates: `/`, `/server`.
- Download e onboarding: `/download`.
- Login, registro com PIN e troca de senha: `/login`, `/register`, `/changepass`.
- Conta, moedas, banco de joias e VIP: `/account`.
- Personagens, classe, nome e visibilidade: aba Personagens.
- Cofre do jogo/site, transferências e venda: aba Cofres + criação no mercado.
- Chave PIX, remover, vincular/desvincular Mercado Pago: aba Pagamentos.
- Ranking e perfil: `/stats`, busca e filtro por classe.
- Eventos, duração, multiplicador e horários: `/events`, exportação .ics.
- Doações e formas de pagamento: `/donation`, checkout mockado.
- Loja moedas/VIP, serviços, pacotes e pedidos: `/shop`.
- Mercado: explorar, criar, cancelar, comprar, filtrar item/categoria/moeda/vendedor/nível/preço/Excellent, ordenar e paginar.
- Ofertas: enviar, aceitar e recusar; histórico de transações com taxa e líquido.
- PIX: código demo, simular confirmação e cancelar; compras entregam item ao site.
- Regras, reembolso, contatos, privacidade e termos: `/rules`, textos resumidos.
- Bugs, categorias/recompensas e comunidade: `/bugreport`, `/community`.
- Incrementos: `/news`, `/search`, `/components`, persistência local e estados vazios.

## Incrementos de paridade concluídos

- Interface PT/EN e preferência de idioma local.
- Cestas com múltiplos tipos de joias, validação de duplicatas e saldo por joia.
- Banco com os 17 tipos de joias/caixas do site antigo.
- Filtros Luck, Skill, Ancient, Socket, aceita ofertas e seis opções Excellent.
- Seleção de moedas aceitas nas ofertas e pagamento diferente do preço original.
- Reserva PIX de 15 minutos, cancelamento, expiração, confirmação, estorno e falha de entrega.
- Oferta em reais cria cobrança para o comprador e entrega somente após confirmação demo.
- Histórico pessoal e global de transações.
- Recompra do mesmo VIP soma 30 dias ao prazo atual.

## Limites deliberados do protótipo

Dados, preços, agenda, status e recompensas são mocks. PIX e Mercado Pago simulam comportamento sem integrações. A reserva é local ao navegador; não coordena clientes reais. Políticas estão resumidas para revisão; a versão de produção deve importar os textos oficiais completos. O download é demonstrativo e o convite Discord original é placeholder. Ícones e arte vetorial são ilustrações próprias de composição; assets finais do jogo podem substituir as áreas visuais sem alterar os fluxos.

## Status no header e esteira — 05/10/2026

Header com faixa compacta de jogadores online, Season, EXP e DROP; no mobile, a Season aparece apenas nos detalhes. A faixa abre um dialog com dados mockados e acesso à página do servidor. Notícias usam loop contínuo, pausa manual/hover e preferência de movimento reduzido. Ambos os componentes estão no catálogo.

Referências consultadas: [Havek MU](https://havek.mu/?lang=en) e [Global MU](https://global.muonline.io/servers), para hierarquia de status, população e rates.

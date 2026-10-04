export const products = [
  {
    id: "coins-1",
    title: "1.000 Nightmare Coins",
    kind: "Moedas",
    price: 25,
    coins: 1000,
    tag: "COMECE AQUI",
  },
  {
    id: "coins-2",
    title: "2.200 Nightmare Coins",
    kind: "Moedas",
    price: 50,
    coins: 2200,
    tag: "+10% BÔNUS",
  },
  {
    id: "vip-1",
    title: "VIP EXP • 30 dias",
    kind: "VIP",
    price: 29,
    coins: 0,
    vip: "VIP EXP",
    tag: "EVOLUA MAIS",
  },
  {
    id: "vip-2",
    title: "VIP FULL • 30 dias",
    kind: "VIP",
    price: 59,
    coins: 0,
    vip: "VIP FULL",
    tag: "EXP + CRAFT + DROP",
  },
];
export const rankings = Array.from({ length: 20 }, (_, i) => ({
  name:
    ["Raven", "Shadow", "Vortex", "DarkHunter", "Luna"][i % 5] +
    (i > 4 ? i : ""),
  className: ["Blade Knight", "Soul Master", "Muse Elf", "Dark Lord"][i % 4],
  resets: 250 - i * 9,
  level: 400,
  score: 125000 - i * 4100,
}));
export const events = [
  {
    name: "Blood Castle",
    time: "14:00",
    duration: 15,
    desc: "Atravesse a ponte e recupere a arma do anjo.",
    color: "#922555",
  },
  {
    name: "Devil Square",
    time: "16:30",
    duration: 20,
    desc: "Enfrente hordas e dispute o topo da arena.",
    color: "#5531aa",
  },
  {
    name: "Chaos Castle",
    time: "18:00",
    duration: 10,
    desc: "Sobreviva. Só um guerreiro sairá vencedor.",
    color: "#185e68",
  },
  {
    name: "Castle Siege",
    time: "20:00",
    duration: 60,
    desc: "Sua guilda. Seu castelo. Seu legado.",
    color: "#a56a17",
  },
];
export const news = [
  {
    title: "Season 6 está no ar",
    poster: "Season 6",
    tag: "S6",
    color: "#9335b5",
    to: "/news/season-6",
  },
  {
    title: "Loja da temporada",
    poster: "Loja",
    tag: "LJ",
    color: "#a1741c",
    to: "/shop",
  },
  {
    title: "Rankings dos caçadores",
    poster: "Rank",
    tag: "RK",
    color: "#6338b7",
    to: "/stats",
  },
  {
    title: "Eventos da semana",
    poster: "Eventos",
    tag: "EV",
    color: "#a52248",
    to: "/events",
  },
  {
    title: "Marketplace aberto",
    poster: "Mercado",
    tag: "MK",
    color: "#147b77",
    to: "/marketplace",
  },
  {
    title: "Experiência em x3",
    poster: "×3",
    tag: "XP",
    color: "#2744a0",
    to: "/server",
  },
];

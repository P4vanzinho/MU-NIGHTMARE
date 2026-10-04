export type Currency = "NC" | "Bless" | "Soul" | "BRL" | "Jewels";
export interface JewelAmount {
  name: string;
  quantity: number;
}
export interface Item {
  id: string;
  name: string;
  category: string;
  level: number;
  excellent: boolean;
  luck?: boolean;
  skill?: boolean;
  ancient?: boolean;
  socket?: boolean;
  excOptions?: number[];
  location: "game" | "site";
}
export interface Character {
  id: string;
  name: string;
  className: string;
  level: number;
  resets: number;
  hidden: boolean;
}
export interface User {
  username: string;
  email: string;
  password: string;
  pin: string;
  coins: number;
  jewels: Record<string, number>;
  items: Item[];
  characters: Character[];
  pix: string;
  connected: boolean;
  vip: string;
  vipExpires?: string;
}
export interface Listing {
  id: string;
  item: Item;
  seller: string;
  price: number;
  currency: Currency;
  acceptsOffers: boolean;
  jewels?: JewelAmount[];
  offerCurrencies?: Currency[];
}
export interface Offer {
  id: string;
  listingId: string;
  buyer: string;
  price: number;
  currency: Currency;
  status: "pending" | "accepted" | "rejected";
  jewels?: JewelAmount[];
}
export interface Transaction {
  id: string;
  buyer: string;
  seller: string;
  item: string;
  price: number;
  currency: Currency;
  date: string;
}
export interface Order {
  id: string;
  user: string;
  title: string;
  amount: number;
  coins: number;
  vip?: string;
  status:
    "pending" | "delivered" | "cancelled" | "expired" | "refunded" | "failed";
  createdAt?: string;
  listing?: Listing;
}
export interface Report {
  id: string;
  user: string;
  title: string;
  details: string;
}
export interface State {
  users: User[];
  session: string | null;
  listings: Listing[];
  offers: Offer[];
  transactions: Transaction[];
  orders: Order[];
  reports: Report[];
}
export type Action =
  | { type: "register"; user: User }
  | { type: "session"; username: string | null }
  | { type: "user"; user: User }
  | { type: "list"; listing: Listing }
  | { type: "cancel"; id: string }
  | { type: "buy"; id: string }
  | { type: "offer"; offer: Offer }
  | { type: "offerStatus"; id: string; status: "accepted" | "rejected" }
  | { type: "order"; order: Order }
  | {
      type: "orderStatus";
      id: string;
      status: "delivered" | "cancelled" | "expired" | "refunded" | "failed";
    }
  | { type: "report"; report: Report };

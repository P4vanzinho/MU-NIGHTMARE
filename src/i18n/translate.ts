import dictionary from "./en.json";
import type { Locale } from "@/types/locale";
const en: Record<string, string> = dictionary;
export function translateText(text: string, locale: Locale): string {
  if (locale === "pt") return text;
  const key = text.replace(/\s+/g, " ").trim();
  if (en[key]) return text.replace(key, en[key]);
  if (key.startsWith("Olá, ")) return text.replace("Olá, ", "Hello, ");
  if (key.startsWith("Joia ")) return text.replace("Joia ", "Jewel ");
  if (key.startsWith("Valor da oferta em "))
    return text.replace("Valor da oferta em ", "Offer amount in ");
  if (key.startsWith("Resultados para "))
    return text.replace("Resultados para ", "Results for ");
  if (key.endsWith(" · hoje")) return text.replace(" · hoje", " · today");
  return text;
}

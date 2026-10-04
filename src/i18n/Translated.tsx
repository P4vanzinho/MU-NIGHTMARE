import { useContext } from "react";
import { LocaleContext } from "./context";
import type { TranslatedProps } from "@/types/locale";
export function Translated({ text }: TranslatedProps) {
  const { translate } = useContext(LocaleContext);
  return typeof text === "string" ? translate(text) : text;
}

import { createContext } from "react";
import type { LocaleContextValue } from "@/types/locale";
export const LocaleContext = createContext<LocaleContextValue>({
  locale: "pt",
  setLocale: () => {},
  translate: (text) => text,
});

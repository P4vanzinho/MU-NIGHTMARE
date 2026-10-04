import { useState, useEffect, type ReactNode } from "react";
import { LocaleContext } from "./context";
import { translateText } from "./translate";
import type { Locale } from "@/types/locale";
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() =>
    localStorage.getItem("nightmare-language") === "en" ? "en" : "pt",
  );
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    localStorage.setItem("nightmare-language", locale);
  }, [locale]);
  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        translate: (text) => translateText(text, locale),
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

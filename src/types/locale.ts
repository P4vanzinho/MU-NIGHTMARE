import type { ReactNode } from "react";
export type Locale = "pt" | "en";
export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translate: (text: string) => string;
}
export interface TranslatedProps {
  text: ReactNode;
}

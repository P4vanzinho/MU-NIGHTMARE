import type { ReactNode } from "react";
export interface FormSelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  "aria-label"?: string;
}
export interface SelectOptionProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

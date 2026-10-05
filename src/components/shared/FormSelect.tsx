import { Children, isValidElement, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormSelectProps, SelectOptionProps } from "./form-select.types";

export function SelectOption(props: SelectOptionProps) {
  return <SelectItem {...props} />;
}
export function FormSelect({
  children,
  value,
  defaultValue,
  onValueChange,
  className,
  "aria-label": label,
  ...props
}: FormSelectProps) {
  const options = Children.toArray(children);
  const first = options.find(isValidElement<SelectOptionProps>);
  const initial = defaultValue ?? first?.props.value ?? "";
  const [selection, setSelection] = useState(initial);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const form = trigger.current?.closest("form");
    const reset = () => setSelection(initial);
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [initial]);
  return (
    <Select
      {...props}
      value={value ?? selection}
      onValueChange={(next) => {
        setSelection(next);
        onValueChange?.(next);
      }}
    >
      <SelectTrigger ref={trigger} className={className} aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">{children}</SelectContent>
    </Select>
  );
}

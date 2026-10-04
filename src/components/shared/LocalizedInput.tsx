import { useContext, type ComponentProps } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { LocaleContext } from "@/i18n/context";
export function Input(props: ComponentProps<typeof ShadcnInput>) {
  const { translate } = useContext(LocaleContext);
  return (
    <ShadcnInput
      {...props}
      placeholder={props.placeholder ? translate(props.placeholder) : undefined}
      aria-label={
        props["aria-label"] ? translate(props["aria-label"]) : undefined
      }
    />
  );
}

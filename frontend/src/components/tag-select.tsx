import * as React from "react";

import { useTag } from "@/hooks/useTag";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type TagSelectProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
  error?: string;
};

export function TagSelect({
  value,
  onChange,
  disabled,
  error,
}: TagSelectProps) {
  const { tagNames } = useTag();
  const anchor = useComboboxAnchor();
  const inputId = React.useId();

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={inputId}>Etiquetas</FieldLabel>
      <Combobox
        multiple
        autoHighlight
        disabled={disabled}
        items={tagNames}
        value={value}
        onValueChange={onChange}
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(values: string[]) => (
              <React.Fragment>
                {values.map((tag) => (
                  <ComboboxChip key={tag} className="capitalize">
                    {tag}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id={inputId}
                  disabled={disabled}
                  placeholder={
                    values.length === 0
                      ? "Seleccioná una o más etiquetas..."
                      : ""
                  }
                  aria-invalid={Boolean(error)}
                />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No se encontraron etiquetas.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                <span className="capitalize">{item}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}

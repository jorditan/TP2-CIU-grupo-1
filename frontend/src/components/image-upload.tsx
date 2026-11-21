import * as React from "react";
import { PlusIcon, XIcon } from "lucide-react";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type ImageUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  error?: string;
};

function isValidImageUrl(raw: string) {
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function getDisplayHost(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function ImageUpload({
  value,
  onChange,
  onBlur,
  name,
  ref,
  disabled,
  error,
}: ImageUploadProps) {
  const id = React.useId();
  const [urlInput, setUrlInput] = React.useState("");
  const [inputError, setInputError] = React.useState<string>();
  const message = error || inputError;

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!isValidImageUrl(trimmed)) {
      setInputError("Ingresá una URL válida (http:// o https://).");
      return;
    }

    if (value.includes(trimmed)) {
      setInputError("Esa imagen ya fue agregada.");
      return;
    }

    setInputError(undefined);
    onChange([...value, trimmed]);
    setUrlInput("");
  };

  return (
    <Field data-invalid={Boolean(message)}>
      <FieldLabel htmlFor={id}>Imágenes (URL)</FieldLabel>
      <div className="flex gap-2">
        <Input
          ref={ref}
          id={id}
          name={name}
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={urlInput}
          disabled={disabled}
          onBlur={onBlur}
          onChange={(e) => {
            setUrlInput(e.target.value);
            if (inputError) setInputError(undefined);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddUrl();
            }
          }}
          aria-invalid={Boolean(message)}
          aria-describedby={`${id}-description${message ? ` ${id}-error` : ""}`}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled || !urlInput.trim()}
          onClick={handleAddUrl}
        >
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <FieldDescription id={`${id}-description`}>
        Pegá una o varias URLs de imágenes. Podés agregar más o quitarlas antes
        de publicar.
      </FieldDescription>
      {message && <FieldError id={`${id}-error`}>{message}</FieldError>}
      {value.length > 0 && (
        <AttachmentGroup aria-label="Imágenes agregadas">
          {value.map((url, idx) => (
            <Attachment key={url} orientation="vertical" state="idle">
              <AttachmentMedia variant="image">
                <img src={url} alt={`Imagen ${idx + 1}`} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle title={url}>Imagen {idx + 1}</AttachmentTitle>
                <AttachmentDescription>
                  {getDisplayHost(url)}
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  type="button"
                  className="bg-background/90"
                  aria-label={`Quitar imagen ${idx + 1}`}
                  disabled={disabled}
                  onClick={() => {
                    setInputError(undefined);
                    onChange(value.filter((item) => item !== url));
                  }}
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </AttachmentGroup>
      )}
    </Field>
  );
}

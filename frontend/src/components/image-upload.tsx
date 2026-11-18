import * as React from "react";
import { XIcon } from "lucide-react";

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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type ImageUploadProps = {
  value: File[];
  onChange: (files: File[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  error?: string;
};

function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.lastModified, file.type]);
}

function ImageAttachment({
  file,
  onRemove,
  disabled,
}: {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}) {
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const url = URL.createObjectURL(file);
    if (imageRef.current) imageRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Attachment orientation="vertical" state="idle">
      <AttachmentMedia variant="image">
        <img ref={imageRef} alt={file.name} />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle title={file.name}>{file.name}</AttachmentTitle>
        <AttachmentDescription>
          {file.type.replace("image/", "").toUpperCase()} ·{" "}
          {file.size < 1024 * 1024
            ? `${Math.ceil(file.size / 1024)} KB`
            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction
          type="button"
          className="bg-background/90"
          aria-label={`Quitar ${file.name}`}
          disabled={disabled}
          onClick={onRemove}
        >
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
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
  const [selectionError, setSelectionError] = React.useState<string>();
  const message = error || selectionError;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? []);
    const images = selected.filter((file) => file.type.startsWith("image/"));
    setSelectionError(
      images.length !== selected.length
        ? "Solo se pueden seleccionar imágenes."
        : undefined
    );

    const files = new Map(value.map((file) => [fileKey(file), file]));
    images.forEach((file) => files.set(fileKey(file), file));
    onChange([...files.values()]);
    // Allow selecting the same file again after removing it.
    event.currentTarget.value = "";
  }

  return (
    <Field data-invalid={!!message}>
      <FieldLabel htmlFor={id}>Imágenes</FieldLabel>
      <Input
        ref={ref}
        id={id}
        name={name}
        type="file"
        accept="image/*"
        multiple
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleChange}
        aria-invalid={!!message}
        aria-describedby={`${id}-description${message ? ` ${id}-error` : ""}`}
      />
      <FieldDescription id={`${id}-description`}>
        Selecciona una o varias imágenes. Puedes agregar más o quitarlas antes
        de publicar.
      </FieldDescription>
      {message && <FieldError id={`${id}-error`}>{message}</FieldError>}
      {value.length > 0 && (
        <AttachmentGroup aria-label="Imágenes seleccionadas">
          {value.map((file) => (
            <ImageAttachment
              key={fileKey(file)}
              file={file}
              disabled={disabled}
              onRemove={() => {
                setSelectionError(undefined);
                onChange(value.filter((image) => image !== file));
              }}
            />
          ))}
        </AttachmentGroup>
      )}
    </Field>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";
import { TagSelect } from "@/components/tag-select";
import { useCreatePost } from "@/hooks/useCreatePost";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria.")
    .max(240, "La descripción debe tener como máximo 240 caracteres."),
  images: z.array(z.string().url("Ingresá una URL válida.")),
  tags: z.array(z.string().min(1)),
});

type PostFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function PostForm({ onSuccess, onCancel }: PostFormProps) {
  const { createPost, isCreating } = useCreatePost();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      images: [],
      tags: [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const ok = await createPost(data);
    if (ok) {
      form.reset();
      onSuccess?.();
    }
  }

  const isBusy = form.formState.isSubmitting || isCreating;

  return (
    <form
      id="form-rhf-demo"
      className="flex min-w-0 flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Descripción
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="Descripción de la publicación..."
                    rows={6}
                    disabled={isBusy}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/240 caracteres
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="images"
            control={form.control}
            render={({ field, fieldState }) => (
              <ImageUpload
                {...field}
                disabled={isBusy}
                error={fieldState.error?.message}
              />
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <TagSelect
                value={field.value}
                onChange={field.onChange}
                disabled={isBusy}
                error={fieldState.error?.message}
              />
            )}
          />
        </FieldGroup>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              onCancel?.();
            }}
          >
            Cancelar
          </Button>
          <Button disabled={isBusy} type="submit" form="form-rhf-demo">
            {isBusy ? "Creando..." : "Crear"}
          </Button>
        </div>
      </form>
  );
}

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    .min(20, "Description must be at least 20 characters.")
    .max(240, "Description must be at most 240 characters."),
  images: z.array(z.instanceof(File)),
  tags: z.array(z.string().min(1)),
});

export function PostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      images: [],
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>
            {JSON.stringify(
              data,
              (_key, value) =>
                value instanceof File
                  ? { name: value.name, type: value.type, size: value.size }
                  : value,
              2
            )}
          </code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Crear publicación</DialogTitle>
        <DialogDescription>
          Ingresa la información necesaria para crear una publicación.
        </DialogDescription>
      </DialogHeader>
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
                disabled={form.formState.isSubmitting}
                error={fieldState.error?.message}
              />
            )}
          />
        </FieldGroup>

        <FieldGroup>
            <label>
              <select name="tags" id="tags">
              <option value="arte">arte</option>
              <option value="programacion">programacion</option>
              <option value="tecno">tecno</option>
              <option value="pelicula">pelicula</option>
              <option value="unahur">unahur</option>
              </select>
            </label>
        </FieldGroup>
      </form>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Cancelar
        </Button>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          form="form-rhf-demo"
        >
          Crear
        </Button>
      </DialogFooter>
    </>
  );
}

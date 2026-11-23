import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";

type CommentFormProps = {
  placeholder: string;
  onSubmit: (comment: string) => Promise<void>;
};

function CommentForm({ placeholder, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isEmpty = comment.trim() === "";
  const showError = touched && isEmpty;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);

    if (isEmpty || submitting) return;

    try {
      setSubmitting(true);
      await onSubmit(comment.trim());
      // Solo se limpia si el envío salió bien
      setComment("");
      setTouched(false);
    } catch {
      // El error ya se informa con un toast en useComment;
      // acá solo evitamos perder lo que escribió el usuario.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
      <Field data-invalid={showError}>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={() => {
            if (comment !== "") setTouched(true);
          }}
          placeholder={placeholder}
          disabled={submitting}
          aria-invalid={showError}
          aria-required
        />
        {showError && (
          <FieldError>El comentario no puede estar vacío.</FieldError>
        )}
      </Field>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}

export default CommentForm;

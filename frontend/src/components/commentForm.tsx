import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";

type CommentFormProps = {
  placeholder: string;
  onSubmit: (comment: string) => void;
};

function CommentForm({ placeholder, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
        />
        <Button type="submit" disabled={!comment.trim()}>
          Enviar
        </Button>
      </form>
    </>
  );
}

export default CommentForm;

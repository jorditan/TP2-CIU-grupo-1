import { type Tag } from "@/types/tag";
import { tagService } from "@/services/tagService";
import { useEffect, useState } from "react";

export const useTag = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    tagService().getAll().then(setTags);
  }, []);

  return { tags };
};

import { useEffect, useMemo, useState } from "react";
import { type Tag } from "@/types/tag";
import { tagService } from "@/services/tagService";

export const useTag = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    tagService().getAll().then(setTags);
  }, []);

  const tagNames = useMemo(() => tags.map((tag) => tag.name), [tags]);

  return { tags, tagNames };
};

export function getAuthorDetails(name?: string) {
  const displayName = name || "Usuario";

  return {
    displayName,
    handle: `@${displayName.toLowerCase().replace(/\s+/g, "")}`,
    initials: displayName.slice(0, 2).toUpperCase(),
  };
}

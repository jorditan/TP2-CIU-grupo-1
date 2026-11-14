export { cn } from "cn";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const navItems = [
  { label: "Inicio", href: "/home" },
  {
    label: "Explorar",
    children: [
      { label: "Publicaciones", href: "/posts" },
      { label: "Etiquetas", href: "/tags" },
    ],
  },
];

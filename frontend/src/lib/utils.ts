export { cn } from "cn";

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

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

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 20) return "Buenas tardes";
  return "Buenas noches";
};

export interface GroupMember {
  initials: string;
  name: string;
}

export const GROUP_MEMBERS: GroupMember[] = [
  { initials: "PA", name: "Andino Guasch Pablo Elías" },
  { initials: "MJ", name: "Matías Owen Jordán" },
  { initials: "DE", name: "Dolenz Elias" },
  { initials: "MP", name: "Marcelo Perez Groh" },
];

export interface CarouselSlideItem {
  title: string;
  description: string;
  content: string;
  footerText: string;
  footerBadgeLabel: string;
  showMembers?: boolean;
}

export const getCarouselItems = (postCount: number): CarouselSlideItem[] => [
  {
    title: "UnaHur Anti-Social Net",
    description: "Construcción de Interfaces de Usuario",
    content:
      "Una red social pensada para compartir momentos y etiquetas de forma simple, directa y sin algoritmos invasivos.",
    footerText: "Equipo Grupo 1",
    footerBadgeLabel: "Proyecto TP2",
    showMembers: true,
  },
  {
    title: "Menos ruido, más momentos.",
    description: "Slogan de la comunidad",
    content:
      "Creemos en conversaciones reales, publicaciones claras y una interfaz donde el contenido siempre es protagonista.",
    footerText: "Diseño minimalista",
    footerBadgeLabel: "Minimalismo",
  },
  {
    title: "¿Sabías que...?",
    description: "Sobre la plataforma",
    content: `Cada publicación admite múltiples etiquetas temáticas para descubrir contenido por intereses. Hoy ya hay ${postCount} ${
      postCount === 1 ? "publicación activa" : "publicaciones activas"
    } en el feed.`,
    footerText: "Feed en tiempo real",
    footerBadgeLabel: "Comunidad",
  },
];

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

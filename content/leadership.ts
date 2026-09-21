export type Leader = {
  name: string;
  role: string;
  degree: string;
  initials: string;
  image?: string;
};

export const leadership: Leader[] = [
  {
    name: "Aarav Ghai",
    role: "President",
    degree: "B.S. Applied Mathematics",
    initials: "AG",
  },
  {
    name: "Vishal Makaram",
    role: "Treasurer",
    degree: "B.S. Applied Mathematics",
    initials: "VM",
    image: "/leadership/vishal-makaram.jpeg",
  },
  {
    name: "Devom Brahmbhatt",
    role: "Vice President",
    degree: "B.S. Physics",
    initials: "DB",
    image: "/leadership/devom-brahmbhatt.webp",
  },
];

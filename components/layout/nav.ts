export type NavItem = { href: string; label: string; accent?: boolean };

export const primaryNav: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/problems", label: "Problems" },
  { href: "/consulting", label: "Consulting", accent: true },
];

export const joinNav: NavItem = { href: "/join", label: "Join the club" };

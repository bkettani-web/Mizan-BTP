import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Receipt,
  Handshake,
  BarChart3,
  Settings,
} from "lucide-react";

export type NavItem = {
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Tableau de bord", shortLabel: "Accueil", href: "/", icon: LayoutDashboard },
  { label: "Chantiers", shortLabel: "Chantiers", href: "/chantiers", icon: Building2 },
  { label: "Dépenses", shortLabel: "Dépenses", href: "/depenses", icon: Receipt },
  { label: "Fournisseurs", shortLabel: "Fournisseurs", href: "/fournisseurs", icon: Handshake },
  { label: "Rapports", shortLabel: "Rapports", href: "/rapports", icon: BarChart3 },
  { label: "Paramètres", shortLabel: "Réglages", href: "/parametres", icon: Settings },
];

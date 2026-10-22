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
  labelKey: string;
  shortLabelKey: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.dashboard", shortLabelKey: "nav.dashboardShort", href: "/", icon: LayoutDashboard },
  { labelKey: "nav.chantiers", shortLabelKey: "nav.chantiers", href: "/chantiers", icon: Building2 },
  { labelKey: "nav.depenses", shortLabelKey: "nav.depenses", href: "/depenses", icon: Receipt },
  { labelKey: "nav.fournisseurs", shortLabelKey: "nav.fournisseurs", href: "/fournisseurs", icon: Handshake },
  { labelKey: "nav.rapports", shortLabelKey: "nav.rapports", href: "/rapports", icon: BarChart3 },
  { labelKey: "nav.parametres", shortLabelKey: "nav.parametresShort", href: "/parametres", icon: Settings },
];

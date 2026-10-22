import { CircleCheck, TriangleAlert, OctagonAlert } from "lucide-react";
import type { StatutChantier } from "@/lib/types";

/**
 * Compare la part du budget consommée à l'avancement réel des travaux.
 * Un chantier qui dépense beaucoup plus vite qu'il n'avance passe à l'orange,
 * puis au rouge — jusqu'au vrai dépassement de budget.
 */
export function getStatutChantier(
  budgetTotal: number,
  argentDepense: number,
  avancementTravaux: number,
): StatutChantier {
  const consommation = budgetTotal > 0 ? (argentDepense / budgetTotal) * 100 : 0;
  const ecart = consommation - avancementTravaux;

  if (consommation > 100 || ecart > 18) return "rouge";
  if (consommation > 90 || ecart > 8) return "orange";
  return "vert";
}

export const STATUT_LABELS: Record<StatutChantier, string> = {
  vert: "Tout va bien",
  orange: "À surveiller",
  rouge: "Dépassement",
};

export const STATUT_STYLES: Record<
  StatutChantier,
  {
    dot: string;
    text: string;
    bg: string;
    badge: "success" | "warning" | "danger";
    badgeSolid: "successSolid" | "warningSolid" | "dangerSolid";
    icon: typeof CircleCheck;
    accent: string;
  }
> = {
  vert: {
    dot: "bg-success",
    text: "text-success",
    bg: "bg-success-bg",
    badge: "success",
    badgeSolid: "successSolid",
    icon: CircleCheck,
    accent: "bg-success",
  },
  orange: {
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning-bg",
    badge: "warning",
    badgeSolid: "warningSolid",
    icon: TriangleAlert,
    accent: "bg-warning",
  },
  rouge: {
    dot: "bg-danger",
    text: "text-danger",
    bg: "bg-danger-bg",
    badge: "danger",
    badgeSolid: "dangerSolid",
    icon: OctagonAlert,
    accent: "bg-danger",
  },
};

import type { Chantier, StatutChantier } from "@/lib/types";

/**
 * Compare la part du budget consommée à l'avancement réel des travaux.
 * Un chantier qui dépense beaucoup plus vite qu'il n'avance passe à l'orange,
 * puis au rouge — jusqu'au vrai dépassement de budget.
 */
export function getStatutChantier(chantier: Chantier): StatutChantier {
  const consommation =
    chantier.budgetTotal > 0
      ? (chantier.argentDepense / chantier.budgetTotal) * 100
      : 0;
  const ecart = consommation - chantier.avancementTravaux;

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
  { dot: string; text: string; bg: string; badge: "success" | "warning" | "danger" }
> = {
  vert: { dot: "bg-success", text: "text-success", bg: "bg-success-bg", badge: "success" },
  orange: { dot: "bg-warning", text: "text-warning", bg: "bg-warning-bg", badge: "warning" },
  rouge: { dot: "bg-danger", text: "text-danger", bg: "bg-danger-bg", badge: "danger" },
};

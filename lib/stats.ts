import type { Chantier, Depense } from "@/lib/types";

export function getIndicateursGlobaux(chantiers: Chantier[]) {
  const budgetTotal = chantiers.reduce((sum, c) => sum + c.budgetTotal, 0);
  const argentDepense = chantiers.reduce((sum, c) => sum + c.argentDepense, 0);
  const revenuPrevisionnel = chantiers.reduce(
    (sum, c) => sum + c.revenuPrevisionnel,
    0,
  );
  const resteDisponible = budgetTotal - argentDepense;
  const beneficePrevu = revenuPrevisionnel - budgetTotal;
  const pourcentageDepense =
    budgetTotal > 0 ? (argentDepense / budgetTotal) * 100 : 0;
  const margePourcentage =
    revenuPrevisionnel > 0 ? (beneficePrevu / revenuPrevisionnel) * 100 : 0;

  return {
    budgetTotal,
    argentDepense,
    resteDisponible,
    beneficePrevu,
    pourcentageDepense,
    margePourcentage,
  };
}

const MOIS_LABEL = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

export function getDepensesMensuelles(depenses: Depense[], nbMois = 6) {
  const maintenant = new Date();
  const mois = Array.from({ length: nbMois }).map((_, index) => {
    const offset = nbMois - 1 - index;
    const date = new Date(
      maintenant.getFullYear(),
      maintenant.getMonth() - offset,
      1,
    );
    return {
      cle: `${date.getFullYear()}-${date.getMonth()}`,
      mois: MOIS_LABEL[date.getMonth()],
      total: 0,
    };
  });

  for (const depense of depenses) {
    const date = new Date(depense.date);
    const cle = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = mois.find((m) => m.cle === cle);
    if (bucket) bucket.total += depense.montant;
  }

  return mois.map(({ mois, total }) => ({ mois, total }));
}

export function getDernieresDepenses(depenses: Depense[], limite = 5) {
  return [...depenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limite);
}

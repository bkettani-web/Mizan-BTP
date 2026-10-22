import type { Chantier, Depense, Fournisseur } from "@/lib/types";
import { INTL_LOCALE, type Locale } from "@/lib/i18n/translations";

/** Dépenses enregistrées en détail pour un chantier donné, les plus récentes d'abord. */
export function getDepensesDuChantier(chantierId: string, depenses: Depense[]) {
  return [...depenses]
    .filter((d) => d.chantierId === chantierId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Montant réellement dépensé à ce jour sur un chantier (antérieur + dépenses suivies). */
export function getArgentDepenseChantier(chantier: Chantier, depenses: Depense[]) {
  const suivi = depenses
    .filter((d) => d.chantierId === chantier.id)
    .reduce((sum, d) => sum + d.montant, 0);
  return chantier.depensesAnterieures + suivi;
}

export function getIndicateursGlobaux(chantiers: Chantier[], depenses: Depense[]) {
  const budgetTotal = chantiers.reduce((sum, c) => sum + c.budgetTotal, 0);
  const argentDepense = chantiers.reduce(
    (sum, c) => sum + getArgentDepenseChantier(c, depenses),
    0,
  );
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

export function getDepensesMensuelles(
  depenses: Depense[],
  nbMois = 6,
  locale: Locale = "fr",
) {
  const formateurMois = new Intl.DateTimeFormat(INTL_LOCALE[locale], { month: "short" });
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
      mois: formateurMois.format(date),
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

export type FournisseurResume = {
  id?: string;
  nom: string;
  montantTotal: number;
  nombreDepenses: number;
  chantiers: string[];
  derniereDepense?: string;
  telephone?: string;
  email?: string;
  specialite?: string;
  adresse?: string;
  notes?: string;
};

/**
 * Fusionne le carnet de fournisseurs (coordonnées saisies à la main) avec
 * les statistiques calculées à partir des dépenses enregistrées. Un
 * fournisseur peut apparaître ici sans avoir encore de dépense (coordonnées
 * seules) ou sans fiche explicite (déduit du champ libre d'une dépense).
 */
export function getFournisseurs(
  depenses: Depense[],
  chantiers: Chantier[],
  fournisseurs: Fournisseur[] = [],
  inconnuLabel = "Chantier inconnu",
): FournisseurResume[] {
  const parNom = new Map<string, FournisseurResume>();

  for (const fournisseur of fournisseurs) {
    const nom = fournisseur.nom.trim();
    if (!nom) continue;
    parNom.set(nom, {
      id: fournisseur.id,
      nom,
      montantTotal: 0,
      nombreDepenses: 0,
      chantiers: [],
      telephone: fournisseur.telephone,
      email: fournisseur.email,
      specialite: fournisseur.specialite,
      adresse: fournisseur.adresse,
      notes: fournisseur.notes,
    });
  }

  for (const depense of depenses) {
    const nom = depense.fournisseur?.trim();
    if (!nom) continue;

    const chantierNom =
      chantiers.find((c) => c.id === depense.chantierId)?.nom ?? inconnuLabel;

    const existant = parNom.get(nom);
    if (existant) {
      existant.montantTotal += depense.montant;
      existant.nombreDepenses += 1;
      if (!existant.chantiers.includes(chantierNom)) {
        existant.chantiers.push(chantierNom);
      }
      if (!existant.derniereDepense || new Date(depense.date) > new Date(existant.derniereDepense)) {
        existant.derniereDepense = depense.date;
      }
    } else {
      parNom.set(nom, {
        nom,
        montantTotal: depense.montant,
        nombreDepenses: 1,
        chantiers: [chantierNom],
        derniereDepense: depense.date,
      });
    }
  }

  return [...parNom.values()].sort((a, b) => b.montantTotal - a.montantTotal);
}

export type StatutChantier = "vert" | "orange" | "rouge";

export type Chantier = {
  id: string;
  nom: string;
  ville: string;
  /** Budget total prévu pour la construction, en MAD */
  budgetTotal: number;
  /**
   * Montant dépensé avant le début du suivi ligne par ligne dans Mizan BTP
   * (chantiers démarrés avant l'utilisation de l'application). Le montant
   * réellement dépensé à ce jour est toujours recalculé en ajoutant les
   * dépenses enregistrées pour ce chantier.
   */
  depensesAnterieures: number;
  /** Chiffre d'affaires de vente prévisionnel, en MAD */
  revenuPrevisionnel: number;
  /** Avancement physique des travaux, de 0 à 100 */
  avancementTravaux: number;
  dateDebut: string;
};

export type Depense = {
  id: string;
  date: string;
  chantierId: string;
  description: string;
  fournisseur?: string;
  categorie: string;
  montant: number;
};

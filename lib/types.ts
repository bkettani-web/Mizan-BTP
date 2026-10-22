export type StatutChantier = "vert" | "orange" | "rouge";

export type Chantier = {
  id: string;
  nom: string;
  ville: string;
  /** Budget total prévu pour la construction, en MAD */
  budgetTotal: number;
  /** Montant déjà dépensé, en MAD */
  argentDepense: number;
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

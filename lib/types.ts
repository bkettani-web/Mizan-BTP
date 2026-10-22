export type StatutChantier = "vert" | "orange" | "rouge";

/**
 * Informations complémentaires sur un chantier, toutes facultatives et
 * renseignées progressivement (terrain, autorisations, construction,
 * contact sur place). Rien n'est requis à la création d'un chantier.
 */
export type ChantierDetails = {
  // Terrain
  surfaceTerrain?: number; // en m²
  prixTerrain?: number; // en MAD, montant total
  referenceFonciere?: string;
  // Autorisations
  numeroPermis?: string;
  datePermis?: string; // ISO
  // Construction
  surfaceConstruite?: number; // en m²
  nombreLots?: number;
  nombreEtages?: number;
  architecte?: string;
  entrepriseConstruction?: string;
  // Contact sur place
  responsableChantier?: string;
  telephoneResponsable?: string;
  // Notes libres
  notes?: string;
};

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
  details?: ChantierDetails;
};

/**
 * Fiche fournisseur : un carnet de contacts indépendant des dépenses.
 * Un fournisseur peut être ajouté avant même d'avoir enregistré une
 * dépense avec lui (ex. pour garder ses coordonnées à portée de main).
 */
export type Fournisseur = {
  id: string;
  nom: string;
  telephone?: string;
  email?: string;
  specialite?: string;
  adresse?: string;
  notes?: string;
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

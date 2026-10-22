/**
 * Clé de traduction -> valeur stockée (toujours en français, comme les
 * autres données métier : seule l'étiquette affichée change de langue).
 * Partagé entre le formulaire de dépense (catégorie) et le formulaire de
 * fournisseur (spécialité).
 */
export const CATEGORY_OPTIONS: { key: string; value: string }[] = [
  { key: "categories.grosOeuvre", value: "Gros œuvre" },
  { key: "categories.mainOeuvre", value: "Main d'œuvre" },
  { key: "categories.materiaux", value: "Matériaux" },
  { key: "categories.lotsTechniques", value: "Lots techniques" },
  { key: "categories.finitions", value: "Finitions" },
  { key: "categories.locationMateriel", value: "Location matériel" },
  { key: "categories.etudes", value: "Études" },
  { key: "categories.administratif", value: "Administratif" },
  { key: "categories.autre", value: "Autre" },
];

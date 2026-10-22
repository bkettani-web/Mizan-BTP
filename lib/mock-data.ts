import type { Chantier, Depense } from "@/lib/types";

function isoDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

export const chantiers: Chantier[] = [
  {
    id: "al-andalous",
    nom: "Résidence Al Andalous",
    ville: "Casablanca",
    budgetTotal: 18_500_000,
    // 10 175 000 MAD dépensés au total, dont 1 095 500 MAD suivis en détail ci-dessous
    depensesAnterieures: 9_079_500,
    revenuPrevisionnel: 24_000_000,
    avancementTravaux: 55,
    dateDebut: isoDaysAgo(260),
  },
  {
    id: "villas-atlas",
    nom: "Villas Atlas",
    ville: "Marrakech",
    budgetTotal: 32_000_000,
    // 33 500 000 MAD dépensés au total, dont 1 943 000 MAD suivis en détail ci-dessous
    depensesAnterieures: 31_557_000,
    revenuPrevisionnel: 41_000_000,
    avancementTravaux: 82,
    dateDebut: isoDaysAgo(400),
  },
  {
    id: "bay-view",
    nom: "Immeuble Bay View",
    ville: "Tanger",
    budgetTotal: 14_000_000,
    // 7 500 000 MAD dépensés au total, dont 936 000 MAD suivis en détail ci-dessous
    depensesAnterieures: 6_564_000,
    revenuPrevisionnel: 19_500_000,
    avancementTravaux: 40,
    dateDebut: isoDaysAgo(190),
  },
  {
    id: "les-oliviers",
    nom: "Résidence Les Oliviers",
    ville: "Rabat",
    budgetTotal: 9_800_000,
    // 1 150 000 MAD dépensés au total, dont 540 000 MAD suivis en détail ci-dessous
    depensesAnterieures: 610_000,
    revenuPrevisionnel: 13_200_000,
    avancementTravaux: 10,
    dateDebut: isoDaysAgo(45),
  },
];

export const depenses: Depense[] = [
  { id: "d1", date: isoDaysAgo(1), chantierId: "villas-atlas", description: "Carrelage et revêtements sols", fournisseur: "Céramiques du Sud", categorie: "Finitions", montant: 142_000 },
  { id: "d2", date: isoDaysAgo(3), chantierId: "al-andalous", description: "Main d'œuvre — gros œuvre", fournisseur: "SARL Bâtiss Pro", categorie: "Main d'œuvre", montant: 268_000 },
  { id: "d3", date: isoDaysAgo(5), chantierId: "bay-view", description: "Location grue à tour — mensuel", fournisseur: "LocaGrue Maroc", categorie: "Location matériel", montant: 95_000 },
  { id: "d4", date: isoDaysAgo(6), chantierId: "villas-atlas", description: "Menuiserie aluminium — lot 3", fournisseur: "Alu Design", categorie: "Finitions", montant: 310_000 },
  { id: "d5", date: isoDaysAgo(9), chantierId: "les-oliviers", description: "Terrassement et fondations", fournisseur: "Travaux Publics Rabat", categorie: "Gros œuvre", montant: 420_000 },
  { id: "d6", date: isoDaysAgo(12), chantierId: "al-andalous", description: "Béton prêt à l'emploi — étage 6", fournisseur: "Ciments de l'Atlas", categorie: "Matériaux", montant: 176_500 },
  { id: "d7", date: isoDaysAgo(15), chantierId: "bay-view", description: "Plomberie — réseaux encastrés", fournisseur: "Hydro Plus", categorie: "Lots techniques", montant: 88_000 },
  { id: "d8", date: isoDaysAgo(18), chantierId: "villas-atlas", description: "Électricité — tableaux et câblage", fournisseur: "ElecPro Marrakech", categorie: "Lots techniques", montant: 154_000 },
  { id: "d9", date: isoDaysAgo(24), chantierId: "al-andalous", description: "Étanchéité toiture-terrasse", fournisseur: "ÉtancheMaroc", categorie: "Finitions", montant: 63_000 },
  { id: "d10", date: isoDaysAgo(29), chantierId: "les-oliviers", description: "Honoraires bureau d'études", fournisseur: "Cabinet Ingénia", categorie: "Études", montant: 120_000 },
  { id: "d11", date: isoDaysAgo(35), chantierId: "bay-view", description: "Ferraillage structure", fournisseur: "Steel Maroc", categorie: "Matériaux", montant: 198_000 },
  { id: "d12", date: isoDaysAgo(41), chantierId: "villas-atlas", description: "Peinture façades et intérieurs", fournisseur: "ColorBTP", categorie: "Finitions", montant: 132_000 },
  { id: "d13", date: isoDaysAgo(52), chantierId: "al-andalous", description: "Main d'œuvre — second œuvre", fournisseur: "SARL Bâtiss Pro", categorie: "Main d'œuvre", montant: 221_000 },
  { id: "d14", date: isoDaysAgo(60), chantierId: "villas-atlas", description: "Ascenseurs — acompte commande", fournisseur: "ElevatorTech", categorie: "Lots techniques", montant: 540_000 },
  { id: "d15", date: isoDaysAgo(68), chantierId: "bay-view", description: "Maçonnerie — murs porteurs", fournisseur: "Travaux Publics Rabat", categorie: "Gros œuvre", montant: 245_000 },
  { id: "d16", date: isoDaysAgo(80), chantierId: "al-andalous", description: "Location grue à tour — mensuel", fournisseur: "LocaGrue Maroc", categorie: "Location matériel", montant: 92_000 },
  { id: "d17", date: isoDaysAgo(95), chantierId: "villas-atlas", description: "Gros œuvre — dalles étages 5-6", fournisseur: "Ciments de l'Atlas", categorie: "Matériaux", montant: 480_000 },
  { id: "d18", date: isoDaysAgo(110), chantierId: "bay-view", description: "Fondations spéciales", fournisseur: "Travaux Publics Rabat", categorie: "Gros œuvre", montant: 310_000 },
  { id: "d19", date: isoDaysAgo(130), chantierId: "al-andalous", description: "Terrassement", fournisseur: "Travaux Publics Rabat", categorie: "Gros œuvre", montant: 275_000 },
  { id: "d20", date: isoDaysAgo(150), chantierId: "villas-atlas", description: "Permis et taxes de construction", fournisseur: "Commune de Marrakech", categorie: "Administratif", montant: 185_000 },
];

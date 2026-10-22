# Mizan BTP

**L'équilibre de vos chantiers** — application de gestion de chantier pour promoteurs immobiliers.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Le tableau de bord se charge avec des données fictives (`lib/mock-data.ts`).

Autres commandes utiles :

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # vérifie le code avec ESLint
```

## Stack technique

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + composants shadcn/ui (créés manuellement dans `components/ui`)
- **lucide-react** pour les icônes, **Recharts** pour les graphiques
- Police **Manrope** (Google Fonts)

## Structure du projet

```
app/
  page.tsx            Tableau de bord (page d'accueil)
  chantiers/          Page "Bientôt disponible"
  depenses/           Page "Bientôt disponible"
  fournisseurs/       Page "Bientôt disponible"
  rapports/           Page "Bientôt disponible"
  parametres/         Page "Bientôt disponible"
components/
  ui/                 Composants de base (Button, Card, Dialog, Progress, Select…)
  navigation/         Sidebar (desktop) et barre de navigation (mobile)
  dashboard/          Cartes KPI, carte chantier, graphique, dernières dépenses
  depenses/           Formulaire "+ Ajouter une dépense"
lib/
  mock-data.ts        Données fictives (chantiers, dépenses)
  types.ts            Types TypeScript partagés
  stats.ts            Calculs d'indicateurs (totaux, graphique mensuel…)
  status.ts           Logique du code couleur vert / orange / rouge
  format.ts           Formatage des montants (MAD) et des dates
```

Les données sont actuellement fictives mais l'architecture (types, fonctions de calcul séparées des composants) est prête pour être branchée sur une vraie base de données (Supabase / PostgreSQL) : il suffira de remplacer les imports de `lib/mock-data.ts` par des appels à l'API.

## Prochaines étapes suggérées

1. Brancher une base de données (Supabase/PostgreSQL) et remplacer les données fictives.
2. Développer la page **Chantiers** (liste + fiche détaillée par chantier).
3. Développer la page **Dépenses** (liste filtrable, édition, pièces jointes/factures).
4. Développer **Fournisseurs** et **Rapports**.
5. Ajouter l'authentification et la gestion multi-utilisateurs (Paramètres).
6. Prévoir la devise EUR (le formatage dans `lib/format.ts` est déjà prêt pour ça).

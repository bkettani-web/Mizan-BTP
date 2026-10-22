import { Receipt } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon";

export default function DepensesPage() {
  return (
    <ComingSoon
      icon={Receipt}
      titre="Toutes vos dépenses, bientôt ici"
      description="Retrouvez, filtrez et exportez toutes vos dépenses par chantier, par date ou par fournisseur."
    />
  );
}

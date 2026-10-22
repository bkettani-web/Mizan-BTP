import { BarChart3 } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon";

export default function RapportsPage() {
  return (
    <ComingSoon
      icon={BarChart3}
      titre="Vos rapports, bientôt ici"
      description="Des rapports clairs et exportables sur vos budgets, vos marges et l'avancement de vos chantiers."
    />
  );
}

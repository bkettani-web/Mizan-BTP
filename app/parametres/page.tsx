import { Settings } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon";
import { ResetDemoData } from "@/components/parametres/reset-demo-data";

export default function ParametresPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">Paramètres</h1>
      </header>

      <ResetDemoData />

      <ComingSoon
        icon={Settings}
        titre="Les autres réglages, bientôt ici"
        description="Vous pourrez bientôt gérer votre équipe, votre devise et les préférences de votre compte."
      />
    </div>
  );
}

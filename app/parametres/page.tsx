import { Settings } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon";

export default function ParametresPage() {
  return (
    <ComingSoon
      icon={Settings}
      titre="Les réglages, bientôt ici"
      description="Vous pourrez bientôt gérer votre équipe, votre devise et les préférences de votre compte."
    />
  );
}

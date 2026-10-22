import { Handshake } from "lucide-react";

import { ComingSoon } from "@/components/coming-soon";

export default function FournisseursPage() {
  return (
    <ComingSoon
      icon={Handshake}
      titre="Vos fournisseurs, bientôt ici"
      description="Gardez les coordonnées de vos fournisseurs et artisans, et retrouvez l'historique de vos paiements."
    />
  );
}

"use client";

import { Building2 } from "lucide-react";

import { ChantierCard } from "@/components/dashboard/chantier-card";
import { AddExpenseDialog } from "@/components/depenses/add-expense-dialog";
import { EmptyState } from "@/components/empty-state";
import { useAppData } from "@/lib/store";

export default function ChantiersPage() {
  const { chantiers, depenses } = useAppData();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">Chantiers</h1>
          <p className="mt-1 text-[15px] text-anthracite">
            {chantiers.length} chantier{chantiers.length > 1 ? "s" : ""} en cours.
            Cliquez sur un chantier pour voir le détail.
          </p>
        </div>
        <AddExpenseDialog />
      </header>

      {chantiers.length === 0 ? (
        <EmptyState
          icon={Building2}
          titre="Vous n'avez pas encore de chantier"
          description="Créez le premier en 1 minute pour commencer à suivre son budget."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {chantiers.map((chantier) => (
            <ChantierCard key={chantier.id} chantier={chantier} depenses={depenses} />
          ))}
        </div>
      )}
    </div>
  );
}

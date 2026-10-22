"use client";

import { useMemo, useState } from "react";
import { Receipt } from "lucide-react";

import { AddExpenseDialog } from "@/components/depenses/add-expense-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/empty-state";
import { useAppData } from "@/lib/store";
import { formatDate, formatMontant } from "@/lib/format";

export default function DepensesPage() {
  const { chantiers, depenses } = useAppData();
  const [chantierId, setChantierId] = useState("tous");

  const depensesTriees = useMemo(
    () =>
      [...depenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [depenses],
  );

  const depensesFiltrees =
    chantierId === "tous"
      ? depensesTriees
      : depensesTriees.filter((d) => d.chantierId === chantierId);

  const total = depensesFiltrees.reduce((sum, d) => sum + d.montant, 0);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">Dépenses</h1>
          <p className="mt-1 text-[15px] text-anthracite">
            {depenses.length} dépense{depenses.length > 1 ? "s" : ""} enregistrée
            {depenses.length > 1 ? "s" : ""} au total.
          </p>
        </div>
        <AddExpenseDialog />
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-72">
          <Select
            aria-label="Filtrer par chantier"
            value={chantierId}
            onChange={(event) => setChantierId(event.target.value)}
          >
            <option value="tous">Tous les chantiers</option>
            {chantiers.map((chantier) => (
              <option key={chantier.id} value={chantier.id}>
                {chantier.nom}
              </option>
            ))}
          </Select>
        </div>
        <p className="text-[15px] font-semibold text-navy">
          Total affiché : {formatMontant(total)}
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col divide-y divide-border pt-5 sm:pt-6">
          {depensesFiltrees.length === 0 ? (
            <EmptyState
              icon={Receipt}
              titre="Aucune dépense ici"
              description="Changez de filtre ou ajoutez une nouvelle dépense avec le bouton ci-dessus."
            />
          ) : (
            depensesFiltrees.map((depense) => (
              <div
                key={depense.id}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-navy">
                    {depense.description}
                  </p>
                  <p className="mt-0.5 text-sm text-anthracite">
                    {chantiers.find((c) => c.id === depense.chantierId)?.nom ??
                      "Chantier inconnu"}{" "}
                    · {depense.categorie} · {formatDate(depense.date)}
                    {depense.fournisseur ? ` · ${depense.fournisseur}` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-[15px] font-semibold text-navy">
                  {formatMontant(depense.montant)}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

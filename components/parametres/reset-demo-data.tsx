"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppData } from "@/lib/store";

export function ResetDemoData() {
  const { reinitialiser } = useAppData();
  const [confirmation, setConfirmation] = useState(false);
  const [fait, setFait] = useState(false);

  function handleReset() {
    reinitialiser();
    setConfirmation(false);
    setFait(true);
    setTimeout(() => setFait(false), 2500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Données de démonstration</CardTitle>
        <CardDescription>
          Toutes les dépenses que vous ajoutez sont sauvegardées sur cet appareil,
          pour que vous puissiez tester l&apos;application librement.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {confirmation ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-anthracite">
              Les dépenses ajoutées seront remplacées par les données d&apos;origine.
              Confirmer ?
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmation(false)}>
                Annuler
              </Button>
              <Button size="sm" onClick={handleReset}>
                Confirmer
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setConfirmation(true)}>
            <RotateCcw className="size-4" />
            Réinitialiser les données de démonstration
          </Button>
        )}
        {fait ? (
          <p className="text-sm font-medium text-success">Données réinitialisées.</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, cloneElement, isValidElement } from "react";
import { Plus, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { chantiers } from "@/lib/mock-data";

const CATEGORIES = [
  "Gros œuvre",
  "Main d'œuvre",
  "Matériaux",
  "Lots techniques",
  "Finitions",
  "Location matériel",
  "Études",
  "Administratif",
  "Autre",
];

export function AddExpenseDialog({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [plusDeDetails, setPlusDeDetails] = useState(false);
  const [confirme, setConfirme] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirme(true);
    setTimeout(() => {
      setOpen(false);
      setConfirme(false);
      setPlusDeDetails(false);
      event.currentTarget.reset();
    }, 900);
  }

  const triggerElement =
    trigger && isValidElement(trigger) ? (
      cloneElement(trigger as React.ReactElement<{ onClick?: () => void }>, {
        onClick: () => setOpen(true),
      })
    ) : (
      <Button onClick={() => setOpen(true)} className="shadow-sm" size="lg">
        <Plus className="size-5" />
        Ajouter une dépense
      </Button>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerElement}
      <DialogContent>
        {confirme ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-success-bg">
              <Check className="size-7 text-success" />
            </div>
            <p className="text-lg font-semibold text-navy">
              Dépense enregistrée
            </p>
            <p className="text-sm text-anthracite">
              Elle sera bientôt visible dans vos rapports.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Ajouter une dépense</DialogTitle>
              <DialogDescription>
                Remplissez les informations essentielles, ça prend 1 minute.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chantier">Chantier</Label>
                <Select id="chantier" name="chantier" required defaultValue="">
                  <option value="" disabled>
                    Choisir un chantier
                  </option>
                  {chantiers.map((chantier) => (
                    <option key={chantier.id} value={chantier.id}>
                      {chantier.nom} — {chantier.ville}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Ex. Ciment et sable pour le 2e étage"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="montant">Montant (MAD)</Label>
                  <Input
                    id="montant"
                    name="montant"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select id="categorie" name="categorie" defaultValue="">
                  <option value="" disabled>
                    Choisir une catégorie
                  </option>
                  {CATEGORIES.map((categorie) => (
                    <option key={categorie} value={categorie}>
                      {categorie}
                    </option>
                  ))}
                </Select>
              </div>

              {plusDeDetails ? (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fournisseur">
                    Fournisseur{" "}
                    <span className="font-normal text-anthracite">
                      (optionnel)
                    </span>
                  </Label>
                  <Input
                    id="fournisseur"
                    name="fournisseur"
                    placeholder="Ex. Ciments de l'Atlas"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlusDeDetails(true)}
                  className="self-start text-sm font-semibold text-blue hover:underline"
                >
                  + Ajouter un fournisseur (optionnel)
                </button>
              )}

              <DialogFooter className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">Enregistrer la dépense</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

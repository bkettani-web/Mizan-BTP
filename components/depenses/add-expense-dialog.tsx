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
import { useAppData } from "@/lib/store";
import { useLocale } from "@/lib/i18n/context";
import { CURRENCY_LABEL } from "@/lib/i18n/translations";
import { CATEGORY_OPTIONS } from "@/lib/categories";

function dateInputVersISO(valeur: string) {
  // Les champs <input type="date"> renvoient "AAAA-MM-JJ" : on fixe midi
  // pour éviter tout décalage de fuseau horaire lors de l'affichage.
  return new Date(`${valeur}T12:00:00`).toISOString();
}

export function AddExpenseDialog({
  trigger,
  chantierIdParDefaut,
}: {
  trigger?: React.ReactNode;
  /** Pré-remplit et verrouille le chantier, utile depuis une fiche chantier. */
  chantierIdParDefaut?: string;
}) {
  const { chantiers, ajouterDepense } = useAppData();
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [plusDeDetails, setPlusDeDetails] = useState(false);
  const [confirme, setConfirme] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const chantierId = String(data.get("chantier") ?? "");
    const description = String(data.get("description") ?? "").trim();
    const montant = Number(data.get("montant"));
    const date = String(data.get("date") ?? "");
    const categorie = String(data.get("categorie") ?? "Autre");
    const fournisseur = String(data.get("fournisseur") ?? "").trim();

    if (!chantierId || !description || !montant || !date) return;

    ajouterDepense({
      chantierId,
      description,
      montant,
      date: dateInputVersISO(date),
      categorie: categorie || "Autre",
      fournisseur: fournisseur || undefined,
    });

    setConfirme(true);
    setTimeout(() => {
      setOpen(false);
      setConfirme(false);
      setPlusDeDetails(false);
      form.reset();
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
        {t("common.addExpense")}
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
            <p className="text-lg font-semibold text-navy">{t("expenseForm.savedTitle")}</p>
            <p className="text-sm text-anthracite">{t("expenseForm.savedDesc")}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("expenseForm.title")}</DialogTitle>
              <DialogDescription>{t("expenseForm.subtitle")}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chantier">{t("expenseForm.project")}</Label>
                {chantierIdParDefaut ? (
                  <>
                    <input type="hidden" name="chantier" value={chantierIdParDefaut} />
                    <Select id="chantier" value={chantierIdParDefaut} disabled>
                      {chantiers.map((chantier) => (
                        <option key={chantier.id} value={chantier.id}>
                          {chantier.nom} — {chantier.ville}
                        </option>
                      ))}
                    </Select>
                  </>
                ) : (
                  <Select id="chantier" name="chantier" required defaultValue="">
                    <option value="" disabled>
                      {t("expenseForm.projectPlaceholder")}
                    </option>
                    {chantiers.map((chantier) => (
                      <option key={chantier.id} value={chantier.id}>
                        {chantier.nom} — {chantier.ville}
                      </option>
                    ))}
                  </Select>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">{t("expenseForm.description")}</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder={t("expenseForm.descriptionPlaceholder")}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="montant">
                    {t("expenseForm.amount", { currency: CURRENCY_LABEL[locale] })}
                  </Label>
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
                  <Label htmlFor="date">{t("expenseForm.date")}</Label>
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
                <Label htmlFor="categorie">{t("expenseForm.category")}</Label>
                <Select id="categorie" name="categorie" defaultValue="">
                  <option value="" disabled>
                    {t("expenseForm.categoryPlaceholder")}
                  </option>
                  {CATEGORY_OPTIONS.map((categorie) => (
                    <option key={categorie.value} value={categorie.value}>
                      {t(categorie.key)}
                    </option>
                  ))}
                </Select>
              </div>

              {plusDeDetails ? (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fournisseur">
                    {t("expenseForm.supplier")}{" "}
                    <span className="font-normal text-anthracite">
                      {t("expenseForm.supplierOptional")}
                    </span>
                  </Label>
                  <Input
                    id="fournisseur"
                    name="fournisseur"
                    placeholder={t("expenseForm.supplierPlaceholder")}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlusDeDetails(true)}
                  className="self-start text-sm font-semibold text-blue hover:underline"
                >
                  {t("expenseForm.addSupplier")}
                </button>
              )}

              <DialogFooter className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  {t("common.cancel")}
                </Button>
                <Button type="submit">{t("expenseForm.submit")}</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

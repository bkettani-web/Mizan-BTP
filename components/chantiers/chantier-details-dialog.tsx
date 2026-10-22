"use client";

import { useState, cloneElement, isValidElement, type ReactElement } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import type { Chantier, ChantierDetails } from "@/lib/types";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-blue">{children}</p>
  );
}

function texteOuVide(valeur: FormDataEntryValue | null) {
  const v = String(valeur ?? "").trim();
  return v ? v : undefined;
}

function nombreOuVide(valeur: FormDataEntryValue | null) {
  const v = String(valeur ?? "").trim();
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function ChantierDetailsDialog({
  chantier,
  trigger,
}: {
  chantier: Chantier;
  trigger: ReactElement<{ onClick?: () => void }>;
}) {
  const { modifierChantier } = useAppData();
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [confirme, setConfirme] = useState(false);
  const d = chantier.details;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const details: ChantierDetails = {
      surfaceTerrain: nombreOuVide(data.get("surfaceTerrain")),
      prixTerrain: nombreOuVide(data.get("prixTerrain")),
      referenceFonciere: texteOuVide(data.get("referenceFonciere")),
      numeroPermis: texteOuVide(data.get("numeroPermis")),
      datePermis: texteOuVide(data.get("datePermis")),
      surfaceConstruite: nombreOuVide(data.get("surfaceConstruite")),
      nombreLots: nombreOuVide(data.get("nombreLots")),
      nombreEtages: nombreOuVide(data.get("nombreEtages")),
      architecte: texteOuVide(data.get("architecte")),
      entrepriseConstruction: texteOuVide(data.get("entrepriseConstruction")),
      responsableChantier: texteOuVide(data.get("responsableChantier")),
      telephoneResponsable: texteOuVide(data.get("telephoneResponsable")),
      notes: texteOuVide(data.get("notes")),
    };

    modifierChantier(chantier.id, { details });

    setConfirme(true);
    setTimeout(() => {
      setOpen(false);
      setConfirme(false);
    }, 900);
  }

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger, { onClick: () => setOpen(true) })
    : trigger;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerElement}
      <DialogContent className="max-w-lg">
        {confirme ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-success-bg">
              <Check className="size-7 text-success" />
            </div>
            <p className="text-lg font-semibold text-navy">
              {t("projectDetailsForm.savedTitle")}
            </p>
            <p className="text-sm text-anthracite">{t("projectDetailsForm.savedDesc")}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("projectDetailsForm.title")}</DialogTitle>
              <DialogDescription>{t("projectDetailsForm.subtitle")}</DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto pe-1"
            >
              <div className="flex flex-col gap-3">
                <SectionTitle>{t("projectDetailsForm.sectionLand")}</SectionTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="surfaceTerrain">{t("projectDetailsForm.landSurface")}</Label>
                    <Input
                      id="surfaceTerrain"
                      name="surfaceTerrain"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      defaultValue={d?.surfaceTerrain ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="prixTerrain">
                      {t("projectDetailsForm.landPrice", { currency: CURRENCY_LABEL[locale] })}
                    </Label>
                    <Input
                      id="prixTerrain"
                      name="prixTerrain"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      defaultValue={d?.prixTerrain ?? ""}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="referenceFonciere">{t("projectDetailsForm.landReference")}</Label>
                  <Input
                    id="referenceFonciere"
                    name="referenceFonciere"
                    defaultValue={d?.referenceFonciere ?? ""}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <SectionTitle>{t("projectDetailsForm.sectionPermits")}</SectionTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="numeroPermis">{t("projectDetailsForm.permitNumber")}</Label>
                    <Input
                      id="numeroPermis"
                      name="numeroPermis"
                      defaultValue={d?.numeroPermis ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="datePermis">{t("projectDetailsForm.permitDate")}</Label>
                    <Input
                      id="datePermis"
                      name="datePermis"
                      type="date"
                      defaultValue={d?.datePermis ? d.datePermis.slice(0, 10) : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <SectionTitle>{t("projectDetailsForm.sectionConstruction")}</SectionTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="surfaceConstruite">
                      {t("projectDetailsForm.builtSurface")}
                    </Label>
                    <Input
                      id="surfaceConstruite"
                      name="surfaceConstruite"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      defaultValue={d?.surfaceConstruite ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="nombreLots">{t("projectDetailsForm.units")}</Label>
                    <Input
                      id="nombreLots"
                      name="nombreLots"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      defaultValue={d?.nombreLots ?? ""}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="nombreEtages">{t("projectDetailsForm.floors")}</Label>
                    <Input
                      id="nombreEtages"
                      name="nombreEtages"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      defaultValue={d?.nombreEtages ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="architecte">{t("projectDetailsForm.architect")}</Label>
                    <Input id="architecte" name="architecte" defaultValue={d?.architecte ?? ""} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="entrepriseConstruction">
                    {t("projectDetailsForm.contractor")}
                  </Label>
                  <Input
                    id="entrepriseConstruction"
                    name="entrepriseConstruction"
                    defaultValue={d?.entrepriseConstruction ?? ""}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <SectionTitle>{t("projectDetailsForm.sectionContact")}</SectionTitle>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="responsableChantier">
                      {t("projectDetailsForm.siteManager")}
                    </Label>
                    <Input
                      id="responsableChantier"
                      name="responsableChantier"
                      defaultValue={d?.responsableChantier ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="telephoneResponsable">
                      {t("projectDetailsForm.siteManagerPhone")}
                    </Label>
                    <Input
                      id="telephoneResponsable"
                      name="telephoneResponsable"
                      type="tel"
                      defaultValue={d?.telephoneResponsable ?? ""}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <SectionTitle>{t("projectDetailsForm.sectionNotes")}</SectionTitle>
                <Textarea
                  name="notes"
                  placeholder={t("projectDetailsForm.notesPlaceholder")}
                  defaultValue={d?.notes ?? ""}
                />
              </div>

              <DialogFooter className="mt-1">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  {t("common.cancel")}
                </Button>
                <Button type="submit">{t("projectDetailsForm.save")}</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

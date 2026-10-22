import { ClipboardList, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { ChantierDetailsDialog } from "@/components/chantiers/chantier-details-dialog";
import { useLocale } from "@/lib/i18n/context";
import { CURRENCY_LABEL } from "@/lib/i18n/translations";
import { formatDate, formatMontant } from "@/lib/format";
import type { Chantier } from "@/lib/types";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-anthracite">{label}</p>
      <p className="mt-0.5 text-[15px] font-semibold text-navy">{value}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wide text-blue">{children}</p>;
}

export function ChantierDetailsCard({ chantier }: { chantier: Chantier }) {
  const { locale, t } = useLocale();
  const d = chantier.details;

  const aTerrain = Boolean(d?.surfaceTerrain || d?.prixTerrain || d?.referenceFonciere);
  const aPermis = Boolean(d?.numeroPermis || d?.datePermis);
  const aConstruction = Boolean(
    d?.surfaceConstruite || d?.nombreLots || d?.nombreEtages || d?.architecte || d?.entrepriseConstruction,
  );
  const aContact = Boolean(d?.responsableChantier || d?.telephoneResponsable);
  const aNotes = Boolean(d?.notes);
  const aDesInfos = aTerrain || aPermis || aConstruction || aContact || aNotes;

  const prixAuM2 =
    d?.surfaceTerrain && d?.prixTerrain && d.surfaceTerrain > 0
      ? d.prixTerrain / d.surfaceTerrain
      : undefined;

  if (!aDesInfos) {
    return (
      <EmptyState
        icon={ClipboardList}
        titre={t("projectDetailsForm.emptyTitle")}
        description={t("projectDetailsForm.emptyDesc")}
        action={
          <ChantierDetailsDialog
            chantier={chantier}
            trigger={
              <Button variant="outline">{t("projectDetailsForm.completeButton")}</Button>
            }
          />
        }
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="size-5 text-blue" />
          {t("projectDetailsForm.title")}
        </CardTitle>
        <ChantierDetailsDialog
          chantier={chantier}
          trigger={
            <Button variant="outline" size="sm">
              <Pencil className="size-4" />
              {t("projectDetailsForm.editButton")}
            </Button>
          }
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {aTerrain ? (
          <div className="flex flex-col gap-3">
            <SectionTitle>{t("projectDetailsForm.sectionLand")}</SectionTitle>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {d?.surfaceTerrain ? (
                <Row
                  label={t("projectDetailsForm.landSurface")}
                  value={`${d.surfaceTerrain.toLocaleString(locale === "ar" ? "ar-MA" : "fr-FR")} m²`}
                />
              ) : null}
              {d?.prixTerrain ? (
                <Row
                  label={t("projectDetailsForm.landPrice", { currency: CURRENCY_LABEL[locale] })}
                  value={formatMontant(d.prixTerrain, locale)}
                />
              ) : null}
              {prixAuM2 ? (
                <Row
                  label={t("projectDetailsForm.landPricePerSqm")}
                  value={`${formatMontant(Math.round(prixAuM2), locale)} / m²`}
                />
              ) : null}
              {d?.referenceFonciere ? (
                <Row label={t("projectDetailsForm.landReference")} value={d.referenceFonciere} />
              ) : null}
            </div>
          </div>
        ) : null}

        {aPermis ? (
          <div className="flex flex-col gap-3">
            <SectionTitle>{t("projectDetailsForm.sectionPermits")}</SectionTitle>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {d?.numeroPermis ? (
                <Row label={t("projectDetailsForm.permitNumber")} value={d.numeroPermis} />
              ) : null}
              {d?.datePermis ? (
                <Row
                  label={t("projectDetailsForm.permitDate")}
                  value={formatDate(d.datePermis, locale)}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {aConstruction ? (
          <div className="flex flex-col gap-3">
            <SectionTitle>{t("projectDetailsForm.sectionConstruction")}</SectionTitle>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {d?.surfaceConstruite ? (
                <Row
                  label={t("projectDetailsForm.builtSurface")}
                  value={`${d.surfaceConstruite.toLocaleString(locale === "ar" ? "ar-MA" : "fr-FR")} m²`}
                />
              ) : null}
              {d?.nombreLots ? (
                <Row label={t("projectDetailsForm.units")} value={String(d.nombreLots)} />
              ) : null}
              {d?.nombreEtages ? (
                <Row label={t("projectDetailsForm.floors")} value={String(d.nombreEtages)} />
              ) : null}
              {d?.architecte ? (
                <Row label={t("projectDetailsForm.architect")} value={d.architecte} />
              ) : null}
              {d?.entrepriseConstruction ? (
                <Row
                  label={t("projectDetailsForm.contractor")}
                  value={d.entrepriseConstruction}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {aContact ? (
          <div className="flex flex-col gap-3">
            <SectionTitle>{t("projectDetailsForm.sectionContact")}</SectionTitle>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {d?.responsableChantier ? (
                <Row
                  label={t("projectDetailsForm.siteManager")}
                  value={d.responsableChantier}
                />
              ) : null}
              {d?.telephoneResponsable ? (
                <Row
                  label={t("projectDetailsForm.siteManagerPhone")}
                  value={d.telephoneResponsable}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {aNotes ? (
          <div className="flex flex-col gap-3">
            <SectionTitle>{t("projectDetailsForm.sectionNotes")}</SectionTitle>
            <p className="whitespace-pre-wrap text-[15px] text-navy">{d?.notes}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

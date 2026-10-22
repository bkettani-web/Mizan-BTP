"use client";

import { Handshake } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { useAppData } from "@/lib/store";
import { useLocale } from "@/lib/i18n/context";
import { getFournisseurs } from "@/lib/stats";
import { formatDate, formatMontant } from "@/lib/format";

export default function FournisseursPage() {
  const { chantiers, depenses } = useAppData();
  const { locale, t } = useLocale();
  const fournisseurs = getFournisseurs(depenses, chantiers, t("common.projectNotFoundShort"));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          {t("suppliersPage.title")}
        </h1>
        <p className="mt-1 text-[15px] text-anthracite">{t("suppliersPage.subtitle")}</p>
      </header>

      {fournisseurs.length === 0 ? (
        <EmptyState
          icon={Handshake}
          titre={t("suppliersPage.noSuppliersTitle")}
          description={t("suppliersPage.noSuppliersDesc")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {fournisseurs.map((fournisseur) => (
            <Card
              key={fournisseur.nom}
              className="hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <CardContent className="flex flex-col gap-3 pt-5 sm:pt-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-navy sm:text-lg">
                    {fournisseur.nom}
                  </h3>
                  <p className="shrink-0 text-lg font-bold text-navy">
                    {formatMontant(fournisseur.montantTotal, locale)}
                  </p>
                </div>
                <p className="text-sm text-anthracite">
                  {t(
                    fournisseur.nombreDepenses > 1
                      ? "suppliersPage.expenseMany"
                      : "suppliersPage.expenseOne",
                    {
                      count: fournisseur.nombreDepenses,
                      date: formatDate(fournisseur.derniereDepense, locale),
                    },
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {fournisseur.chantiers.map((nom) => (
                    <Badge key={nom} variant="neutral">
                      {nom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { CURRENCY_LABEL, INTL_LOCALE, type Locale } from "@/lib/i18n/translations";

export function formatMontant(amount: number, locale: Locale = "fr") {
  const rounded = Math.round(amount);
  const formatted = rounded
    .toLocaleString(INTL_LOCALE[locale])
    .replace(/[  ]/g, " ");
  return `${formatted} ${CURRENCY_LABEL[locale]}`;
}

export function formatMontantCourt(amount: number, locale: Locale = "fr") {
  if (Math.abs(amount) >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = millions.toLocaleString(INTL_LOCALE[locale], {
      maximumFractionDigits: 1,
    });
    return `${formatted} M ${CURRENCY_LABEL[locale]}`;
  }
  if (Math.abs(amount) >= 1_000) {
    const milliers = amount / 1_000;
    const formatted = milliers.toLocaleString(INTL_LOCALE[locale], {
      maximumFractionDigits: 0,
    });
    return `${formatted} k ${CURRENCY_LABEL[locale]}`;
  }
  return formatMontant(amount, locale);
}

export function formatPourcentage(value: number) {
  return `${Math.round(value)} %`;
}

export function formatDate(iso: string, locale: Locale = "fr") {
  const date = new Date(iso);
  return date.toLocaleDateString(INTL_LOCALE[locale], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

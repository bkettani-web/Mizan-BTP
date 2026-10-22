const CURRENCY_LABELS: Record<string, string> = {
  MAD: "MAD",
  EUR: "EUR",
};

export function formatMontant(amount: number, currency: "MAD" | "EUR" = "MAD") {
  const rounded = Math.round(amount);
  const formatted = rounded
    .toLocaleString("fr-FR")
    .replace(/[  ]/g, " ");
  return `${formatted} ${CURRENCY_LABELS[currency]}`;
}

export function formatMontantCourt(amount: number) {
  if (Math.abs(amount) >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = millions.toLocaleString("fr-FR", {
      maximumFractionDigits: 1,
    });
    return `${formatted} M MAD`;
  }
  if (Math.abs(amount) >= 1_000) {
    const milliers = amount / 1_000;
    const formatted = milliers.toLocaleString("fr-FR", {
      maximumFractionDigits: 0,
    });
    return `${formatted} k MAD`;
  }
  return formatMontant(amount);
}

export function formatPourcentage(value: number) {
  return `${Math.round(value)} %`;
}

export function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

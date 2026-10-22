import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Identifiant lisible généré à partir d'un nom (ex. pour un chantier ou un fournisseur créé). */
export function idDepuisNom(nom: string, prefixeSecours = "item") {
  const base = nom
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const suffixe = Date.now().toString(36);
  return base ? `${base}-${suffixe}` : `${prefixeSecours}-${suffixe}`;
}

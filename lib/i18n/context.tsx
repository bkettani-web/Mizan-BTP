"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DIRECTION,
  LOCALES,
  getDictionary,
  type Dictionary,
  type Locale,
} from "@/lib/i18n/translations";

const STORAGE_KEY = "mizan-btp-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
  t: (path: string, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolve(dict: Dictionary, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      dict,
    );
  return typeof value === "string" ? value : path;
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  // Devient vrai une fois la préférence sauvegardée relue : tant que ce n'est
  // pas fait, on n'écrit rien dans localStorage pour ne pas écraser une
  // préférence existante avec la valeur par défaut du tout premier rendu.
  const [prefsLoaded, setPrefsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && (LOCALES as string[]).includes(stored)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydratation ponctuelle depuis localStorage (indisponible côté serveur)
        setLocaleState(stored as Locale);
      }
    } catch {
      // stockage indisponible : on garde la langue par défaut
    }
    setPrefsLoaded(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = DIRECTION[locale];
  }, [locale]);

  useEffect(() => {
    if (!prefsLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // quota dépassé ou navigation privée : tant pis
    }
  }, [locale, prefsLoaded]);

  const dict = getDictionary(locale);

  const value = useMemo<LocaleContextValue>(() => {
    const t = (path: string, vars?: Record<string, string | number>) =>
      interpolate(resolve(dict, path), vars);

    return {
      locale,
      setLocale: setLocaleState,
      dir: DIRECTION[locale],
      t,
    };
  }, [locale, dict]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale doit être utilisé à l'intérieur de <LocaleProvider>");
  }
  return ctx;
}

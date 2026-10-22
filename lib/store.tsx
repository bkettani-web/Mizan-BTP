"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { chantiers as chantiersInitiaux, depenses as depensesInitiales } from "@/lib/mock-data";
import type { Chantier, Depense } from "@/lib/types";

const STORAGE_KEY = "mizan-btp-donnees-demo-v1";

type DonneesPersistees = {
  chantiers: Chantier[];
  depenses: Depense[];
};

function donneesInitiales(): DonneesPersistees {
  return { chantiers: chantiersInitiaux, depenses: depensesInitiales };
}

type AppContextValue = DonneesPersistees & {
  ajouterDepense: (depense: Omit<Depense, "id">) => void;
  reinitialiser: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [donnees, setDonnees] = useState<DonneesPersistees>(donneesInitiales);
  const hydrate = useRef(false);

  // Charge les données sauvegardées (si l'utilisateur a déjà testé l'app sur cet appareil).
  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(STORAGE_KEY);
      if (brut) {
        const parsed = JSON.parse(brut) as DonneesPersistees;
        if (parsed?.chantiers && parsed?.depenses) {
          // localStorage n'existe pas côté serveur : cette synchronisation ponctuelle
          // au montage (tableau de dépendances vide) est nécessaire pour hydrater
          // l'état avec les données sauvegardées sur cet appareil.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setDonnees(parsed);
        }
      }
    } catch {
      // stockage indisponible ou corrompu : on garde les données de démonstration
    } finally {
      hydrate.current = true;
    }
  }, []);

  // Sauvegarde à chaque changement, une fois l'hydratation initiale terminée.
  useEffect(() => {
    if (!hydrate.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(donnees));
    } catch {
      // quota dépassé ou navigation privée : tant pis, les données restent en mémoire
    }
  }, [donnees]);

  const value = useMemo<AppContextValue>(
    () => ({
      ...donnees,
      ajouterDepense: (depense) => {
        setDonnees((prev) => ({
          ...prev,
          depenses: [
            { ...depense, id: `d-${Date.now()}-${Math.round(Math.random() * 1000)}` },
            ...prev.depenses,
          ],
        }));
      },
      reinitialiser: () => setDonnees(donneesInitiales()),
    }),
    [donnees],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppData doit être utilisé à l'intérieur de <AppProvider>");
  }
  return ctx;
}

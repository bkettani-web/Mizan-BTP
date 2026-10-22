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
  chantiers as chantiersInitiaux,
  depenses as depensesInitiales,
  fournisseurs as fournisseursInitiaux,
} from "@/lib/mock-data";
import type { Chantier, Depense, Fournisseur } from "@/lib/types";
import { idDepuisNom } from "@/lib/utils";

const STORAGE_KEY = "mizan-btp-donnees-demo-v1";

type DonneesPersistees = {
  chantiers: Chantier[];
  depenses: Depense[];
  fournisseurs: Fournisseur[];
};

function donneesInitiales(): DonneesPersistees {
  return {
    chantiers: chantiersInitiaux,
    depenses: depensesInitiales,
    fournisseurs: fournisseursInitiaux,
  };
}

type AppContextValue = DonneesPersistees & {
  ajouterDepense: (depense: Omit<Depense, "id">) => void;
  /** Crée un chantier et renvoie son identifiant (utile pour y naviguer ensuite). */
  ajouterChantier: (chantier: Omit<Chantier, "id">) => string;
  /** Met à jour un chantier existant (ex. compléter ses informations détaillées). */
  modifierChantier: (id: string, patch: Partial<Omit<Chantier, "id">>) => void;
  /** Crée un fournisseur et renvoie son identifiant. */
  ajouterFournisseur: (fournisseur: Omit<Fournisseur, "id">) => string;
  reinitialiser: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [donnees, setDonnees] = useState<DonneesPersistees>(donneesInitiales);
  // Devient vrai une fois les données sauvegardées relues : tant que ce n'est
  // pas fait, on n'écrit rien dans localStorage pour ne pas écraser une
  // sauvegarde existante avec les données de démo du tout premier rendu.
  const [donneesChargees, setDonneesChargees] = useState(false);

  // Charge les données sauvegardées (si l'utilisateur a déjà testé l'app sur cet appareil).
  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(STORAGE_KEY);
      if (brut) {
        const parsed = JSON.parse(brut) as Partial<DonneesPersistees>;
        if (parsed?.chantiers && parsed?.depenses) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- hydratation ponctuelle depuis localStorage (indisponible côté serveur)
          setDonnees({
            chantiers: parsed.chantiers,
            depenses: parsed.depenses,
            // Sauvegardes antérieures à l'ajout du carnet fournisseurs.
            fournisseurs: parsed.fournisseurs ?? fournisseursInitiaux,
          });
        }
      }
    } catch {
      // stockage indisponible ou corrompu : on garde les données de démonstration
    }
    setDonneesChargees(true);
  }, []);

  // Sauvegarde à chaque changement, une fois l'hydratation initiale terminée.
  useEffect(() => {
    if (!donneesChargees) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(donnees));
    } catch {
      // quota dépassé ou navigation privée : tant pis, les données restent en mémoire
    }
  }, [donnees, donneesChargees]);

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
      ajouterChantier: (chantier) => {
        const id = idDepuisNom(chantier.nom, "chantier");
        setDonnees((prev) => ({
          ...prev,
          chantiers: [...prev.chantiers, { ...chantier, id }],
        }));
        return id;
      },
      modifierChantier: (id, patch) => {
        setDonnees((prev) => ({
          ...prev,
          chantiers: prev.chantiers.map((chantier) =>
            chantier.id === id ? { ...chantier, ...patch } : chantier,
          ),
        }));
      },
      ajouterFournisseur: (fournisseur) => {
        const id = idDepuisNom(fournisseur.nom, "fournisseur");
        setDonnees((prev) => ({
          ...prev,
          fournisseurs: [...prev.fournisseurs, { ...fournisseur, id }],
        }));
        return id;
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

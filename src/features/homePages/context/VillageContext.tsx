/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */


import type { Village } from "@/types";
import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react";

type VillageContextType = {
    visitedVillage: Village | null;
    setVisitedVillage: (village: Village | null) => void;
    clearVisitedVillage: () => void;
};

const VillageContext = createContext<VillageContextType | undefined>(undefined);

export const VillageProvider = ({ children }: { children: ReactNode }) => {
    const [visitedVillage, setVisitedVillageState] = useState<Village | null>(null);

    // On mount, read the stored village from localStorage safely
    useEffect(() => {
        const stored = localStorage.getItem("visitedVillage");
        if (stored) {
            try {
                setVisitedVillageState(JSON.parse(stored));
            } catch {
                // Remove invalid JSON if it exists
                localStorage.removeItem("visitedVillage");
            }
        }
    }, []);

    // Set village both in state and localStorage
    const setVisitedVillage = (village: Village | null) => {
        setVisitedVillageState(village);
        if (village) {
            localStorage.setItem("visitedVillage", JSON.stringify(village));
        } else {
            localStorage.removeItem("visitedVillage");
        }
    };

    // Clear visited village
    const clearVisitedVillage = () => setVisitedVillage(null);

    // Memoize context value to avoid unnecessary re-renders
    const value = useMemo(
        () => ({ visitedVillage, setVisitedVillage, clearVisitedVillage }),
        [visitedVillage]
    );

    return <VillageContext.Provider value={value}>{children}</VillageContext.Provider>;
};

export const useVisitedVillage = () => {
    const context = useContext(VillageContext);
    if (!context) {
        throw new Error("useVisitedVillage must be used within a VillageProvider");
    }
    return context;
};

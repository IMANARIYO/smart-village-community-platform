// src/hooks/useLocationSelector.ts
"use client";

import { useState, useEffect, useCallback } from "react";

import { toast } from "sonner";
import type { Village } from "../../../types";
import { fetchLocations, type HierarchicalData } from "../service";

export function useLocationSelector() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState<Village | null>(null);

  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [cells, setCells] = useState<string[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  const resetLowerLevels = useCallback((level: string) => {
    switch (level) {
      case "province":
        setDistrict(""); setSector(""); setCell(""); setVillage(null);
        setDistricts([]); setSectors([]); setCells([]); setVillages([]);
        break;
      case "district":
        setSector(""); setCell(""); setVillage(null);
        setSectors([]); setCells([]); setVillages([]);
        break;
      case "sector":
        setCell(""); setVillage(null);
        setCells([]); setVillages([]);
        break;
      case "cell":
        setVillage(null); setVillages([]);
        break;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: HierarchicalData;
        if (!province) {
          data = await fetchLocations();
          if (!data.success) { toast.error(data.message || "Failed to load provinces"); return; }
          setProvinces(data.data.provinces || []);
          return;
        }
        if (province && !district) {
          resetLowerLevels("province");
          data = await fetchLocations({ province });
          if (!data.success) { toast.error(data.message || "Failed to load districts"); return; }
          setDistricts(data.data.districts || []);
          return;
        }
        if (province && district && !sector) {
          resetLowerLevels("district");
          data = await fetchLocations({ province, district });
          if (!data.success) { toast.error(data.message || "Failed to load sectors"); return; }
          setSectors(data.data.sectors || []);
          return;
        }
        if (province && district && sector && !cell) {
          resetLowerLevels("sector");
          data = await fetchLocations({ province, district, sector });
          if (!data.success) { toast.error(data.message || "Failed to load cells"); return; }
          setCells(data.data.cells || []);
          return;
        }
        if (province && district && sector && cell) {
          resetLowerLevels("cell");
          data = await fetchLocations({ province, district, sector, cell });
          if (!data.success) { toast.error(data.message || "Failed to load villages"); return; }
          setVillages(data.data.villages || []);
        }
      } catch (error) {
        console.error("error   fetchinng locations",error)
        toast.error("Error fetching locations");
      }
    };
    fetchData();
  }, [province, district, sector, cell, resetLowerLevels]);

  return {
    province, setProvince,
    district, setDistrict,
    sector, setSector,
    cell, setCell,
    village, setVillage,
    provinces, districts, sectors, cells, villages,
    resetLowerLevels
  };
}

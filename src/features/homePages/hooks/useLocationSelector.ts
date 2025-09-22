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

  // Whenever a level changes, automatically reset lower levels
  useEffect(() => {
    resetLowerLevels("province");
    const fetchProvinces = async () => {
      try {
        const data: HierarchicalData = await fetchLocations();
        if (!data.success) { toast.error(data.message || "Failed to load provinces"); return; }
        setProvinces(data.data.provinces || []);
      } catch (err) {
        console.error("Error fetching provinces", err);
        toast.error("Error fetching provinces");
      }
    };
    fetchProvinces();
  }, [resetLowerLevels]);

  useEffect(() => {
    if (!province) return;
    resetLowerLevels("province");
    const fetchDistricts = async () => {
      try {
        const data: HierarchicalData = await fetchLocations({ province });
        if (!data.success) { toast.error(data.message || "Failed to load districts"); return; }
        setDistricts(data.data.districts || []);
      } catch (err) {
        console.error("Error fetching districts", err);
        toast.error("Error fetching districts");
      }
    };
    fetchDistricts();
  }, [province, resetLowerLevels]);

  useEffect(() => {
    if (!province || !district) return;
    resetLowerLevels("district");
    const fetchSectors = async () => {
      try {
        const data: HierarchicalData = await fetchLocations({ province, district });
        if (!data.success) { toast.error(data.message || "Failed to load sectors"); return; }
        setSectors(data.data.sectors || []);
      } catch (err) {
        console.error("Error fetching sectors", err);
        toast.error("Error fetching sectors");
      }
    };
    fetchSectors();
  }, [province, district, resetLowerLevels]);

  useEffect(() => {
    if (!province || !district || !sector) return;
    resetLowerLevels("sector");
    const fetchCells = async () => {
      try {
        const data: HierarchicalData = await fetchLocations({ province, district, sector });
        if (!data.success) { toast.error(data.message || "Failed to load cells"); return; }
        setCells(data.data.cells || []);
      } catch (err) {
        console.error("Error fetching cells", err);
        toast.error("Error fetching cells");
      }
    };
    fetchCells();
  }, [province, district, sector, resetLowerLevels]);

  useEffect(() => {
    if (!province || !district || !sector || !cell) return;
    resetLowerLevels("cell");
    const fetchVillages = async () => {
      try {
        const data: HierarchicalData = await fetchLocations({ province, district, sector, cell });
        if (!data.success) { toast.error(data.message || "Failed to load villages"); return; }
        setVillages(data.data.villages || []);
      } catch (err) {
        console.error("Error fetching villages", err);
        toast.error("Error fetching villages");
      }
    };
    fetchVillages();
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


"use client";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import { useLanguage } from "../../i18n/useLanguage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { translations } from "../../i18n/translations copy";
import MyButton from "../../../components/MyButton";
import { fetchLocations, type HierarchicalData } from "../service";
import type { Village } from "../../../types";
import { toast } from "sonner";





const VillageSelectingDialog = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const navigate = useNavigate();

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
                setDistrict("");
                setSector("");
                setCell("");
                setVillage(null);
                setDistricts([]);
                setSectors([]);
                setCells([]);
                setVillages([]);
                break;
            case "district":
                setSector("");
                setCell("");
                setVillage(null);
                setSectors([]);
                setCells([]);
                setVillages([]);
                break;
            case "sector":
                setCell("");
                setVillage(null);
                setCells([]);
                setVillages([]);
                break;
            case "cell":
                setVillage(null);
                setVillages([]);
                break;
        }
    }, []);




    useEffect(() => {
        const fetchData = async () => {
            try {
                let data: HierarchicalData;

                if (!province) {
                    data = await fetchLocations();
                    console.log("the response ", data)
                    if (!data.success) {
                        console.error(data.message || "Failed to load provinces");
                        toast.error(data.message || "Failed to load provinces");
                        return;
                    }
                    setProvinces(data.data.provinces || []);
                    return;
                }

                if (province && !district) {
                    resetLowerLevels("province");
                    data = await fetchLocations({ province });
                    if (!data.success) {
                        toast.error(data.message || "Failed to load districts");
                        return;
                    }
                    setDistricts(data.data.districts || []);
                    return;
                }

                if (province && district && !sector) {
                    resetLowerLevels("district");
                    data = await fetchLocations({ province, district });
                    if (!data.success) {
                        toast.error(data.message || "Failed to load sectors");
                        return;
                    }
                    setSectors(data.data.sectors || []);
                    return;
                }

                if (province && district && sector && !cell) {
                    resetLowerLevels("sector");
                    data = await fetchLocations({ province, district, sector });
                    if (!data.success) {
                        toast.error(data.message || "Failed to load cells");
                        return;
                    }
                    setCells(data.data.cells || []);
                    return;
                }

                if (province && district && sector && cell) {
                    resetLowerLevels("cell");
                    data = await fetchLocations({ province, district, sector, cell });
                    if (!data.success) {
                        toast.error(data.message || "Failed to load villages");
                        return;
                    }
                    setVillages(data.data.villages || []);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching locations");
            }
        };

        fetchData();
    }, [province, district, sector, cell, resetLowerLevels]);




    const handleEnterCommunity = () => {
        if (!province || !district || !sector || !cell || !village) {
            alert("Please select all fields before continuing.");
            return;
        }

        navigate(
            `/visitVillage/${village.village_id}?province=${province}&district=${district}&sector=${sector}&cell=${cell}&village=${village.village_id}`
        );
    };



    return (
        <Dialog>
            <DialogTrigger asChild>
                <MyButton className="text-white font-medium bg-primary-dark">
                    {t.visitCommunity}
                </MyButton>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-6 h-[95vh] overflow-y-auto">
                <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-gradient-to-r from-green-600 to-blue-600 p-3">
                        <MapPin className="h-6 w-6 text-white" />
                    </div>
                </div>

                <DialogHeader className="text-center space-y-1 flex flex-col justify-center items-center">
                    <DialogTitle className="text-xl font-bold text-green-700">
                        {t.welcome}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        {t.chooseNeighborhood}
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-blue-50 text-gray-800 text-sm text-center p-3 rounded-md mt-4">
                    {t.getConnected}
                </div>

                <div className="space-y-3 mt-6">
                    <Select value={province} onValueChange={(value) => {
                        setProvince(value);
                        resetLowerLevels("province");
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.province} />
                        </SelectTrigger>
                        <SelectContent>
                            {provinces.map((p) => (
                                <SelectItem key={p} value={p}>
                                    {p}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={district} onValueChange={(value) => {
                        setDistrict(value);
                        resetLowerLevels("district");
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.district} />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map((d) => (
                                <SelectItem key={d} value={d}>
                                    {d}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={sector}
                        onValueChange={(value) => {
                            setSector(value);
                            resetLowerLevels("sector");
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.sector} />
                        </SelectTrigger>
                        <SelectContent>
                            {sectors.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={cell}
                        onValueChange={(value) => {
                            setCell(value);
                            resetLowerLevels("cell");
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.cell} />
                        </SelectTrigger>
                        <SelectContent>
                            {cells.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={village?.village}
                        onValueChange={(selectedVillageName) => {
                            const selectedVillage = villages.find(v => v.village === selectedVillageName) || null;
                            setVillage(selectedVillage);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.village} />
                        </SelectTrigger>
                        <SelectContent>
                            {villages.map((v) => (
                                <SelectItem key={v.village_id} value={v.village}>
                                    {v.village}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    {t.discoverUpdates}
                </p>

                <Button
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium"
                    onClick={handleEnterCommunity}
                >
                    {t.enterCommunity} →
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default VillageSelectingDialog;

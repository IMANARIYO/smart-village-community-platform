"use client";

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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { translations } from "../../i18n/translations";
import { homeTranslations } from "../i18n/homeTranslations";


import { useLocationSelector } from "../hooks/useLocationSelector";
import { useVisitedVillage } from "../context/VillageContext";

const VillageSelectingDialog = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const ht = homeTranslations[language];
    const navigate = useNavigate();

    // use hook
    const {
        province, setProvince,
        district, setDistrict,
        sector, setSector,
        cell, setCell,
        village, setVillage,
        provinces, districts, sectors, cells, villages,
        resetLowerLevels
    } = useLocationSelector();

    const { setVisitedVillage } = useVisitedVillage();

    const handleEnterCommunity = () => {
        if (!province || !district || !sector || !cell || !village) {
            alert("Please select all fields before continuing.");
            return;
        }
        setVisitedVillage(village);
        navigate(
            `/visitVillage/${village.village_id}?province=${province}&district=${district}&sector=${sector}&cell=${cell}&village=${village.village_id}`
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition">
                    {ht.joinButton}
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-6 h-[95vh] overflow-y-auto">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-gradient-to-r from-green-600 to-blue-600 p-3">
                        <MapPin className="h-6 w-6 text-white" />
                    </div>
                </div>

                {/* Title */}
                <DialogHeader className="text-center space-y-1 flex flex-col justify-center items-center">
                    <DialogTitle className="text-xl font-bold text-green-700">
                        {t.welcome}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        {t.chooseNeighborhood}
                    </DialogDescription>
                </DialogHeader>

                {/* Info */}
                <div className="bg-blue-50 text-gray-800 text-sm text-center p-3 rounded-md mt-4">
                    {t.getConnected}
                </div>

                {/* Selects */}
                <div className="space-y-3 mt-6">
                    <Select value={province} onValueChange={(value) => { setProvince(value); resetLowerLevels("province"); }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.province} />
                        </SelectTrigger>
                        <SelectContent>
                            {provinces.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={district} onValueChange={(value) => { setDistrict(value); resetLowerLevels("district"); }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.district} />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={sector} onValueChange={(value) => { setSector(value); resetLowerLevels("sector"); }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.sector} />
                        </SelectTrigger>
                        <SelectContent>
                            {sectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={cell} onValueChange={(value) => { setCell(value); resetLowerLevels("cell"); }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={t.cell} />
                        </SelectTrigger>
                        <SelectContent>
                            {cells.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
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
                            {villages.map((v) => <SelectItem key={v.village_id} value={v.village}>{v.village}</SelectItem>)}
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

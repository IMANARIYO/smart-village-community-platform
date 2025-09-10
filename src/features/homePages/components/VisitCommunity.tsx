
"use client";

import { useState } from "react";

import { useLanguage } from "../../i18n/useLanguage";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { translations } from "../../i18n/translations copy";




const NeighborhoodDialog = () => {

    const { language } = useLanguage();
    const t = translations[language];
    const [district, setDistrict] = useState("");
    const [sector, setSector] = useState("");
    const [cell, setCell] = useState("");
    const [village, setVillage] = useState("");

    return (
        <Dialog>
            {/* Trigger can be your MyButton */}
            <DialogTrigger asChild>
                <Button
                    className="w-full text-primary-dark font-medium bg-primary-light hover:bg-primary-light/90"

                >
                    {t.visitCommunity}

                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{t.welcome}</DialogTitle>
                    <DialogDescription>{t.chooseNeighborhood}</DialogDescription>
                </DialogHeader>

                {/* Form */}
                <div className="space-y-4 mt-4">
                    <Select value={district} onValueChange={setDistrict}>
                        <SelectTrigger>
                            <SelectValue placeholder={t.district} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="district1">District 1</SelectItem>
                            <SelectItem value="district2">District 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sector} onValueChange={setSector}>
                        <SelectTrigger>
                            <SelectValue placeholder={t.sector} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sector1">Sector 1</SelectItem>
                            <SelectItem value="sector2">Sector 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={cell} onValueChange={setCell}>
                        <SelectTrigger>
                            <SelectValue placeholder={t.cell} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cell1">Cell 1</SelectItem>
                            <SelectItem value="cell2">Cell 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={village} onValueChange={setVillage}>
                        <SelectTrigger>
                            <SelectValue placeholder={t.village} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="village1">Village 1</SelectItem>
                            <SelectItem value="village2">Village 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        className="w-full mt-4"
                        onClick={() => {
                            console.log({ district, sector, cell, village });
                            // handle enter community
                        }}
                    >
                        {t.enterCommunity} →
                    </Button>
                </div>

                <DialogClose asChild>
                    <Button variant="ghost" className="absolute top-2 right-2">✕</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default NeighborhoodDialog;

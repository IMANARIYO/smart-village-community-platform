"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useLocationSelector } from "../../../../homePages/hooks/useLocationSelector";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ResidentListItem } from "../leaderTypes";
import LeaderService from "../LeaderService";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

interface PromoteLeaderDialogProps {
    trigger: React.ReactNode;
    initialVillageId?: string;
}

export function PromoteLeaderDialog({ trigger, initialVillageId }: PromoteLeaderDialogProps) {
    const { province, district, sector, cell, village, setVillage, villages, ...locationSelector } = useLocationSelector();

    const [residents, setResidents] = useState<ResidentListItem[]>([]);
    const [currentLeader, setCurrentLeader] = useState<string | null>(null);
    const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialVillageId) {
            const preVillage = villages.find(v => v.village_id === initialVillageId);
            if (preVillage) setVillage(preVillage);
        }
    }, [initialVillageId, villages, setVillage]);

    useEffect(() => {
        if (!village) return;
        setLoading(true);
        LeaderService.getVillageResidents(village.village_id)
            .then((res) => {
                if (res.success) {
                    setResidents(Array.isArray(res.residents) ? res.residents : []);
                    setCurrentLeader(res.village?.leader?.user_id || null);
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                toast.error(extractErrorMessage(err, "Failed to fetch residents."));
            })
            .finally(() => setLoading(false));
    }, [village]);

    const handlePromote = async () => {
        if (!village || !selectedResidentId) return;

        try {
            setLoading(true);

            const response = await LeaderService.promoteLeader(
                selectedResidentId,
                village.village_id
            );

            if (response.success) {
                toast.success("Resident promoted to leader successfully!");
                return;
            }

            const msg = response.message || "Failed to promote resident. Please try again.";
            toast.error(msg);

        } catch (err: unknown) {
            toast.error(extractErrorMessage(err, "Failed to promote resident. Please try again."));
            console.error("Promotion error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Promote Resident to Leader</DialogTitle>
                    <DialogDescription>
                        Select a village and choose a resident to promote to leader.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Province</Label>
                            <Select value={province} onValueChange={locationSelector.setProvince}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationSelector.provinces.map(p => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>District</Label>
                            <Select value={district} onValueChange={locationSelector.setDistrict}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationSelector.districts.map(d => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Sector</Label>
                            <Select value={sector} onValueChange={locationSelector.setSector}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Sector" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationSelector.sectors.map(s => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Cell</Label>
                            <Select value={cell} onValueChange={locationSelector.setCell}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Cell" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locationSelector.cells.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Village</Label>
                        <Select value={village?.village_id || ""} onValueChange={(value) => {
                            const selected = villages.find(v => v.village_id === value);
                            if (selected) setVillage(selected);
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Village" />
                            </SelectTrigger>
                            <SelectContent>
                                {villages.map(v => (
                                    <SelectItem key={v.village_id} value={v.village_id}>{v.village}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {currentLeader && (
                        <p className="text-sm text-muted-foreground">
                            Current leader: {residents.find(r => r.resident_id === currentLeader)?.person.first_name || "Unknown"}
                        </p>
                    )}

                    <div className="space-y-2">
                        <Label>Select Resident to Promote</Label>
                        <div className="max-h-48 overflow-y-auto border rounded p-2 space-y-2">
                            {loading ? (
                                <p className="text-sm text-muted-foreground">Loading residents...</p>
                            ) : residents.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No residents found in this village.</p>
                            ) : (
                                residents.map(res => (
                                    <label key={res.resident_id} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="resident"
                                            value={res.resident_id}
                                            checked={selectedResidentId === res.resident_id}
                                            onChange={() => setSelectedResidentId(res.resident_id)}
                                        />
                                        <span className="text-sm">{res.person.first_name} {res.person.last_name}</span>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={handlePromote}
                            disabled={!selectedResidentId || loading}
                        >
                            {loading ? "Promoting..." : "Promote"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
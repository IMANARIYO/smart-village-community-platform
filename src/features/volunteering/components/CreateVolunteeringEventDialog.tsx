"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { useLocationSelector } from "@/features/homePages/hooks/useLocationSelector";
import type { CreateVolunteeringEventRequest, VolunteeringCategory } from "../types";
import VolunteerService from "../volunteeringServices";

export function CreateVolunteeringEventDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
    const [category, setCategory] = useState<VolunteeringCategory>("Community & Social");
    const [loading, setLoading] = useState(false);

    const {
        province, setProvince,
        district, setDistrict,
        sector, setSector,
        cell, setCell,
        village, setVillage,
        provinces, districts, sectors, cells, villages,
    } = useLocationSelector();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!village) return toast.error("Please select a village");

        const payload: CreateVolunteeringEventRequest = {
            title,
            description,
            date,
            start_time: startTime,
            end_time: endTime,
            capacity,
            village: village.village_id,
            location: `${village.province}, ${village.district}, ${village.sector}, ${village.cell}, ${village.village}`,
            skills_required: skillsRequired,
            category,
        };

        try {
            setLoading(true);
            const res = await VolunteerService.createVolunteeringEvent(payload);
            if (res.success) {
                toast.success("Volunteering event created successfully!");
                setOpen(false);
                // optionally reset form fields here
            } else {
                toast.error(res.message || "Failed to create event");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error creating volunteering event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create Volunteering Event
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Create Volunteering Event</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* Title & Description */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    />

                    {/* Date & Time */}
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                        />
                        <input
                            type="time"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                        />
                        <input
                            type="time"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                        />
                    </div>

                    {/* Capacity */}
                    <input
                        type="number"
                        placeholder="Capacity"
                        value={capacity}
                        onChange={e => setCapacity(Number(e.target.value))}
                        className="w-full border rounded px-2 py-1"
                    />

                    {/* Location selector using useLocationSelector */}
                    <div className="grid grid-cols-2 gap-2">
                        <select value={province} onChange={e => setProvince(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Select province</option>
                            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <select value={district} onChange={e => setDistrict(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Select district</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select value={sector} onChange={e => setSector(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Select sector</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select value={cell} onChange={e => setCell(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">Select cell</option>
                            {cells.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select
                            value={village?.village_id || ""}
                            onChange={e => setVillage(villages.find(v => v.village_id === e.target.value) || null)}
                            className="border rounded px-2 py-1 col-span-2"
                        >
                            <option value="">Select village</option>
                            {villages.map(v => <option key={v.village_id} value={v.village_id}>{v.village}</option>)}
                        </select>
                    </div>

                    {/* Skills required */}
                    <input
                        type="text"
                        placeholder="Skills required (comma separated)"
                        onChange={e => setSkillsRequired(e.target.value.split(",").map(s => s.trim()))}
                        className="w-full border rounded px-2 py-1"
                    />

                    {/* Category */}
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value as VolunteeringCategory)}
                        className="w-full border rounded px-2 py-1"
                    >
                        <option value="Community & Social">Community & Social</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Education & Skills">Education & Skills</option>
                        <option value="Environmental & Sustainability">Environmental & Sustainability</option>
                        <option value="Safety & Emergency">Safety & Emergency</option>
                        <option value="Economic & Livelihood">Economic & Livelihood</option>
                        <option value="Special / One-Off Events">Special / One-Off Events</option>
                        <option value="Civic & Governance">Civic & Governance</option>
                    </select>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-2">
                        <DialogClose asChild>
                            <button type="button" className="px-3 py-1 rounded border">Cancel</button>
                        </DialogClose>
                        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                            {loading ? "Creating..." : "Create Event"}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

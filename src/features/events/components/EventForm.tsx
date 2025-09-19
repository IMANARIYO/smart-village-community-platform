"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useLocationSelector } from "@/features/homePages/hooks/useLocationSelector";
import type { EventCategory, EventType } from "../types";
import EventService from "../eventService";

export function EventForm({ onSuccess }: { onSuccess?: () => void }) {
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [exactPlace, setExactPlace] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [category, setCategory] = useState<EventCategory>("Village Meeting");
    const [type, setType] = useState<EventType>("Event");
    const [image, setImage] = useState<File | null>(null);

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
        if (!village) {
            toast.error("Please select a village");
            return;
        }

        try {
            setLoading(true);

            // Build FormData
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("exact_place_of_village", exactPlace);
            formData.append("date", date);
            formData.append("start_time", startTime);
            formData.append("end_time", endTime);
            formData.append("category", category);
            formData.append("type", type);
            if (image) {
                formData.append("image", image);
            }

            // Call service
            const res = await EventService.createEvent(formData);
            if (res.success) {
                toast.success("Event created successfully!");
                onSuccess?.();
            } else {
                toast.error(res.message || "Failed to create event");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error creating event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Title & Description */}
            <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-2 py-1"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-2 py-1"
            />

            {/* Exact Place */}
            <input
                type="text"
                placeholder="Exact Place in Village"
                value={exactPlace}
                onChange={(e) => setExactPlace(e.target.value)}
                className="w-full border rounded px-2 py-1"
            />

            {/* Date & Time */}
            <div className="flex gap-2">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                />
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                />
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                />
            </div>

            {/* Location selector */}
            <div className="grid grid-cols-2 gap-2">
                <select value={province} onChange={(e) => setProvince(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select province</option>
                    {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select district</option>
                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={sector} onChange={(e) => setSector(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select sector</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={cell} onChange={(e) => setCell(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select cell</option>
                    {cells.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                    value={village?.village_id || ""}
                    onChange={(e) => setVillage(villages.find((v) => v.village_id === e.target.value) || null)}
                    className="border rounded px-2 py-1 col-span-2"
                >
                    <option value="">Select village</option>
                    {villages.map((v) => <option key={v.village_id} value={v.village_id}>{v.village}</option>)}
                </select>
            </div>

            {/* Category */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full border rounded px-2 py-1"
            >
                <option value="Village Meeting">Village Meeting</option>
                <option value="Festival & Celebration">Festival & Celebration</option>
                <option value="Workshop / Seminar">Workshop / Seminar</option>
                <option value="Volunteer Activity">Volunteer Activity</option>
                <option value="Health Screening">Health Screening</option>
                <option value="Fitness Event">Fitness Event</option>
                <option value="Nutrition & Hygiene Campaign">Nutrition & Hygiene Campaign</option>
                <option value="School Event">School Event</option>
                <option value="Adult Education Program">Adult Education Program</option>
                <option value="Tech / Digital Training">Tech / Digital Training</option>
                <option value="Disaster Preparedness Drill">Disaster Preparedness Drill</option>
                <option value="Community Policing Event">Community Policing Event</option>
                <option value="Incident Reporting Workshop">Incident Reporting Workshop</option>
                <option value="Village Development Project">Village Development Project</option>
                <option value="Cleanliness Drive">Cleanliness Drive</option>
                <option value="Sustainable Agriculture">Sustainable Agriculture</option>
                <option value="Market Day / Fair">Market Day / Fair</option>
                <option value="Entrepreneurship Workshop">Entrepreneurship Workshop</option>
                <option value="Job / Skills Fair">Job / Skills Fair</option>
                <option value="Visit by Dignitary">Visit by Dignitary</option>
                <option value="Competition / Award">Competition / Award</option>
                <option value="Emergency Relief Distribution">Emergency Relief Distribution</option>
            </select>

            {/* Type */}
            <select
                value={type}
                onChange={(e) => setType(e.target.value as EventType)}
                className="w-full border rounded px-2 py-1"
            >
                <option value="Event">Event</option>
                <option value="Announcement">Announcement</option>
                <option value="Alert">Alert</option>
                <option value="Emergency">Emergency</option>
                <option value="Reminder">Reminder</option>
                <option value="Update">Update</option>
                <option value="Invitation">Invitation</option>
            </select>

            {/* Image upload */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full border rounded px-2 py-1"
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </div>
        </form>
    );
}

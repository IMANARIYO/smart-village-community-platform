"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";

import { useLocationSelector } from "@/features/homePages/hooks/useLocationSelector";
import { EventCategory, EventType, type CreateEventRequest } from "../types";
import EventService from "../eventService";
import type { Village } from "@/types";

type EventFormValues = CreateEventRequest & {
    village?: Village | null;
    image?: File | null;
};

interface EventFormProps {
    onSuccess?: () => void;
}

export function EventForm({ onSuccess }: EventFormProps) {
    const [loading, setLoading] = useState(false);

    const {
        province, setProvince,
        district, setDistrict,
        sector, setSector,
        cell, setCell,
        village, setVillage,
        provinces, districts, sectors, cells, villages,
    } = useLocationSelector();

    const { register, handleSubmit, control, reset } = useForm<EventFormValues>({
        defaultValues: {
            title: "",
            description: "",
            exact_place_of_village: "",
            date: "",
            start_time: "",
            end_time: "",
            category: EventCategory.VILLAGE_MEETING,
            type: EventType.ANNOUNCEMENT,
            village: null,
            image: null,
        },
    });

    const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
        if (!village) {
            toast.error("Please select a village");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("exact_place_of_village", data.exact_place_of_village);
            formData.append("date", data.date);
            formData.append("start_time", data.start_time);
            formData.append("end_time", data.end_time);
            formData.append("category", data.category);
            formData.append("type", data.type);
            if (data.image) formData.append("image", data.image);

            const res = await EventService.createEvent(formData);
            if (res.success) {
                toast.success("Event created successfully!");
                reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <input
                type="text"
                placeholder="Event Title"
                {...register("title", { required: true })}
                className="w-full border rounded px-2 py-1"
            />

            <textarea
                placeholder="Description"
                {...register("description", { required: true })}
                className="w-full border rounded px-2 py-1"
            />

            <input
                type="text"
                placeholder="Exact Place in Village"
                {...register("exact_place_of_village", { required: true })}
                className="w-full border rounded px-2 py-1"
            />

            <div className="flex gap-2">
                <input
                    type="date"
                    {...register("date", { required: true })}
                    className="flex-1 border rounded px-2 py-1"
                />
                <input
                    type="time"
                    {...register("start_time", { required: true })}
                    className="flex-1 border rounded px-2 py-1"
                />
                <input
                    type="time"
                    {...register("end_time", { required: true })}
                    className="flex-1 border rounded px-2 py-1"
                />
            </div>

            {/* Location Selector */}
            <div className="grid grid-cols-2 gap-2">
                <select value={province} onChange={(e) => setProvince(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select province</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select district</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select value={sector} onChange={(e) => setSector(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select sector</option>
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={cell} onChange={(e) => setCell(e.target.value)} className="border rounded px-2 py-1">
                    <option value="">Select cell</option>
                    {cells.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                    value={village?.village_id || ""}
                    onChange={(e) => setVillage(villages.find(v => v.village_id === e.target.value) || null)}
                    className="border rounded px-2 py-1 col-span-2"
                >
                    <option value="">Select village</option>
                    {villages.map(v => <option key={v.village_id} value={v.village_id}>{v.village}</option>)}
                </select>
            </div>

            {/* Category */}
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <select {...field} className="w-full border rounded px-2 py-1">
                        {Object.values(EventCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                )}
            />

            {/* Type */}
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <select {...field} className="w-full border rounded px-2 py-1">
                        {Object.values(EventType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                )}
            />

            {/* Image Upload */}
            <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                        className="w-full border rounded px-2 py-1"
                    />
                )}
            />

            <div className="flex justify-end gap-2 mt-2">
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </div>
        </form>
    );
}

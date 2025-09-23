"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useLocationSelector } from "@/features/homePages/hooks/useLocationSelector";
import { CreateVolunteeringEventRequest, VolunteeringCategory, VolunteeringEventListItem } from "../types";
import VolunteerService from "../volunteeringServices";

interface FormValues
    extends Omit<CreateVolunteeringEventRequest, "village" | "location" | "skills_required"> {
    province: string;
    district: string;
    sector: string;
    cell: string;
    villageId: string;
    skills_required: string[];
}

interface CreateVolunteeringEventDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    editEvent?: VolunteeringEventListItem | null;
    onSuccess?: () => void;
}

function SkillsInput({
    value,
    onChange,
    error,
}: {
    value: string[];
    onChange: (skills: string[]) => void;
    error?: string;
}) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim()) {
            e.preventDefault();
            if (!value.includes(input.trim())) {
                onChange([...value, input.trim()]);
            }
            setInput("");
        }
    };

    const removeSkill = (skill: string) => {
        onChange(value.filter((s) => s !== skill));
    };

    return (
        <div>
            <label className="block text-sm font-medium">Skills Required</label>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a skill and press Enter"
                className="w-full border rounded px-2 py-1"
            />

            <div className="flex flex-wrap gap-2 mt-2">
                {value.map((skill) => (
                    <span
                        key={skill}
                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)}>
                            <X className="w-4 h-4" />
                        </button>
                    </span>
                ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

export function CreateVolunteeringEventDialog({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    editEvent,
    onSuccess
}: CreateVolunteeringEventDialogProps = {}) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = isControlled ? (controlledOnOpenChange || (() => { })) : setInternalOpen;

    const isEditMode = !!editEvent;
    const {
        province,
        setProvince,
        district,
        setDistrict,
        sector,
        setSector,
        cell,
        setCell,
        village,
        setVillage,
        provinces,
        districts,
        sectors,
        cells,
        villages,
    } = useLocationSelector();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            date: "",
            start_time: "",
            end_time: "",
            capacity: 0,
            category: VolunteeringCategory.CommunitySocial,
            province: "",
            district: "",
            sector: "",
            cell: "",
            villageId: "",
            skills_required: [],
        },
    });


    useEffect(() => {
        if (editEvent && open) {
            setValue("title", editEvent.title);
            setValue("description", editEvent.description);
            setValue("date", editEvent.date);
            setValue("start_time", editEvent.start_time);
            setValue("end_time", editEvent.end_time);
            setValue("capacity", editEvent.capacity);
            setValue("category", editEvent.category as VolunteeringCategory);
            setValue("skills_required", editEvent.skills_required || []);

            if (editEvent.village) {
                setProvince(editEvent.village.province ?? "");
                setDistrict(editEvent.village.district ?? "");
                setSector(editEvent.village.sector ?? "");
                setCell(editEvent.village.cell ?? "");
                setVillage(editEvent.village);
            }
        } else if (!editEvent && open) {
            // Reset form for create mode
            reset();
            setProvince("");
            setDistrict("");
            setSector("");
            setCell("");
            setVillage(null);
        }
    }, [editEvent, open, setValue, reset, setProvince, setDistrict, setSector, setCell, setVillage]);

    const onSubmit = async (data: FormValues) => {
        if (!village) {
            toast.error("Please select a village");
            return;
        }

        const payload: CreateVolunteeringEventRequest = {
            title: data.title,
            description: data.description,
            date: data.date,
            start_time: data.start_time,
            end_time: data.end_time,
            capacity: data.capacity,
            village: village.village_id,
            location: `${village.province}, ${village.district}, ${village.sector}, ${village.cell}, ${village.village}`,
            skills_required: data.skills_required,
            category: data.category as VolunteeringCategory,
        };

        try {
            setLoading(true);
            let res;

            if (isEditMode && editEvent) {
                res = await VolunteerService.updateVolunteerEvent(editEvent.volunteer_id, payload);
            } else {
                res = await VolunteerService.createVolunteeringEvent(payload);
            }

            if (res.success) {
                toast.success(`Volunteering event ${isEditMode ? 'updated' : 'created'} successfully!`);
                setOpen(false);
                reset();
                onSuccess?.();
            } else {
                toast.error(res.message || `Failed to ${isEditMode ? 'update' : 'create'} event`);
            }
        } catch (err) {
            console.error(err);
            toast.error(`Error ${isEditMode ? 'updating' : 'creating'} volunteering event`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-lg w-full h-[80%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? 'Edit Volunteering Event' : 'Create Volunteering Event'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            id="title"
                            {...register("title", { required: "Title is required" })}
                            className="w-full border rounded px-2 py-1"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            className="w-full border rounded px-2 py-1"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                {...register("date", { required: "Date is required" })}
                                className="w-full border rounded px-2 py-1"
                            />
                            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="start_time" className="block text-sm font-medium">
                                Start Time
                            </label>
                            <input
                                type="time"
                                id="start_time"
                                {...register("start_time", { required: "Start time is required" })}
                                className="w-full border rounded px-2 py-1"
                            />
                            {errors.start_time && (
                                <p className="text-red-500 text-sm">{errors.start_time.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="end_time" className="block text-sm font-medium">
                                End Time
                            </label>
                            <input
                                type="time"
                                id="end_time"
                                {...register("end_time", { required: "End time is required" })}
                                className="w-full border rounded px-2 py-1"
                            />
                            {errors.end_time && (
                                <p className="text-red-500 text-sm">{errors.end_time.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Capacity */}
                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium">
                            Capacity
                        </label>
                        <input
                            type="number"
                            id="capacity"
                            {...register("capacity", { required: "Capacity is required", min: 1 })}
                            className="w-full border rounded px-2 py-1"
                        />
                        {errors.capacity && (
                            <p className="text-red-500 text-sm">{errors.capacity.message}</p>
                        )}
                    </div>

                    {/* Location selectors */}
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="province" className="block text-sm font-medium">
                                Province
                            </label>
                            <select
                                id="province"
                                {...register("province", { required: "Province is required" })}
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Select province</option>
                                {provinces.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium">
                                District
                            </label>
                            <select
                                id="district"
                                {...register("district", { required: "District is required" })}
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Select district</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sector" className="block text-sm font-medium">
                                Sector
                            </label>
                            <select
                                id="sector"
                                {...register("sector", { required: "Sector is required" })}
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Select sector</option>
                                {sectors.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="cell" className="block text-sm font-medium">
                                Cell
                            </label>
                            <select
                                id="cell"
                                {...register("cell", { required: "Cell is required" })}
                                value={cell}
                                onChange={(e) => setCell(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">Select cell</option>
                                {cells.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="villageId" className="block text-sm font-medium">
                                Village
                            </label>
                            <select
                                id="villageId"
                                {...register("villageId", { required: "Village is required" })}
                                value={village?.village_id || ""}
                                onChange={(e) =>
                                    setVillage(villages.find((v) => v.village_id === e.target.value) || null)
                                }
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="">Select village</option>
                                {villages.map((v) => (
                                    <option key={v.village_id} value={v.village_id}>
                                        {v.village}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Skills required */}
                    <Controller
                        control={control}
                        name="skills_required"
                        rules={{ required: "At least one skill is required" }}
                        render={({ field }) => (
                            <SkillsInput value={field.value} onChange={field.onChange} error={errors.skills_required?.message} />
                        )}
                    />

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium">
                            Category
                        </label>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <select {...field} className="w-full border rounded px-2 py-1">
                                    <option value="Community & Social">Community & Social</option>
                                    <option value="Health & Wellness">Health & Wellness</option>
                                    <option value="Education & Skills">Education & Skills</option>
                                    <option value="Environmental & Sustainability">
                                        Environmental & Sustainability
                                    </option>
                                    <option value="Safety & Emergency">Safety & Emergency</option>
                                    <option value="Economic & Livelihood">Economic & Livelihood</option>
                                    <option value="Special / One-Off Events">Special / One-Off Events</option>
                                    <option value="Civic & Governance">Civic & Governance</option>
                                </select>
                            )}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 mt-2">
                        <DialogClose asChild>
                            <button type="button" className="px-3 py-1 rounded border">
                                Cancel
                            </button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={loading || !village}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading
                                ? (isEditMode ? "Updating..." : "Creating...")
                                : (isEditMode ? "Update Event" : "Create Event")
                            }
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

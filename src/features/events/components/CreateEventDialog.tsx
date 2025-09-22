"use client";

import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";

import { EventForm } from "./EventForm";

interface CreateEventDialogProps {
    onSuccess?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialDate?: string | null;
}

export function CreateEventDialog({ onSuccess, open: controlledOpen, onOpenChange, initialDate }: CreateEventDialogProps = {}) {
    const [internalOpen, setInternalOpen] = useState(false);
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = onOpenChange || setInternalOpen;

    const handleSuccess = () => {
        setOpen(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {controlledOpen === undefined && (
                <DialogTrigger asChild>
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                        Create Event
                    </button>
                </DialogTrigger>
            )}

            <DialogContent className="sm:max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>

                <EventForm onSuccess={handleSuccess} initialDate={initialDate} />

                <div className="flex justify-end mt-2">
                    <DialogClose asChild>
                        <button type="button" className="px-3 py-1 rounded border hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}

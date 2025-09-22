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
}

export function CreateEventDialog({ onSuccess }: CreateEventDialogProps = {}) {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
        onSuccess?.();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Create Event
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>

                <EventForm onSuccess={handleSuccess} />

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

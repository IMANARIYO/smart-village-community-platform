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

export function CreateEventDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Create Event
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>

                <EventForm onSuccess={() => setOpen(false)} />

                <div className="flex justify-end mt-2">
                    <DialogClose asChild>
                        <button type="button" className="px-3 py-1 rounded border">
                            Cancel
                        </button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { BaseVolunteringEvent } from "@/types";
import { participationService } from "../service";

const participationSchema = z.object({
    notes: z.string().optional(),
});

type ParticipationFormData = z.infer<typeof participationSchema>;

interface JoinEventDialogProps {
    event: BaseVolunteringEvent;
}

export const JoinEventDialog: React.FC<JoinEventDialogProps> = ({ event }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<ParticipationFormData>({
        resolver: zodResolver(participationSchema),
        defaultValues: {
            notes: "",
        },
    });

    const handleJoin = async (data: ParticipationFormData) => {
        setLoading(true);
        try {
            await participationService.create({
                event: event.volunteer_id,
                notes: data.notes || undefined,
            });
            toast.success(`You successfully joined "${event.title}"`);
            setOpen(false);
            form.reset();
        } catch (err) {
            console.error(err);
            toast.error("Failed to join the event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
                Join Event
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Join Volunteering Event</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleJoin)} className="space-y-4 py-4">
                            <p className="mb-2">You are joining:</p>
                            <h3 className="font-semibold">{event.title}</h3>

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Add any notes..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Joining..." : "Confirm Join"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

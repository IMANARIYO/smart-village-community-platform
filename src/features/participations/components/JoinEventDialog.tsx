import { useState, useEffect } from "react";
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
import { LoginDialog } from "@/features/auth/components/LoginDialog";
import { useAuthStore } from "@/features/auth/authStore";

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
    const { isAuthenticated, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const form = useForm<ParticipationFormData>({
        resolver: zodResolver(participationSchema),
        defaultValues: {
            notes: "",
        },
    });

    const handleJoin = async (data: ParticipationFormData) => {
        setLoading(true);
        try {

            const response = await participationService.create({
                event: event.volunteer_id,
                notes: data.notes || undefined,
            });


            if (response.success) {
                toast.success(response.message || `You successfully joined "${event.title}"`);
                setOpen(false);
                form.reset();
            }
            else {
                toast.error(response.data.message || "Failed to join the event")

            }

        } catch (err: unknown) {
            let message = "Failed to join the event";

            if (err instanceof Error) {
                // Axios error?
                const axiosError = err as { response?: { data?: { message?: string } } };

                if (axiosError.response?.data?.message) {
                    message = axiosError.response.data.message;
                } else {
                    message = err.message; // fallback
                }
            }


            toast.error(message);
            setLoading(false)
        }

    };

    return (
        <>
            {!isAuthenticated ? (
                <LoginDialog onLoginSuccess={() => checkAuth()}>
                    <Button className="bg-green-600 hover:bg-green-700">
                        log in to Join Event
                    </Button>
                </LoginDialog>
            ) : (
                <Button onClick={() => setOpen(true)} className="bg-green-600 hover:bg-green-700">
                    Join Event
                </Button>
            )}

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

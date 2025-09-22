

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CreateParticipationRequest } from "../types";
import type { VolunteeringEventListItem } from "../../volunteering/types";

const participationSchema = z.object({
  event: z.string().min(1, "Please select an event"),
  notes: z.string().optional(),
});

type ParticipationFormData = z.infer<typeof participationSchema>;

interface ParticipationFormProps {
  events: VolunteeringEventListItem[];
  onSubmit: (data: CreateParticipationRequest) => void;
  loading?: boolean;
  onCancel?: () => void;
}

export function ParticipationForm({ events, onSubmit, loading = false, onCancel }: ParticipationFormProps) {
  const form = useForm<ParticipationFormData>({
    resolver: zodResolver(participationSchema),
    defaultValues: {
      event: "",
      notes: "",
    },
  });

  const handleSubmit = (data: ParticipationFormData) => {
    onSubmit({
      event: data.event,
      notes: data.notes || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Volunteering Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event to join" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.volunteer_id} value={event.volunteer_id}>
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-500">
                              {event.date} • {event.village.village}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes or comments..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Joining..." : "Join Event"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
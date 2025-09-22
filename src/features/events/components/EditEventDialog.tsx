import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import EventService from "../eventService";
import { EventStatus, EventCategory, EventType, type EventListItem } from "../types";
import { tokenStorage } from "@/utils/tokenStorage";

interface EditEventDialogProps {
  event: EventListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export function EditEventDialog({ event, open, onOpenChange, onUpdate }: EditEventDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    exact_place_of_village: "",
    date: "",
    start_time: "",
    end_time: "",
    status: EventStatus.PENDING,
    category: EventCategory.VILLAGE_MEETING,
    type: EventType.ANNOUNCEMENT,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        exact_place_of_village: event.exact_place_of_village || "",
        date: event.date,
        start_time: event.start_time,
        end_time: event.end_time,
        status: event.status,
        category: event.category,
        type: event.type,
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setLoading(true);

    try {
      const payload = isLeader
        ? { ...formData }
        : { ...formData, status: undefined };
      const res = await EventService.updateEvent(event.event_id, payload);


      const message = res?.message || "Event updated successfully";

      toast.success(message);
      onUpdate();
      onOpenChange(false);
    } catch (error: unknown) {
      const backendMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update event";

      toast.error(backendMessage);
      console.error("Update event error:", error);
    } finally {
      setLoading(false);
    }
  };
  const CurrentUserRole = tokenStorage.getUserRole();
  const isLeader = CurrentUserRole === "leader";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="exact_place">Exact Place</Label>
              <Input
                id="exact_place"
                value={formData.exact_place_of_village}
                onChange={(e) => setFormData(prev => ({ ...prev, exact_place_of_village: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value as EventStatus }))
                }
                disabled={!isLeader} // only leaders can change status
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EventStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value as EventCategory }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EventCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value as EventType }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EventType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>


          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
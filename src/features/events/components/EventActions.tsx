import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import EventService from "../eventService";
import { EventStatus, type EventListItem } from "../types";

interface EventActionsProps {
  event: EventListItem;
  onUpdate: () => void;
  onViewDetails?: (event: EventListItem) => void;
}

export function EventActions({ event, onUpdate, }: EventActionsProps) {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: EventStatus) => {
    setLoading(true);
    try {
      const response = await EventService.updateEvent(event.event_id, { status: newStatus });
      const message = response?.message || `Event status updated to ${newStatus}`;
      toast.success(message);
      onUpdate();
      setStatusDialogOpen(false);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Failed to update event status";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await EventService.deleteEvent(event.event_id);
      const message = response?.message || "Event deleted successfully";
      toast.success(message);
      onUpdate();
      setDeleteDialogOpen(false);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Failed to delete event";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.APPROVED: return "text-green-600";
      case EventStatus.REJECTED: return "text-red-600";
      case EventStatus.CANCELLED: return "text-gray-600";
      default: return "text-yellow-600";
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setStatusDialogOpen(true)}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Change Status
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Event Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Current status: <span className={getStatusColor(event.status)}>{event.status}</span>
              </p>
              <Select onValueChange={(value) => handleStatusChange(value as EventStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EventStatus).map((status) => (
                    <SelectItem key={status} value={status} disabled={status === event.status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm">
                Are you sure you want to delete <span className="font-semibold">"{event.title}"</span>?
              </p>
              <p className="text-xs text-red-600 mt-1">
                This action cannot be undone and will permanently remove all event data.
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="min-w-[100px]"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
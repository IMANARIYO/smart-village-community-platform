import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, MapPin, User, Tag, FileText, Image as ImageIcon } from "lucide-react";
import dayjs from "dayjs";
import type { EventListItem } from "../types";

interface EventDetailsDialogProps {
  event: EventListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  if (!event) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-800";
      case "REJECTED": return "bg-red-100 text-red-800";
      case "CANCELLED": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Event Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 pr-4">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 break-words">{event.title}</h3>
                <Badge className={`${getStatusColor(event.status)} text-sm px-3 py-1`}>
                  {event.status}
                </Badge>
              </div>
              {event.image && (
                <div className="flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover border shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Date</div>
                  <div className="font-medium">
                    {dayjs(event.date).format("MMMM DD, YYYY")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Time</div>
                  <div className="font-medium">
                    {dayjs(`2000-01-01 ${event.start_time}`).format("HH:mm")} - {dayjs(`2000-01-01 ${event.end_time}`).format("HH:mm")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Location</div>
                  <div className="font-medium break-words">
                    {event.village ? `${event.village.village}, ${event.village.cell}, ${event.village.sector}` : "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Organizer</div>
                  <div className="font-medium">
                    {event.organizer?.person ? `${event.organizer.person.first_name} ${event.organizer.person.last_name}` : "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Category</div>
                  <div className="font-medium">{event.category || "N/A"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Type</div>
                  <div className="font-medium">{event.type || "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            {event.exact_place_of_village && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Exact Location
                </h4>
                <p className="text-muted-foreground break-words">{event.exact_place_of_village}</p>
              </div>
            )}

            {/* Description */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Description
              </h4>
              <p className="text-muted-foreground whitespace-pre-wrap break-words">
                {event.description || "No description provided."}
              </p>
            </div>


            {/* Full Size Image */}
            {event.image && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Event Image
                </h4>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => event.image && window.open(event.image, "_blank")}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md transition-transform group-hover:scale-[1.02]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center pointer-events-none">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
                      Click to view full size
                    </span>
                  </div>
                </div>
              </div>
            )}


            {/* Timestamps */}
            <div className="text-xs text-muted-foreground border-t pt-4 space-y-1">
              <p><span className="font-medium">Created:</span> {dayjs(event.created_at).format("MMM DD, YYYY HH:mm")}</p>
              <p><span className="font-medium">Updated:</span> {dayjs(event.updated_at).format("MMM DD, YYYY HH:mm")}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
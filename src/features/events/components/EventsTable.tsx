
"use client";

import { useCallback, useEffect, useState } from "react";
import EventService from "../eventService";
import type { EventListItem, GetEventsOptions } from "../types";
import { DataTable } from "@/components/TableComponents/data-table";
import type { GridColDef } from "@mui/x-data-grid";
import { CreateEventDialog } from "./CreateEventDialog";
import { EventFilters } from "./EventFilters";
import { EventActions } from "./EventActions";
import { EditEventDialog } from "./EditEventDialog";
import { EventDetailsDialog } from "./EventDetailsDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Image } from "lucide-react";
import { toast } from "sonner";
import dayjs from "dayjs";


export function EventTable() {
    const [events, setEvents] = useState<EventListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<GetEventsOptions>({});
    const [editingEvent, setEditingEvent] = useState<EventListItem | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [viewingEvent, setViewingEvent] = useState<EventListItem | null>(null);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [apiMessage, setApiMessage] = useState<string>("");

    const handleEditEvent = (event: EventListItem) => {
        setEditingEvent(event);
        setEditDialogOpen(true);
    };

    const handleViewDetails = (event: EventListItem) => {
        setViewingEvent(event);
        setDetailsDialogOpen(true);
    };

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setApiMessage("");
        try {
            const params: GetEventsOptions = {
                page: pagination.page + 1,
                limit: pagination.pageSize,
                ...filters,
            };

            if (search) {
                params.title = search;
            }

            const res = await EventService.getEvents(params);

            const safeEvents = Array.isArray(res?.data) ? res.data : [];
            const safeCount = typeof res?.meta?.total === "number" ? res.meta.total : 0;

            setEvents(safeEvents);
            setTotalRows(safeCount);

            if (res?.message) {
                setApiMessage(res.message);
            }
        } catch (error: unknown) {
            console.error("❌ Failed to fetch events:", error);
            const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || (error as { message?: string })?.message || "Failed to fetch events";
            toast.error(errorMessage);
            setApiMessage(errorMessage);
            setEvents([]);
            setTotalRows(0);
        } finally {
            setLoading(false);
        }
    }, [pagination, filters, search]);
    useEffect(() => {
        fetchEvents();
    }, [pagination, search, filters, fetchEvents]);
    const eventColumns: GridColDef[] = [
        {
            field: "title",
            headerName: "Title",
            flex: 1.2,
            renderCell: (params) => (
                <div className="font-medium truncate" title={params.value}>
                    {params.value}
                </div>
            )
        },
        {
            field: "description",
            headerName: "Description",
            flex: 2,
            renderCell: (params) => (
                <div className="text-sm text-muted-foreground truncate" title={params.value}>
                    {params.value || "-"}
                </div>
            )
        },
        {
            field: "image",
            headerName: "Image",
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <div className="flex justify-center">
                    {params.row.image ? (
                        <div className="relative group">
                            <img
                                src={params.row.image}
                                alt="Event"
                                className="w-8 h-8 rounded object-cover cursor-pointer"
                                onClick={() => handleViewDetails(params.row)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                <Eye className="h-3 w-3 text-white" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <Image className="h-3 w-3 text-gray-400" />
                        </div>
                    )}
                </div>
            )
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            valueGetter: (value) => value ? dayjs(value).format("MMM DD, YYYY") : "-",
        },
        {
            field: "start_time",
            headerName: "Start",
            width: 80,
            valueGetter: (value) => {
                if (!value) return "-";
                try {
                    return dayjs(`2000-01-01 ${value}`).format("HH:mm");
                } catch {
                    return value;
                }
            },
        },
        {
            field: "end_time",
            headerName: "End",
            width: 80,
            valueGetter: (value) => {
                if (!value) return "-";
                try {
                    return dayjs(`2000-01-01 ${value}`).format("HH:mm");
                } catch {
                    return value;
                }
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => {
                const getStatusColor = (status: string) => {
                    switch (status) {
                        case "APPROVED": return "bg-green-100 text-green-800 border-green-200";
                        case "REJECTED": return "bg-red-100 text-red-800 border-red-200";
                        case "CANCELLED": return "bg-gray-100 text-gray-800 border-gray-200";
                        default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
                    }
                };
                return (
                    <Badge className={`${getStatusColor(params.value)} text-xs px-2 py-1`}>
                        {params.value}
                    </Badge>
                );
            },
        },
        {
            field: "village",
            headerName: "Village",
            flex: 1.5,
            renderCell: (params) => {
                const v = params.row.village;
                const location = v ? `${v.village}, ${v.cell}` : "-";
                return (
                    <div className="text-sm truncate" title={location}>
                        {location}
                    </div>
                );
            },
        },
        {
            field: "organizer",
            headerName: "Organizer",
            flex: 1.2,
            renderCell: (params) => {
                const p = params.row.organizer?.person;
                const name = p ? `${p.first_name} ${p.last_name}` : "N/A";
                return (
                    <div className="text-sm truncate" title={name}>
                        {name}
                    </div>
                );
            },
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            renderCell: (params) => (
                <div className="text-sm truncate" title={params.value}>
                    {params.value || "-"}
                </div>
            )
        },
        {
            field: "type",
            headerName: "Type",
            width: 100,
            renderCell: (params) => (
                <div className="text-sm truncate" title={params.value}>
                    {params.value || "-"}
                </div>
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(params.row)}
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditEvent(params.row)}
                        title="Edit Event"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <EventActions
                        event={params.row}
                        onUpdate={fetchEvents}
                    />
                </div>
            ),
        },
    ];
    return (
        <>
            <DataTable<EventListItem & { id: string }>
                title={
                    <div className="flex items-center gap-2">
                        <span>Events</span>
                        {apiMessage && (
                            <Badge variant="outline" className="text-xs">
                                {apiMessage}
                            </Badge>
                        )}
                    </div>
                }
                description={`Manage and view all events (${totalRows} total)`}
                columns={eventColumns}
                data={events.map((e) => ({ ...e, id: e.event_id }))}
                loading={loading}
                totalRows={totalRows}
                paginationModel={pagination}
                onPaginationChange={setPagination}
                onSearchChange={(value) => {
                    setSearch(value);
                    setPagination((prev) => ({ ...prev, page: 0 }));
                }}
                onFilterChange={(newFilters) => {
                    setFilters(newFilters as GetEventsOptions);
                    setPagination((prev) => ({ ...prev, page: 0 }));
                }}
                // onRowClick={(row) => handleViewDetails(row)}
                actions={
                    <>
                        <EventFilters onFilterChange={setFilters} currentFilters={filters} />
                        <CreateEventDialog onSuccess={fetchEvents} />
                    </>
                }
                pageSizeOptions={[5, 10, 25, 50]}
                rowHeight={70}
                searchPlaceholder="Search by title, description, or organizer..."
                emptyMessage={
                    <div className="text-center py-8">
                        <div className="text-muted-foreground mb-2">No events found</div>
                        {search && (
                            <div className="text-sm text-muted-foreground">
                                Try adjusting your search or filters
                            </div>
                        )}
                    </div>
                }
            />

            <EditEventDialog
                event={editingEvent}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onUpdate={fetchEvents}
            />

            <EventDetailsDialog
                event={viewingEvent}
                open={detailsDialogOpen}
                onOpenChange={setDetailsDialogOpen}
            />
        </>
    );
}

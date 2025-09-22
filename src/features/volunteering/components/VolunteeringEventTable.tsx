"use client";

import { useEffect, useState, useCallback } from "react";
import { type GridColDef, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";
import VolunteerService from "../volunteeringServices";
import type { GetVolunteeringOptions, VolunteeringEventListItem, VolunteeringStatus, VolunteeringCategory } from "../types";
import { DataTable } from "@/components/TableComponents/data-table";
import { CreateVolunteeringEventDialog } from "./CreateVolunteeringEventDialog";
import { VolunteeringEventFilters } from "./VolunteeringEventFilters";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Eye, Edit, Trash2, Check, X, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";



export function VolunteeringEventsTable() {
    const [events, setEvents] = useState<VolunteeringEventListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState<VolunteeringEventListItem | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const volunteerTrigger = searchParams.get("volunteer_trigger");

    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [search, setSearch] = useState<string>("");
    const [filters, setFilters] = useState<{
        status?: VolunteeringStatus;
        category?: VolunteeringCategory;
        village_id?: string;
    }>({});

    const fetchEvents = useCallback(async () => {
        setLoading(true);

        const params: GetVolunteeringOptions = {
            page: paginationModel.page + 1, // API is 1-indexed
            limit: paginationModel.pageSize,
            search: search || undefined,
            ...filters,
        };

        try {
            const res = await VolunteerService.getVolunteeringEvents(params);
            setEvents(res.data);
            setTotalRows(res.meta.total);
        } catch (err) {
            console.error("Error fetching volunteering events:", err);
            toast.error("Failed to fetch volunteering events");
        } finally {
            setLoading(false);
        }
    }, [paginationModel.page, paginationModel.pageSize, search, filters]);

    const handleViewDetails = async (eventId: string) => {
        try {
            setActionLoading(true);
            const res = await VolunteerService.getVolunteerEventById(eventId);
            if (res.success) {
                setSelectedEvent(res.data);
                setViewDialogOpen(true);
            } else {
                toast.error("Failed to fetch event details");
            }
        } catch (err) {
            console.error("Error fetching event details:", err);
            toast.error("Error fetching event details");
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = async (eventId: string) => {
        try {
            setActionLoading(true);
            const res = await VolunteerService.getVolunteerEventById(eventId);
            if (res.success) {
                setSelectedEvent(res.data);
                setEditDialogOpen(true);
            } else {
                toast.error("Failed to fetch event details");
            }
        } catch (err) {
            console.error("Error fetching event details:", err);
            toast.error("Error fetching event details");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!eventToDelete) return;

        try {
            setActionLoading(true);
            const res = await VolunteerService.deleteVolunteerEvent(eventToDelete);
            if (res.success) {
                toast.success("Event deleted successfully");
                setDeleteDialogOpen(false);
                setEventToDelete(null);
                // Refresh the table
                const newTrigger = Date.now();
                setSearchParams({ volunteer_trigger: newTrigger.toString() });
            } else {
                toast.error(res.message || "Failed to delete event");
            }
        } catch (err) {
            console.error("Error deleting event:", err);
            toast.error("Error deleting event");
        } finally {
            setActionLoading(false);
        }
    };

    const handleStatusUpdate = async (eventId: string, status: string) => {
        try {
            setActionLoading(true);
            const res = await VolunteerService.patchVolunteerEvent(eventId, { status });
            if (res.success) {
                toast.success(`Event ${status.toLowerCase()} successfully`);
                refreshTable();
            } else {
                toast.error(res.message || `Failed to ${status.toLowerCase()} event`);
            }
        } catch (err) {
            console.error(`Error updating event status:`, err);
            toast.error(`Error updating event status`);
        } finally {
            setActionLoading(false);
        }
    };

    const refreshTable = () => {
        const newTrigger = Date.now();
        setSearchParams({ volunteer_trigger: newTrigger.toString() });
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            DRAFT: "secondary",
            APPROVED: "default",
            PENDING: "outline",
            REJECTED: "destructive",
            CANCELLED: "destructive"
        } as const;

        return (
            <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
                {status}
            </Badge>
        );
    };

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents, volunteerTrigger]);

    const columns: GridColDef<VolunteeringEventListItem>[] = [
        {
            field: "title",
            headerName: "Title",
            flex: 1.2,
            minWidth: 150
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1.5,
            minWidth: 200,
            renderCell: (params) => (
                <div className="truncate" title={params.value}>
                    {params.value?.length > 50 ? `${params.value.substring(0, 50)}...` : params.value}
                </div>
            )
        },
        {
            field: "date",
            headerName: "Date",
            flex: 0.8,
            minWidth: 100,
            valueFormatter: (value) => {
                if (!value) return "-";
                return new Date(value).toLocaleDateString();
            }
        },
        {
            field: "start_time",
            headerName: "Start",
            flex: 0.6,
            minWidth: 80,
            valueGetter: (_params, row) => row.start_time || "-",
        },
        {
            field: "end_time",
            headerName: "End",
            flex: 0.6,
            minWidth: 80,
            valueGetter: (_params, row) => row.end_time || "-",
        },
        {
            field: "capacity",
            headerName: "Capacity",
            type: "number",
            flex: 0.6,
            minWidth: 80,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.8,
            minWidth: 100,
            renderCell: (params) => getStatusBadge(params.value),
        },
        {
            field: "village",
            headerName: "Location",
            flex: 1.2,
            minWidth: 150,
            valueGetter: (_params, row) =>
                row.village ? `${row.village.village}, ${row.village.sector}` : "-",
        },
        {
            field: "organizer",
            headerName: "Organizer",
            flex: 1,
            minWidth: 120,
            valueGetter: (_params, row) =>
                row.organizer
                    ? `${row.organizer.person.first_name} ${row.organizer.person.last_name}`
                    : "-",
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 280,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                const status = params.row.status;
                return (
                    <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(params.row.volunteer_id)}
                            disabled={actionLoading}
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(params.row.volunteer_id)}
                            disabled={actionLoading}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        {status === 'PENDING' && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleStatusUpdate(params.row.volunteer_id, 'APPROVED')}
                                    disabled={actionLoading}
                                    title="Approve"
                                >
                                    <Check className="w-4 h-4 text-green-600" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleStatusUpdate(params.row.volunteer_id, 'REJECTED')}
                                    disabled={actionLoading}
                                    title="Reject"
                                >
                                    <X className="w-4 h-4 text-red-600" />
                                </Button>
                            </>
                        )}
                        {status === 'DRAFT' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusUpdate(params.row.volunteer_id, 'PENDING')}
                                disabled={actionLoading}
                                title="Submit for Approval"
                            >
                                <Clock className="w-4 h-4 text-blue-600" />
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setEventToDelete(params.row.volunteer_id);
                                setDeleteDialogOpen(true);
                            }}
                            disabled={actionLoading}
                        >
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <DataTable<VolunteeringEventListItem & { id: string }>
                title="Volunteering Events"
                description="Manage all upcoming volunteering events"
                columns={columns}
                data={events.map((e) => ({
                    ...e,
                    id: e.volunteer_id,
                }))}
                loading={loading}
                totalRows={totalRows}
                paginationModel={paginationModel}
                sortModel={sortModel}
                onPaginationChange={setPaginationModel}
                onSortModelChange={setSortModel}
                onSearchChange={setSearch}
                actions={
                    <div className="flex gap-2">
                        <VolunteeringEventFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        <CreateVolunteeringEventDialog onSuccess={refreshTable} />
                    </div>
                }
                search={search}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                emptyMessage="No volunteering events found"
            />

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Event Details</DialogTitle>
                    </DialogHeader>
                    {selectedEvent && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold">Title</h4>
                                    <p>{selectedEvent.title}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Status</h4>
                                    {getStatusBadge(selectedEvent.status)}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold">Description</h4>
                                <p className="text-gray-600">{selectedEvent.description}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <h4 className="font-semibold">Date</h4>
                                    <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Start Time</h4>
                                    <p>{selectedEvent.start_time}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">End Time</h4>
                                    <p>{selectedEvent.end_time}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold">Capacity</h4>
                                    <p>{selectedEvent.capacity} volunteers</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Category</h4>
                                    <p>{selectedEvent.category}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold">Location</h4>
                                <p>{selectedEvent.location || 'Not specified'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Skills Required</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedEvent.skills_required?.map((skill, index) => (
                                        <Badge key={index} variant="outline">{skill}</Badge>
                                    )) || <p>No specific skills required</p>}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold">Organizer</h4>
                                <p>{selectedEvent.organizer ?
                                    `${selectedEvent.organizer.person.first_name} ${selectedEvent.organizer.person.last_name}` :
                                    'Not specified'
                                }</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            {selectedEvent && (
                <CreateVolunteeringEventDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    editEvent={selectedEvent}
                    onSuccess={() => {
                        refreshTable();
                        setEditDialogOpen(false);
                        setSelectedEvent(null);
                    }}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this volunteering event? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={actionLoading}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {actionLoading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

/* eslint-disable react-refresh/only-export-components */
"use client";

import { useEffect, useState } from "react";
import EventService from "../eventService";
import type { EventListItem } from "../types";
import { DataTable } from "@/components/TableComponents/data-table";
import type { GridColDef } from "@mui/x-data-grid";




export const eventColumns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "start_time", headerName: "Start Time", flex: 1 },
    { field: "end_time", headerName: "End Time", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "village", headerName: "Village", flex: 2 },
    {
        field: "organizer",
        headerName: "Organizer",
        flex: 1.5,
        valueGetter: (_params, row) =>
            `${row.organizer.person.first_name} ${row.organizer.person.last_name}`,
    },
];

export function EventTable() {
    const [events, setEvents] = useState<EventListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Record<string, any>>({});

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await EventService.getEvents({
                page: pagination.page + 1, // API is 1-indexed
                page_size: pagination.pageSize,
                ...filters,
                date: filters.date,
                status: filters.status,
                village: filters.village,
            });

            setEvents(res.data.data);
            setTotalRows(res.data.count);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [pagination, search, filters]);

    return (
        <DataTable<EventListItem & { id: string }>
            title="Events"
            description="List of all events"
            columns={eventColumns}
            data={events.map((e) => ({ ...e, id: e.event_id }))}
            loading={loading}
            totalRows={totalRows}
            paginationModel={pagination}
            onPaginationChange={setPagination}
            onSearchChange={(value) => {
                setSearch(value);
                setPagination((prev) => ({ ...prev, page: 0 }));
                setFilters((prev) => ({ ...prev, title: value })); // simple search by title
            }}
            onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setPagination((prev) => ({ ...prev, page: 0 }));
            }}
            pageSizeOptions={[5, 10, 25]}
            rowHeight={60}
            searchPlaceholder="Search events..."
            emptyMessage="No events found"
        />
    );
}

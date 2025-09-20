"use client";

import { useEffect, useState, useCallback } from "react";
import type { GridColDef, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

import { Button } from "@/components/ui/button";
import type { ContactResponse, PaginatedResponse } from "../service";
import ContactService from "../service";
import { DataTable } from "@/components/data-table";


export default function ContactTable() {
    const [data, setData] = useState<ContactResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [search, setSearch] = useState("");

    const loadData = useCallback(async () => {
        try {
            setLoading(true);

            const res: PaginatedResponse<ContactResponse> =
                await ContactService.listContacts(
                    paginationModel.page + 1, // ✅ API is 1-based
                    paginationModel.pageSize,

                );

            setData(res.data);
            setTotalRows(res.count); // ✅ backend count
        } finally {
            setLoading(false);
        }
    }, [paginationModel]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "phone", headerName: "Phone", flex: 1 },
        { field: "organization", headerName: "Organization", flex: 1 },
        { field: "inquiry_type", headerName: "Inquiry Type", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <span
                    className={`px-2 py-1 rounded text-xs font-medium ${params.value === "resolved"
                        ? "bg-green-100 text-green-800"
                        : params.value === "in_progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {params.value}
                </span>
            ),
        },
        {
            field: "created_at",
            headerName: "Created At",
            flex: 1,
            valueGetter: (_params, row) => {
                const raw = row.value as string;

                if (!raw) return "-";

                // Keep only milliseconds (first 3 digits) and preserve timezone
                const sanitized = raw.replace(/\.(\d{3})\d+/, '.$1');

                const date = new Date(sanitized);
                if (isNaN(date.getTime())) return "-";

                // Format nicely for display
                return date.toLocaleString(); // or use date.toLocaleDateString() / toLocaleTimeString()
            },
        }

    ];

    return (
        <DataTable<ContactResponse>
            title="Contacts"
            description="Manage all inquiries from clients"
            columns={columns}
            data={data}
            loading={loading}
            totalRows={totalRows}
            paginationModel={paginationModel}
            sortModel={sortModel}
            search={search}

            onPaginationChange={setPaginationModel}
            onSortModelChange={setSortModel}
            onSearchChange={setSearch}
            pageSizeOptions={[1, 3, 4, 5, 6, 10, 25, 50]}
            searchPlaceholder="Search contacts..."
            actions={<Button variant="outline">Export</Button>}
        />
    );
}

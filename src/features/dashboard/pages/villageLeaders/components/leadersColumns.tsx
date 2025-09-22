import { type GridColDef } from "@mui/x-data-grid";
import type { LeaderListItem } from "../leaderTypes";
import { Chip } from "@mui/material";
import { ActionsCell } from "./ActionsCell";

export const leaderColumns: GridColDef<LeaderListItem & { id: string }>[] = [
    {
        field: "full_name",
        headerName: "Name",
        flex: 1,
        valueGetter: (_params, row) =>
            `${row.person.first_name} ${row.person.last_name}`,
    },
    {
        field: "phone_number",
        headerName: "Phone",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        renderCell: (params) => params.value || "—",
    },
    {
        field: "national_id",
        headerName: "National ID",
        flex: 1,
        valueGetter: (_params, row) => row.person.national_id,
    },
    {
        field: "village",
        headerName: "Village",
        flex: 1,
        valueGetter: (_params, row) => row.village?.village || "—",
    },
    {
        field: "location",
        headerName: "Location",
        flex: 2,
        valueGetter: (_params, row) =>
            row.village
                ? `${row.village.province}, ${row.village.district}, ${row.village.sector}, ${row.village.cell}`
                : "—",

    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        renderCell: (params) => (
            <Chip
                label={params.value || "Leader"}
                size="small"
                color="primary"
                variant="outlined"
            />
        ),
    },
    {
        field: "is_active",
        headerName: "Status",
        flex: 0.8,
        renderCell: (params) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
                variant="filled"
            />
        ),
    },

    {
        field: "actions",
        headerName: "Actions",
        flex: 0.5,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const leader = params.row as LeaderListItem;
            return <ActionsCell leader={leader} />;
        },
    }

];

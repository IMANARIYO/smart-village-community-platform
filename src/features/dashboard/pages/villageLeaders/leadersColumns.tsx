import { GridMoreVertIcon, type GridColDef } from "@mui/x-data-grid";
import type { Leader } from "./leaderTypes";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LeaderService from "./LeaderService";
import { useState } from "react";
const ITEM_HEIGHT = 48;

export const leaderColumns: GridColDef<Leader>[] = [
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
        field: "is_active",
        headerName: "Active",
        flex: 0.5,
        renderCell: (params) =>
            params.value ? (
                <span className="text-green-600 font-semibold">Yes</span>
            ) : (
                <span className="text-red-600 font-semibold">No</span>
            ),
    },

    {
        field: "actions",
        headerName: "Actions",
        flex: 0.5,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const leader = params.row as Leader;
            const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
            const open = Boolean(anchorEl);

            const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                setAnchorEl(event.currentTarget);
            };
            const handleClose = () => {
                setAnchorEl(null);
            };

            const handleAction = async (action: "Edit" | "Promote" | "Remove") => {
                try {
                    switch (action) {
                        case "Edit":

                            console.log("Edit clicked for", leader.user_id);
                            break;
                        case "Promote":
                            await LeaderService.promoteLeader(leader.user_id, leader.village.village_id);
                            console.log("Promoted leader:", leader.user_id);
                            break;
                        case "Remove":
                            await LeaderService.removeLeaderFromVillage(leader.user_id);
                            console.log("Removed leader from village:", leader.user_id);
                            break;
                    }
                } catch (error) {
                    console.error(`${action} failed:`, error);
                } finally {
                    handleClose();
                }
            };

            return (
                <>
                    <IconButton aria-label="more" onClick={handleClick}>
                        <GridMoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" },
                        }}
                    >
                        <MenuItem onClick={() => handleAction("Edit")}>Edit</MenuItem>
                        <MenuItem onClick={() => handleAction("Promote")}>Promote</MenuItem>
                        <MenuItem onClick={() => handleAction("Remove")}>Remove</MenuItem>
                    </Menu>
                </>
            );
        },
    }

];

import { GridMoreVertIcon, type GridColDef } from "@mui/x-data-grid";
import type { Leader } from "./leaderTypes";
import { IconButton, Menu, MenuItem, Chip } from "@mui/material";
import LeaderService from "./LeaderService";
import { useState } from "react";
import { toast } from "sonner";
import { triggerRefresh } from "./utils/refreshTrigger";

const ITEM_HEIGHT = 48;

export const leaderColumns: GridColDef<Leader & { id: string }>[] = [
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
            const leader = params.row as Leader;
            const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
            const open = Boolean(anchorEl);

            const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                setAnchorEl(event.currentTarget);
            };
            const handleClose = () => {
                setAnchorEl(null);
            };

            const handleAction = async (action: "Edit" | "Toggle" | "Remove") => {
                try {
                    switch (action) {
                        case "Edit":
                            // Trigger edit modal - this would need to be passed as a prop
                            if (window.handleEditLeader) {
                                window.handleEditLeader(leader);
                            } else {
                                toast.info("Edit functionality coming soon");
                            }
                            break;
                        case "Toggle":
                            await LeaderService.updateLeader(leader.user_id, { 
                                is_active: !leader.is_active 
                            });
                            toast.success(`Leader ${leader.is_active ? 'deactivated' : 'activated'} successfully`);
                            triggerRefresh();
                            break;
                        case "Remove":
                            if (confirm(`Are you sure you want to remove ${leader.person.first_name} ${leader.person.last_name} from their leadership role?`)) {
                                await LeaderService.removeLeaderFromVillage(leader.user_id);
                                toast.success("Leader removed from village successfully");
                                triggerRefresh();
                            }
                            break;
                    }
                } catch (error) {
                    console.error(`${action} failed:`, error);
                    toast.error(`Failed to ${action.toLowerCase()} leader`);
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
                        <MenuItem onClick={() => handleAction("Toggle")}>
                            {leader.is_active ? "Deactivate" : "Activate"}
                        </MenuItem>
                        <MenuItem onClick={() => handleAction("Remove")}>Remove</MenuItem>
                    </Menu>
                </>
            );
        },
    }

];

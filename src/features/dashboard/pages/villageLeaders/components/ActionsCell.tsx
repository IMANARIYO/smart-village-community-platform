import { useState } from "react";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import LeaderService from "../LeaderService";
import { LeaderDetailsDialog } from "./LeaderDetailsDialog";
import type { LeaderListItem } from "../leaderTypes";

const ITEM_HEIGHT = 48;

interface ActionsCellProps {
    leader: LeaderListItem;
}

export function ActionsCell({ leader }: ActionsCellProps) {
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
                case "Edit": {
                    toast.info("Edit functionality available in main table");
                    break;
                }
                case "Toggle": {
                    await LeaderService.updateLeader(leader.user_id, {
                        is_active: !leader.is_active
                    });
                    toast.success(`Leader ${leader.is_active ? 'deactivated' : 'activated'} successfully`);
                    const currentUrl = new URL(window.location.href);
                    currentUrl.searchParams.set('leaderTrigger', Date.now().toString());
                    window.history.replaceState({}, '', currentUrl.toString());
                    break;
                }
                case "Remove": {
                    if (confirm(`Are you sure you want to remove ${leader.person.first_name} ${leader.person.last_name} from their leadership role?`)) {
                        await LeaderService.removeLeaderFromVillage(leader.user_id);
                        toast.success("Leader removed from village successfully");
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.set('leaderTrigger', Date.now().toString());
                        window.history.replaceState({}, '', currentUrl.toString());
                    }
                    break;
                }
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
                <LeaderDetailsDialog
                    leader={leader}
                    trigger={
                        <MenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                        </MenuItem>
                    }
                />
                <MenuItem onClick={() => handleAction("Edit")}>Edit</MenuItem>
                <MenuItem onClick={() => handleAction("Toggle")}>
                    {leader.is_active ? "Deactivate" : "Activate"}
                </MenuItem>
                <MenuItem onClick={() => handleAction("Remove")}>Remove</MenuItem>
            </Menu>
        </>
    );
}
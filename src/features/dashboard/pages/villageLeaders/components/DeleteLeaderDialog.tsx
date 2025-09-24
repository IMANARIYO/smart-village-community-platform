import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LeaderService from "../LeaderService";
import type { LeaderListItem } from "../leaderTypes";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

interface DeleteLeaderDialogProps {
  leader: LeaderListItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteLeaderDialog({ leader, isOpen, onClose, onSuccess }: DeleteLeaderDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await LeaderService.deleteLeader(leader.user_id);

      if (response.success) {
        toast.success("Leader deleted successfully");
        onSuccess();
      } else {
        toast.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Failed to delete leader:", extractErrorMessage(error));
      toast.error("Failed to delete leader");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Leader
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the leader account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">{leader.person.first_name} {leader.person.last_name}</p>
            <p className="text-sm text-muted-foreground">{leader.phone_number}</p>
            {leader.village && (
              <p className="text-sm text-muted-foreground">
                {leader.village.village}, {leader.village.cell}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Leader"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
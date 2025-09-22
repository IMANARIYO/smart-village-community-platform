import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, UserMinus, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LeaderService from "../LeaderService";
import type { LeaderListItem } from "../leaderTypes";

interface LeaderDetailsDialogProps {
  leader: LeaderListItem;
  trigger: React.ReactNode;
}

export function LeaderDetailsDialog({
  leader,
  trigger,
}: LeaderDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const response = await LeaderService.updateLeader(leader.user_id, {
        is_active: !leader.is_active
      });

      if (response.success) {
        toast.success(`Leader ${leader.is_active ? 'deactivated' : 'activated'} successfully`);
        setOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      let errorMessage = "Failed to update leader status";

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; error?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.error) {
          errorMessage = axiosError.response.data.error;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromVillage = async () => {
    if (!confirm('Are you sure you want to remove this leader from their village?')) return;

    setLoading(true);
    try {
      const response = await LeaderService.removeLeaderFromVillage(leader.user_id);

      if (response.success) {
        toast.success('Leader removed from village successfully');
        setOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      let errorMessage = "Failed to remove leader from village";

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; error?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.error) {
          errorMessage = axiosError.response.data.error;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this leader? This action cannot be undone.')) return;

    setLoading(true);
    try {
      const response = await LeaderService.deleteLeader(leader.user_id);

      if (response.success) {
        toast.success('Leader deleted successfully');
        setOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      let errorMessage = "Failed to delete leader";

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; error?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.response?.data?.error) {
          errorMessage = axiosError.response.data.error;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Leader Details</DialogTitle>
          <DialogDescription>
            View and manage leader information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Personal Information</h3>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Name:</span> {leader.person.first_name} {leader.person.last_name}</p>
                  <p><span className="font-medium">National ID:</span> {leader.person.national_id}</p>
                  <p><span className="font-medium">Phone:</span> {leader.phone_number}</p>
                  <p><span className="font-medium">Email:</span> {leader.email || "—"}</p>
                  <p><span className="font-medium">Role:</span> {leader.role}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Status</h3>
                <div className="mt-2">
                  <Badge variant={leader.is_active ? "default" : "secondary"}>
                    {leader.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Location</h3>
                {leader.village ? (
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Province:</span> {leader.village.province}</p>
                    <p><span className="font-medium">District:</span> {leader.village.district}</p>
                    <p><span className="font-medium">Sector:</span> {leader.village.sector}</p>
                    <p><span className="font-medium">Cell:</span> {leader.village.cell}</p>
                    <p><span className="font-medium">Village:</span> {leader.village.village}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-2">No village assigned</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button onClick={handleToggleStatus} variant="outline" size="sm" disabled={loading}>
              {leader.is_active ? (
                <ToggleLeft className="h-4 w-4 mr-2" />
              ) : (
                <ToggleRight className="h-4 w-4 mr-2" />
              )}
              {loading ? "Updating..." : (leader.is_active ? "Deactivate" : "Activate")}
            </Button>

            <Button onClick={handleRemoveFromVillage} variant="outline" size="sm" disabled={loading}>
              <UserMinus className="h-4 w-4 mr-2" />
              {loading ? "Removing..." : "Remove from Village"}
            </Button>

            <Button onClick={handleDelete} variant="destructive" size="sm" disabled={loading}>
              <Trash2 className="h-4 w-4 mr-2" />
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
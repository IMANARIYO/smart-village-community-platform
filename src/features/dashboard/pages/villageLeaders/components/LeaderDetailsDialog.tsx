import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

// 🔹 Central error handler
function extractErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: { data?: { message?: string; error?: string } };
    };
    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      fallback
    );
  } else if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export function LeaderDetailsDialog({ leader, trigger }: LeaderDetailsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const response = await LeaderService.updateLeader(leader.user_id, {
        is_active: !leader.is_active,
      });

      if (response.success) {
        toast.success(
          `Leader ${leader.is_active ? "deactivated" : "activated"} successfully`
        );
        setOpen(false);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: unknown) {
      toast.error(extractErrorMessage(error, "Failed to update leader status"));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromVillage = async () => {
    setLoading(true);
    try {
      const response = await LeaderService.removeLeaderFromVillage(leader.user_id);

      if (response.success) {
        toast.success("Leader removed from village successfully");
        setOpen(false);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: unknown) {
      toast.error(
        extractErrorMessage(error, "Failed to remove leader from village")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await LeaderService.deleteLeader(leader.user_id);

      if (response.success) {
        toast.success("Leader deleted successfully");
        setOpen(false);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: unknown) {
      toast.error(extractErrorMessage(error, "Failed to delete leader"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Leader Details</DialogTitle>
          <DialogDescription>
            View and manage leader information
          </DialogDescription>
        </DialogHeader>

        {/* Leader info */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Personal Information
                </h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {leader.person.first_name} {leader.person.last_name}
                  </p>
                  <p>
                    <span className="font-medium">National ID:</span>{" "}
                    {leader.person.national_id}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {leader.phone_number}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {leader.email || "—"}
                  </p>
                  <p>
                    <span className="font-medium">Role:</span> {leader.role}
                  </p>
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
                    <p>
                      <span className="font-medium">Province:</span>{" "}
                      {leader.village.province}
                    </p>
                    <p>
                      <span className="font-medium">District:</span>{" "}
                      {leader.village.district}
                    </p>
                    <p>
                      <span className="font-medium">Sector:</span>{" "}
                      {leader.village.sector}
                    </p>
                    <p>
                      <span className="font-medium">Cell:</span>{" "}
                      {leader.village.cell}
                    </p>
                    <p>
                      <span className="font-medium">Village:</span>{" "}
                      {leader.village.village}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground mt-2">No village assigned</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button onClick={handleToggleStatus} variant="outline" size="sm" disabled={loading}>
              {leader.is_active ? (
                <ToggleLeft className="h-4 w-4 mr-2" />
              ) : (
                <ToggleRight className="h-4 w-4 mr-2" />
              )}
              {loading ? "Updating..." : leader.is_active ? "Deactivate" : "Activate"}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={loading}>
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove from Village
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Leader</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove the leader from their assigned village. They
                    will still exist in the system but not belong to any village.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemoveFromVillage} disabled={loading}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={loading}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Leader</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action is <strong>irreversible</strong>. The leader and
                    all their associations will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={loading}>
                    Delete Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

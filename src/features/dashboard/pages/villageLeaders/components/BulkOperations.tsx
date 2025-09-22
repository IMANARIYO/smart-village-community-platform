"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Users, UserCheck, UserX, Trash2 } from "lucide-react";
import LeaderService from "../LeaderService";
import type { Leader } from "../leaderTypes";

interface BulkOperationsProps {
  selectedLeaders: Leader[];
  onClearSelection: () => void;
  onUpdate: () => void;
}

export function BulkOperations({ selectedLeaders, onClearSelection, onUpdate }: BulkOperationsProps) {
  const [loading, setLoading] = useState(false);
  const [operation, setOperation] = useState<string>("");

  if (selectedLeaders.length === 0) return null;

  const handleBulkOperation = async () => {
    if (!operation) {
      toast.error("Please select an operation");
      return;
    }

    try {
      setLoading(true);
      const userIds = selectedLeaders.map(leader => leader.user_id);

      switch (operation) {
        case "activate":
          await LeaderService.bulkUpdateLeaders(userIds, { is_active: true });
          toast.success(`${selectedLeaders.length} leaders activated`);
          break;
        case "deactivate":
          await LeaderService.bulkUpdateLeaders(userIds, { is_active: false });
          toast.success(`${selectedLeaders.length} leaders deactivated`);
          break;
        case "remove":
          if (confirm(`Are you sure you want to remove ${selectedLeaders.length} leaders from their villages?`)) {
            await Promise.all(userIds.map(id => LeaderService.removeLeaderFromVillage(id)));
            toast.success(`${selectedLeaders.length} leaders removed`);
          }
          break;
        default:
          toast.error("Invalid operation");
          return;
      }

      onUpdate();
      onClearSelection();
      setOperation("");
    } catch (error) {
      console.error("Bulk operation failed:", error);
      toast.error("Bulk operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-blue-600" />
        <Badge variant="secondary">
          {selectedLeaders.length} selected
        </Badge>
      </div>

      <Select value={operation} onValueChange={setOperation}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select operation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="activate">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              Activate Leaders
            </div>
          </SelectItem>
          <SelectItem value="deactivate">
            <div className="flex items-center gap-2">
              <UserX className="h-4 w-4 text-red-600" />
              Deactivate Leaders
            </div>
          </SelectItem>
          <SelectItem value="remove">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-red-600" />
              Remove from Villages
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Button 
        onClick={handleBulkOperation} 
        disabled={loading || !operation}
        size="sm"
      >
        {loading ? "Processing..." : "Apply"}
      </Button>

      <Button 
        variant="outline" 
        onClick={onClearSelection}
        size="sm"
      >
        Clear Selection
      </Button>
    </div>
  );
}
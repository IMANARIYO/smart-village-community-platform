import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import LeaderService from "../LeaderService";
import type { Leader, GetLeadersApiResponse, GetLeadersParams } from "../leaderTypes";

export function useLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchLeaders = useCallback(async (params: GetLeadersParams = {}) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      setLoading(true);
      setError(null);
      
      const response: GetLeadersApiResponse = await LeaderService.getLeaders(params, abortControllerRef.current.signal);
      
      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      
      if (response.success) {
        setLeaders(response.data.map(leader => ({ ...leader, id: leader.user_id })));
        setTotalRows(response.meta.total);
      } else {
        setError(response.message || "Failed to fetch leaders");
        toast.error(response.message || "Failed to fetch leaders");
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return; // Request was cancelled, don't show error
      }
      
      const errorMessage = "Failed to fetch leaders";
      setError(errorMessage);
      console.error("Error fetching leaders:", error);
      toast.error(errorMessage);
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const updateLeader = useCallback(async (leaderId: string, data: Partial<Leader>) => {
    try {
      const response = await LeaderService.updateLeader(leaderId, data);
      if (response.success) {
        toast.success("Leader updated successfully");
        return response.data;
      } else {
        toast.error(response.message || "Failed to update leader");
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error updating leader:", error);
      toast.error("Failed to update leader");
      throw error;
    }
  }, []);

  const removeLeader = useCallback(async (leaderId: string) => {
    try {
      const response = await LeaderService.removeLeaderFromVillage(leaderId);
      if (response.success) {
        toast.success("Leader removed successfully");
        return true;
      } else {
        toast.error(response.message || "Failed to remove leader");
        return false;
      }
    } catch (error) {
      console.error("Error removing leader:", error);
      toast.error("Failed to remove leader");
      return false;
    }
  }, []);

  const promoteLeader = useCallback(async (userId: string, villageId: string) => {
    try {
      const response = await LeaderService.promoteLeader(userId, villageId);
      if (response.success) {
        toast.success("Leader promoted successfully");
        return response.data;
      } else {
        toast.error(response.message || "Failed to promote leader");
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error promoting leader:", error);
      toast.error("Failed to promote leader");
      throw error;
    }
  }, []);

  return {
    leaders,
    loading,
    totalRows,
    error,
    fetchLeaders,
    updateLeader,
    removeLeader,
    promoteLeader,
  };
}
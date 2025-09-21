import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useParticipationStore } from "../store";
import { participationService } from "../service";
import type {
  CreateParticipationRequest,
  UpdateParticipationRequest,
  ParticipationFilters,
  ParticipationStatus,
} from "../types";

export function useParticipationsHook() {
  const {
    participations,
    selectedParticipation,
    loading,
    error,
    filters,
    pagination,
    setParticipations,
    setSelectedParticipation,
    setLoading,
    setError,
    setFilters,
    setPagination,
    addParticipation,
    updateParticipation,
    removeParticipation,
    updateParticipationStatus,
  } = useParticipationStore();

  // Fetch participations with filters
  const fetchParticipations = useCallback(
    async (newFilters?: ParticipationFilters) => {
      try {
        setLoading(true);
        setError(null);

        const filtersToUse = newFilters || filters;
        const response = await participationService.list(filtersToUse);
        console.log(response.data);
        if (response.success) {
          setParticipations(response.data);
          setPagination(response.meta);
          if (newFilters) {
            setFilters(filtersToUse);
          }
        } else {
          setError(response.message);
          toast.error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch participations";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [
      filters,
      setParticipations,
      setPagination,
      setFilters,
      setLoading,
      setError,
    ]
  );

  // Create participation
  const createParticipation = useCallback(
    async (data: CreateParticipationRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await participationService.create(data);

        if (response.success) {
          addParticipation(response.data);
          toast.success("Successfully joined the event!");
          return response.data;
        } else {
          setError(response.message);
          toast.error(response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to join event";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addParticipation, setLoading, setError]
  );

  // Get participation by ID
  const getParticipationById = useCallback(
    async (participationId: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await participationService.getById(participationId);

        if (response.success) {
          setSelectedParticipation(response.data);
          return response.data;
        } else {
          setError(response.message);
          toast.error(response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch participation";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setSelectedParticipation, setLoading, setError]
  );

  // Update participation notes
  const updateParticipationNotes = useCallback(
    async (participationId: string, data: UpdateParticipationRequest) => {
      try {
        setLoading(true);
        setError(null);

        const response = await participationService.update(
          participationId,
          data
        );

        if (response.success) {
          updateParticipation(participationId, { notes: data.notes });
          toast.success("Notes updated successfully!");
          return response.data;
        } else {
          setError(response.message);
          toast.error(response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update notes";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateParticipation, setLoading, setError]
  );

  // Approve/Reject participations
  const approveRejectParticipations = useCallback(
    async (participationIds: string[], status: ParticipationStatus) => {
      try {
        setLoading(true);
        setError(null);

        const response = await participationService.approveReject({
          participation_ids: participationIds,
          status,
        });

        if (response.success) {
          updateParticipationStatus(participationIds, status);
          const action = status === "APPROVED" ? "approved" : "rejected";
          toast.success(
            `Successfully ${action} ${participationIds.length} participation(s)!`
          );
          return response.data;
        } else {
          setError(response.message);
          toast.error(response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to update participation status";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateParticipationStatus, setLoading, setError]
  );

  // Delete participation
  const deleteParticipation = useCallback(
    async (participationId: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await participationService.remove(participationId);

        if (response.success) {
          removeParticipation(participationId);
          toast.success("Participation removed successfully!");
          return true;
        } else {
          setError(response.message);
          toast.error(response.message);
          throw new Error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to remove participation";
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [removeParticipation, setLoading, setError]
  );

  // Auto-fetch on mount
  useEffect(() => {
    fetchParticipations();
  }, [fetchParticipations]);

  return {
    // State
    participations,
    selectedParticipation,
    loading,
    error,
    filters,
    pagination,

    // Actions
    fetchParticipations,
    createParticipation,
    getParticipationById,
    updateParticipationNotes,
    approveRejectParticipations,
    deleteParticipation,
    setSelectedParticipation,
    setFilters,
  };
}

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  Participation,
  ParticipationFilters,
  ParticipationStatus,
} from "./types";
import type { PaginationMeta } from "@/types";

interface ParticipationState {
  // Data
  participations: Participation[];
  selectedParticipation: Participation | null;

  // UI State
  loading: boolean;
  error: string | null;

  // Pagination & Filters
  filters: ParticipationFilters;
  pagination: PaginationMeta;

  // Actions
  setParticipations: (participations: Participation[]) => void;
  setSelectedParticipation: (participation: Participation | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: ParticipationFilters) => void;
  setPagination: (pagination: PaginationMeta) => void;

  // Participation Management
  addParticipation: (participation: Participation) => void;
  updateParticipation: (
    participationId: string,
    updates: Partial<Participation>
  ) => void;
  removeParticipation: (participationId: string) => void;
  updateParticipationStatus: (
    participationIds: string[],
    status: ParticipationStatus
  ) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  participations: [],
  selectedParticipation: null,
  loading: false,
  error: null,
  filters: { page: 1, limit: 10 },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 0,
    has_next: false,
    has_prev: false,
  },
};

export const useParticipationStore = create<ParticipationState>()(
  devtools(
    (set) => ({
      ...initialState,

      setParticipations: (participations) => set({ participations }),
      setSelectedParticipation: (selectedParticipation) =>
        set({ selectedParticipation }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFilters: (filters) => set({ filters }),
      setPagination: (pagination) => set({ pagination }),

      addParticipation: (participation) =>
        set((state) => ({
          participations: [participation, ...state.participations],
        })),

      updateParticipation: (participationId, updates) =>
        set((state) => ({
          participations: state.participations.map((p) =>
            p.participation_id === participationId ? { ...p, ...updates } : p
          ),
          selectedParticipation:
            state.selectedParticipation?.participation_id === participationId
              ? { ...state.selectedParticipation, ...updates }
              : state.selectedParticipation,
        })),

      removeParticipation: (participationId) =>
        set((state) => ({
          participations: state.participations.filter(
            (p) => p.participation_id !== participationId
          ),
          selectedParticipation:
            state.selectedParticipation?.participation_id === participationId
              ? null
              : state.selectedParticipation,
        })),

      updateParticipationStatus: (participationIds, status) =>
        set((state) => ({
          participations: state.participations.map((p) =>
            participationIds.includes(p.participation_id)
              ? {
                  ...p,
                  status,
                  approved_at:
                    status === "APPROVED"
                      ? new Date().toISOString()
                      : p.approved_at,
                }
              : p
          ),
        })),

      reset: () => set(initialState),
    }),
    { name: "participation-store" }
  )
);

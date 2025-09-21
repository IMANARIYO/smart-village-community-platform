"use client";

import { useState } from "react";
import { Plus, Eye, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { ParticipationList } from "../components/ParticipationList";
import { ParticipationForm } from "../components/ParticipationForm";
import { ParticipationDetail } from "../components/ParticipationDetail";
import { useParticipationsHook } from "../hooks/useParticipationsHook";
import { useVolunteeringEvents } from "../../volunteering/hooks/useVolunteeringEvents";
import type { Participation, ParticipationStatus, CreateParticipationRequest, UpdateParticipationRequest } from "../types";

export default function ParticipationsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedParticipation, setSelectedParticipation] = useState<Participation | null>(null);

  const {
    participations,
    loading,
    error,
    filters,
    pagination,
    fetchParticipations,
    createParticipation,
    updateParticipationNotes,
    approveRejectParticipations,

    setFilters,
  } = useParticipationsHook();


  const { events: volunteeringEvents, loading: eventsLoading } = useVolunteeringEvents();

  const safeParticipations = participations ?? [];
  const stats = {
    total: safeParticipations.length | 0,
    pending: safeParticipations.filter(p => p.status === "PENDING").length,
    approved: safeParticipations.filter(p => p.status === "APPROVED").length,
    rejected: safeParticipations.filter(p => p.status === "REJECTED").length,
  };
  const handleCreateParticipation = async (data: CreateParticipationRequest) => {
    try {
      await createParticipation(data);
      setShowCreateForm(false);
      fetchParticipations();
    } catch {
      // Error handled in hook
    }
  };

  const handleParticipationClick = (participation: Participation) => {
    setSelectedParticipation(participation);
    setShowDetailDialog(true);
  };

  const handleUpdateNotes = async (data: UpdateParticipationRequest) => {
    if (selectedParticipation) {
      try {
        await updateParticipationNotes(selectedParticipation.participation_id, data);
        fetchParticipations();
      } catch {
        // Error handled in hook
      }
    }
  };

  const handleStatusChange = async (participationId: string, status: ParticipationStatus) => {
    try {
      await approveRejectParticipations([participationId], status);
      fetchParticipations();
      if (selectedParticipation?.participation_id === participationId) {
        setSelectedParticipation({ ...selectedParticipation, status });
      }
    } catch {
      // Error handled in hook
    }
  };

  const handleBulkApproveReject = async (participationIds: string[], status: ParticipationStatus) => {
    try {
      await approveRejectParticipations(participationIds, status);
      fetchParticipations();
    } catch {
      // Error handled in hook
    }
  };

  const handleFiltersChange = (newFilters: Record<string, unknown>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    fetchParticipations(updatedFilters);
  };

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    const updatedFilters = { ...filters, page: model.page + 1, limit: model.pageSize };
    setFilters(updatedFilters);
    fetchParticipations(updatedFilters);
  };

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Error loading participations: {error}</p>
              <Button onClick={() => fetchParticipations()} className="mt-4">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Participation Management</h1>
          <p className="text-gray-600 mt-1">
            Manage volunteer participations in community events
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Join Event
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Participations List */}
      <ParticipationList
        participations={participations}
        loading={loading}
        totalRows={pagination?.total || 0}
        filters={filters as Record<string, unknown>}
        onFiltersChange={handleFiltersChange}
        onPaginationChange={handlePaginationChange}
        onParticipationClick={handleParticipationClick}
        onApproveReject={handleBulkApproveReject}
        paginationModel={{
          page: (filters.page || 1) - 1,
          pageSize: filters.limit || 10,
        }}
      />

      {/* Create Participation Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Join Volunteering Event</DialogTitle>
          </DialogHeader>
          <ParticipationForm
            events={volunteeringEvents.filter(e => e.status === 'APPROVED')}
            onSubmit={handleCreateParticipation}
            loading={loading || eventsLoading}
            onCancel={() => setShowCreateForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Participation Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Participation Details
            </DialogTitle>
          </DialogHeader>
          {selectedParticipation && (
            <ParticipationDetail
              participation={selectedParticipation}
              onUpdate={handleUpdateNotes}
              onStatusChange={handleStatusChange}
              loading={loading}
              canEdit={true}
              canApprove={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

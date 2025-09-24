
import { useState, useMemo } from "react";
import { type GridColDef } from "@mui/x-data-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/TableComponents/data-table";
import { ParticipationFilters } from "./ParticipationFilters";
import type { Participation, ParticipationStatus } from "../types";

interface ParticipationListProps {
  participations: Participation[];
  loading: boolean;
  totalRows: number;
  filters: Record<string, unknown>;
  onFiltersChange: (filters: Record<string, unknown>) => void;
  onPaginationChange: (model: { page: number; pageSize: number }) => void;
  onParticipationClick: (participation: Participation) => void;
  onApproveReject?: (participationIds: string[], status: ParticipationStatus) => void;
  paginationModel: { page: number; pageSize: number };
}

const getStatusColor = (status: ParticipationStatus) => {
  switch (status) {
    case "APPROVED": return "bg-green-100 text-green-800";
    case "PENDING": return "bg-yellow-100 text-yellow-800";
    case "REJECTED": return "bg-red-100 text-red-800";
    case "CANCELLED": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export function ParticipationList({
  participations,
  loading,
  totalRows,
  filters,
  onFiltersChange,
  onPaginationChange,
  onParticipationClick,
  onApproveReject,
  paginationModel,
}: ParticipationListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const participationsWithId = useMemo(() => {
    if (!participations) return [];
    return participations.map(p => ({ ...p, id: p.participation_id }));
  }, [participations]);

  const columns: GridColDef[] = useMemo(() => [
    {
      field: "user",
      headerName: "Volunteer",
      width: 200,
      renderCell: (params) => {
        const user = params.row?.user;
        const person = user?.person;
        return (
          <div>
            <div className="font-medium">
              {person?.first_name || ""} {person?.last_name || ""}
            </div>
            <div className="text-sm text-gray-500">{user?.phone_number || "-"}</div>
          </div>
        );
      },
    },
    {
      field: "event",
      headerName: "Event",
      width: 250,
      renderCell: (params) => (
        <div>
          <div className="font-medium">{params.row.event?.title}</div>
          <div className="text-sm text-gray-500">{params.row.event?.date}</div>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Badge className={getStatusColor(params.row.status)}>
          {params.row.status}
        </Badge>
      ),
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 200,
      renderCell: (params) => (
        <div className="text-sm truncate">{params.row.notes || "-"}</div>
      ),
    },
    {
      field: "joined_at",
      headerName: "Joined At",
      width: 150,
      renderCell: (params) => {
        try {
          const date = params.row.joined_at ? new Date(params.row.joined_at) : null;
          const isValidDate = date && !isNaN(date.getTime());
          return (
            <div className="text-sm">
              {isValidDate ? date.toLocaleDateString() : "-"}
            </div>
          );
        } catch {
          return <div className="text-sm">-</div>;
        }
      },
    },
  ], []);

  const handleRowClick = (row: Participation) => {
    onParticipationClick(row);
  };

  const handleBulkApprove = () => {
    try {
      if (selectedIds.length > 0 && onApproveReject) {
        onApproveReject(selectedIds, "APPROVED");
        setSelectedIds([]);
      }
    } catch {
      // Handle error silently
    }
  };

  const handleBulkReject = () => {
    try {
      if (selectedIds.length > 0 && onApproveReject) {
        onApproveReject(selectedIds, "REJECTED");
        setSelectedIds([]);
      }
    } catch {
      // Handle error silently
    }
  };

  const actions = onApproveReject && selectedIds.length > 0 ? (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleBulkApprove}>
        Approve Selected ({selectedIds.length})
      </Button>
      <Button size="sm" variant="destructive" onClick={handleBulkReject}>
        Reject Selected ({selectedIds.length})
      </Button>
    </div>
  ) : null;

  return (
    <DataTable
      title="Participations"
      description="Manage volunteer participations in events"
      columns={columns}
      data={participationsWithId}
      loading={loading}
      totalRows={totalRows}
      paginationModel={paginationModel}
      onPaginationChange={onPaginationChange}
      onRowClick={handleRowClick}
      customFilters={
        <ParticipationFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      }
      actions={actions}
    />
  );
}
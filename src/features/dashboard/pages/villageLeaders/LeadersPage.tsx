"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/TableComponents/data-table";
import { LeaderFilters } from "./components/LeaderFilters";
import { LeaderStats } from "./components/LeaderStats";
import { LeaderDetailModal } from "./components/LeaderDetailModal";
import { leaderColumns } from "./leadersColumns";
import { useLeaders } from "./hooks/useLeaders";
import LeaderService from "./LeaderService";
import type { Leader, GetLeadersParams } from "./leaderTypes";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";

export default function LeadersPage() {
  const { leaders, loading, totalRows, fetchLeaders } = useLeaders();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");

  // Calculate stats from current leaders data
  const stats = {
    total: totalRows,
    active: leaders.filter(l => l.is_active).length,
    inactive: totalRows - leaders.filter(l => l.is_active).length,
    byProvince: leaders.reduce((acc, leader) => {
      const province = leader.village?.province || 'Unknown';
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const refreshLeaders = useCallback(() => {
    const params: GetLeadersParams = {
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      search,
      sortBy: sortModel[0]?.field,
      sortOrder: sortModel[0]?.sort ?? "asc",
      ...filters,
    };
    fetchLeaders(params);
  }, [paginationModel, sortModel, search, filters, fetchLeaders]);

  const handleFiltersChange = (newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  };

  const handleRowClick = (leader: Leader) => {
    setSelectedLeader(leader);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleAddLeader = () => {
    setSelectedLeader(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const handleExport = async () => {
    try {
      const blob = await LeaderService.exportLeaders(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leaders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Leaders data exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export leaders data");
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const result = await LeaderService.importLeaders(file);
          if (result.success) {
            toast.success(`Import completed: ${result.data.success} leaders imported`);
            if (result.data.failed > 0) {
              toast.warning(`${result.data.failed} leaders failed to import`);
            }
            refreshLeaders();
          } else {
            toast.error(result.message || "Import failed");
          }
        } catch (error) {
          console.error("Import failed:", error);
          toast.error("Failed to import leaders data");
        }
      }
    };
    input.click();
  };

  useEffect(() => {
    refreshLeaders();
  }, [paginationModel.page, paginationModel.pageSize, search, filters, sortModel]);

  useEffect(() => {
    // Provide global functions for column actions
    (window as any).handleEditLeader = (leader: Leader) => {
      setSelectedLeader(leader);
      setModalMode("edit");
      setModalOpen(true);
    };
    
    (window as any).refreshLeaders = refreshLeaders;
    
    return () => {
      delete (window as any).handleEditLeader;
      delete (window as any).refreshLeaders;
    };
  }, [refreshLeaders]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Village Leaders</h1>
          <p className="text-gray-600 mt-1">Manage and monitor village leadership</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddLeader}>
            <Plus className="h-4 w-4 mr-2" />
            Add Leader
          </Button>
        </div>
      </div>

      <LeaderStats stats={stats} loading={loading} />

      <LeaderFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <DataTable<Leader & { id: string }>
        title="Leaders Management"
        description="View and manage village leaders across all locations"
        columns={leaderColumns}
        data={leaders}
        loading={loading}
        totalRows={totalRows}
        paginationModel={paginationModel}
        onPaginationChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        search={search}
        onSearchChange={setSearch}
        onRowClick={handleRowClick}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        emptyMessage="No leaders found"
      />

      <LeaderDetailModal
        leader={selectedLeader}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={refreshLeaders}
        mode={modalMode}
      />
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/TableComponents/data-table";
import { LeaderFilters } from "./components/LeaderFilters";
import { LeaderStats } from "./components/LeaderStats";
import { LeaderDetailModal } from "./components/LeaderDetailModal";
import { BulkOperations } from "./components/BulkOperations";
import { leaderColumns } from "./leadersColumns";
import { useLeaders } from "./hooks/useLeaders";
import LeaderService from "./LeaderService";
import type { Leader, GetLeadersApiResponse, GetLeadersParams, LeaderStats as StatsType } from "./leaderTypes";
import type { GridPaginationModel, GridSortModel, GridRowSelectionModel } from "@mui/x-data-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Download, Upload, BarChart3, Users, Filter } from "lucide-react";

export default function EnhancedLeadersPage() {
  const { leaders, loading, totalRows, fetchLeaders: hookFetchLeaders } = useLeaders();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [stats, setStats] = useState<StatsType>({
    total: 0,
    active: 0,
    inactive: 0,
    byProvince: {},
    byDistrict: {},
    bySector: {},
    byCell: {},
    byVillage: {},
    recentlyAdded: 0,
    recentlyUpdated: 0,
  });
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");
  const [activeTab, setActiveTab] = useState("leaders");

  // Calculate comprehensive stats from leaders data
  const calculateStats = useCallback(() => {
    const active = leaders.filter(l => l.is_active).length;
    const byProvince = leaders.reduce((acc, leader) => {
      const province = leader.village?.province || 'Unknown';
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byDistrict = leaders.reduce((acc, leader) => {
      const district = leader.village?.district || 'Unknown';
      acc[district] = (acc[district] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const bySector = leaders.reduce((acc, leader) => {
      const sector = leader.village?.sector || 'Unknown';
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byCell = leaders.reduce((acc, leader) => {
      const cell = leader.village?.cell || 'Unknown';
      acc[cell] = (acc[cell] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byVillage = leaders.reduce((acc, leader) => {
      const village = leader.village?.village || 'Unknown';
      acc[village] = (acc[village] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    setStats({
      total: totalRows,
      active,
      inactive: totalRows - active,
      byProvince,
      byDistrict,
      bySector,
      byCell,
      byVillage,
      recentlyAdded: 0, // Would need API support
      recentlyUpdated: 0, // Would need API support
    });
  }, [leaders, totalRows]);

  const fetchLeaders = useCallback(() => {
    const params: GetLeadersParams = {
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      search,
      sortBy: sortModel[0]?.field,
      sortOrder: sortModel[0]?.sort ?? "asc",
      ...filters,
    };
    hookFetchLeaders(params);
  }, [paginationModel, sortModel, search, filters, hookFetchLeaders]);

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
            fetchLeaders();
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

  const selectedLeaders = leaders.filter(leader => selectedRows.includes(leader.id));

  useEffect(() => {
    fetchLeaders();
  }, [paginationModel.page, paginationModel.pageSize, search, filters, sortModel]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  useEffect(() => {
    // Provide global functions for column actions
    (window as any).handleEditLeader = (leader: Leader) => {
      setSelectedLeader(leader);
      setModalMode("edit");
      setModalOpen(true);
    };
    
    (window as any).refreshLeaders = fetchLeaders;
    
    return () => {
      delete (window as any).handleEditLeader;
      delete (window as any).refreshLeaders;
    };
  }, [fetchLeaders]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Village Leaders Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive leadership management system</p>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaders" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Leaders
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaders" className="space-y-6">
          <LeaderStats stats={stats} loading={loading} />

          <LeaderFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <BulkOperations
            selectedLeaders={selectedLeaders}
            onClearSelection={() => setSelectedRows([])}
            onUpdate={fetchLeaders}
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
            rowSelectionModel={selectedRows}
            onRowSelectionModelChange={setSelectedRows}
            checkboxSelection
            pageSizeOptions={[5, 10, 25, 50, 100]}
            emptyMessage="No leaders found"
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leaders by Province</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(stats.byProvince).map(([province, count]) => (
                    <div key={province} className="flex justify-between items-center">
                      <span className="text-sm">{province}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leaders by District</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {Object.entries(stats.byDistrict).map(([district, count]) => (
                    <div key={district} className="flex justify-between items-center">
                      <span className="text-sm">{district}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Villages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {Object.entries(stats.byVillage)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([village, count]) => (
                    <div key={village} className="flex justify-between items-center">
                      <span className="text-sm">{village}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="filters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Filtering Options</CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <LeaderDetailModal
        leader={selectedLeader}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={fetchLeaders}
        mode={modalMode}
      />
    </div>
  );
}
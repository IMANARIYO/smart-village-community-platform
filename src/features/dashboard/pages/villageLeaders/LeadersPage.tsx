import { useState, useEffect, useCallback } from "react";
import { DataTable } from "../../../../components/TableComponents/data-table";
import LeaderService from "./LeaderService";
import type { GetLeadersParams, LeaderListItem } from "./leaderTypes";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { leaderColumns } from "./components/leadersColumns";
import { LeaderFilters } from "./components/LeaderFilters";
import { Button } from "../../../../components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { PromoteLeaderDialog } from "./components/PromoteLeaderDialog";

import { EditLeaderDialog } from "./components/EditLeaderDialog";
import { DeleteLeaderDialog } from "./components/DeleteLeaderDialog";

function LeadersPage() {
  const [leaders, setLeaders] = useState<LeaderListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<GetLeadersParams>({});
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedLeader] = useState<LeaderListItem | null>(null);
  const fetchLeaders = useCallback(async () => {
    setLoading(true);
    try {
      const params: GetLeadersParams = {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        sortBy: sortModel[0]?.field,
        sortOrder: sortModel[0]?.sort || "asc",
        search: search || undefined,
        ...filters,
      };
      const response = await LeaderService.getLeaders(params);
      setLeaders(response.data || []);
      setTotalRows(response.meta?.total || 0);
    } catch (error) {
      console.error("Failed to fetch leaders:", error);
      toast.error("Failed to fetch leaders");
    } finally {
      setLoading(false);
    }
  }, [paginationModel, sortModel, search, filters]);






  const handleExport = async () => {
    try {
      const blob = await LeaderService.exportLeaders({ ...filters, search });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leaders-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Leaders exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export leaders");
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await LeaderService.importLeaders(file);
      toast.success("Leaders imported successfully");
      fetchLeaders();
    } catch (error) {
      console.error("Import failed:", error);
      toast.error("Failed to import leaders");
    }
    event.target.value = '';
  };

  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const trigger = urlParams.get('leaderTrigger');
    if (trigger) {
      fetchLeaders();
      urlParams.delete('leaderTrigger');
      const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [fetchLeaders]);

  return (
    <div className="space-y-6">
      <LeaderFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      <DataTable<LeaderListItem & { id: string }>
        title="Village Leaders"
        description="Manage village leaders and their information"
        columns={leaderColumns}
        data={leaders.map((leader) => ({
          ...leader,
          id: leader.user_id!,
        }))}
        loading={loading}
        totalRows={totalRows}
        paginationModel={paginationModel}
        sortModel={sortModel}
        search={search}
        onPaginationChange={setPaginationModel}
        onSortModelChange={setSortModel}
        onSearchChange={setSearch}
        searchPlaceholder="Search leaders..."
        hideSearch={true}
        onRowClick={() => {}}
        additionHeaderContent={
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={() => document.getElementById('import-file')?.click()}
              variant="outline"
              size="sm"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <input
              id="import-file"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleImport}
              className="hidden"
            />

            <PromoteLeaderDialog
              trigger={
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Leader
                </Button>
              }

            />
          </div>
        }
      />

      {selectedLeader && (
        <>
          <EditLeaderDialog
            leader={selectedLeader}
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            onSuccess={() => {
              setShowEdit(false);
              fetchLeaders();
            }}
          />

          <DeleteLeaderDialog
            leader={selectedLeader}
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            onSuccess={() => {
              setShowDelete(false);
              fetchLeaders();
            }}
          />
        </>
      )}
    </div>
  );
}
export default LeadersPage

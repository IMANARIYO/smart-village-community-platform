"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/TableComponents/data-table";
import { LeaderFilters } from "./components/LeaderFilters";
import { leaderColumns } from "./leadersColumns";
import type { Leader, GetLeadersApiResponse } from "./leaderTypes";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { GetLeadersParams } from "./LeaderService";
import LeaderService from "./LeaderService";

interface LeadersTableProps {
  onRowClick?: (leader: Leader) => void;
  filters?: Record<string, unknown>;
  onFiltersChange?: (filters: Record<string, unknown>) => void;
  showFilters?: boolean;
}

export function LeadersTable({ 
  onRowClick, 
  filters = {}, 
  onFiltersChange,
  showFilters = true 
}: LeadersTableProps) {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10,
    });
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [search, setSearch] = useState("");
    const [localFilters, setLocalFilters] = useState<Record<string, unknown>>(filters);

    const fetchLeaders = useCallback(async () => {
        try {
            setLoading(true);

            const params: GetLeadersParams = {
                page: paginationModel.page + 1,
                limit: paginationModel.pageSize,
                search,
                sortBy: sortModel[0]?.field,
                sortOrder: sortModel[0]?.sort ?? "asc",
                ...localFilters,
            };

            const response: GetLeadersApiResponse = await LeaderService.getLeaders(params);
            
            if (response.success) {
                const leadersWithId = response.data.map((leader) => ({
                    ...leader,
                    id: leader.user_id,
                }));
                setLeaders(leadersWithId);
                setTotalRows(response.meta.total);
            } else {
                toast.error(response.message || "Failed to fetch leaders");
                setLeaders([]);
                setTotalRows(0);
            }
        } catch (error) {
            console.error("Failed to fetch leaders:", error);
            toast.error("Failed to fetch leaders");
        } finally {
            setLoading(false);
        }
    }, [paginationModel, sortModel, search, localFilters]);

    const handleFiltersChange = (newFilters: Record<string, unknown>) => {
        setLocalFilters(newFilters);
        onFiltersChange?.(newFilters);
        setPaginationModel(prev => ({ ...prev, page: 0 }));
    };

    const handleRowClick = (leader: Leader & { id: string }) => {
        onRowClick?.(leader);
    };

    useEffect(() => {
        fetchLeaders();
        
        // Provide global refresh function for column actions
        (window as any).refreshLeaders = fetchLeaders;
        
        return () => {
            delete (window as any).refreshLeaders;
        };
    }, [fetchLeaders]);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    return (
        <div className="space-y-4">
            {showFilters && (
                <LeaderFilters
                    filters={localFilters}
                    onFiltersChange={handleFiltersChange}
                />
            )}
            
            <DataTable<Leader & { id: string }>
                title="Village Leaders"
                description="Manage all registered village leaders"
                columns={leaderColumns}
                data={leaders}
                loading={loading}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                totalRows={totalRows}
                paginationModel={paginationModel}
                onPaginationChange={setPaginationModel}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
                search={search}
                onSearchChange={setSearch}
                onRowClick={handleRowClick}
                emptyMessage="No leaders found"
            />
        </div>
    );
}

export default LeadersTable;

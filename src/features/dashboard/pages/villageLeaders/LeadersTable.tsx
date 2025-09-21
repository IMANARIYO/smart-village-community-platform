"use client";

import { useEffect, useState, useCallback } from "react";

import { DataTable } from "@/components/TableComponents/data-table";
import { leaderColumns } from "./leadersColumns";
import type { Leader } from "./leaderTypes";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { GetLeadersParams } from "./LeaderService";
import LeaderService from "./LeaderService";


export default function LeadersPage() {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState(false);

    // total rows for pagination
    const [totalRows, setTotalRows] = useState(0);

    // pagination state
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0, // MUI is 0-based
        pageSize: 10,
    });

    // sorting
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    // search string
    const [search, setSearch] = useState("");

    const fetchLeaders = useCallback(async () => {
        try {
            setLoading(true);

            const params: GetLeadersParams = {
                page: paginationModel.page + 1, // API is 1-based
                limit: paginationModel.pageSize,
                search,
                sortBy: sortModel[0]?.field,
                sortOrder: sortModel[0]?.sort ?? "asc",
            };

            const res = await LeaderService.getLeaders(params);

            setLeaders(
                res.data.map((leader) => ({
                    ...leader,
                    id: leader.user_id, // ✅ DataGrid requires "id"
                }))
            );

            setTotalRows(res.meta.total);
        } catch (error) {
            console.error("Failed to fetch leaders:", error);
        } finally {
            setLoading(false);
        }
    }, [paginationModel, sortModel, search]);

    useEffect(() => {
        fetchLeaders();
    }, [fetchLeaders]);

    return (<>

        <DataTable<Leader & { id: string }>
            title="Village Leaders"
            description="Manage all registered village leaders"
            columns={leaderColumns}
            data={leaders.map((leader) => ({ ...leader, id: leader.user_id }))}
            loading={loading}
            pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 10, 25, 50, 100]}
            totalRows={totalRows}
            paginationModel={paginationModel}
            onPaginationChange={setPaginationModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            search={search}
            onSearchChange={setSearch}
            emptyMessage="No leaders found"
        />

    </>

    );
}

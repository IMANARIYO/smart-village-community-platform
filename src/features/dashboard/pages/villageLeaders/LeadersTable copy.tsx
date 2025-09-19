"use client";

import { useEffect, useState, useCallback } from "react";
import LeaderService from "./LeaderService";
import { DataTable } from "@/components/data-table";
import { leaderColumns } from "./leadersColumns";
import type { Leader } from "./leaderTypes";
import { useLocationSelector } from "@/features/homePages/hooks/useLocationSelector";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function LeadersPage() {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });
    const [totalRows, setTotalRows] = useState(0);

    const {
        province, district, sector, cell, village, provinces, districts, cells, sectors, villages,
        setProvince, setDistrict, setSector, setCell, setVillage
    } = useLocationSelector();

    const fetchLeaders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await LeaderService.getLeaders({
                province,
                district,
                sector,
                cell,
                village_id: village?.village_id,
                search,
                limit: pagination.pageSize,
                page: pagination.page + 1,
            });

            setLeaders(res.data || []);
            setTotalRows(res.meta?.total || res.data.length || 0);



            const apiPage = (res.meta?.page || 1) - 1;
            if (apiPage !== pagination.page) {
                setPagination((p) => ({ ...p, page: apiPage }));
            }

        } catch (error) {
            console.error("Failed to fetch leaders", error);
        } finally {
            setLoading(false);
        }
    }, [province, district, sector, cell, village, search, pagination.page, pagination.pageSize]);


    useEffect(() => {
        fetchLeaders();
    }, [fetchLeaders]);

    return (
        <div className="space-y-4 mt-40">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Select Location</Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 space-y-2">
                    <select value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option value="">Select Province</option>
                        {provinces.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    <select value={sector} onChange={(e) => setSector(e.target.value)}>
                        <option value="">Select Sector</option>
                        {sectors.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select value={cell} onChange={(e) => setCell(e.target.value)}>
                        <option value="">Select Cell</option>
                        {cells.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <select
                        value={village?.village_id || ""}
                        onChange={(e) =>
                            setVillage({
                                village_id: e.target.value,
                                village: villages.find((v) => v.village_id === e.target.value)?.village || "",
                            })
                        }
                    >
                        <option value="">Select Village</option>
                        {villages.map((v) => (
                            <option key={v.village_id} value={v.village_id}>
                                {v.village}
                            </option>
                        ))}
                    </select>
                </PopoverContent>
            </Popover>

            <DataTable<Leader & { id: string }>
                title="Village Leaders"
                description="Manage village leaders and their assigned locations"
                columns={leaderColumns}
                data={leaders.map((leader) => ({ ...leader, id: leader.user_id }))}
                loading={loading}
                totalRows={totalRows}
                pageSizeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 10, 25, 50, 100]}
                search={search}
                onSearchChange={(value) => setSearch(value)}
                paginationModel={pagination}
                onPaginationChange={setPagination}

            />
        </div>
    );
}

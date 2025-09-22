"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-react";
import { useLocationSelector } from "@/features/homePages/hooks/useLocationSelector";
import { EventStatus, EventCategory, type GetEventsOptions } from "../types";

interface EventFiltersProps {
  onFilterChange: (filters: GetEventsOptions) => void;
  currentFilters: GetEventsOptions;
}

export function EventFilters({ onFilterChange, currentFilters }: EventFiltersProps) {
  const [open, setOpen] = useState(false);

  const {
    province, setProvince,
    district, setDistrict,
    sector, setSector,
    cell, setCell,
    village, setVillage,
    provinces, districts, sectors, cells, villages
  } = useLocationSelector();

  const [localFilters, setLocalFilters] = useState<GetEventsOptions>({ ...currentFilters });

  const handleApplyFilters = () => {
    // Only include filters that are not null/undefined
    const filters: GetEventsOptions = {
      ...localFilters,
      village_id: village?.village_id ?? undefined,
      status: localFilters.status ?? undefined,
      category: localFilters.category ?? undefined,
      date: localFilters.date ?? undefined,
    };

    onFilterChange(filters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    setProvince("");
    setDistrict("");
    setSector("");
    setCell("");
    setVillage(null);
    onFilterChange({});
    setOpen(false);
  };

  const hasActiveFilters = Object.keys(currentFilters).length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={hasActiveFilters ? "default" : "outline"} size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-white text-primary rounded-full px-2 py-0.5 text-xs">
              {Object.keys(currentFilters).length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Filter Events</h4>
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select
                value={localFilters.status ?? "all"}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, status: value === "all" ? undefined : value as EventStatus }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(EventStatus).map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select
                value={localFilters.category ?? "all"}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, category: value === "all" ? undefined : value as EventCategory }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.values(EventCategory).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={localFilters.date ?? ""}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, date: e.target.value || undefined }))}
              />
            </div>

            {/* Location filters */}
            <div>
              <Label>Province</Label>
              <Select value={province || "all"} onValueChange={(value) => setProvince(value === "all" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Provinces</SelectItem>
                  {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {province && (
              <div>
                <Label>District</Label>
                <Select value={district || "all"} onValueChange={(value) => setDistrict(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {district && (
              <div>
                <Label>Sector</Label>
                <Select value={sector || "all"} onValueChange={(value) => setSector(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    {sectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {sector && (
              <div>
                <Label>Cell</Label>
                <Select value={cell || "all"} onValueChange={(value) => setCell(value === "all" ? "" : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cell" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cells</SelectItem>
                    {cells.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {cell && (
              <div>
                <Label>Village</Label>
                <Select value={village?.village_id ?? "all"} onValueChange={(value) => {
                  if (value === "all") {
                    setVillage(null);
                  } else {
                    const selected = villages.find(v => v.village_id === value);
                    setVillage(selected ?? null);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select village" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Villages</SelectItem>
                    {villages.map(v => (
                      <SelectItem key={v.village_id} value={v.village_id}>{v.village}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleApplyFilters} className="flex-1">Apply Filters</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

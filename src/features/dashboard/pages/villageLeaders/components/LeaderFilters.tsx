"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter, Search } from "lucide-react";
import { useLocationSelector } from "../../../../homePages/hooks/useLocationSelector";
import type { GetLeadersParams } from "../leaderTypes";

interface LeaderFiltersProps {
  filters: GetLeadersParams;
  onFiltersChange: (filters: GetLeadersParams) => void;
}

export function LeaderFilters({ filters, onFiltersChange }: LeaderFiltersProps) {
  const [search, setSearch] = useState((filters.search as string) || "");
  const [isActive, setIsActive] = useState(filters.is_active as string | undefined);
  const [showFilters, setShowFilters] = useState(false);

  const {
    province, setProvince,
    district, setDistrict,
    sector, setSector,
    cell, setCell,
    village, setVillage,
    provinces, districts, sectors, cells, villages
  } = useLocationSelector();

  useEffect(() => {
    const newFilters: GetLeadersParams = {};
    
    if (search.trim()) newFilters.search = search.trim();
    if (province) newFilters.province = province;
    if (district) newFilters.district = district;
    if (sector) newFilters.sector = sector;
    if (cell) newFilters.cell = cell;
    if (village) newFilters.village_id = village.village_id;
    if (isActive !== undefined) newFilters.is_active = isActive === "true";

    onFiltersChange(newFilters);
  }, [search, province, district, sector, cell, village, isActive, onFiltersChange]);

  const clearFilters = () => {
    setSearch("");
    setProvince("");
    setDistrict("");
    setSector("");
    setCell("");
    setVillage(null);
    setIsActive(undefined);
  };

  const activeFiltersCount = Object.keys(filters || {}).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search leaders by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} size="sm">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={isActive} onValueChange={setIsActive}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((prov) => (
                      <SelectItem key={prov} value={prov}>
                        {prov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {province && (
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {district && (
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sect) => (
                        <SelectItem key={sect} value={sect}>
                          {sect}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {sector && (
                <div className="space-y-2">
                  <Label htmlFor="cell">Cell</Label>
                  <Select value={cell} onValueChange={setCell}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cell" />
                    </SelectTrigger>
                    <SelectContent>
                      {cells.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {cell && (
                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Select 
                    value={village?.village_id || ""} 
                    onValueChange={(value) => {
                      const selectedVillage = villages.find(v => v.village_id === value);
                      setVillage(selectedVillage || null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select village" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((v) => (
                        <SelectItem key={v.village_id} value={v.village_id}>
                          {v.village}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {search && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {search}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setSearch("")}
                      />
                    </Badge>
                  )}
                  {isActive !== undefined && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Status: {isActive === "true" ? "Active" : "Inactive"}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setIsActive(undefined)}
                      />
                    </Badge>
                  )}
                  {province && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Province: {province}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setProvince("")}
                      />
                    </Badge>
                  )}
                  {district && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      District: {district}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setDistrict("")}
                      />
                    </Badge>
                  )}
                  {sector && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Sector: {sector}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setSector("")}
                      />
                    </Badge>
                  )}
                  {cell && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Cell: {cell}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setCell("")}
                      />
                    </Badge>
                  )}
                  {village && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Village: {village.village}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => setVillage(null)}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
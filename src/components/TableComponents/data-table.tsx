
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  type GridFilterModel,
  type GridFilterItem,
  type GridRowId,
} from "@mui/x-data-grid";
import { Search } from "lucide-react";
import { Pagination, CircularProgress } from "@mui/material";
import { useState, useEffect, useMemo, useLayoutEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { debounce } from "../../utils/utils";


export interface DataTableProps<T> {
  title?: string | React.ReactNode;
  description?: string;
  columns?: GridColDef[];
  data?: T[];
  loading?: boolean;
  totalRows?: number;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filters?: Record<string, unknown>;
  search?: string;
  onPaginationChange?: (model: GridPaginationModel) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  onSearchChange?: (search: string) => void;
  onRowClick?: (row: T) => void;
  additionHeaderContent?: React.ReactNode;
  customFilters?: React.ReactNode;
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  emptyMessage?: React.ReactNode;
  hideSearch?: boolean;
  hidePagination?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  autoHeight?: boolean;
  toolbar?: React.ReactNode;
  actions?: React.ReactNode;

  activeColumn?: string;
  onColumnClick?: (field: string) => void;
}
export interface DataTableProps<T> {
  title?: string | React.ReactNode;
  description?: string;
  columns?: GridColDef[];
  data?: T[];
  loading?: boolean;
  totalRows?: number;
  paginationModel?: GridPaginationModel;
  sortModel?: GridSortModel;
  filters?: Record<string, unknown>;
  search?: string;
  onPaginationChange?: (model: GridPaginationModel) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  onSearchChange?: (search: string) => void;
  onRowClick?: (row: T) => void;
  additionHeaderContent?: React.ReactNode;
  customFilters?: React.ReactNode;
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  emptyMessage?: React.ReactNode;
  hideSearch?: boolean;
  hidePagination?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  autoHeight?: boolean;
  toolbar?: React.ReactNode;
  actions?: React.ReactNode;
  // New props for active column
  activeColumn?: string;
  onColumnClick?: (field: string) => void;
}

export function DataTable<T extends { id: GridRowId }>({
  title = "Data Table",
  description,
  columns = [],
  data = [],
  loading = false,
  totalRows = 0,
  paginationModel = { page: 0, pageSize: 10 },
  sortModel = [],
  filters = {},
  search = "",
  onPaginationChange = () => { },
  onSortModelChange = () => { },
  onFilterChange = () => { },
  onSearchChange = () => { },
  onRowClick = () => { },
  additionHeaderContent,
  customFilters,
  searchPlaceholder = "Search...",
  pageSizeOptions = [10, 25, 50, 100],
  emptyMessage = "No data available",
  hideSearch = false,
  hidePagination = false,
  rowHeight = 52,
  headerHeight = 56,
  autoHeight = false,
  toolbar,
  actions,
  // New props for active column
  activeColumn = "",

}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState(search);
  const [activeRowId, setActiveRowId] = useState<GridRowId | null>(null);
  const [localActiveColumn, setLocalActiveColumn] = useState(activeColumn);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    setLocalActiveColumn(activeColumn);
  }, [activeColumn]);

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearchChange(value);
        onPaginationChange({ ...paginationModel, page: 0 });
      }, 500),
    [onSearchChange, onPaginationChange, paginationModel]
  );

  const handleFilterChange = (filterModel: GridFilterModel) => {
    const newFilters: Record<string, unknown> = {};
    filterModel.items.forEach((item: GridFilterItem) => {
      const { field, value } = item;
      if (value) newFilters[field] = value;
    });
    onFilterChange(newFilters);
    onPaginationChange({ ...paginationModel, page: 0 });
  };

  const filterModel: GridFilterModel = {
    items: Object.entries(filters).map(([field, value]) => ({
      id: `${field}-${value}`,
      field,
      operator: "equals",
      value,
    })),
    quickFilterValues: [],
  };

  const currentStart = paginationModel.page * paginationModel.pageSize + 1;
  const currentEnd = Math.min(
    (paginationModel.page + 1) * paginationModel.pageSize,
    totalRows
  );
  const totalPages = Math.ceil(totalRows / paginationModel.pageSize);
  function useViewportHeightPx(offset = 0, min = 320) {
    const [h, setH] = useState<number>(min); // SSR-safe initial
    useLayoutEffect(() => {
      const calc = () => setH(Math.max(min, window.innerHeight - offset));
      calc();
      window.addEventListener("resize", calc);
      return () => window.removeEventListener("resize", calc);
    }, [offset, min]);
    return h;
  }
  const OFFSET = 20;
  const tableHeight = useViewportHeightPx(OFFSET);


  // Enhance columns with active styling
  const enhancedColumns = useMemo(() => {
    return columns.map(col => ({
      ...col,
      headerClassName: localActiveColumn === col.field ? 'active-column' : '',
    }));
  }, [columns, localActiveColumn]);
  /** Returns a px number for container height = full viewport minus offsets */

  return (
    <Card className="">
      {/* ✅ Header - Made sticky */}
      <CardHeader
        className="  border-b  top-0 z-10 bg-card"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight">
              {typeof title === "string" ? <span>{title}</span> : title}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4  w-full sm:w-auto">
            {customFilters}

            {!hideSearch && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2  h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="pl-8"
                />
              </div>
            )}

            {additionHeaderContent}
          </div>
        </div>

      </CardHeader>

      {/* ✅ Content */}
      <CardContent className="  flex-grow ">
        {toolbar && <div className=" ">{toolbar}</div>}

        {/* ✅ Optional Actions */}
        {actions && (
          <CardAction className="border-b flex justify-start">
            {actions}
          </CardAction>

        )}

        <div className="w-full" style={{ height: tableHeight }}>
          <DataGrid
            rows={data}
            columns={enhancedColumns}
            loading={loading}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationChange}
            sortModel={sortModel}
            onSortModelChange={onSortModelChange}
            filterModel={filterModel}
            onFilterModelChange={handleFilterChange}
            rowCount={totalRows}
            paginationMode="server"
            sortingMode="server"
            filterMode="server"
            pageSizeOptions={pageSizeOptions}
            disableRowSelectionOnClick
            hideFooter
            onRowClick={(params) => {
              setActiveRowId(params.id);
              onRowClick(params.row as T);
            }}
            // onColumnHeaderClick={(params) => {
            //   handleColumnClick(params.field);
            // }}
            getRowClassName={(params) =>
              params.id === activeRowId ? "active-row" : ""
            }
            rowHeight={rowHeight}
            columnHeaderHeight={headerHeight}
            autoHeight={autoHeight}
            sx={{
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid var(--border)",
                outline: "none !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "var(--muted)",
                borderRadius: "var(--radius)",
                fontWeight: 600,
                borderBottom: "4px solid var(--border)",
                position: "sticky",
                top: actions ? '146px' : '73px',
                zIndex: 1,
                background: "var(--card)",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "var(--muted)",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "var(--accent)",
                },
              },
              "& .MuiDataGrid-columnHeader.active-column": {
                backgroundColor: "var(--primary) !important",
                color: "var(--primary-foreground) !important",
                "& .MuiDataGrid-iconButtonContainer": {
                  color: "var(--primary-foreground) !important",
                },
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer",
                transition: "var(--transition-button)",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "var(--interactive-hover)",
                color: "var(--interactive-hover-foreground)",
              },
              "& .MuiDataGrid-row.active-row": {
                backgroundColor: "var(--interactive-hover) !important",
                color: "var(--interactive-selected-foreground)",
                fontWeight: 600,
                boxShadow: "inset 0 0 0 2px var(--primary)",
              },
              "& .MuiDataGrid-virtualScroller": {
                minHeight: "200px",
              },
            }}
            slots={{
              noRowsOverlay: () => (
                <div className="flex flex-col items-center justify-center h-full   text-center">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <div className="text-muted-foreground  ">
                        {emptyMessage}
                      </div>
                      {search && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setLocalSearch("");
                            onSearchChange("");
                          }}
                        >
                          Clear search
                        </Button>
                      )}
                    </>
                  )}
                </div>
              ),
            }}
          />
        </div>
      </CardContent>

      {/* ✅ Footer - Made sticky */}
      {!hidePagination && totalRows > 0 && (
        <CardFooter
          className=" sm:p-6 border-t flex flex-wrap items-center justify-between ga sticky bottom-0 z-10 bg-card"
        >
          <div className="flex items-center ga  min-w-[150px]">
            <label htmlFor="pageSize" className="text-sm whitespace-nowrap">
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={paginationModel.pageSize}
              onChange={(e) =>
                onPaginationChange({
                  ...paginationModel,
                  pageSize: Number(e.target.value),
                  page: 0,
                })
              }
              className="border rounded px-2 py-1 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-muted-foreground min-w-[180px] text-center sm:text-right">
            Showing {currentStart}–{currentEnd} of {totalRows}
          </div>

          <div className="w-full sm:w-auto">
            <Pagination
              count={totalPages}
              page={paginationModel.page + 1}
              onChange={(_, newPage) =>
                onPaginationChange({ ...paginationModel, page: newPage - 1 })
              }
              showFirstButton
              showLastButton
              color="primary"
              shape="rounded"
            />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
import { DataTable } from "@/components/TableComponents/data-table";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { TeamMember } from "../service";

interface Column {
  key: string;
  header: string;
  render: (member: TeamMember) => React.ReactNode;
}

interface TeamTableProps {
  data: TeamMember[];
  columns: Column[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  onPaginationChange: (page: number, limit: number) => void;
}

export function TeamTable({
  data,
  columns,
  loading,
  pagination,
  onPaginationChange,
}: TeamTableProps) {
  const tableColumns = columns.map(col => ({
    field: col.key,
    headerName: col.header,
    flex: 1,
    renderCell: (params: GridRenderCellParams<TeamMember>) => col.render(params.row),
  }));

  return (
    <DataTable
      title="Team Members"
      description="Manage your team members and their information"
      columns={tableColumns}
      data={data}
      loading={loading}
      paginationModel={{
        page: pagination.page - 1,
        pageSize: pagination.limit,
      }}
      totalRows={pagination.total}
      onPaginationChange={(model) => {
        onPaginationChange(model.page + 1, model.pageSize);
      }}
      searchPlaceholder="Search team members..."
    />
  );
}
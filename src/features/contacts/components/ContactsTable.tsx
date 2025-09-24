
import { DataTable } from "@/components/TableComponents/data-table";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { Contact } from "../service";

interface Column {
  key: string;
  header: string;
  render: (contact: Contact) => React.ReactNode;
}

interface ContactsTableProps {
  data: Contact[];
  columns: Column[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  onPaginationChange: (page: number, limit: number) => void;
}

export function ContactsTable({
  data,
  columns,
  loading,
  pagination,
  onPaginationChange,
}: ContactsTableProps) {
  const tableColumns = columns.map(col => ({
    field: col.key,
    headerName: col.header,
    flex: 1,
    renderCell: (params: GridRenderCellParams<Contact>) => col.render(params.row),
  }));

  return (
    <DataTable
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
    />
  );
}
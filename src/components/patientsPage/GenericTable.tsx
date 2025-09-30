import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GenericTableProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
  columns: {
    label: string;
    render: (item: T) => React.ReactNode;
  }[];
}

const GenericTable = <T,>({
  items,
  getKey,
  emptyMessage = "Sin datos.",
  className = "",
  columns,
}: GenericTableProps<T>) => {
  if (items.length === 0) {
    return <p className="text-center text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className={` bg-white ${className}`}>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-50">
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                className="px-5 py-3 text-left text-sm font-semibold text-sky-600"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={getKey(item, index)}
              className="border-b-0" // quita la línea dura de la tabla
            >
              <TableCell colSpan={columns.length} className="p-0">
                <div className="flex w-full items-center rounded-lg px-5                      transition-colors hover:bg-sky-100 ">
                  {columns.map((col, idx) => (
                    <div key={idx} className="flex-1 text-sm">
                      {col.render(item)}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenericTable;

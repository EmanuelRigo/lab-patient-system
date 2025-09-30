import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GenericListProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
  columns: {
    label: string;
    render: (item: T) => React.ReactNode;
  }[];
}

const GenericList = <T,>({
  items,
  getKey,
  emptyMessage = "Sin datos.",
  className = "",
  columns,
}: GenericListProps<T>) => {
  if (items.length === 0) {
    return <p className="text-center text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={getKey(item, index)}>
            {columns.map((col, idx) => (
              <TableCell key={idx}>{col.render(item)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GenericList;

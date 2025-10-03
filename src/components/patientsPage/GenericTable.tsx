import React from "react";

type Column<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
};

type GenericTableProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  columns: Column<T>[];
  emptyMessage?: string;
  className?: string;
};

const GenericTable = <T,>({
  items,
  getKey,
  columns,
  emptyMessage = "No hay datos.",
  className = "",
}: GenericTableProps<T>) => {
  return (
    <table className={`w-full ${className}`}>
      <thead className="sticky top-0 bg-neutral-100 z-10">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              className="text-left px-4 py-2 border-b font-semibold"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="px-4 py-2 text-center text-gray-500"
            >
              {emptyMessage}
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={getKey(item)} className="transition hover:bg-sky-200/90">
              {columns.map((col, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === columns.length - 1;
                return (
                  <td
                    key={idx}
                    className={`px-4 py-2 ${isFirst ? "rounded-l-lg" : ""} ${
                      isLast ? "rounded-r-lg" : ""
                    }`}
                  >
                    <div className="flex items-center">{col.render(item)}</div>
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default GenericTable;

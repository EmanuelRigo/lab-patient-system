import React from "react";

interface GenericListProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
  Card: (props: { data: T }) => React.ReactNode;
}

const GenericList = <T,>({
  items,
  getKey,
  emptyMessage = "Sin datos.",
  className = "",
  Card,
}: GenericListProps<T>) => {
  if (items.length === 0) {
    return <p className="text-center text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item, index) => (
        <div key={getKey(item, index)}>{Card({ data: item })}</div>
      ))}
    </div>
  );
};

export default GenericList;

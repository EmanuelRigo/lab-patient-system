"use client";
import React, { useEffect, useState } from "react";

interface DataProviderProps<T> {
  fetchFn: () => Promise<T[]>;
  children: (data: T[]) => React.ReactNode;
}

function DataProvider<T>({ fetchFn, children }: DataProviderProps<T>) {
  console.log("🚀 ~ DataProvider ~ fetchFn:", fetchFn);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFn]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar datos.</p>;

  return <>{children(data)}</>;
}

export default DataProvider;

import React, { useState, useEffect } from "react";

type SearchInputProps<T> = {
  onSearch: (query: string) => Promise<T[]>;
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  placeholder?: string;
};

function GenericSearchInput<T>({
  onSearch,
  onSelect,
  renderItem,
  placeholder = "Buscar...",
}: SearchInputProps<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      onSearch(query)
        .then((data) => setResults(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      {loading && <p className="text-sm text-gray-500">Buscando...</p>}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
          {results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSelect(item);
                setQuery(""); // opcional
                setResults([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GenericSearchInput;

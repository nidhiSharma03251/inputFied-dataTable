import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: "single" | "multiple"; 
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (row: T) => {
    let updatedSelection: T[] = [];
    if (selectable === "single") {
      updatedSelection = [row];
    } else if (selectable === "multiple") {
      updatedSelection = selectedRows.includes(row)
        ? selectedRows.filter((r) => r !== row)
        : [...selectedRows, row];
    }
    setSelectedRows(updatedSelection);
    onRowSelect?.(updatedSelection);
  };

  
  if (loading) {
    return <div className="p-4 text-center text-blue-500">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="p-4 text-center text-gray-500">No data available</div>;
  }

  return (
    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => col.sortable && handleSort(col.dataIndex)}
              className={`p-2 text-left ${
                col.sortable ? "cursor-pointer hover:underline" : ""
              }`}
            >
              {col.title}
              {sortConfig?.key === col.dataIndex &&
                (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} className="border-t hover:bg-gray-50">
            {selectable && (
              <td className="p-2">
                <input
                  type={selectable === "single" ? "radio" : "checkbox"}
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="p-2">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

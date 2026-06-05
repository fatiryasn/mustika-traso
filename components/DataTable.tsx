"use client";

import { ReactNode } from "react";
import Pagination from "./Pagination";

export interface Column<T = any> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
  hidden?: "sm" | "md" | "lg" | boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    limit: number;
    onLimitChange: (limit: number) => void;
    limitOptions?: number[];
  };
}

function getHiddenClass(hidden?: string | boolean): string {
  if (!hidden) return "";
  if (hidden === "sm") return "hidden sm:table-cell";
  if (hidden === "md") return "hidden md:table-cell";
  if (hidden === "lg") return "hidden lg:table-cell";
  if (hidden === true) return "hidden";
  return "";
}

export default function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  loading = false,
  emptyMessage = "Tidak ada data ditemukan.",
  onRowClick,
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy/80 text-gray-50 font-inter text-sm uppercase tracking-wider">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left font-grotesk py-3 px-4 ${getHiddenClass(col.hidden)}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-darkslate/80 font-inter"
                >
                  Memuat data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-darkslate/80 font-inter"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id ?? index}
                  onClick={() => onRowClick?.(item)}
                  className={`hover:bg-gray-50 ${onRowClick ? "cursor-pointer" : ""} transition-colors`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3 px-4 text-darkslate font-inter ${getHiddenClass(col.hidden)} ${col.className || ""}`}
                    >
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          totalItems={pagination.totalItems}
          limit={pagination.limit}
          onLimitChange={pagination.onLimitChange}
          limitOptions={pagination.limitOptions}
        />
      )}
    </div>
  );
}

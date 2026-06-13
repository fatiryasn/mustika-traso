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
    <div className="w-full max-w-full min-w-0 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden">
        <table className="w-full min-w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-navy/80 text-gray-50 font-inter text-xs md:text-sm uppercase tracking-wider">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left font-grotesk py-3 px-4 whitespace-nowrap ${getHiddenClass(
                    col.hidden,
                  )}`}
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
                  className="py-12 text-center text-darkslate/80 font-inter whitespace-nowrap"
                >
                  Memuat data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-darkslate/80 font-inter whitespace-nowrap"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id ?? index}
                  onClick={() => onRowClick?.(item)}
                  className={`transition-colors ${
                    onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3 px-3 md:px-5 text-darkslate font-inter ${getHiddenClass(
                        col.hidden,
                      )} ${col.className || ""}`}
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

"use client";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  limitOptions?: number[];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  limit,
  onLimitChange,
  limitOptions = [15, 30, 50],
}: PaginationProps) {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-navy/10">
      {/* Limit selector */}
      <div className="flex items-center gap-2 text-sm text-darkslate font-grotesk">
        <span>Tampilkan</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border border-gray-400 rounded-sm py-1 pl-2 pr-7 text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none bg-white font-jetbrains"
        >
          {limitOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span>dari {totalItems} data</span>
      </div>

      {/* Page navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors"
          >
            <HiOutlineChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 text-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors font-jetbrains ${
                    pageNum === currentPage
                      ? "bg-navy text-white font-medium"
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors"
          >
            <HiOutlineChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

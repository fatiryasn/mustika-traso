// components/ProdukPagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface ProdukPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export default function PublicProductPagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
}: ProdukPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/produk?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1"); // reset to first page
    router.push(`/produk?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
      limit={limit}
      onLimitChange={handleLimitChange}
      limitOptions={[30]} // locked to 30
    />
  );
}

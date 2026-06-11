// components/ArtikelPagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface ArtikelPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const LIMIT = 30;

export default function PublicArticlePagination({
  currentPage,
  totalPages,
  totalItems,
}: ArtikelPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/artikel?${params.toString()}`);
  };


  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
      limit={LIMIT}
      variant="public"
    />
  );
}

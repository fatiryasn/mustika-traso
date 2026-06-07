"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface ProyekPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

const LIMIT = 30;

export default function PublicProjectPagination({
  currentPage,
  totalPages,
  totalItems,
}: ProyekPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/proyek?${params.toString()}`);
  };

  const handleLimitChange = (newLimit: number) => {
    // limit is fixed, but we still need the callback for the Pagination component
    // No-op, as limit is not allowed to change
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
      limit={LIMIT}
      onLimitChange={handleLimitChange}
      limitOptions={[LIMIT]}
    />
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

interface ProyekPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}


export default function PublicProjectPagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
}: ProyekPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/proyek?${params.toString()}`);
  };


  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
      limit={limit}
      variant="public"
    />
  );
}

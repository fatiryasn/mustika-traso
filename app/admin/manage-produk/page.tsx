"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineSortDescending,
} from "react-icons/hi";
import DataTable, { type Column } from "@/components/DataTable";
import { getProducts } from "@/lib/product/product";
import { Product } from "@/types/Product";
import { formatDate } from "@/lib/utils/format";

interface SortConfig {
  column: string;
  ascending: boolean;
}

export default function AdminManageProductsPage() {
  const router = useRouter();

  //STATES
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({
    column: "created_at",
    ascending: false,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  //FETCH PRODUCTS
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProducts({ search, sort, page, limit });
      setProducts(result.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, sort, page, limit]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  //HANDLERS
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleSortChange = (column: string, ascending: boolean) => {
    setSort({ column, ascending });
    setPage(1);
  };
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  //COLUMNS
  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "Nama",
      render: (product) => (
        <span className="font-semibold font-inter text-darkblue">
          {product.name}
        </span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      hidden: "md",
      render: (product) => (
        <span className="text-gray-500">{product.slug}</span>
      ),
    },
    {
      key: "description",
      header: "Deskripsi",
      hidden: "lg",
      render: (product) => (
        <span className="max-w-[200px] truncate block">
          {product.description || "-"}
        </span>
      ),
      className: "max-w-[200px] truncate",
    },
    {
      key: "thumbnail",
      header: "Thumbnail",
      render: (product) => (
        <div>
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-20 h-20 rounded-sm object-cover border border-gray-200"
            />
          ) : (
            <span>-</span>
          )}
        </div>
      ),
      className: "text-center",
    },
    {
      key: "sub_products",
      header: "Sub Produk",
      render: (product) => <span>{product.sub_products?.[0]?.count || 0}</span>,
      className: "text-center",
    },
    {
      key: "created_at",
      header: "Tanggal Dibuat",
      hidden: "sm",
      render: (product) => (
        <span className="">{formatDate(product.created_at)}</span>
      ),
    },
  ];

  //SORT
  const sortOptions = [
    { value: "newest", column: "created_at", ascending: false },
    { value: "oldest", column: "created_at", ascending: true },
    { value: "az", column: "name", ascending: true },
    { value: "za", column: "name", ascending: false },
  ];

  const currentSortValue =
    sortOptions.find(
      (opt) => opt.column === sort.column && opt.ascending === sort.ascending,
    )?.value || "newest";

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-800">
            Manajemen Produk
          </h1>
          <p className="text-darkslate/80 font-inter text-sm mt-1">
            Kelola katalog produk beton pracetak
          </p>
        </div>
        <Link
          href="/admin/manage-produk/tambah"
          className="inline-flex items-center gap-2 bg-navy hover:bg-steelblue text-white px-4 py-2.5 rounded-xl text-sm font-jetbrains font-medium transition-colors self-start"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Tambah Produk
        </Link>
      </div>

      {/* SEARCH & SORT */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-darkslate/90 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari produk (nama/slug)..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-jetbrains transition-all bg-white"
          />
        </div>
        <div className="relative min-w-[180px]">
          <HiOutlineSortDescending className="absolute left-3 top-1/2 -translate-y-1/2 text-darkslate/90 w-5 h-5" />
          <select
            value={currentSortValue}
            onChange={(e) => {
              const opt = sortOptions.find((o) => o.value === e.target.value);
              if (opt) handleSortChange(opt.column, opt.ascending);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-jetbrains bg-white appearance-none cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        emptyMessage="Tidak ada produk ditemukan."
        onRowClick={(product) =>
          router.push(`/admin/manage-produk/${product.slug}`)
        }
        pagination={{
          currentPage: page,
          totalPages,
          onPageChange: setPage,
          totalItems: totalCount,
          limit,
          onLimitChange: handleLimitChange,
        }}
      />
    </div>
  );
}

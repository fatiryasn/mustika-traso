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
import { getArticles, type Article } from "@/lib/article/article";
import { formatDate } from "@/lib/utils/format";

interface SortConfig {
  column: string;
  ascending: boolean;
}

export default function AdminManageArticlesPage() {
  const router = useRouter();

  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({
    column: "created_at",
    ascending: false,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getArticles({ search, sort, page, limit });
      setArticles(result.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, [search, sort, page, limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handlers
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

  // Columns definition (mirroring product page pattern)
  const columns: Column<Article>[] = [
    {
      key: "title",
      header: "Judul",
      render: (article) => (
        <span className="font-semibold font-inter text-darkblue">
          {article.title}
        </span>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      hidden: "md",
      render: (article) => (
        <span className="text-gray-500">{article.slug}</span>
      ),
    },
    {
      key: "excerpt",
      header: "Kutipan",
      hidden: "lg",
      render: (article) => (
        <span className="max-w-[200px] truncate block">
          {article.excerpt || "-"}
        </span>
      ),
      className: "max-w-[200px] truncate",
    },
    {
      key: "thumbnail",
      header: "Thumbnail",
      render: (article) => (
        <div>
          {article.thumbnail ? (
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-20 h-20 rounded-sm object-cover border border-gray-200"
            />
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
      className: "text-center",
    },
    {
      key: "author",
      header: "Penulis",
      hidden: "sm",
      render: (article) => <span>{article.author || "-"}</span>,
    },
    {
      key: "created_at",
      header: "Tanggal Dibuat",
      hidden: "sm",
      render: (article) => <span>{formatDate(article.created_at)}</span>,
    },
  ];

  // Sort options mapping
  const sortOptions = [
    { value: "newest", column: "created_at", ascending: false },
    { value: "oldest", column: "created_at", ascending: true },
    { value: "az", column: "title", ascending: true },
    { value: "za", column: "title", ascending: false },
  ];

  const currentSortValue =
    sortOptions.find(
      (opt) => opt.column === sort.column && opt.ascending === sort.ascending,
    )?.value || "newest";

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-800">
            Manajemen Artikel
          </h1>
          <p className="text-darkslate/80 font-inter text-sm mt-1">
            Kelola artikel dan berita perusahaan
          </p>
        </div>
        <Link
          href="/admin/manage-artikel/tambah"
          className="inline-flex items-center gap-2 bg-navy hover:bg-steelblue text-white px-4 py-2.5 rounded-xl text-sm font-jetbrains font-medium transition-colors self-start"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Tambah Artikel
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-darkslate/90 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari artikel (judul/slug/penulis)..."
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

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={articles}
        loading={loading}
        emptyMessage="Tidak ada artikel ditemukan."
        onRowClick={(article) =>
          router.push(`/admin/manage-artikel/${article.slug}`)
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

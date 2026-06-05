// app/admin/manage-artikel/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineSortDescending,
} from "react-icons/hi";

// ----------------------------------------------------------------------
// Mock data – replace with real API calls
// ----------------------------------------------------------------------
const MOCK_ARTICLES = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  title: `Artikel ${i + 1}: Inovasi Beton Pracetak`,
  slug: `artikel-${i + 1}-inovasi-beton`,
  excerpt: `Ringkasan singkat artikel ${i + 1} yang membahas teknologi beton...`,
  author: "Admin Mustika",
  thumbnail: `https://picsum.photos/seed/article${i + 1}/80/80`,
  created_at: new Date(2025, 0, i + 1).toISOString(),
}));

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------
type SortOption = "newest" | "oldest" | "az" | "za";

// ----------------------------------------------------------------------
// Page Component
// ----------------------------------------------------------------------
export default function AdminManageArticlesPage() {
  const router = useRouter();

  // State
  const [articles] = useState(MOCK_ARTICLES); // in real app, fetch data
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  // Derived: filtered + sorted articles
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Search filter (case‑insensitive by title or slug)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) || a.slug.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title, "id"));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title, "id"));
        break;
    }

    return result;
  }, [articles, search, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / limit);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * limit,
    page * limit,
  );

  // Reset page when search/sort/limit changes
  useMemo(() => {
    if (page > totalPages) setPage(1);
  }, [filteredArticles.length, limit, page, totalPages]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption);
    setPage(1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleRowClick = (slug: string) => {
    router.push(`/admin/manage-artikel/${slug}`);
  };

  const handleEdit = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    router.push(`/admin/manage-artikel/${slug}/edit`);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm("Yakin ingin menghapus artikel ini?")) {
      // delete logic (API call)
      console.log("Delete article id:", id);
    }
  };

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
          className="inline-flex items-center gap-2 bg-navy hover:bg-steelblue text-white px-4 py-2.5 rounded-xl text-sm font-manrope font-medium transition-colors self-start"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Tambah Artikel
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari artikel (judul/slug)..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all"
          />
        </div>

        <div className="relative min-w-[180px]">
          <HiOutlineSortDescending className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={sort}
            onChange={handleSortChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter bg-white appearance-none cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 font-inter text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4">Judul</th>
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  Slug
                </th>
                <th className="text-left py-3 px-4 hidden lg:table-cell">
                  Kutipan
                </th>
                <th className="text-left py-3 px-4 hidden sm:table-cell">
                  Penulis
                </th>
                <th className="text-center py-3 px-4">Thumbnail</th>
                <th className="text-left py-3 px-4 hidden sm:table-cell">
                  Dibuat
                </th>
                <th className="text-right py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-400 font-manrope"
                  >
                    Tidak ada artikel ditemukan.
                  </td>
                </tr>
              ) : (
                paginatedArticles.map((article) => (
                  <tr
                    key={article.id}
                    onClick={() => handleRowClick(article.slug)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {article.title}
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">
                      {article.slug}
                    </td>
                    <td className="py-3 px-4 text-gray-500 max-w-[200px] truncate hidden lg:table-cell">
                      {article.excerpt}
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">
                      {article.author}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-10 h-10 rounded-lg object-cover mx-auto border border-gray-200"
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs hidden sm:table-cell">
                      {new Date(article.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => handleEdit(e, article.slug)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, article.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title="Hapus"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/admin/manage-artikel/${article.slug}`,
                            );
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                          title="Lihat"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Limit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-gray-50/50">
          {/* Limit selector */}
          <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
            <span>Tampilkan</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border border-gray-200 rounded-lg py-1 pl-2 pr-7 text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none bg-white"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
            <span>dari {filteredArticles.length} artikel</span>
          </div>

          {/* Page navigation */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors"
              >
                <HiOutlineChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1 text-sm font-manrope">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        pageNum === page
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
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition-colors"
              >
                <HiOutlineChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

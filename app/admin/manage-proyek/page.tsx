"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineSortDescending,
} from "react-icons/hi";
import { getProjects } from "@/lib/project/project";
import { formatDate } from "@/lib/utils/format";
import { Project } from "@/types/Project";
import DataTable, { type Column } from "@/components/DataTable";

interface SortConfig {
  column: string;
  ascending: boolean;
}

export default function AdminManageProjectsPage() {
  const router = useRouter();

  //STATES
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({
    column: "created_at",
    ascending: false,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  //FETCH PROJECTS
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProjects({ search, sort, page, limit });
      setProjects(result.data);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [search, sort, page, limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
  const columns: Column<Project>[] = [
    {
      key: "title",
      header: "Judul",
      className: "max-w-[200px] truncate",
      render: (project) => (
        <span className="font-semibold font-inter text-darkblue">
          {project.title}
        </span>
      ),
    },
    {
      key: "thumbnail",
      header: "Thumbnail",
      render: (project) => (
        <div>
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-36 h-24 rounded-sm object-cover border border-gray-200"
            />
          ) : (
            <span className="text-gray-400">-</span>
          )}
        </div>
      ),
      className: "text-center",
    },
    {
      key: "slug",
      header: "Slug",
      hidden: "lg",
      className: "max-w-[200px] truncate",
      render: (project) => (
        <span className="text-gray-500 max-w-[200px] truncate block">
          {project.slug}
        </span>
      ),
    },
    {
      key: "description",
      header: "Deskripsi",
      hidden: "md",
      className: "max-w-[300px] truncate",
      render: (project) => (
        <span className="max-w-[200px] truncate block">
          {project.description || "-"}
        </span>
      ),
    },
    {
      key: "client_name",
      header: "Klien",
      className: "max-w-[200px] truncate",
      render: (project) => (
        <span className="block truncate max-w-[200px]">
          {project.client_name || "-"}
        </span>
      ),
    },
    {
      key: "project_date",
      header: "Tanggal Proyek",
      render: (project) => (
        <span>
          {project.project_date ? formatDate(project.project_date, false) : "-"}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Tanggal Dibuat",
      render: (project) => <span>{formatDate(project.created_at)}</span>,
    },
  ];

  //SORT OPTIONS
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
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <div className="text-center sm:text-start">
          <h1 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-800">
            Manajemen Proyek
          </h1>
          <p className="text-darkslate/80 font-inter text-xs md:text-sm mt-1">
            Kelola portofolio proyek perusahaan
          </p>
        </div>
        <Link
          href="/admin/manage-proyek/tambah"
          className="inline-flex items-center gap-2 bg-navy hover:bg-steelblue text-white px-4 py-2.5 rounded-xl text-xs md:text-sm font-jetbrains font-medium transition-colors sm:self-start"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Tambah Proyek
        </Link>
      </div>

      {/* SEARCH & SORT */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-darkslate/90 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari proyek (judul/slug/klien)..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-xs md:text-sm font-jetbrains transition-all bg-white"
          />
        </div>
        <div className="relative sm:min-w-[180px]">
          <HiOutlineSortDescending className="absolute left-3 top-1/2 -translate-y-1/2 text-darkslate/90 w-5 h-5" />
          <select
            value={currentSortValue}
            onChange={(e) => {
              const opt = sortOptions.find((o) => o.value === e.target.value);
              if (opt) handleSortChange(opt.column, opt.ascending);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-xs md:text-sm font-jetbrains bg-white appearance-none cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      {/* DATATABLE */}
      <DataTable
        columns={columns}
        data={projects}
        loading={loading}
        emptyMessage="Tidak ada proyek ditemukan."
        onRowClick={(project) =>
          router.push(`/admin/manage-proyek/${project.slug}`)
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

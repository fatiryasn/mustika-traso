"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineCube,
  HiOutlineArrowRight,
  HiOutlineDesktopComputer,
} from "react-icons/hi";

import { getAdminStats } from "@/lib/overview/overview";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    productsCount: 0,
    articlesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Jumlah Proyek",
      value: loading ? "..." : stats.projectsCount,
      icon: <HiOutlineBriefcase className="w-6 h-6" />,
      href: "/admin/manage-proyek",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Jumlah Produk",
      value: loading ? "..." : stats.productsCount,
      icon: <HiOutlineCube className="w-6 h-6" />,
      href: "/admin/manage-produk",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Jumlah Artikel",
      value: loading ? "..." : stats.articlesCount,
      icon: <HiOutlineDocumentText className="w-6 h-6" />,
      href: "/admin/manage-artikel",
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];
  const quickActions = [
    {
      title: "Tambah Produk Baru",
      description: "Input material beton pracetak terbaru",
      href: "/admin/manage-produk/tambah",
      icon: <HiOutlineCube className="w-5 h-5" />,
      bg: "bg-emerald-500",
    },
    {
      title: "Tulis Artikel",
      description: "Publikasikan informasi atau berita",
      href: "/admin/manage-artikel/tambah",
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
      bg: "bg-violet-500",
    },
    {
      title: "Tambah Proyek",
      description: "Perbarui portofolio proyek",
      href: "/admin/manage-proyek/tambah",
      icon: <HiOutlineBriefcase className="w-5 h-5" />,
      bg: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* MOBILE RECOMMENDATION */}
      <div className="sm:hidden bg-amber-50 border border-amber-200 rounded-lg p-4 items-start flex gap-3">
        <HiOutlineDesktopComputer className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-amber-800 text-sm font-medium font-grotesk">
            Gunakan layar yang lebih besar
          </p>
          <p className="text-amber-700 text-[8px] sm:text-xs mt-1 font-inter">
            Direkomendasikan untuk menggunakan tablet / desktop untuk pengalaman
            optimal
          </p>
        </div>
      </div>
      {/* WELCOME */}
      <div className="hidden md:block">
        <h1 className="text-2xl lg:text-3xl font-grotesk font-bold text-gray-800">
          Selamat Datang, <span className="text-navy">Admin</span>
        </h1>
        <p className="text-darkslate/80 font-inter text-xs lg:text-sm mt-1">
          Pantau dan kelola konten website PT. Mustika Traso
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-darkslate/80 font-inter text-sm mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl md:text-4xl font-grotesk font-bold text-gray-800">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bgLight} p-3 rounded-xl`}>
                <span className={stat.textColor}>{stat.icon}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-xl font-grotesk font-bold text-gray-800 mb-4">
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
            >
              <div className={`${action.bg} p-2.5 rounded-lg text-white`}>
                {action.icon}
              </div>
              <div>
                <h3 className="font-grotesk font-semibold text-gray-800 text-sm">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 font-inter mt-0.5">
                  {action.description}
                </p>
              </div>
              <HiOutlineArrowRight className="ml-auto w-4 h-4 text-gray-300 group-hover:text-navy transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// app/admin/page.tsx
"use client";

import Link from "next/link";
import {
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineCube,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

const stats = [
  {
    label: "Jumlah Proyek",
    value: "12",
    icon: <HiOutlineBriefcase className="w-6 h-6" />,
    href: "/admin/manage-proyek",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Jumlah Produk",
    value: "24",
    icon: <HiOutlineCube className="w-6 h-6" />,
    href: "/admin/manage-produk",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "Jumlah Artikel",
    value: "8",
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
    href: "/admin/manage-produk",
    icon: <HiOutlineCube className="w-5 h-5" />,
    bg: "bg-emerald-500",
  },
  {
    title: "Tulis Artikel",
    description: "Publikasikan informasi atau berita",
    href: "/admin/manage-artikel",
    icon: <HiOutlineDocumentText className="w-5 h-5" />,
    bg: "bg-violet-500",
  },
  {
    title: "Kelola Proyek",
    description: "Perbarui portofolio proyek",
    href: "/admin/manage-proyek",
    icon: <HiOutlineBriefcase className="w-5 h-5" />,
    bg: "bg-blue-500",
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* WELCOME */}
      <div>
        <h1 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-800">
          Selamat Datang, <span className="text-navy">Admin</span>
        </h1>
        <p className="text-darkslate/80 font-inter text-sm mt-1">
          Pantau dan kelola konten website PT. Mustika Traso
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
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
          </div>
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
              className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all flex items-center gap-4 group"
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

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="text-xl font-grotesk font-bold text-gray-800 mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="text-center py-8 text-gray-400 font-manrope text-sm">
          <MdOutlineDashboard className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Belum ada aktivitas terbaru.</p>
          <p className="text-xs mt-1">Riwayat perubahan akan muncul di sini.</p>
        </div>
      </div>
    </div>
  );
}

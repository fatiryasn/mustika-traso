"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

// ---- Data types ----
interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  year: number;
  productsUsed: string[];
}

// ---- Sample data (replace with real data fetching) ----
const ALL_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Tol Jakarta – Cikampek II",
    description:
      "Pengadaan dan pemasangan U-Ditch 100x100 sepanjang 8,5 km untuk sistem drainase utama jalan tol.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    location: "Karawang, Jawa Barat",
    year: 2023,
    productsUsed: ["U-Ditch 100x100", "Box Culvert"],
  },
  {
    id: "2",
    name: "Pembangunan Bendungan Karian",
    description:
      "Pemasangan box culvert 250x250 untuk saluran pengelak banjir dan akses pemeliharaan bendungan.",
    imageUrl:
      "https://images.unsplash.com/photo-1565373679370-f8561e3a4ad6?auto=format&fit=crop&q=80&w=800",
    location: "Lebak, Banten",
    year: 2024,
    productsUsed: ["Box Culvert 250x250", "Paving Block"],
  },
  {
    id: "3",
    name: "Perumahan CitraRaya Tangerang",
    description:
      "Suplai paving block 8cm dan kanstin jalan untuk seluruh jalan lingkungan cluster terbaru.",
    imageUrl:
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=800",
    location: "Tangerang, Banten",
    year: 2023,
    productsUsed: ["Paving Block 8cm", "Kanstin Jalan"],
  },
  {
    id: "4",
    name: "Jalan Tol Serang – Panimbang",
    description:
      "Pemasangan U-Ditch 120x120 dan cover untuk drainase sepanjang 12 km ruas tol.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    location: "Serang, Banten",
    year: 2024,
    productsUsed: ["U-Ditch 120x120", "Cover U-Ditch"],
  },
];

export default function ProyekPage() {
  const [selectedYear, setSelectedYear] = useState<number | "Semua Tahun">(
    "Semua Tahun",
  );

  // Get unique years, sorted descending, with "Semua Tahun" at the front
  const years: Array<number | "Semua Tahun"> = useMemo(() => {
    const yearSet = new Set(ALL_PROJECTS.map((p) => p.year));
    return ["Semua Tahun", ...Array.from(yearSet).sort((a, b) => b - a)];
  }, []);

  // Filter projects by selected year
  const filteredProjects = useMemo(() => {
    if (selectedYear === "Semua Tahun") return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.year === selectedYear);
  }, [selectedYear]);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Banner Section ===== */}
        <div className="relative bg-white text-darkslate border-y lg:border border-bordergray overflow-hidden mb-12 p-8 md:p-16 rounded-none">
          <div className="absolute inset-0 opacity-40 grid-diagonal pointer-events-none"></div>
          <div className="relative max-w-2xl z-10 space-y-3">
            <div className="w-12 h-1 bg-navy"></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-navy">
              PORTOFOLIO PROYEK & REFERENSI
            </h1>
            <p className="text-darkslate/70 font-inter text-xs sm:text-sm tracking-widest uppercase">
              Dokumentasi pengiriman dan pemasangan beton pra-cetak di lapangan
            </p>
          </div>
        </div>

        {/* ===== Filter bar ===== */}
        <div className="bg-white p-6 border border-bordergray rounded-none mb-10 flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold text-navy font-mono uppercase tracking-widest flex items-center gap-1.5">
            <FaCalendarAlt className="h-4 w-4" />
            <span>Saring Berdasarkan Tahun:</span>
          </span>
          <div className="flex flex-wrap gap-px bg-bordergray">
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 text-[10px] font-bold uppercase rounded-none cursor-pointer tracking-widest border-0 transition-all font-mono ${
                  selectedYear === yr
                    ? "bg-navy text-white"
                    : "bg-background text-gray-500 hover:text-gray-900 hover:bg-white"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Projects Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-none border border-bordergray hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row h-full group"
            >
              {/* Photo Column */}
              <div className="relative h-60 sm:h-auto sm:w-2/5 overflow-hidden shrink-0 bg-gray-100 border-b sm:border-b-0 sm:border-r border-bordergray">
                <img
                  src={proj.imageUrl}
                  alt={proj.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-0 left-0 bg-darkslate text-white text-[10px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest">
                  Tahun {proj.year}
                </div>
              </div>

              {/* Text detail */}
              <div className="p-6 md:p-8 flex flex-col justify-between grow">
                <div>
                  <div className="flex items-center text-xs text-steelblue font-mono font-bold uppercase tracking-wider mb-2.5">
                    <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="text-lg font-black font-display text-darkslate uppercase tracking-wide group-hover:text-navy transition-colors mb-3">
                    {proj.name}
                  </h3>
                  <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed mb-5 font-inter">
                    {proj.description}
                  </p>
                </div>

                {/* Used products badge list */}
                <div className="pt-4 border-t border-bordergray/60">
                  <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-2">
                    PRODUK YANG DISUPLAI
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.productsUsed.map((prod, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-accentgray/15 text-navy font-bold px-2 py-0.5 rounded-none font-mono uppercase"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Bottom CTA ===== */}
        <div className="bg-darkslate text-white p-8 md:p-12 text-center relative overflow-hidden rounded-none border border-bordergray">
          <div className="absolute inset-0 grid-diagonal opacity-15 pointer-events-none"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight leading-none text-white">
              INGIN MENGGUNAKAN BETON PRECAST UNTUK PROYEK ANDA?
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-inter">
              Lebih dari 450 proyek sipil nasional telah diverifikasi membuktikan
              keandalan suplai dan integritas logistik PT Mustika Trasu.
              Diskusikan rencana anggaran biaya (RAB) proyek Anda dengan
              representatif kami sekarang.
            </p>
            <Link
              href="/kontak"
              className="inline-block px-8 py-4 bg-navy hover:bg-steelblue text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-none cursor-pointer"
            >
              HUBUNGI ESTIMATOR KAMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
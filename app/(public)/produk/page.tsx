"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight, FaFilter, FaTag } from "react-icons/fa";

// ---- Data types ----
interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

// ---- Sample data (replace with real data fetching) ----
const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "U-Ditch 120x120",
    description:
      "Saluran drainase beton pracetak dengan kuat tekan K-400, ideal untuk saluran air terbuka maupun tertutup.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    category: "Drainase",
  },
  {
    id: "2",
    name: "Box Culvert 200x200",
    description:
      "Struktur gorong-gorong persegi dengan tulangan double wiremesh, cocok untuk underpass dan jembatan kecil.",
    imageUrl:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    category: "Infrastruktur",
  },
  {
    id: "3",
    name: "Paving Block 8cm",
    description:
      "Paving block mutu K-300 dengan bentuk segi empat, tersedia warna natural dan merah untuk area parkir dan jalan.",
    imageUrl:
      "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=800",
    category: "Paving",
  },
  {
    id: "4",
    name: "Kanstin Jalan 60x20x15",
    description:
      "Pembatas jalan beton pracetak dengan dimensi presisi, kuat tekan K-350, cocok untuk median dan trotoar.",
    imageUrl:
      "https://images.unsplash.com/photo-1590725170245-2b9a8a7b7b1c?auto=format&fit=crop&q=80&w=800",
    category: "Paving",
  },
  {
    id: "5",
    name: "Cover U-Ditch 120cm",
    description:
      "Penutup saluran U-Ditch dengan sistem interlocking, memudahkan pemasangan dan perawatan.",
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    category: "Drainase",
  },
  {
    id: "6",
    name: "Box Culvert 250x250",
    description:
      "Box culvert ukuran besar dengan tulangan double wiremesh, dirancang untuk beban berat lalu lintas.",
    imageUrl:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    category: "Infrastruktur",
  },
];

export default function ProdukPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  // Get unique categories, with "Semua" as first option
  const categories = useMemo(() => {
    const cats = new Set(ALL_PRODUCTS.map((p) => p.category));
    return ["Semua", ...Array.from(cats).sort()];
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Semua") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Banner Section ===== */}
        <div className="relative bg-white text-darkslate border-y lg:border border-bordergray overflow-hidden mb-12 p-8 md:p-16 rounded-none">
          <div className="absolute inset-0 opacity-40 grid-diagonal pointer-events-none"></div>
          <div className="relative max-w-2xl z-10 space-y-3">
            <div className="w-12 h-1 bg-navy"></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-navy">
              PRODUK BETON PRACETAK
            </h1>
            <p className="text-darkslate/70 font-inter text-xs sm:text-sm tracking-widest uppercase">
              Katalog lengkap material drainase, infrastruktur, dan paving
            </p>
          </div>
        </div>

        {/* ===== Filter bar ===== */}
        <div className="bg-white p-6 border border-bordergray rounded-none mb-10 flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold text-navy font-mono uppercase tracking-widest flex items-center gap-1.5">
            <FaFilter className="h-4 w-4" />
            <span>Kategori:</span>
          </span>
          <div className="flex flex-wrap gap-px bg-bordergray">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] font-bold uppercase rounded-none cursor-pointer tracking-widest border-0 transition-all font-mono ${
                  selectedCategory === cat
                    ? "bg-navy text-white"
                    : "bg-background text-gray-500 hover:text-gray-900 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Products Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-bordergray hover:shadow-xl transition-all duration-300 flex flex-col h-full group rounded-none"
            >
              <div className="relative h-56 w-full overflow-hidden bg-gray-100 border-b border-bordergray">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-0 left-0 bg-navy text-white text-[9px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest">
                  {prod.category}
                </div>
              </div>
              <div className="p-6 grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-black font-display text-darkslate uppercase tracking-wide group-hover:text-navy transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                    {prod.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-bordergray/60 mt-6 flex justify-between items-center">
                  <Link
                    href="#"
                    className="inline-flex items-center text-xs font-black uppercase tracking-wider text-navy hover:text-steelblue transition-colors cursor-pointer"
                  >
                    <span>SPESIFIKASI & UKURAN</span>
                    <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                  <span className="text-[10px] text-gray-400 font-mono">
                    SNI Certified
                  </span>
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
              BUTUH ESTIMASI HARGA SPH ATAU UKURAN CUSTOM?
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-inter">
              Tim Estimator kami siap membantu menghitung kebutuhan tonase,
              spesifikasi pembesian single/double wiremesh, serta koordinasi
              teknis pengiriman ke lokasi proyek Anda.
            </p>
            <Link
              href="/kontak"
              className="px-8 py-4 bg-navy hover:bg-steelblue text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-none cursor-pointer inline-block"
            >
              HUBUNGI ESTIMATOR KAMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

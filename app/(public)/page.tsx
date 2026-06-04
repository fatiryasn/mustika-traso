"use client";
import Link from "next/link";
import {
  FaArrowRight,
  FaCertificate,
  FaBuilding,
  FaHardHat,
  FaWhatsapp,
} from "react-icons/fa";

import { Product } from "@/types/Product";
import { Project } from "@/types/Project";
import { coreStrengths } from "@/data/coreStrengths";
import { statistics } from "@/data/statistics"

// Sample Data
const SAMPLE_PRODUCTS: Product[] = [
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
];
const SAMPLE_PROJECTS: Project[] = [
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
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Sistem Manajemen Mutu" },
  { name: "SNI 03-0691-1996", desc: "Standar Paving Block" },
  { name: "SNI 03-2847-2002", desc: "Tata Cara Perhitungan Struktur Beton" },
  { name: "K3 Konstruksi", desc: "Keselamatan & Kesehatan Kerja" },
];

const clients = [
  "PT Adhi Karya (Persero) Tbk",
  "PT Waskita Karya (Persero) Tbk",
  "PT Pembangunan Perumahan Tbk",
  "Dinas PUPR Kabupaten Bekasi",
  "Pengembang CitraRaya",
  "PT Summarecon Agung Tbk",
];

export default function HomePage() {
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 3);
  const featuredProjects = SAMPLE_PROJECTS.slice(0, 2);


  return (
    <div className="bg-background min-h-screen text-darkslate">
      {/* HERO */}
      <section
        id="hero-section"
        className="relative bg-white border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* HERO-LEFT */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-bordergray">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-grotesk leading-[0.9] text-darkslate uppercase mb-4">
              BETON PRACETAK
              <br />
              <span className="text-navy">MUTU TERJAMIN</span>
              <br />
              SIAP KIRIM
            </h1>
            <p className="text-darkslate/90 font-inter text-sm sm:text-base md:text-lg max-w-lg mb-8 leading-relaxed">
              Penyedia utama beton pra-cetak (precast) berstandar industri
              nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan
              pengiriman logistik untuk mendukung proyek infrastruktur Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/produk"
                className="bg-navy hover:bg-steelblue text-white px-8 py-4 text-sm font-bold font-jetbrains uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer rounded-none"
              >
                <span>KATALOG PRODUK</span>
                <FaArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/proyek"
                className="border-2 border-accentgray text-darkslate hover:bg-background hover:border-darkslate px-8 py-4 text-sm font-jetbrains font-bold uppercase tracking-widest transition-all cursor-pointer rounded-none"
              >
                DOKUMENTASI PROYEK
              </Link>
            </div>
          </div>

          {/* HERO-RIGHT */}
          <div className="lg:col-span-5 bg-accentgray/10 relative min-h-[350px] lg:min-h-0 flex items-center justify-center p-8 overflow-hidden">
            <span className="text-[120px] lg:text-[180px] font-black font-display text-bordergray/40 leading-none select-none absolute top-4 right-6 uppercase">
              MT
            </span>
            <div className="w-full max-w-sm aspect-video sm:aspect-square lg:h-full lg:max-h-[365px] border-2 border-navy relative bg-white shadow-xl overflow-hidden group rounded-none">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"
                alt="Highlight PT Mustika Trasu"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section
        id="statistics-section"
        className="bg-white border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 select-none">
          {statistics.map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-8 flex flex-col justify-center border-r border-bordergray border-b lg:border-b-0 hover:bg-background transition-all ${
                idx === 3 ? "border-r-0" : ""
              }`}
            >
              <h4 className="text-4xl lg:text-5xl font-black font-display text-navy tracking-tighter mb-1">
                {stat.value}
              </h4>
              <p className="text-xs uppercase font-bold tracking-widest text-darkslate/70 font-jetbrains">
                {stat.label}
              </p>
            </div>
          ))}
          <Link
            href="/kontak"
            className="p-8 flex flex-col justify-center bg-navy text-white hover:bg-steelblue transition-all cursor-pointer group"
          >
            <p className="text-xs uppercase font-bold tracking-widest text-white/80 mb-1 font-jetbrains">
              Dapatkan Penawaran SPH
            </p>
            <p className="text-base font-bold font-inter uppercase tracking-wide leading-tight group-hover:underline decoration-2 underline-offset-4 flex items-center gap-1.5">
              <span>Minta Penawaran SPH</span>
              <FaArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </div>
      </section>

      {/* CORE VALUES */}
      <section
        id="core-values-section"
        className="py-20 bg-background border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
              Keunggulan Layanan kami
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk text-darkslate tracking-tight uppercase">
              REKAYASA BETON PRESISI TINGGI
            </p>
            <div className="h-1 w-16 bg-navy mx-auto mt-4" />
            <p className="text-darkslate/90 text-sm mt-5 leading-relaxed font-inter">
              Kami mematuhi rekayasa teknis ketat dari material homogen hingga
              kontrol curing pasca-cetak demi memastikan integritas struktural
              di ribuan proyek sipil nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bordergray border border-bordergray">
            {coreStrengths.map((strength, idx) => (
              <div
                key={idx}
                className="bg-white p-8 md:p-10 hover:bg-background transition-colors duration-300 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6"
              >
                <div className="bg-navy/10 p-3.5 text-navy rounded-none shrink-0 border border-navy/20">
                  {strength.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-inter text-darkslate mb-2 uppercase tracking-wide">
                    {strength.title}
                  </h3>
                  <p className="text-darkslate/80 text-xs sm:text-sm leading-relaxed font-inter">
                    {strength.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS*/}
      <section
        id="featured-products-section"
        className="py-20 bg-white border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-bordergray pb-6">
            <div>
              <h2 className="text-xs font-bold text-steelblue font-jetbrains uppercase mb-3">
                Sistem Drainase & Paving Terintegrasi
              </h2>
              <p className="text-4xl font-black font-grotesk text-darkslate tracking-tight uppercase">
                KATALOG MATERIAL UTAMA
              </p>
            </div>
            <Link
              href="/produk"
              className="mt-4 md:mt-0 inline-flex items-center text-navy border-b border-navy pb-1 font-bold text-xs uppercase tracking-widest hover:text-steelblue hover:border-steelblue transition-colors group cursor-pointer"
            >
              <span>Lihat Semua Produk</span>
              <FaArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-bordergray hover:shadow-xl transition-all duration-300 flex flex-col h-full group rounded-none"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 border-b border-bordergray">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 bg-navy text-white text-[9px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest">
                    {prod.category}
                  </div>
                </div>
                <div className="p-6 grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-black font-inter text-darkslate uppercase tracking-wide group-hover:text-navy transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-darkslate/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                      {prod.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-bordergray/60 mt-6 flex justify-between items-center">
                    <Link
                      href="/produk"
                      className="inline-flex items-center text-xs font-black font-jetbrains uppercase tracking-wider text-navy hover:text-steelblue transition-colors cursor-pointer"
                    >
                      <span>SPESIFIKASI & UKURAN</span>
                      <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section
        id="featured-projects-section"
        className="py-20 bg-background border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-bordergray pb-6">
            <div>
              <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
                Hasil Pelaksanaan Lapangan
              </h2>
              <p className="text-4xl font-black font-grotesk text-darkslate tracking-tight uppercase">
                DOKUMENTASI INSTALASI PROYEK
              </p>
            </div>
            <Link
              href="/proyek"
              className="mt-4 md:mt-0 inline-flex items-center text-navy border-b border-navy pb-1 font-bold text-xs uppercase tracking-widest hover:text-steelblue hover:border-steelblue transition-colors group cursor-pointer"
            >
              <span>Lihat Portofolio Lengkap</span>
              <FaArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border border-bordergray hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row h-full rounded-none"
              >
                <div className="relative h-56 md:h-auto md:w-2/5 overflow-hidden shrink-0 bg-gray-200 border-b md:border-b-0 md:border-r border-bordergray">
                  <img
                    src={proj.imageUrl}
                    alt={proj.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between grow">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold font-display text-darkslate uppercase tracking-wide leading-tight">
                      {proj.name}
                    </h3>
                    <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                      {proj.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-bordergray/60 mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.productsUsed.map((p, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-accentgray/15 text-navy font-bold px-2 py-0.5 rounded-none font-grotesk uppercase"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta-section"
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000"
            alt="Construction site background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-darkslate/85"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
          <div className="w-12 h-1 bg-white/60 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-black font-grotesk text-white tracking-tight uppercase">
            BUTUH ESTIMASI HARGA SPH ATAU UKURAN CUSTOM?
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto font-inter">
            Tim Estimator kami siap membantu menghitung kebutuhan tonase,
            spesifikasi pembesian single/double wiremesh, serta koordinasi
            teknis pengiriman ke lokasi proyek di wilayah Jabodetabek & Jawa
            Barat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href="/kontak"
              className="px-8 py-4 bg-navy hover:bg-steelblue text-white font-bold text-xs uppercase tracking-widest transition-colors rounded-none w-full sm:w-auto cursor-pointer font-jetbrains"
            >
              Minta Surat Penawaran (Inquiry)
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Mustika%20Trasu%2C%20saya%20kontraktor%20ingin%20tanya%20harga%20beton%20precast"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-green-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-green-700 transition rounded-none w-full sm:w-auto inline-flex items-center justify-center space-x-2 font-jetbrains"
            >
              <FaWhatsapp className="text-lg"/>
              <span>Chat WhatsApp Sales</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
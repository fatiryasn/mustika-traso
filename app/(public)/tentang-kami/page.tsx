"use client";

import React, { useState } from "react";
import {
  FaBullseye,
  FaCompass,
  FaAward,
  FaShieldAlt,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

export default function TentangKamiPage() {
  const [activeTab, setActiveTab] = useState<"visi" | "misi">("visi");

  const values = [
    {
      icon: <FaAward className="h-6 w-6 text-navy" />,
      title: "Kualitas Tanpa Kompromi",
      description:
        "Setiap adukan semen, split pasir, dan cetakan beton diperiksa ketat untuk melampaui toleransi standar kelulusan SNI.",
    },
    {
      icon: <FaShieldAlt className="h-6 w-6 text-navy" />,
      title: "Integritas & Transparansi",
      description:
        "Kami memberikan sertifikat hasil uji kubus beton hancur yang akurat sesuai mutu karakteristik riil yang dipesan.",
    },
    {
      icon: <FaCheckCircle className="h-6 w-6 text-navy" />,
      title: "Efisiensi Waktu Pengiriman",
      description:
        "Ketepatan jadwal pengiriman beton precast adalah kunci agar progres pengerjaan sipil kontraktor di lapangan tidak mandek.",
    },
    {
      icon: <FaUsers className="h-6 w-6 text-navy" />,
      title: "Kemitraan Jangka Panjang",
      description:
        "Menyediakan konsultasi rekayasa drainase dan kustomisasi pembesian untuk menyukseskan proyek skala makro hingga mikro.",
    },
  ];

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <div className="relative bg-white text-darkslate border-y lg:border border-bordergray overflow-hidden mb-16 p-8 md:p-16 rounded-none">
          {/* Dynamic Architect Grid Pattern */}
          <div className="absolute inset-0 opacity-40 grid-diagonal pointer-events-none"></div>
          <div className="relative max-w-2xl z-10 space-y-3">
            <div className="w-12 h-1 bg-navy"></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-navy">
              TENTANG KAMI
            </h1>
            <p className="text-darkslate/70 font-inter text-xs sm:text-sm tracking-widest uppercase">
              Mengenal visi, misi, dan nilai kredibilitas PT. Mustika Trasu
            </p>
          </div>
        </div>

        {/* Brand Background Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-xs font-bold text-steelblue font-mono tracking-widest uppercase mb-3">
              Latar Belakang
            </h2>
            <h3 className="text-3xl font-black font-display text-darkslate tracking-tight leading-none mb-6 uppercase">
              PT. MUSTIKA TRASU: SEJARAH & REPUTASI
            </h3>
            <p className="text-darkslate/80 text-xs sm:text-sm leading-relaxed mb-5 font-inter">
              Mustika Trasu merupakan perusahaan penyedia produk beton pra-cetak
              (precast concrete) premium yang didirikan untuk menjawab tingginya
              kebutuhan material konstruksi Indonesia yang andal, efisien, dan
              bersertifikasi. Kami mengoperasikan pabrik modern dengan kapasitas
              produksi massal untuk mencetak saluran drainase, paving, pembatas
              aspal jalan, dan gorong-gorong utilitas.
            </p>
            <p className="text-darkslate/80 text-xs sm:text-sm leading-relaxed mb-6 font-inter">
              Dalam kurun waktu pengabdian kami, Mustika Trasu telah dipercaya
              oleh berbagai kontraktor swasta nasional, BUMN karya, hingga dinas
              pekerjaan umum pemerintahan kota untuk mensuplai material
              prasarana drainase jalan raya, kawasan logistik industri
              pergudangan, hingga fasilitas perumahan modern.
            </p>
            <div className="bg-white p-5 border border-bordergray flex items-center space-x-4 rounded-none">
              <div className="text-3xl font-black text-navy shrink-0 font-mono">
                100%
              </div>
              <div className="text-xs text-darkslate/70 font-medium leading-normal font-inter">
                Kandungan Beton precast diracik menggunakan bahan berkualitas
                tinggi lulus uji beban berat.
              </div>
            </div>
          </div>

          <div className="relative h-96 border border-bordergray rounded-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800"
              alt="Mustika Trasu Concrete Factory Plant"
              className="object-cover w-full h-full"
            />
            {/* Minimal card details */}
            <div className="absolute bottom-6 right-6 left-6 bg-darkslate p-5 rounded-none md:mr-10">
              <span className="text-white text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                Batching Plant Utama
              </span>
              <span className="text-accentgray text-xs block font-inter">
                Kawasan Industri Narogong KM. 18, Bekasi
              </span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Visi & Misi */}
        <div className="bg-white border border-bordergray p-8 md:p-12 mb-20 rounded-none">
          <div className="flex justify-center space-x-4 mb-10 border-b border-bordergray">
            <button
              onClick={() => setActiveTab("visi")}
              className={`pb-4 px-6 text-sm font-bold font-display tracking-widest uppercase transition-colors relative cursor-pointer ${
                activeTab === "visi"
                  ? "text-navy"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Visi Perusahaan
              {activeTab === "visi" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-navy"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("misi")}
              className={`pb-4 px-6 text-sm font-bold font-display tracking-widest uppercase transition-colors relative cursor-pointer ${
                activeTab === "misi"
                  ? "text-navy"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Misi Perusahaan
              {activeTab === "misi" && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-navy"></span>
              )}
            </button>
          </div>

          <div className="min-h-56">
            {activeTab === "visi" ? (
              <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                <FaCompass className="h-12 w-12 text-navy mb-5 animate-pulse" />
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-darkslate italic font-inter">
                  &ldquo;Menjadi produsen dan penyuplai industri produk beton
                  pra-cetak (precast) terpercaya yang unggul dalam kualitas
                  material, inovasi rancangan konstruksi, serta efisiensi solusi
                  infrastruktur nasional di Indonesia.&rdquo;
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <FaBullseye className="h-10 w-10 text-navy" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bordergray border border-bordergray">
                  <div className="bg-white p-5">
                    <span className="h-6 w-6 bg-navy text-white font-mono font-bold flex items-center justify-center rounded-none mb-3 text-xs">
                      1
                    </span>
                    <p className="text-xs sm:text-sm text-darkslate/80 leading-relaxed font-inter">
                      Menghasilkan produk beton siap pakai yang bervarian
                      lengkap dengan mutu karakteristik material yang konsisten,
                      padat, presisi serta tahan lama.
                    </p>
                  </div>
                  <div className="bg-white p-5">
                    <span className="h-6 w-6 bg-navy text-white font-mono font-bold flex items-center justify-center rounded-none mb-3 text-xs">
                      2
                    </span>
                    <p className="text-xs sm:text-sm text-darkslate/80 leading-relaxed font-inter">
                      Mengoptimalkan pelayanan logistik pengiriman komponen
                      precast secara profesional dan tepat waktu demi menunjang
                      jadwal progres mingguan kontraktor.
                    </p>
                  </div>
                  <div className="bg-white p-5">
                    <span className="h-6 w-6 bg-navy text-white font-mono font-bold flex items-center justify-center rounded-none mb-3 text-xs">
                      3
                    </span>
                    <p className="text-xs sm:text-sm text-darkslate/80 leading-relaxed font-inter">
                      Menerapkan standardisasi manajemen mutu modern,
                      otomatisasi mesin cetak, serta inovasi cetakan cetakan
                      kustom untuk efisiensi budget pengerjaan sipil.
                    </p>
                  </div>
                  <div className="bg-white p-5">
                    <span className="h-6 w-6 bg-navy text-white font-mono font-bold flex items-center justify-center rounded-none mb-3 text-xs">
                      4
                    </span>
                    <p className="text-xs sm:text-sm text-darkslate/80 leading-relaxed font-inter">
                      Membangun kemitraan strategis yang harmonis dan
                      berkelanjutan dengan kontraktor swasta, pengembang
                      perumahan, instansi BUMN, maupun masyarakat lokal.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-steelblue font-mono tracking-widest uppercase mb-3">
              Nilai Profesional
            </h2>
            <h3 className="text-3xl font-black font-display text-darkslate uppercase tracking-wide">
              INTEGRITAS & NILAI KAMI
            </h3>
            <div className="h-1.5 w-16 bg-navy mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bordergray border border-bordergray">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white p-6 md:p-8 hover:bg-background transition-colors flex flex-col justify-between rounded-none"
              >
                <div className="space-y-4">
                  <div className="bg-navy/10 p-3 text-navy inline-block rounded-none border border-navy/20">
                    {v.icon}
                  </div>
                  <h4 className="font-bold font-display text-darkslate text-sm uppercase tracking-wide">
                    {v.title}
                  </h4>
                  <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed font-inter">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

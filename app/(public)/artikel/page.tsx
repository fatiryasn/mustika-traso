"use client";

import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaArrowLeft,
  FaClock,
  FaShareAlt,
  FaComment,
  FaTag,
} from "react-icons/fa";

// ---- Data types ----
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // markdown-like text
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

// ---- Sample data ----
const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Memilih Mutu Beton Pracetak untuk Drainase Jalan Raya",
    excerpt:
      "Bagaimana menentukan kuat tekan beton (K-value) yang tepat agar saluran drainase tahan beban lalu lintas berat dan cuaca ekstrem.",
    content: `## Pendahuluan
Proyek drainase jalan raya membutuhkan spesifikasi beton yang tidak hanya presisi secara dimensi, tetapi juga unggul dalam kekuatan struktural.

### Mengapa K-Value Penting?
Kuat tekan beton (K-value) menjadi indikator utama daya dukung saluran terhadap tekanan tanah, beban kendaraan, serta perubahan suhu.

* **K-300** – Cocok untuk saluran perumahan dengan beban ringan.
* **K-400** – Rekomendasi untuk saluran di bawah jalan lingkungan atau akses industri.
* **K-500** – Digunakan pada tol dan proyek dengan volume trafik tinggi.

> **Tips:** Selalu mintakan hasil uji kubus beton hancur dari laboratorium terakreditasi sebelum melakukan serah terima material.

### Pengecekan Mutu di Lapangan
1. **Visual:** Pastikan permukaan halus tanpa retak rambut dan keropos.
2. **Dimensional:** Ukur dimensi aktual, toleransi harus di bawah ±5 mm.
3. **Uji Beban:** Lakukan sampling acak untuk tes tekan di laboratorium independen.

Dengan spesifikasi yang tepat, sistem drainase precast mampu bertahan puluhan tahun tanpa perbaikan berarti.`,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    category: "Edukasi",
    author: "Tim Teknik Mustika Trasu",
    date: "12 Maret 2025",
    readTime: "5 menit",
  },
  {
    id: "2",
    title: "Tren Infrastruktur IKN dan Peran Beton Pracetak",
    excerpt:
      "Melihat peluang besar suplai komponen pracetak untuk pembangunan Ibu Kota Negara baru yang mengutamakan konstruksi ramah lingkungan.",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
    category: "Berita",
    author: "Redaksi",
    date: "8 April 2025",
    readTime: "3 menit",
    content: `## Konteks Baru IKN
Pemindahan ibu kota ke Kalimantan Timur mendorong percepatan pembangunan infrastruktur masif. Beton pracetak hadir sebagai solusi efisiensi waktu.

### Keunggulan Precast untuk IKN
* Produksi massal di pabrik mengurangi limbah di lokasi proyek.
* Kualitas lebih terkontrol karena diproduksi di lingkungan terukur.
* Pengiriman tepat waktu menunjang target progres bulanan.

> Saat ini kami sedang mempersiapkan lini produksi khusus untuk memenuhi kebutuhan U-Ditch dan box culvert skala besar di kawasan IKN.

Hubungi tim sales kami untuk berdiskusi lebih lanjut.`,
  },
  {
    id: "3",
    title: "Perawatan Saluran U-Ditch Pracetak agar Tahan Lama",
    excerpt:
      "Langkah-langkah sederhana yang dapat dilakukan kontraktor dan pengelola kawasan untuk memperpanjang umur saluran beton.",
    imageUrl:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800",
    category: "Tips",
    author: "Tim Lapangan",
    date: "22 Februari 2025",
    readTime: "4 menit",
    content: `## Mengapa Perawatan Penting?
Meskipun beton dikenal awet, faktor lingkungan seperti sedimentasi dan tumbuhan liar dapat mengurangi fungsi saluran.

### 5 Langkah Perawatan Rutin
1. **Pembersihan Sedimen:** Lakukan pengurasan setiap 6 bulan sekali.
2. **Kontrol Sambungan:** Pastikan sealant antar segmen tidak retak.
3. **Pemangkasan Akar:** Jangan biarkan tanaman besar tumbuh di dekat saluran.
4. **Inspeksi Visual:** Cek retakan atau penurunan tanah di sekitar instalasi.
5. **Perbaikan Minor:** Gunakan mortar khusus untuk menambal kerusakan kecil.

Dengan perawatan yang tepat, U-Ditch pracetak bisa berfungsi optimal hingga 50 tahun lebih.`,
  },
];

export default function ArtikelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(SAMPLE_ARTICLES.map((a) => a.category));
    return ["Semua", ...Array.from(cats)];
  }, []);

  const filteredArticles = useMemo(() => {
    return SAMPLE_ARTICLES.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat =
        selectedCategory === "Semua" || a.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  const handleRead = (article: Article) => {
    setReadingArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setReadingArticle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Simple markdown parser (same logic, adapted to inline font-inter for body text)
  const parseMarkdown = (mdString: string) => {
    const lines = mdString.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4" />;

      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-xl font-bold text-darkslate tracking-tight mt-8 mb-4 font-display"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="text-2xl font-black text-darkslate tracking-tight mt-10 mb-5 border-b border-bordergray pb-2 font-display"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      }

      if (trimmed.startsWith("* ")) {
        return (
          <li
            key={idx}
            className="ml-6 list-disc text-darkslate/70 text-sm sm:text-base leading-relaxed mb-2 font-inter"
          >
            {trimmed.replace("* ", "")}
          </li>
        );
      }

      // Bullet with bold prefix: * **text** rest
      if (trimmed.startsWith("* **")) {
        const matches = trimmed.match(/^\*\s\*\*(.*?)\*\*(.*)/);
        if (matches) {
          return (
            <li
              key={idx}
              className="ml-8 list-disc text-darkslate/70 text-sm sm:text-base leading-relaxed mb-2 font-inter"
            >
              <span className="font-bold text-darkslate">{matches[1]}</span>
              <span>{matches[2]}</span>
            </li>
          );
        }
      }

      // Numbered list with bold prefix: 1. **text** rest
      if (trimmed.match(/^\d+\.\s\*\*/)) {
        const matches = trimmed.match(/^\d+\.\s\*\*(.*?)\*\*(.*)/);
        if (matches) {
          return (
            <p
              key={idx}
              className="text-darkslate/70 text-sm sm:text-base leading-relaxed mb-4 ml-4 font-inter"
            >
              <span className="font-bold text-darkslate">{matches[1]}</span>
              <span>{matches[2]}</span>
            </p>
          );
        }
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="border-l-4 border-navy bg-background pl-4 py-3 pr-2 rounded-r-lg italic text-darkslate text-sm md:text-md mb-6 leading-relaxed my-4 font-inter"
          >
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      }

      // Inline bolding
      const parseInlineBolding = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-extrabold text-darkslate">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });
      };

      return (
        <p
          key={idx}
          className="text-darkslate/70 text-sm sm:text-base leading-relaxed mb-5 font-inter"
        >
          {parseInlineBolding(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== READING VIEW ===== */}
        {readingArticle ? (
          <div className="max-w-3xl mx-auto bg-white border border-bordergray overflow-hidden rounded-none">
            {/* Header Image */}
            <div className="relative h-72 sm:h-96 w-full bg-gray-100 border-b border-bordergray">
              <img
                src={readingArticle.imageUrl}
                alt={readingArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/5"></div>

              <button
                onClick={handleBack}
                className="absolute top-6 left-6 inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-darkslate py-2.5 px-4 border border-bordergray cursor-pointer text-[10px] font-bold uppercase transition rounded-none font-mono"
              >
                <FaArrowLeft className="h-4 w-4" />
                <span>KEMBALI</span>
              </button>

              <span className="absolute bottom-6 left-8 bg-navy text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest font-mono">
                {readingArticle.category}
              </span>
            </div>

            {/* Article Body */}
            <div className="p-8 sm:p-12">
              <div className="flex flex-wrap items-center space-x-6 text-accentgray text-[10px] font-mono font-bold uppercase border-b border-bordergray pb-6 mb-8 gap-y-2">
                <div className="flex items-center space-x-1.5 text-gray-500">
                  <FaUser className="h-4 w-4 text-steelblue" />
                  <span>{readingArticle.author}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-gray-500">
                  <FaCalendarAlt className="h-4 w-4 text-steelblue" />
                  <span>{readingArticle.date}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-gray-500">
                  <FaClock className="h-4 w-4 text-steelblue" />
                  <span>{readingArticle.readTime}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-darkslate tracking-tight leading-none uppercase mb-8">
                {readingArticle.title}
              </h1>

              <article className="prose prose-slate max-w-none text-darkslate">
                {parseMarkdown(readingArticle.content)}
              </article>

              <div className="border-t border-bordergray mt-12 pt-8 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span className="font-bold uppercase tracking-widest text-gray-400">
                  Arsip Edukasi Mustika Trasu
                </span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="flex items-center space-x-1.5 hover:text-navy transition-colors cursor-pointer font-bold uppercase tracking-normal"
                  >
                    <FaShareAlt className="h-4 w-4" />
                    <span>Salin Tautan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ===== LIST VIEW ===== */
          <div>
            {/* Banner */}
            <div className="relative bg-white text-darkslate border-y lg:border border-bordergray overflow-hidden mb-12 p-8 md:p-16 rounded-none">
              <div className="absolute inset-0 opacity-40 grid-diagonal pointer-events-none"></div>
              <div className="relative max-w-2xl z-10 space-y-3">
                <div className="w-12 h-1 bg-navy"></div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-navy">
                  ARTIKEL & WAWASAN BETON
                </h1>
                <p className="text-darkslate/70 font-inter text-xs sm:text-sm tracking-widest uppercase">
                  Edukasi konstruksi, pedoman pemilihan mutu beton, dan riset
                  sipil
                </p>
              </div>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-6 border border-bordergray rounded-none mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-px bg-bordergray">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 text-[10px] font-bold uppercase cursor-pointer tracking-widest border-0 rounded-none transition-all font-mono ${
                      selectedCategory === cat
                        ? "bg-navy text-white"
                        : "bg-background text-gray-500 hover:text-gray-900 hover:bg-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:max-w-xs">
                <FaSearch className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari kata kunci artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-bordergray rounded-none text-xs font-mono focus:outline-none focus:border-navy text-gray-800 uppercase"
                />
              </div>
            </div>

            {/* Empty state */}
            {filteredArticles.length === 0 && (
              <div className="max-w-md mx-auto text-center border border-bordergray bg-white rounded-none p-10 my-12">
                <FaComment className="h-10 w-10 text-accentgray mx-auto mb-4" />
                <h3 className="text-xs font-bold font-display uppercase tracking-widest text-darkslate mb-2">
                  ARTIKEL TIDAK DITEMUKAN
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto font-inter">
                  Tidak ada tulisan artikel atau tips yang sesuai dengan
                  kriteria penelusuran Anda saat ini.
                </p>
              </div>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-none border border-bordergray hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative h-52 bg-gray-100 overflow-hidden border-b border-bordergray">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-0 left-0 bg-navy text-white text-[9px] font-mono font-bold px-3 py-1.5 uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 text-gray-400 text-[9px] font-mono tracking-widest mb-2.5">
                        <span className="uppercase">{article.date}</span>
                        <span>&bull;</span>
                        <span className="uppercase">{article.readTime}</span>
                      </div>
                      <h3 className="text-md font-black font-display text-darkslate uppercase leading-tight tracking-wide group-hover:text-navy transition-colors mb-3">
                        {article.title}
                      </h3>
                      <p className="text-darkslate/70 text-xs leading-relaxed mb-5 line-clamp-3 font-inter">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-bordergray/60">
                      <button
                        onClick={() => handleRead(article)}
                        className="inline-flex items-center text-[10px] font-bold text-navy hover:text-steelblue tracking-widest uppercase transition-colors cursor-pointer"
                      >
                        BACA SELENGKAPNYA ›
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// app/tentang-kami/page.tsx
import { coreStrengths } from "@/data/coreStrengths";
import { FaCompass, FaBullseye } from "react-icons/fa";

export default function TentangKamiPage() {
  // ----- Data Arrays -----
  const visiData = [
    {
      id: 1,
      text: "Menjadi produsen dan penyuplai industri produk beton pra-cetak (precast) terpercaya yang unggul dalam kualitas material, inovasi rancangan konstruksi, serta efisiensi solusi infrastruktur nasional di Indonesia.",
    },
  ];

  const misiData = [
    {
      id: 1,
      text: "Menghasilkan produk beton siap pakai yang bervarian lengkap dengan mutu karakteristik material yang konsisten, padat, presisi serta tahan lama.",
    },
    {
      id: 2,
      text: "Mengoptimalkan pelayanan logistik pengiriman komponen precast secara profesional dan tepat waktu demi menunjang jadwal progres mingguan kontraktor.",
    },
    {
      id: 3,
      text: "Menerapkan standardisasi manajemen mutu modern, otomatisasi mesin cetak, serta inovasi cetakan kustom untuk efisiensi budget pengerjaan sipil.",
    },
    {
      id: 4,
      text: "Membangun kemitraan strategis yang harmonis dan berkelanjutan dengan kontraktor swasta, pengembang perumahan, instansi BUMN, maupun masyarakat lokal.",
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-16 pt-4">
      {/* BANNER */}
      <div className="max-w-[100rem] mx-auto relative bg-darkslate text-white overflow-hidden mb-12 p-8 md:p-16 lg:p-20 rounded">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/20 -skew-x-12 transform origin-top-right" />
        <div className="relative max-w-7xl z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-cyan-500" />
                <span className="text-cyan-400 text-xs font-bold font-jetbrains uppercase tracking-widest">
                  Perusahaan
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-white">
                TENTANG KAMI
              </h1>
              <p className="text-white/90 font-inter text-xs sm:text-sm tracking-widest uppercase max-w-xl">
                Mengenal visi, misi, dan nilai kredibilitas PT. Mustika Trasu
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BACKGROUND STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
              Latar Belakang
            </h2>
            <h3 className="text-4xl font-black font-grotesk text-darkslate tracking-tight leading-none mb-6 uppercase">
              PT. MUSTIKA TRASO: SEJARAH & REPUTASI
            </h3>
            <p className="text-darkslate/90 text-xs sm:text-base leading-relaxed mb-5 font-inter">
              Mustika Traso merupakan perusahaan penyedia produk beton pra-cetak
              (precast concrete) premium yang didirikan untuk menjawab tingginya
              kebutuhan material konstruksi Indonesia yang andal, efisien, dan
              bersertifikasi. Kami mengoperasikan pabrik modern dengan kapasitas
              produksi massal untuk mencetak saluran drainase, paving, pembatas
              aspal jalan, dan gorong-gorong utilitas.
            </p>
            <p className="text-darkslate/90 text-xs sm:text-base leading-relaxed mb-6 font-inter">
              Dalam kurun waktu pengabdian kami, Mustika Traso telah dipercaya
              oleh berbagai kontraktor swasta nasional, BUMN karya, hingga dinas
              pekerjaan umum pemerintahan kota untuk mensuplai material
              prasarana drainase jalan raya, kawasan logistik industri
              pergudangan, hingga fasilitas perumahan modern.
            </p>
          </div>

          <div className="relative h-[35rem] border border-bordergray rounded-none overflow-hidden">
            <img
              src="/field-pictures/image7.jpeg"
              alt="Mustika Traso"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* VISI & MISI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* Visi */}
          <div className="bg-white border border-bordergray p-8 md:p-12 rounded-none flex flex-col items-center text-center">
            <FaCompass className="h-12 w-12 text-navy mb-5" />
            <h3 className="text-xl font-black font-grotesk text-darkslate uppercase tracking-wide mb-4">
              Visi Perusahaan
            </h3>
            {visiData.map((item) => (
              <p
                key={item.id}
                className="text-darkslate leading-relaxed font-inter max-w-md"
              >
                &ldquo;{item.text}&rdquo;
              </p>
            ))}
          </div>

          {/* Misi */}
          <div className="bg-white border border-bordergray p-8 rounded-none">
            <div className="flex flex-col items-center text-center mb-6">
              <FaBullseye className="h-10 w-10 text-navy mb-3" />
              <h3 className="text-xl font-black font-grotesk text-darkslate uppercase tracking-wide mb-4">
                Misi Perusahaan
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {misiData.map((item) => (
                <div
                  key={item.id}
                  className="bg-background p-4 border border-bordergray rounded-none"
                >
                  <span className="h-6 w-6 bg-navy text-white font-mono font-bold flex items-center justify-center rounded-none mb-2 text-xs">
                    {item.id}
                  </span>
                  <p className="text-sm text-darkslate leading-relaxed font-inter">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
              Nilai Profesional
            </h2>
            <h3 className="text-4xl font-black font-grotesk text-darkslate uppercase tracking-wide">
              INTEGRITAS & NILAI KAMI
            </h3>
            <div className="h-1.5 w-16 bg-navy mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bordergray border border-bordergray">
            {coreStrengths.map((v, idx) => (
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
                  <p className="text-darkslate/90 text-xs sm:text-sm leading-relaxed font-inter">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY OPERASIONAL */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
              Galeri
            </h2>
            <h3 className="text-4xl font-black font-grotesk text-darkslate uppercase tracking-wide">
              DOKUMENTASI OPERASIONAL
            </h3>
            <div className="h-1.5 w-16 bg-navy mx-auto mt-3"></div>
          </div>

          {/* 4x4 masonry grid */}
          <div className="grid grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3 md:gap-4 bg-gray-100">
            {[
              {
                src: "/field-pictures/image1.jpeg",
                alt: "Operasional 1",
                colSpan: "col-span-2",
                rowSpan: "row-span-2", // 2x2 large
              },
              {
                src: "/field-pictures/image2.jpeg",
                alt: "Operasional 2",
                colSpan: "col-span-2",
                rowSpan: "row-span-1", // wide
              },
              {
                src: "/field-pictures/image3.jpeg",
                alt: "Operasional 3",
                colSpan: "col-span-1",
                rowSpan: "row-span-2", // tall
              },
              {
                src: "/field-pictures/image4.jpeg",
                alt: "Operasional 4",
                colSpan: "col-span-1",
                rowSpan: "row-span-1", // small
              },
              {
                src: "/field-pictures/image5.jpeg",
                alt: "Operasional 5",
                colSpan: "col-span-1",
                rowSpan: "row-span-2", // tall
              },
              {
                src: "/field-pictures/image6.jpeg",
                alt: "Operasional 6",
                colSpan: "col-span-1",
                rowSpan: "row-span-1", // small
              },
              {
                src: "/field-pictures/image8.jpeg",
                alt: "Operasional 8",
                colSpan: "col-span-1",
                rowSpan: "row-span-2", // small
              },
              {
                src: "/field-pictures/image7.jpeg",
                alt: "Operasional 7",
                colSpan: "col-span-2",
                rowSpan: "row-span-1", // wide
              },
            ].map((img, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden border border-bordergray bg-gray-200 group ${img.colSpan} ${img.rowSpan}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

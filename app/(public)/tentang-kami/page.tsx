import { Metadata } from "next";
import { FaCompass, FaBullseye } from "react-icons/fa";

import { COMPANY_DATA } from "@/data/constants";
import { coreStrengths } from "@/data/coreStrengths";
import { visiData, misiData } from "@/data/visiMisi";
import PageBanner from "@/components/PageBanner";

//metadata
export const metadata: Metadata = {
  title: `Tentang Kami - ${COMPANY_DATA.name}`,
  description: `Mengenal visi, misi, dan nilai kredibilitas ${COMPANY_DATA.name}`,

  keywords: [
    "Beton",
    "Beton Pracetak",
    "Beton Pracetak Medan",
    "Beton Pracetak Sumut",
    "Beton Medan Sumatera Utara",
    `${COMPANY_DATA.name}`,
    `${COMPANY_DATA.brand_name}`,
    "Supplier Beton Pracetak",
    "Precast Concrete",
    `Tentang ${COMPANY_DATA.brand_name}`,
    `Visi Misi ${COMPANY_DATA.brand_name}`,
  ],

  alternates: {
    canonical: `${COMPANY_DATA.base_url}/tentang-kami`,
  },

  openGraph: {
    title: `Tentang Kami - ${COMPANY_DATA.name}`,
    description: `Mengenal visi, misi, dan nilai kredibilitas ${COMPANY_DATA.name}`,
    images: ["/og-image.png"],
    url: `${COMPANY_DATA.base_url}/tentang-kami`,
    siteName: COMPANY_DATA.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Tentang Kami - ${COMPANY_DATA.name}`,
    description: `Mengenal visi, misi, dan nilai kredibilitas ${COMPANY_DATA.name}`,
    images: ["/og-image.png"],
  },
};

//main component
export default function TentangKamiPage() {
  return (
    <div className="bg-background min-h-screen pb-16 pt-4">
      {/* BANNER */}
      <PageBanner
        label="Perusahaan"
        title="TENTANG KAMI"
        description={`Mengenal visi, misi, dan nilai kredibilitas ${COMPANY_DATA.name}`}
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BACKGROUND STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
              Latar Belakang
            </h2>
            <h3 className="text-4xl font-black font-grotesk text-darkslate tracking-tight leading-none mb-6 uppercase">
              {COMPANY_DATA.name}: Sejarah & Reputasi
            </h3>
            <p className="text-darkslate/90 text-xs sm:text-base leading-relaxed mb-5 font-inter">
              {COMPANY_DATA.brand_name} merupakan perusahaan penyedia produk
              beton pra-cetak (precast concrete) premium yang didirikan untuk
              menjawab tingginya kebutuhan material konstruksi Indonesia yang
              andal, efisien, dan bersertifikasi. Kami mengoperasikan pabrik
              modern dengan kapasitas produksi massal untuk mencetak saluran
              drainase, paving, pembatas aspal jalan, dan gorong-gorong
              utilitas.
            </p>
            <p className="text-darkslate/90 text-xs sm:text-base leading-relaxed mb-6 font-inter">
              Dalam kurun waktu pengabdian kami, {COMPANY_DATA.brand_name} telah
              dipercaya oleh berbagai kontraktor swasta nasional, BUMN karya,
              hingga dinas pekerjaan umum pemerintahan kota untuk mensuplai
              material prasarana drainase jalan raya, kawasan logistik industri
              pergudangan, hingga fasilitas perumahan modern.
            </p>
          </div>

          <div className="relative h-[20rem] md:h-[30rem] lg:h-[35rem] border border-bordergray rounded-none overflow-hidden">
            <img
              src="/field-pictures/image7.jpeg"
              alt={`${COMPANY_DATA.name}`}
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

        {/* CORE VALUES */}
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

          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3 md:gap-4 bg-gray-100">
            {[
              {
                src: "/field-pictures/image1.jpeg",
                alt: "Operasional 1",
                colSpan: "sm:col-span-1 lg:col-span-2",
                rowSpan: "sm:row-span-2",
              },
              {
                src: "/field-pictures/image2.jpeg",
                alt: "Operasional 2",
                colSpan: "sm:col-span-1 lg:col-span-2",
                rowSpan: "sm:col-span-1 lg:row-span-1",
              },
              {
                src: "/field-pictures/image3.jpeg",
                alt: "Operasional 3",
                colSpan: "sm:col-span-1",
                rowSpan: "sm:row-span-1 lg:row-span-2",
              },
              {
                src: "/field-pictures/image4.jpeg",
                alt: "Operasional 4",
                colSpan: "sm:col-span-2 lg:col-span-1",
                rowSpan: "sm:row-span-2 lg:row-span-1",
              },
              {
                src: "/field-pictures/image5.jpeg",
                alt: "Operasional 5",
                colSpan: "sm:col-span-1",
                rowSpan: "sm:row-span-2",
              },
              {
                src: "/field-pictures/image6.jpeg",
                alt: "Operasional 6",
                colSpan: "sm:col-span-1",
                rowSpan: "sm:row-span-1",
              },
              {
                src: "/field-pictures/image8.jpeg",
                alt: "Operasional 8",
                colSpan: "sm:col-span-1",
                rowSpan: "sm:row-span-2",
              },
              {
                src: "/field-pictures/image7.jpeg",
                alt: "Operasional 7",
                colSpan: "sm:col-span-1 lg:col-span-2",
                rowSpan: "sm:row-span-1",
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
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

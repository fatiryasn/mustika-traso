import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getProducts } from "@/lib/product/product";
import { getProjects } from "@/lib/project/project";
import { coreStrengths } from "@/data/coreStrengths";
import { statistics } from "@/data/statistics";
import ProjectCard from "@/components/ProjectCard";
import HeroImageStack from "@/components/HeroImageStack";
import { Metadata } from "next";

//TYPES
type HomeProduct = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string | null;
  description: string | null;
};
type HomeProject = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  client_name: string | null;
  year: string | null;
};

//FETCH DATA
async function fetchHomeData() {
  const [productsRes, projectsRes] = await Promise.all([
    getProducts({
      limit: 7,
      sort: { column: "created_at", ascending: false },
    }),
    getProjects({
      limit: 3,
      sort: { column: "created_at", ascending: false },
    }),
  ]);

  const products: HomeProduct[] = productsRes.data.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    thumbnail: p.thumbnail,
    description: p.description,
  }));

  const projects: HomeProject[] = projectsRes.data.map((p) => {
    let year: string | null = null;
    if (p.project_date) {
      const d = new Date(p.project_date);
      if (!isNaN(d.getTime())) {
        year = d.getFullYear().toString();
      }
    }
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      thumbnail: p.thumbnail,
      client_name: p.client_name,
      year,
    };
  });

  return { products, projects };
}

export const metadata: Metadata = {
  title: "Mustika Traso - Beton Pracetak Kualitas Tinggi",
  description:
    "PT. Mustika Traso adalah penyedia utama beton pra-cetak (precast) berlokasi di Medan, Sumatera Utara. Berstandar industri nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan pengiriman logistik untuk mendukung proyek infrastruktur Anda.",

  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Beton",
    "Beton Pracetak",
    "Beton Pracetak Medan",
    "Beton Pracetak Sumut",
    "Beton Medan Sumatera Utara",
    "PT. Mustika Traso",
    "Mustika Traso",
    "Supplier Beton Pracetak",
    "Precast Concrete",
  ],

  openGraph: {
    title: "Mustika Traso - Beton Pracetak Kualitas Tinggi",
    images: ["/og-image.png"],
    description:
      "PT. Mustika Traso adalah penyedia utama beton pra-cetak (precast) berlokasi di Medan, Sumatera Utara. Berstandar industri nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan pengiriman logistik untuk mendukung proyek infrastruktur Anda.",
    url: "https://mustika-traso.vercel.app",
    siteName: "Mustika Traso Medan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustika Traso - Beton Pracetak Kualitas Tinggi",
    description:
      "PT. Mustika Traso adalah penyedia utama beton pra-cetak (precast) berlokasi di Medan, Sumatera Utara. Berstandar industri nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan pengiriman logistik untuk mendukung proyek infrastruktur Anda.",
    images: ["/og-image.png"],
  },
};

export default async function HomePage() {
  const { products, projects } = await fetchHomeData();

  return (
    <div className="bg-background min-h-screen text-darkslate">
      {/* HERO */}
      <section
        id="hero-section"
        className="relative bg-darkslate text-white overflow-hidden min-h-screen flex flex-col pt-20"
      >
        {/* bg pattern*/}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/20 -skew-x-12 transform origin-top-right z-0" />

        {/* MAIN CONTENT */}
        <div className="flex-1 flex items-center mt-5 z-10">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
            {/* HERO-LEFT */}
            <div className="lg:col-span-7 p-5 sm:p-12 lg:p-16 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-grotesk leading-[0.9] uppercase mb-4">
                BETON PRACETAK
                <br />
                <span className="text-cyan-400">MUTU TERJAMIN</span>
                <br />
                SIAP KIRIM
              </h1>
              <p className="text-white/90 font-inter text-sm sm:text-base md:text-lg max-w-lg lg:mb-8 leading-relaxed">
                Penyedia utama beton pra-cetak (precast) berstandar industri
                nasional dengan mutu andal, kekuatan tekan teruji, dan ketepatan
                pengiriman logistik untuk mendukung proyek infrastruktur Anda.
              </p>
              <div className="hidden lg:flex flex-wrap gap-4">
                <Link
                  href="/produk"
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 text-sm font-jetbrains uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer rounded-none"
                >
                  <span>KATALOG PRODUK</span>
                  <FaArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/proyek"
                  className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-sm font-jetbrains font-bold uppercase tracking-widest transition-all cursor-pointer rounded-none"
                >
                  DOKUMENTASI PROYEK
                </Link>
              </div>
            </div>

            {/* HERO-RIGHT */}
            <div className="lg:col-span-5 flex items-center justify-center pr-6 sm:p-12 relative">
              <HeroImageStack
                images={[
                  {
                    src: "/field-pictures/image1.jpeg",
                    alt: "Mustika Traso Proyek 1",
                  },
                  {
                    src: "/field-pictures/image2.jpeg",
                    alt: "Mustika Traso Proyek 2",
                  },
                  {
                    src: "/field-pictures/image3.jpeg",
                    alt: "Mustika Traso Proyek 3",
                  },
                  {
                    src: "/field-pictures/image4.jpeg",
                    alt: "Mustika Traso Proyek 4",
                  },
                  {
                    src: "/field-pictures/image5.jpeg",
                    alt: "Mustika Traso Proyek 5",
                  },
                ]}
              />
            </div>

            <div className="flex items-center justify-center lg:hidden flex-wrap gap-4 p-8">
              <Link
                href="/produk"
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-5 py-2 text-sm font-jetbrains uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer rounded-none"
              >
                <span>KATALOG PRODUK</span>
                <FaArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/proyek"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white px-5 py-2 text-sm font-jetbrains font-bold uppercase tracking-widest transition-all cursor-pointer rounded-none"
              >
                DOKUMENTASI PROYEK
              </Link>
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="border-l border-t border-white/20 z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-6 sm:p-8 flex flex-col justify-center border-r border-white/20 last:border-r-0 ${
                  idx % 2 === 0 ? "bg-white/5" : "bg-transparent"
                } hover:bg-white/10 transition-all`}
              >
                <h4 className="text-3xl lg:text-4xl font-black font-display text-cyan-400 tracking-tighter mb-1">
                  {stat.value}
                </h4>
                <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-white/70 font-jetbrains">
                  {stat.label}
                </p>
              </div>
            ))}
            <Link
              href="/kontak"
              className="p-6 sm:p-8 flex flex-col justify-center bg-cyan-500 text-black hover:bg-cyan-400 transition-all cursor-pointer group"
            >
              <p className="text-xs uppercase font-bold tracking-widest text-black/70 mb-1 font-jetbrains">
                Dapatkan Penawaran SPH
              </p>
              <p className="text-base font-bold font-inter uppercase tracking-wide leading-tight group-hover:underline decoration-2 underline-offset-4 flex items-center gap-1.5">
                <span>Minta Penawaran SPH</span>
                <FaArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section
        id="core-values-section"
        className="py-20 bg-white border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-steelblue font-jetbrains tracking-widest uppercase mb-3">
              Keunggulan Layanan Kami
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black font-grotesk text-darkslate tracking-tight uppercase">
              REKAYASA BETON PRESISI TINGGI
            </p>
            <div className="h-1 w-16 bg-navy mx-auto mt-4" />
            <p className="text-darkslate/90 text-sm mt-5 leading-relaxed font-inter max-w-2xl mx-auto">
              Kami mematuhi rekayasa teknis ketat dari material homogen hingga
              kontrol curing pasca-cetak demi memastikan integritas struktural
              di ribuan proyek sipil nasional.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreStrengths.map((strength, idx) => {
              const isEven = idx % 2 === 0;
              const cardBg = "bg-background border-bordergray";
              const iconWrapper = isEven
                ? "bg-navy/10 border-navy/20 text-navy"
                : "bg-steelblue/10 border-steelblue/20 text-steelblue";

              return (
                <div
                  key={idx}
                  className={`group relative p-8 border rounded-none hover:shadow-lg transition-all duration-300 ${cardBg} ${
                    idx === 0 || idx === 3 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="absolute top-0 right-0 w-10 h-10 border-l border-b border-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div
                      className={`shrink-0 p-4 border rounded-none ${iconWrapper} text-2xl`}
                    >
                      {strength.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-inter text-darkslate mb-2 uppercase tracking-wide">
                        {strength.title}
                      </h3>
                      <p className="text-darkslate/80 text-sm leading-relaxed font-inter">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                      isEven ? "origin-right" : "origin-left"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS – unchanged */}
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

          <div className="flex flex-wrap justify-center gap-6">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 w-full">
                Belum ada produk tersedia.
              </p>
            ) : (
              products.map((prod) => (
                <div
                  key={prod.id}
                  className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white border border-bordergray hover:border-navy/40 hover:shadow-xl transition-all duration-300 rounded-none flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 border-b border-bordergray">
                    {prod.thumbnail ? (
                      <img
                        src={prod.thumbnail}
                        alt={prod.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-inter">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      <Link
                        href={`/produk/${prod.slug}`}
                        className="text-lg font-black font-inter text-darkslate uppercase tracking-wide group-hover:text-navy transition-colors line-clamp-2"
                      >
                        {prod.name}
                      </Link>
                      {prod.description && (
                        <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                          {prod.description}
                        </p>
                      )}
                    </div>
                    <div className="pt-5 border-t border-bordergray/60 mt-5 flex justify-between items-center">
                      <Link
                        href={`/produk/${prod.slug}`}
                        className="inline-flex items-center text-xs font-black font-jetbrains uppercase tracking-wider text-navy hover:text-steelblue transition-colors"
                      >
                        <span>SPESIFIKASI & UKURAN</span>
                        <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
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

          <div className="flex flex-wrap justify-center gap-6">
            {projects.length === 0 ? (
              <p className="text-center text-gray-500">
                Belum ada proyek tersedia.
              </p>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} className="max-w-xl w-full">
                  <ProjectCard project={proj} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

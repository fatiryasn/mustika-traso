// app/page.tsx
import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { getProducts } from "@/lib/product/product";
import { getProjects } from "@/lib/project/project";
import { coreStrengths } from "@/data/coreStrengths";
import { statistics } from "@/data/statistics";

// Types for the simplified home‑page data
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
  year: string | null; // extracted from project_date
};

// ─── Fetch data on the server ──────────────────────────────────────────
async function fetchHomeData() {
  const [productsRes, projectsRes] = await Promise.all([
    getProducts({
      limit: 5,
      sort: { column: "created_at", ascending: false },
    }),
    getProjects({
      limit: 3,
      sort: { column: "created_at", ascending: false },
    }),
  ]);

  // Map products to the shape needed for rendering
  const products: HomeProduct[] = productsRes.data.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    thumbnail: p.thumbnail,
    description: p.description,
  }));

  // Map projects and extract year from project_date
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

// ─── Page component (server) ────────────────────────────────────────────
export default async function HomePage() {
  const { products, projects } = await fetchHomeData();

  return (
    <div className="bg-background min-h-screen text-darkslate">
      {/* HERO */}
      <section
        id="hero-section"
        className="relative bg-white border-b border-bordergray "
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

          {/* HERO-RIGHT – creative 3‑image collage */}
          <div className="lg:col-span-5 bg-accentgray/10 relative min-h-[350px] lg:min-h-0 flex items-center justify-center p-8 lg:p-12 overflow-hidden">
            {/* Watermark */}
            <span className="text-[120px] lg:text-[180px] font-black font-display text-bordergray/30 leading-none select-none absolute top-4 right-6 uppercase">
              MT
            </span>

            {/* Collage container */}
            <div className="relative w-full max-w-md h-[380px] lg:h-[420px]">
              {/* Top‑left image (large) */}
              <div className="absolute top-0 left-0 w-[65%] h-[65%] border-2 border-navy shadow-lg overflow-hidden z-20">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600"
                  alt="Proyek 1"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top‑right image (medium) */}
              <div className="absolute top-4 right-0 w-[45%] h-[45%] border border-bordergray shadow-md overflow-hidden z-10">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400"
                  alt="Proyek 2"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom image (wide) */}
              <div className="absolute bottom-0 left-4 right-4 h-[40%] border-t-2 border-navy shadow-lg overflow-hidden z-30">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400"
                  alt="Proyek 3"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-navy z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS – unchanged */}
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

      {/* CORE VALUES – redesigned */}
      <section
        id="core-values-section"
        className="py-20 bg-white border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
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

          {/* Creative grid – 3 columns on lg, 2 on md, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreStrengths.map((strength, idx) => {
              // Alternate card styles for variety
              const isEven = idx % 2 === 0;
              const cardBg = isEven
                ? "bg-background border-bordergray"
                : "bg-white border-bordergray/60";
              const iconWrapper = isEven
                ? "bg-navy/10 border-navy/20 text-navy"
                : "bg-steelblue/10 border-steelblue/20 text-steelblue";

              return (
                <div
                  key={idx}
                  className={`group relative p-8 border rounded-none hover:shadow-lg transition-all duration-300 ${cardBg} ${
                    idx === 0 || idx === 3 ? "lg:col-span-2" : "" // first and last span 2 columns
                  }`}
                >
                  {/* Decorative corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-10 h-10 border-l border-b border-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

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

                  {/* Hover bar at bottom */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="featured-products-section"
        className="py-20 bg-white border-b border-bordergray"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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

          {/* Product Grid – handles odd counts gracefully */}
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
                  {/* Thumbnail with subtle overlay */}
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
                    {/* subtle overlay on hover */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
                  </div>

                  {/* Card Content */}
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

          {/* Project Flex Grid – handles odd counts gracefully */}
          <div className="flex flex-wrap justify-center gap-8">
            {projects.length === 0 ? (
              <p className="w-full text-center text-gray-500">
                Belum ada proyek tersedia.
              </p>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group w-full lg:w-[calc(50%-1rem)] bg-white border border-bordergray hover:border-navy/40 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row rounded-none overflow-hidden"
                >
                  {/* Project Image */}
                  <div className="relative h-56 md:h-auto md:w-2/5 overflow-hidden shrink-0 bg-gray-200 border-b md:border-b-0 md:border-r border-bordergray">
                    {proj.thumbnail ? (
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-inter text-sm">
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between grow">
                    <div className="space-y-3">
                      <Link
                        href={`/proyek/${proj.slug}`}
                        className="text-lg font-bold font-display text-darkslate uppercase tracking-wide leading-tight group-hover:text-navy transition-colors"
                      >
                        {proj.title}
                      </Link>
                      {proj.description && (
                        <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                          {proj.description}
                        </p>
                      )}
                    </div>
                    <div className="pt-4 border-t border-bordergray/60 mt-4 flex flex-wrap gap-2 text-xs">
                      {proj.client_name && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-sm font-medium uppercase tracking-wider">
                          {proj.client_name}
                        </span>
                      )}
                      {proj.year && (
                        <span className="bg-navy/10 text-navy px-3 py-1 rounded-sm font-bold font-mono">
                          {proj.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA – unchanged */}
      <section id="cta-section" className="py-24 relative overflow-hidden">
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
              <FaWhatsapp className="text-lg" />
              <span>Chat WhatsApp Sales</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";

export default function KontakPage() {
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
                  Hubungi Kami
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-white">
                KONTAK MUSTIKA TRASO
              </h1>
              <p className="text-white/90 font-inter text-xs sm:text-sm tracking-widest uppercase max-w-xl">
                Dapatkan informasi produk, harga, dan konsultasi teknis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bordergray border border-bordergray mb-12">
          {/* Alamat */}
          <div className="bg-white p-6 flex flex-col items-center text-center">
            <div className="bg-navy/10 p-3 text-navy inline-block border border-navy/20 mb-3">
              <FaMapMarkerAlt className="h-5 w-5" />
            </div>
            <h3 className="font-bold font-grotesk text-darkslate text-xs uppercase tracking-widest mb-2">
              Alamat
            </h3>
            <p className="text-darkslate/90 text-xs leading-relaxed font-inter">
              Jl. Mesjid Desa Kolam
              <br />
              Kecamatan Percut Sei Tuan
              <br />
              Kabupaten Deli Serdang
              <br />
              Sumatera Utara
            </p>
          </div>

          {/* Telepon */}
          <div className="bg-white p-6 flex flex-col items-center text-center">
            <div className="bg-navy/10 p-3 text-navy inline-block border border-navy/20 mb-3">
              <FaPhone className="h-5 w-5" />
            </div>
            <h3 className="font-bold font-grotesk text-darkslate text-xs uppercase tracking-widest mb-2">
              Telepon
            </h3>
            <a
              href="tel:082235495524"
              className="text-darkslate/90 text-sm font-semibold font-inter hover:text-navy transition-colors"
            >
              0822-3549-5524
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-6 flex flex-col items-center text-center">
            <div className="bg-navy/10 p-3 text-navy inline-block border border-navy/20 mb-3">
              <FaWhatsapp className="h-5 w-5" />
            </div>
            <h3 className="font-bold font-grotesk text-darkslate text-xs uppercase tracking-widest mb-2">
              WhatsApp
            </h3>
            <a
              href="https://wa.me/628126588348"
              target="_blank"
              rel="noopener noreferrer"
              className="text-darkslate/90 text-sm font-semibold font-inter hover:text-navy transition-colors"
            >
              0812-6588-348
            </a>
          </div>

          {/* Website */}
          <div className="bg-white p-6 flex flex-col items-center text-center">
            <div className="bg-navy/10 p-3 text-navy inline-block border border-navy/20 mb-3">
              <FaGlobe className="h-5 w-5" />
            </div>
            <h3 className="font-bold font-grotesk text-darkslate text-xs uppercase tracking-widest mb-2">
              Website
            </h3>
            <a
              href="https://mustikatraso.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-darkslate/80 text-sm font-semibold font-inter hover:text-navy transition-colors"
            >
              mustikatraso.com
            </a>
          </div>
        </div>

        {/* Two-column: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WhatsApp Form */}
          <ContactForm />

          {/* Google Maps */}
          <div className="bg-white border border-bordergray overflow-hidden flex flex-col">
            <div className="p-6 border-b border-bordergray">
              <h3 className="font-bold font-grotesk uppercase tracking-wider text-darkslate text-lg flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4 text-navy" />
                Peta Lokasi
              </h3>
            </div>
            <div className="flex-grow min-h-[400px] relative">
              <iframe
                title="Peta Lokasi Mustika Traso"
                src="https://maps.google.com/maps?q=Jl.%20Mesjid%20Desa%20Kolam%20Kecamatan%20Percut%20Sei%20Tuan%20Kabupaten%20Deli%20Serdang%20Sumatera%20Utara&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

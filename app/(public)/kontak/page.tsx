import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import PageBanner from "@/components/PageBanner";

export default function KontakPage() {
  return (
    <div className="bg-background min-h-screen pb-16 pt-4">
      {/* BANNER */}
      <PageBanner
        label="Hubungi Kami"
        title="KONTAK MUSTIKA TRASO"
        description="Dapatkan informasi produk, harga, dan konsultasi teknis"
      />
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

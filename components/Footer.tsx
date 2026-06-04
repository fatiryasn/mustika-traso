"use client";

import Link from "next/link";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Produk", href: "/produk" },
    { name: "Proyek", href: "/proyek" },
    { name: "Artikel", href: "/artikel" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <footer className="bg-darkblue text-white">
      {/* Main Footer Content */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
          {/* Column 1: Logo & Description */}
          <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/mustika-traso-logo-white.png"
                alt="Mustika Traso Logo"
                className="h-20 w-auto object-contain"
              />
            </Link>
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold font-grotesk uppercase tracking-widest mb-6 border-b border-white/20 pb-2">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm font-inter flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-steelblue rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold font-grotesk uppercase tracking-widest mb-6 border-b border-white/20 pb-2">
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 text-steelblue shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm font-inter">
                  Jl. Raya Industri No. 123, Kawasan GIIC, Cikarang, Bekasi,
                  Jawa Barat 17550
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-steelblue shrink-0" />
                <a
                  href="tel:+622112345678"
                  className="text-white/70 hover:text-white transition-colors text-sm font-inter"
                >
                  (021) 1234 5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-steelblue shrink-0" />
                <a
                  href="mailto:info@mustikatraso.co.id"
                  className="text-white/70 hover:text-white transition-colors text-sm font-inter"
                >
                  info@mustikatraso.co.id
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp CTA */}
          <div className="flex-1 min-w-0 bg-white/5 border border-white/10 p-6 rounded-none">
            <h3 className="text-sm font-bold font-grotesk uppercase tracking-widest mb-4">
              Butuh Penawaran?
            </h3>
            <p className="text-white/70 text-sm font-inter mb-5">
              Tim sales kami siap membantu estimasi harga dan spesifikasi custom
              untuk proyek Anda.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Mustika%20Traso%2C%20saya%20ingin%20konsultasi%20kebutuhan%20beton%20precast"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-grotesk font-bold py-3 px-5 rounded-full inline-flex items-center justify-center w-full transition-colors duration-200 text-sm uppercase tracking-wide"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 flex justify-center py-3">
        <p className="text-white/50 text-xs font-inter">
          © {currentYear} PT Mustika Trasu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

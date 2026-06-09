"use client";

import Link from "next/link";
import {
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { COMPANY_DATA, ROUTES } from "@/data/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: ROUTES.home },
    { name: "Tentang Kami", href: ROUTES.about },
    { name: "Produk", href: ROUTES.product },
    { name: "Proyek", href: ROUTES.project },
    { name: "Artikel", href: ROUTES.article },
    { name: "Kontak", href: ROUTES.contact },
  ];

  return (
    <footer className="pt-32">
      {/* CTA BANNER */}
      <section className="relative bg-darkblue overflow-hidden py-20 lg:py-28">
        {/* bg grid pattern*/}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* decoratives */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-10 w-[400px] h-[400px] bg-navy/30 rounded-full blur-3xl pointer-events-none" />

        <div className="hidden lg:block absolute top-0 right-0 h-full w-1/3 skew-x-12 transform origin-top-right border-l-2 border-b-2 border-cyan-500 overflow-hidden">
          <img
            src="/field-pictures/image6.jpeg"
            alt=""
            className="absolute top-0 left-0 min-w-full min-h-full object-cover -skew-x-12 scale-120"
            style={{ objectPosition: "center" }}
          />
        </div>

        <div className="relative max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-cyan-500" />
                <span className="text-cyan-400 text-xs font-black font-jetbrains uppercase tracking-widest">
                  Butuh Penawaran?
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-grotesk text-white tracking-tight uppercase">
                ESTIMASI HARGA SPH & UKURAN CUSTOM
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-inter max-w-xl">
                Tim Estimator kami siap membantu menghitung kebutuhan tonase,
                spesifikasi pembesian single/double wiremesh, serta koordinasi
                teknis pengiriman ke lokasi proyek Anda.
              </p>

              <div className="flex gap-4 lg:gap-6 items-start">
                <Link
                  href="/kontak"
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm uppercase tracking-widest transition-colors rounded-none w-full sm:w-auto text-center font-jetbrains text-nowrap"
                >
                  Minta Surat Penawaran
                </Link>
                <a
                  href={`https://wa.me/${COMPANY_DATA.wa_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-green-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-green-700 transition rounded-none w-full sm:w-auto inline-flex items-center justify-center gap-2 font-jetbrains text-nowrap"
                >
                  <FaWhatsapp className="text-lg" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DARK FOOTER CONTENT (unchanged) ===== */}
      <div className="bg-darkblue text-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
            {/* LOGO & SOCIALS */}
            <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-start space-y-4">
              <Link href="/" className="inline-block">
                <img
                  src="/mustika-traso-logo-white.png"
                  alt="Mustika Traso Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
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

            {/* NAV LINKS */}
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

            {/* CONTACT INFO */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold font-grotesk uppercase tracking-widest mb-6 border-b border-white/20 pb-2">
                Kontak
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-steelblue shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm font-inter">
                    {COMPANY_DATA.address}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <FaPhone className="w-4 h-4 text-steelblue shrink-0" />
                  <a
                    href={`tel:${COMPANY_DATA.phone_number}`}
                    className="text-white/70 hover:text-white transition-colors text-sm font-inter"
                  >
                    +{COMPANY_DATA.phone_number}
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <FaWhatsapp className="w-4 h-4 text-steelblue shrink-0" />
                  <a
                    href={`https://wa.me/${COMPANY_DATA.wa_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-sm font-inter"
                  >
                    +{COMPANY_DATA.wa_number}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 flex justify-center py-3">
          <p className="text-white/50 text-xs font-inter">
            © {currentYear} PT Mustika Traso. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

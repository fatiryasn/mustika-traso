"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

import { COMPANY_DATA, ROUTES } from "@/data/constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: ROUTES.home },
    { name: "Tentang Kami", href: ROUTES.about },
    { name: "Produk", href: ROUTES.product },
    { name: "Proyek", href: ROUTES.project },
    { name: "Artikel", href: ROUTES.article },
    { name: "Kontak", href: ROUTES.contact },
  ];

  // Transparent navbar state
  const isTransparent = isHomePage && isAtTop;

  const bgClass = isMenuOpen && isTransparent
    ? "bg-darkblue/30 backdrop-blur-sm"
    : isTransparent && !isMenuOpen
      ? "bg-transparent"
      : "bg-white shadow-sm";
  const textColor = isTransparent ? "text-white" : "text-darkslate";
  const hoverColor = isTransparent ? "hover:text-cyan-400" : "hover:text-navy";

  const logoSrc = isTransparent
    ? "/mustika-traso-logo-white.png"
    : "/mustika-traso-logo.png";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/">
              <img
                src={logoSrc}
                alt="Mustika Traso Logo"
                className="h-10 md:h-12 xl:h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${textColor} ${hoverColor} px-3 py-2 rounded-md font-medium font-grotesk transition-colors duration-200 uppercase tracking-wide text-base md:text-sm xl:text-base`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* WhatsApp Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`https://wa.me/${COMPANY_DATA.wa_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-grotesk font-medium py-2 px-4 rounded-full inline-flex items-center transition-all duration-200 text-base lg:text-sm xl:text-base ${
                isTransparent
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-navy hover:bg-navy/80 text-white"
              }`}
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Kontak kami
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy ${
                isTransparent
                  ? "text-white hover:bg-white/20"
                  : "text-gray-700 hover:text-navy hover:bg-gray-100"
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg transition-colors duration-300 ${
            isTransparent ? "bg-transparent" : "bg-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isTransparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-2 px-3 py-2">
            <a
              href={`https://wa.me/${COMPANY_DATA.wa_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy hover:bg-navy/80 text-white font-grotesk font-medium py-2 px-4 rounded-full inline-flex items-center justify-center w-full transition-colors duration-200"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Kontak kami
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

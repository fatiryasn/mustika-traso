"use client";

import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaComment,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productInterest: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Reset success message after 5 seconds
  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => setFormSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!formData.name.trim()) return setErrorMessage("Nama wajib diisi.");
    if (!formData.email.trim()) return setErrorMessage("Email wajib diisi.");
    if (!formData.phone.trim())
      return setErrorMessage("Nomor Telepon wajib diisi.");
    if (!formData.message.trim()) return setErrorMessage("Pesan wajib diisi.");

    // In a real app, you'd send this data to an API endpoint
    console.log("Inquiry submitted:", formData);

    setFormSubmitted(true);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      productInterest: "",
      message: "",
    });
  };

  const productOptions = [
    "U-Ditch (Saluran Air Beton)",
    "Box Culvert (Gorong-gorong Kotak)",
    "Paving Block (Conblock Premium)",
    "Kanstin Beton (Curbing Block)",
    "Road Barrier Beton (Movable Barrier)",
    "Pipa Beton RCP (Buis Beton)",
    "Custom precast beton",
    "Lainnya / Pertanyaan Umum",
  ];

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Banner ===== */}
        <div className="relative bg-white text-darkslate border-y lg:border border-bordergray overflow-hidden mb-16 p-8 md:p-16 rounded-none">
          <div className="absolute inset-0 opacity-40 grid-diagonal pointer-events-none"></div>
          <div className="relative max-w-2xl z-10 space-y-3">
            <div className="w-12 h-1 bg-navy"></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-navy">
              HUBUNGI MUSTIKA TRASU
            </h1>
            <p className="text-darkslate/70 font-inter text-xs sm:text-sm tracking-widest uppercase">
              Minta Surat Penawaran Harga (SPH), konsultasi ukuran, atau
              kunjungan pabrik
            </p>
          </div>
        </div>

        {/* ===== Contact info cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-bordergray border border-bordergray mb-16 rounded-none">
          <div className="bg-white p-6 text-center rounded-none flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-navy/10 p-3 text-navy inline-block rounded-none border border-navy/20">
                <FaPhone className="h-5 w-5" />
              </div>
              <h3 className="font-bold font-display text-darkslate text-xs uppercase tracking-widest">
                Telepon / Sales WA
              </h3>
              <p className="text-darkslate/80 text-xs sm:text-sm font-semibold mb-1 font-inter">
                +62 812-3456-7890
              </p>
            </div>
            <p className="text-gray-400 text-[10px] font-mono leading-normal mt-3">
              (Fast Respond WhatsApp)
            </p>
          </div>

          <div className="bg-white p-6 text-center rounded-none flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-navy/10 p-3 text-navy inline-block rounded-none border border-navy/20">
                <FaEnvelope className="h-5 w-5" />
              </div>
              <h3 className="font-bold font-display text-darkslate text-xs uppercase tracking-widest">
                Email Surat Masuk
              </h3>
              <p className="text-darkslate/80 text-xs sm:text-sm font-semibold mb-1 font-inter">
                marketing@mustikatrasu.com
              </p>
            </div>
            <p className="text-gray-400 text-[10px] font-mono leading-normal mt-3">
              Surat Penawaran / PO Resmi
            </p>
          </div>

          <div className="bg-white p-6 text-center col-span-1 md:col-span-2 rounded-none flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-navy/10 p-3 text-navy inline-block rounded-none border border-navy/20">
                <FaMapMarkerAlt className="h-5 w-5" />
              </div>
              <h3 className="font-bold font-display text-darkslate text-xs uppercase tracking-widest">
                Lokasi Workshop Pabrik
              </h3>
              <p className="text-darkslate/80 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-inter">
                Jl. Raya Narogong Km. 18, Bantar Gebang, Bekasi, Jawa Barat
                17151
              </p>
            </div>
            <p className="text-accentgray text-[10px] font-mono leading-normal mt-3 uppercase tracking-widest">
              Kawasan Industri Narogong KM. 18
            </p>
          </div>
        </div>

        {/* ===== Form & Map Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Inquiry Form */}
          <div className="bg-white p-8 border border-bordergray rounded-none">
            <div className="flex items-center space-x-3 mb-6 border-b border-bordergray pb-4">
              <FaComment className="h-5 w-5 text-navy" />
              <h2 className="text-sm font-bold font-display tracking-widest uppercase text-darkslate">
                FORMULIR ESTIMASI INQUIRY
              </h2>
            </div>

            {formSubmitted ? (
              <div className="border border-green-200 bg-green-50 p-8 text-center rounded-none">
                <FaCheckCircle className="h-10 w-10 text-green-600 mx-auto mb-4" />
                <h3 className="text-sm font-bold font-display uppercase tracking-widest text-green-800 mb-2">
                  Pesan Berhasil Terkirim!
                </h3>
                <p className="text-green-700 text-xs leading-relaxed font-inter max-w-sm mx-auto">
                  Terima kasih atas rincian volume proyek Anda. Tim Estimator
                  PT. Mustika Trasu akan mengalkulasi rincian SPH Anda dalam
                  waktu maks 1x24 jam kerja.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-[10px] font-semibold font-mono uppercase">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ir. Budi"
                      className="w-full px-4 py-2.5 bg-background border border-bordergray rounded-none focus:outline-none focus:border-navy text-darkslate text-xs font-inter placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                      Nama Perusahaan / Instansi
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="PT. Adhi Karya (Persero)"
                      className="w-full px-4 py-2.5 bg-background border border-bordergray rounded-none focus:outline-none focus:border-navy text-darkslate text-xs font-inter placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                      Nomor Telepon / WA Pasif *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812XXXXXXXX"
                      className="w-full px-4 py-2.5 bg-background border border-bordergray rounded-none focus:outline-none focus:border-navy text-darkslate text-xs font-inter placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="budi@karya.com"
                      className="w-full px-4 py-2.5 bg-background border border-bordergray rounded-none focus:outline-none focus:border-navy text-darkslate text-xs font-inter placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                    Ketertarikan Produk Beton
                  </label>
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-background border border-bordergray rounded-none focus:outline-none focus:border-navy text-darkslate text-xs font-inter"
                  >
                    <option value="">-- Pilih Produk Beton --</option>
                    {productOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                    Rincian Deskripsi Kebutuhan Proyek *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Sebutkan rincian dimensi precast, rincian volume panjang/tonase, wilayah pengiriman (Kota), serta estimasi tanggal pasang di lapangan..."
                    className="w-full px-4 py-2.5 bg-background border border-bordergray rounded-none focus:outline-none focus:border-navy text-darkslate text-xs font-inter leading-relaxed resize-none placeholder-gray-400"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-navy hover:bg-steelblue text-white font-bold rounded-none uppercase tracking-widest transition-colors inline-flex items-center justify-center space-x-2 cursor-pointer text-xs font-mono"
                  >
                    <span>KIRIM FORMULIR INQUIRY</span>
                    <FaPaperPlane className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Map & Workshop Info */}
          <div className="bg-white border border-bordergray rounded-none overflow-hidden flex flex-col h-full lg:min-h-[550px]">
            <div className="p-6 border-b border-bordergray bg-white flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-bold font-display uppercase tracking-wider text-darkslate text-sm">
                  PETA LOKASI WORKSHOP
                </h3>
                <p className="text-gray-400 font-mono text-[9px] uppercase tracking-widest">
                  Garansi Keberadaan Fisik Perusahaan
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-mono">
                <FaClock className="h-4 w-4 text-navy" />
                <span>08.00 - 17.00 WIB</span>
              </div>
            </div>

            <div className="flex-grow bg-gray-100 min-h-[300px] relative">
              <iframe
                title="Peta Alamat PT Mustika Trasu"
                src="https://maps.google.com/maps?q=Jl.%20Raya%20Narogong%2C%20Bantar%20Gebang%2C%20Bekasi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>

            <div className="p-6 bg-background border-t border-bordergray text-xs leading-relaxed text-darkslate/70 font-inter">
              <span className="font-extrabold uppercase font-mono tracking-widest text-darkslate block mb-1">
                Panduan Menuju Lokasi Workshop:
              </span>
              <p>
                Keluar pintu tol Bekasi Barat atau Jatiasih, arahkan armada
                logistik lurus menyusuri jalan raya utama Siliwangi/Narogong ke
                arah selatan menuju gerbang tol Bantar Gebang. Kantor dan pabrik
                berada tepat di sebelah kiri jalan utama sebelum jembatan besar
                pertama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

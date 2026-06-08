// components/KontakForm.tsx
"use client";
import { useState } from "react";
import { FaPaperPlane, FaWhatsapp } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Nama dan Deskripsi wajib diisi.");
      return;
    }
    // Construct WhatsApp message
    const message = `Halo, saya ${formData.name}${
      formData.company ? ` dari ${formData.company}` : ""
    }.${
      formData.email ? ` Email: ${formData.email}.` : ""
    }\n\n${formData.description}`;
    const waNumber = "628126588348";
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 border border-bordergray space-y-4 text-sm"
    >
      <div className="flex items-center gap-2 border-b border-bordergray pb-4 mb-4">
        <h2 className="font-bold font-grotesk text-darkslate uppercase tracking-wide text-lg">
          Kirim Pesan
        </h2>
      </div>
      <div>
        <label className="block text-xs font-inter font-bold text-darkslate/90 uppercase tracking-widest mb-1">
          Nama Lengkap *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nama Anda"
          className="w-full px-4 py-2.5 border border-bordergray rounded-none focus:outline-none focus:border-navy text-xs"
        />
      </div>
      <div>
        <label className="block text-xs font-inter font-bold text-darkslate/90 uppercase tracking-widest mb-1">
          Perusahaan (opsional)
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nama Perusahaan"
          className="w-full px-4 py-2.5 border border-bordergray rounded-none focus:outline-none focus:border-navy text-xs"
        />
      </div>
      <div>
        <label className="block text-xs font-inter font-bold text-darkslate/90 uppercase tracking-widest mb-1">
          Email (opsional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          className="w-full px-4 py-2.5 border border-bordergray rounded-none focus:outline-none focus:border-navy text-xs"
        />
      </div>
      <div>
        <label className="block text-xs font-inter font-bold text-darkslate/90 uppercase tracking-widest mb-1">
          Deskripsi Kebutuhan *
        </label>
        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Jelaskan kebutuhan Anda..."
          className="w-full px-4 py-2.5 border border-bordergray rounded-none focus:outline-none focus:border-navy text-xs resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 px-6 bg-green-600 hover:bg-green-700 text-white font-bold font-inter uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-xs"
      >
        <FaPaperPlane className="h-3.5 w-3.5" />
        Kirim via WhatsApp
      </button>
    </form>
  );
}

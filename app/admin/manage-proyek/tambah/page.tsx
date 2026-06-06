// app/admin/manage-proyek/tambah/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HiOutlineUpload, HiOutlineArrowLeft } from "react-icons/hi";
import { createProject, uploadProjectImage } from "@/lib/project/project";

export default function TambahProyekPage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Thumbnail change handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Judul proyek harus diisi");
      return;
    }

    setLoading(true);
    try {
      let thumbnailUrl = "";

      // Upload image if provided
      if (thumbnail) {
        setUploading(true);
        const imageFormData = new FormData();
        imageFormData.append("file", thumbnail);
        thumbnailUrl = await uploadProjectImage(imageFormData);
        setUploading(false);
      }

      // Create project via server action
      await createProject({
        title,
        description: description || undefined,
        client_name: clientName || undefined,
        project_date: projectDate || undefined,
        thumbnail: thumbnailUrl || undefined,
      });

      toast.success("Proyek berhasil ditambahkan");
      router.push("/admin/manage-proyek");
    } catch (error: any) {
      toast.error("Gagal menambahkan proyek: " + error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-grotesk font-bold text-gray-800">
            Tambah Proyek Baru
          </h1>
          <p className="text-darkslate/80 font-inter text-sm mt-1">
            Isi detail proyek yang akan ditampilkan di portofolio
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informasi Proyek */}
        <div className="bg-white rounded p-6 shadow-sm border border-gray-300 space-y-5">
          <h2 className="font-semibold text-gray-800 font-grotesk text-lg">
            Informasi Proyek
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Judul Proyek <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Misal: Pembangunan Jembatan Beton"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Deskripsi (opsional)
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat proyek..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all resize-none"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Nama Klien (opsional)
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Misal: Dinas PU"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all"
            />
          </div>

          {/* Project Date */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Tanggal Proyek (opsional)
            </label>
            <input
              type="date"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Thumbnail
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl hover:border-navy text-sm font-inter text-gray-600 transition-colors">
                <HiOutlineUpload className="w-5 h-5" />
                {thumbnail ? "Ganti Gambar" : "Upload Gambar"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="h-20 w-20 rounded-sm object-cover border border-gray-200"
                />
              )}
            </div>
            {uploading && (
              <p className="text-xs text-darkslate/80 mt-1 font-manrope">
                Mengunggah gambar...
              </p>
            )}
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-jetbrains text-sm hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-5 py-2.5 bg-navy hover:bg-steelblue text-white rounded-xl font-jetbrains font-medium text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading ? "Menyimpan..." : "Simpan Proyek"}
          </button>
        </div>
      </form>
    </div>
  );
}

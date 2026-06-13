"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HiOutlineUpload, HiOutlineArrowLeft } from "react-icons/hi";

import { createArticle, uploadArticleImage } from "@/lib/article/article";
import RichTextEditor from "@/components/RichTextEditor";

export default function TambahArtikelPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  //THUMBNAIL CHANGE
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  //HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Judul artikel harus diisi");
      return;
    }

    setLoading(true);
    try {
      let thumbnailUrl = "";

      if (thumbnail) {
        setUploading(true);
        const imageFormData = new FormData();
        imageFormData.append("file", thumbnail);
        thumbnailUrl = await uploadArticleImage(imageFormData);
        setUploading(false);
      }

      await createArticle({
        title,
        excerpt: excerpt || undefined,
        content: content || undefined,
        author: author || undefined,
        thumbnail: thumbnailUrl || undefined,
      });

      toast.success("Artikel berhasil ditambahkan");
      router.push("/admin/manage-artikel");
    } catch (error: any) {
      toast.error("Gagal menambahkan artikel: " + error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-grotesk font-bold text-gray-800">
            Tambah Artikel Baru
          </h1>
          <p className="text-darkslate/80 font-inter text-xs md:text-sm mt-1">
            Tulis artikel atau berita terbaru
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informasi Artikel */}
        <div className="bg-white rounded p-6 shadow-sm border border-gray-300 space-y-5">
          <h2 className="font-semibold text-gray-800 font-grotesk text-lg">
            Informasi Artikel
          </h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul artikel"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Kutipan / Ringkasan (opsional)
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat artikel..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Konten Artikel
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Penulis (opsional)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Misal: Admin Mustika"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Thumbnail
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
                  className="h-28 w-40 rounded-sm object-cover border border-gray-200"
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

        {/* Buttons */}
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
            {loading ? "Menyimpan..." : "Simpan Artikel"}
          </button>
        </div>
      </form>
    </div>
  );
}

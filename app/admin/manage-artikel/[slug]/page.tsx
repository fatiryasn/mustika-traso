// app/admin/manage-artikel/[slug]/page.tsx
"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineUpload,
  HiOutlineArrowLeft,
  HiOutlineSave,
} from "react-icons/hi";
import {
  getArticleBySlug,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
} from "@/lib/article/article";
import { formatDate } from "@/lib/utils/format";
import RichTextEditor from "@/components/RichTextEditor";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  // States
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [original, setOriginal] = useState<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    thumbnail: string;
  } | null>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [articleId, setArticleId] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  // Load article
  useEffect(() => {
    const load = async () => {
      const article = await getArticleBySlug(slug);
      if (!article) {
        toast.error("Artikel tidak ditemukan");
        router.push("/admin/manage-artikel");
        return;
      }
      setArticleId(article.id);
      setTitle(article.title);
      setExcerpt(article.excerpt || "");
      setContent(article.content || "");
      setAuthor(article.author || "");
      setThumbnailUrl(article.thumbnail || "");
      setThumbnailPreview(article.thumbnail || "");
      setCreatedAt(article.created_at);
      setOriginal({
        title: article.title,
        excerpt: article.excerpt || "",
        content: article.content || "",
        author: article.author || "",
        thumbnail: article.thumbnail || "",
      });
      setLoading(false);
    };
    load();
  }, [slug, router]);

  // Toggle mode
  const toggleMode = () => {
    if (mode === "view") {
      setMode("edit");
    } else {
      if (original) {
        setTitle(original.title);
        setExcerpt(original.excerpt);
        setContent(original.content);
        setAuthor(original.author);
        setThumbnailUrl(original.thumbnail);
        setThumbnailPreview(original.thumbnail);
        setThumbnailFile(null);
      }
      setMode("view");
    }
  };

  // Thumbnail change
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Detect changes
  const hasChanges = useCallback(() => {
    if (!original) return false;
    return (
      title !== original.title ||
      excerpt !== original.excerpt ||
      content !== original.content ||
      author !== original.author ||
      thumbnailFile !== null ||
      thumbnailUrl !== original.thumbnail
    );
  }, [original, title, excerpt, content, author, thumbnailFile, thumbnailUrl]);

  // Save
  const handleSave = async () => {
    if (!hasChanges()) return;
    setSaving(true);
    try {
      let finalThumbnailUrl = thumbnailUrl;
      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        finalThumbnailUrl = await uploadArticleImage(formData);
      }

      await updateArticle({
        id: articleId,
        slug,
        title,
        excerpt: excerpt || undefined,
        content: content || undefined,
        author: author || undefined,
        thumbnail: finalThumbnailUrl || undefined,
      });

      toast.success("Artikel berhasil diperbarui");
      // Refresh data
      const updated = await getArticleBySlug(slug);
      if (updated) {
        setThumbnailUrl(updated.thumbnail || "");
        setThumbnailPreview(updated.thumbnail || "");
        setThumbnailFile(null);
        setCreatedAt(updated.created_at);
        setTitle(updated.title);
        setExcerpt(updated.excerpt || "");
        setContent(updated.content || "");
        setAuthor(updated.author || "");
        setOriginal({
          title: updated.title,
          excerpt: updated.excerpt || "",
          content: updated.content || "",
          author: updated.author || "",
          thumbnail: updated.thumbnail || "",
        });
      }
    } catch (error: any) {
      toast.error("Gagal menyimpan: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus artikel ini secara permanen?")) {
      try {
        await deleteArticle(articleId);
        toast.success("Artikel berhasil dihapus");
        router.push("/admin/manage-artikel");
      } catch (error: any) {
        toast.error("Gagal menghapus: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Memuat data artikel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/manage-artikel")}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-grotesk font-bold text-darkslate/90">
              {mode === "view" ? "Detail Artikel" : "Edit Artikel"}
            </h1>
            <p className="text-sm text-darkslate/80 font-inter">
              {mode === "view"
                ? "Lihat informasi lengkap artikel"
                : "Ubah data artikel"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 self-start">
          <button
            onClick={toggleMode}
            className={`px-4 py-2 rounded-xl text-sm font-jetbrains font-medium flex items-center gap-2 transition-colors ${
              mode === "view"
                ? "bg-navy text-white hover:bg-steelblue"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {mode === "view" ? (
              <>
                <HiOutlinePencil className="w-4 h-4" /> Edit
              </>
            ) : (
              <>
                <HiOutlineEye className="w-4 h-4" /> Lihat
              </>
            )}
          </button>
          {mode === "edit" && (
            <button
              onClick={handleSave}
              disabled={!hasChanges() || saving}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-jetbrains font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <HiOutlineSave className="w-4 h-4" />
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          )}
        </div>
      </div>

      {/* DETAIL CARD */}
      <div className="bg-white rounded shadow-sm border border-gray-300 p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Judul Artikel
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-medium font-inter">{title}</p>
          ) : (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm"
            />
          )}
        </div>

        {/* Slug (read-only) */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Slug
          </label>
          <p className="text-darkslate/80 font-inter bg-gray-50 p-2 rounded-lg">
            {slug}
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Kutipan / Ringkasan
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-inter whitespace-pre-wrap">
              {excerpt || "-"}
            </p>
          ) : (
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm resize-none"
            />
          )}
        </div>

        {/* Content (Rich Text) */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Konten Artikel
          </label>
          {mode === "view" ? (
            <div
              className="prose prose-sm max-w-none text-darkslate/90 font-inter"
              dangerouslySetInnerHTML={{ __html: content || "-" }}
            />
          ) : (
            <RichTextEditor content={content} onChange={setContent} />
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Penulis
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-inter">{author || "-"}</p>
          ) : (
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm"
            />
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Thumbnail
          </label>
          <div className="flex items-center gap-4">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail"
                className="h-20 w-20 rounded-xl object-cover border border-gray-200"
              />
            ) : (
              <div className="h-20 w-20 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                -
              </div>
            )}
            {mode === "edit" && (
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl hover:border-navy text-sm font-inter text-gray-600 transition-colors">
                <HiOutlineUpload className="w-5 h-5" />
                {thumbnailFile ? "Ganti Gambar" : "Upload Gambar"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Created At */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Dibuat pada
          </label>
          <p className="text-darkslate/90 font-inter">
            {formatDate(createdAt)}
          </p>
        </div>
      </div>

      {/* DELETE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-red-600 font-grotesk">
              Hapus Artikel
            </h3>
            <p className="text-sm text-darkslate/80 font-inter mt-1">
              Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus
              permanen.
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-jetbrains font-medium transition-colors flex items-center gap-2"
          >
            <HiOutlineTrash className="w-4 h-4" />
            Hapus Artikel
          </button>
        </div>
      </div>
    </div>
  );
}

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
  getProjectBySlug,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "@/lib/project/project";
import { formatDate } from "@/lib/utils/format";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  //STATES
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [original, setOriginal] = useState<{
    title: string;
    description: string;
    client_name: string;
    project_date: string;
    thumbnail: string;
  } | null>(null);

  //EDITABLE FIELDS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [projectId, setProjectId] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  //LOAD PROJECT
  useEffect(() => {
    const load = async () => {
      const project = await getProjectBySlug(slug);
      if (!project) {
        toast.error("Proyek tidak ditemukan");
        router.push("/admin/manage-proyek");
        return;
      }
      setProjectId(project.id);
      setTitle(project.title);
      setDescription(project.description || "");
      setClientName(project.client_name || "");
      setProjectDate(project.project_date || "");
      setThumbnailUrl(project.thumbnail || "");
      setThumbnailPreview(project.thumbnail || "");
      setCreatedAt(project.created_at);
      setOriginal({
        title: project.title,
        description: project.description || "",
        client_name: project.client_name || "",
        project_date: project.project_date || "",
        thumbnail: project.thumbnail || "",
      });
      setLoading(false);
    };
    load();
  }, [slug, router]);

  //EDIT/VIEW TOGGLE
  const toggleMode = () => {
    if (mode === "view") {
      setMode("edit");
    } else {
      if (original) {
        setTitle(original.title);
        setDescription(original.description);
        setClientName(original.client_name);
        setProjectDate(original.project_date);
        setThumbnailUrl(original.thumbnail);
        setThumbnailPreview(original.thumbnail);
        setThumbnailFile(null);
      }
      setMode("view");
    }
  };

  //THUMBNAIL CHANGE
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  //DETECT CHANGE
  const hasChanges = useCallback(() => {
    if (!original) return false;
    return (
      title !== original.title ||
      description !== original.description ||
      clientName !== original.client_name ||
      projectDate !== original.project_date ||
      thumbnailFile !== null ||
      thumbnailUrl !== original.thumbnail
    );
  }, [
    original,
    title,
    description,
    clientName,
    projectDate,
    thumbnailFile,
    thumbnailUrl,
  ]);

  //HANDLE SAVE
  const handleSave = async () => {
    if (!hasChanges()) return;
    setSaving(true);
    try {
      let finalThumbnailUrl = thumbnailUrl;
      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        finalThumbnailUrl = await uploadProjectImage(formData);
      }

      await updateProject({
        id: projectId,
        slug,
        title,
        description: description || undefined,
        client_name: clientName || undefined,
        project_date: projectDate || undefined,
        thumbnail: finalThumbnailUrl || undefined,
      });

      toast.success("Proyek berhasil diperbarui");
      const updated = await getProjectBySlug(slug);
      if (updated) {
        setThumbnailUrl(updated.thumbnail || "");
        setThumbnailPreview(updated.thumbnail || "");
        setThumbnailFile(null);
        setCreatedAt(updated.created_at);
        setTitle(updated.title);
        setDescription(updated.description || "");
        setClientName(updated.client_name || "");
        setProjectDate(updated.project_date || "");
        setOriginal({
          title: updated.title,
          description: updated.description || "",
          client_name: updated.client_name || "",
          project_date: updated.project_date || "",
          thumbnail: updated.thumbnail || "",
        });
      }
    } catch (error: any) {
      toast.error("Gagal menyimpan: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  //HANDLE DELETE
  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus proyek ini secara permanen?")) {
      try {
        await deleteProject(projectId);
        toast.success("Proyek berhasil dihapus");
        router.push("/admin/manage-proyek");
      } catch (error: any) {
        toast.error("Gagal menghapus: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Memuat data proyek...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/manage-proyek")}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-grotesk font-bold text-darkslate/90">
              {mode === "view" ? "Detail Proyek" : "Edit Proyek"}
            </h1>
            <p className="text-xs md:text-sm text-darkslate/80 font-inter">
              {mode === "view"
                ? "Lihat informasi lengkap proyek"
                : "Ubah data proyek"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 self-start">
          <button
            onClick={toggleMode}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-jetbrains font-medium flex items-center gap-2 transition-colors ${
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
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs md:text-sm font-jetbrains font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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
            Judul Proyek
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

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Slug
          </label>
          <p className="text-darkslate/80 font-inter bg-gray-50 p-2 rounded-lg">
            {slug}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Deskripsi
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-inter whitespace-pre-wrap">
              {description || "-"}
            </p>
          ) : (
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm resize-none"
            />
          )}
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Nama Klien
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-inter">{clientName || "-"}</p>
          ) : (
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Misal: Dinas PU"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm"
            />
          )}
        </div>

        {/* Project Date */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Tanggal Proyek
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-inter">
              {projectDate ? formatDate(projectDate, false) : "-"}
            </p>
          ) : (
            <input
              type="date"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm"
            />
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Thumbnail
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail"
                className="h-28 w-40 rounded object-cover border border-gray-200"
              />
            ) : (
              <div className="h-28 w-40 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
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
              Hapus Proyek
            </h3>
            <p className="text-sm text-darkslate/80 font-inter mt-1">
              Tindakan ini tidak dapat dibatalkan. Proyek akan dihapus permanen.
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs sm:text-sm font-jetbrains font-medium transition-colors flex items-center gap-2"
          >
            <HiOutlineTrash className="w-4 h-4" />
            Hapus Proyek
          </button>
        </div>
      </div>
    </div>
  );
}

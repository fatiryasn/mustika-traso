"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineUpload,
  HiOutlineArrowLeft,
  HiOutlineSave,
  HiOutlineClipboardList,
} from "react-icons/hi";
import {
  getProductBySlug,
  updateProductWithSubProducts,
  deleteProduct,
  uploadProductImage,
} from "@/lib/product/product";
import { formatDate } from "@/lib/utils/format";
import SubProductBulkImport from "@/components/SubProductBulkImport";

interface SubProduct {
  id?: string;
  name: string;
  size: string;
  weight: string;
  price: string;
}

export default function ProductDetailPage({
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
    name: string;
    description: string;
    thumbnail: string;
    subProducts: SubProduct[];
  } | null>(null);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  //EDITABLE STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [productId, setProductId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  //LOAD PRODUCT BY SLUG
  useEffect(() => {
    const load = async () => {
      const product = await getProductBySlug(slug);
      if (!product) {
        toast.error("Produk tidak ditemukan");
        router.push("/admin/manage-produk");
        return;
      }
      setProductId(product.id);
      setName(product.name);
      setDescription(product.description || "");
      setThumbnailUrl(product.thumbnail || "");
      setThumbnailPreview(product.thumbnail || "");
      setCreatedAt(product.created_at);
      setUpdatedAt(product.updated_at);
      setSubProducts(
        product.sub_products.map((sp) => ({
          id: sp.id,
          name: sp.name,
          size: sp.size || "",
          weight: sp.weight || "",
          price: sp.price ? String(sp.price) : "",
        })),
      );
      setOriginal({
        name: product.name,
        description: product.description || "",
        thumbnail: product.thumbnail || "",
        subProducts: product.sub_products.map((sp) => ({
          id: sp.id,
          name: sp.name,
          size: sp.size || "",
          weight: sp.weight || "",
          price: sp.price ? String(sp.price) : "",
        })),
      });
      setLoading(false);
    };
    load();
  }, [slug, router]);

  //TOGGLE MODE
  const toggleMode = () => {
    if (mode === "view") {
      setMode("edit");
    } else {
      if (original) {
        setName(original.name);
        setDescription(original.description);
        setThumbnailUrl(original.thumbnail);
        setThumbnailPreview(original.thumbnail);
        setThumbnailFile(null);
        setSubProducts([...original.subProducts]);
      }
      setMode("view");
    }
  };

  //SUB-PRODUCT HANDLERS
  const addSubProduct = () => {
    setSubProducts((prev) => [
      ...prev,
      { name: "", size: "", weight: "", price: "" },
    ]);
  };
  const removeSubProduct = (index: number) => {
    setSubProducts((prev) => prev.filter((_, i) => i !== index));
  };
  const updateSubProduct = (
    index: number,
    field: keyof SubProduct,
    value: string,
  ) => {
    setSubProducts((prev) =>
      prev.map((sp, i) => (i === index ? { ...sp, [field]: value } : sp)),
    );
  };

  //THUMBNAIL CHANGE
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  //DETECT CHANGES
  const hasChanges = useCallback(() => {
    if (!original) return false;
    if (name !== original.name || description !== original.description)
      return true;
    if (thumbnailFile) return true;
    if (thumbnailUrl !== original.thumbnail) return true;
    if (subProducts.length !== original.subProducts.length) return true;
    for (let i = 0; i < subProducts.length; i++) {
      const a = subProducts[i];
      const b = original.subProducts[i];
      if (
        a.name !== b.name ||
        a.size !== b.size ||
        a.weight !== b.weight ||
        a.price !== b.price
      )
        return true;
    }
    return false;
  }, [original, name, description, thumbnailFile, thumbnailUrl, subProducts]);

  //SAVE
  const handleSave = async () => {
    if (!hasChanges()) return;
    setSaving(true);
    try {
      let finalThumbnailUrl = thumbnailUrl;
      if (thumbnailFile) {
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        finalThumbnailUrl = await uploadProductImage(formData);
      }

      await updateProductWithSubProducts({
        id: productId,
        slug,
        name,
        description: description || undefined,
        thumbnail: finalThumbnailUrl || undefined,
        sub_products: subProducts.map((sp) => ({
          id: sp.id,
          name: sp.name,
          size: sp.size || undefined,
          weight: sp.weight || undefined,
          price: sp.price ? parseFloat(sp.price) : undefined,
        })),
      });

      toast.success("Produk berhasil diperbarui");
      // Refresh data after save
      const updated = await getProductBySlug(slug);
      if (updated) {
        setThumbnailUrl(updated.thumbnail || "");
        setThumbnailPreview(updated.thumbnail || "");
        setThumbnailFile(null);
        setCreatedAt(updated.created_at);
        setUpdatedAt(updated.updated_at);
        setSubProducts(
          updated.sub_products.map((sp) => ({
            id: sp.id,
            name: sp.name,
            size: sp.size || "",
            weight: sp.weight || "",
            price: sp.price ? String(sp.price) : "",
          })),
        );
        setOriginal({
          name: updated.name,
          description: updated.description || "",
          thumbnail: updated.thumbnail || "",
          subProducts: updated.sub_products.map((sp) => ({
            id: sp.id,
            name: sp.name,
            size: sp.size || "",
            weight: sp.weight || "",
            price: sp.price ? String(sp.price) : "",
          })),
        });
        setName(updated.name);
        setDescription(updated.description || "");
      }
    } catch (error: any) {
      toast.error("Gagal menyimpan: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  //DELETE
  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus produk ini secara permanen?")) {
      try {
        await deleteProduct(productId);
        toast.success("Produk berhasil dihapus");
        router.push("/admin/manage-produk");
      } catch (error: any) {
        toast.error("Gagal menghapus: " + error.message);
      }
    }
  };

  const handleBulkImport = (newSubs: SubProduct[]) => {
    setSubProducts((prev) => [...prev, ...newSubs]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/manage-produk")}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-grotesk font-bold text-darkslate/90">
              {mode === "view" ? "Detail Produk" : "Edit Produk"}
            </h1>
            <p className="text-sm text-darkslate/80 font-inter">
              {mode === "view"
                ? "Lihat informasi lengkap produk"
                : "Ubah data produk dan varian"}
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

      {/* DETAILS */}
      <div className="bg-white rounded shadow-sm border border-gray-300 p-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium font-grotesk text-navy mb-1">
            Nama Produk
          </label>
          {mode === "view" ? (
            <p className="text-darkslate/90 font-medium font-inter">{name}</p>
          ) : (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm"
            />
          )}
        </div>

        {/* Slug (read‑only) */}
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

        {/* Timestamps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Dibuat pada
            </label>
            <p className="text-darkslate/90 font-inter">
              {formatDate(createdAt)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Terakhir diubah
            </label>
            <p className="text-darkslate/90 font-inter">
              {formatDate(updatedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Sub Products */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-darkslate font-grotesk">
            Sub Produk (Varian)
          </h2>
          {mode === "edit" && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setBulkModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm text-navy hover:text-steelblue font-jetbrains font-medium transition-colors"
              >
                <HiOutlineClipboardList className="w-4 h-4" />
                Paste dari Spreadsheet
              </button>
              <button
                type="button"
                onClick={addSubProduct}
                className="inline-flex items-center gap-1.5 text-sm text-navy hover:text-steelblue font-inter font-medium"
              >
                <HiOutlinePlus className="w-4 h-4" />
                Tambah Manual
              </button>
            </div>
          )}
        </div>

        {/* Bulk Import Modal */}
        <SubProductBulkImport
          isOpen={bulkModalOpen}
          onClose={() => setBulkModalOpen(false)}
          onImport={handleBulkImport}
        />

        {subProducts.length === 0 ? (
          <p className="text-sm text-gray-400 font-inter py-2">
            Tidak ada varian.
          </p>
        ) : (
          <div className="space-y-3">
            {subProducts.map((sp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3 border border-gray-200 rounded-xl"
              >
                <div>
                  <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                    Nama
                  </label>
                  {mode === "view" ? (
                    <p className="font-medium font-inter text-sm">{sp.name}</p>
                  ) : (
                    <input
                      type="text"
                      value={sp.name}
                      onChange={(e) =>
                        updateSubProduct(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm"
                      required
                    />
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                    Ukuran
                  </label>
                  {mode === "view" ? (
                    <p className="font-inter text-sm">{sp.size || "-"}</p>
                  ) : (
                    <input
                      type="text"
                      value={sp.size}
                      onChange={(e) =>
                        updateSubProduct(index, "size", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                    Berat
                  </label>
                  {mode === "view" ? (
                    <p className="text-sm font-inter">{sp.weight || "-"}</p>
                  ) : (
                    <input
                      type="text"
                      value={sp.weight}
                      onChange={(e) =>
                        updateSubProduct(index, "weight", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                    Harga
                  </label>
                  {mode === "view" ? (
                    <p className="text-sm font-inter">
                      {sp.price
                        ? `Rp ${parseFloat(sp.price).toLocaleString("id-ID")}`
                        : "-"}
                    </p>
                  ) : (
                    <input
                      type="number"
                      step="0.01"
                      value={sp.price}
                      onChange={(e) =>
                        updateSubProduct(index, "price", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm"
                    />
                  )}
                </div>
                {mode === "edit" && (
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      onClick={() => removeSubProduct(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus varian"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-red-600 font-grotesk">
              Hapus Produk
            </h3>
            <p className="text-sm text-darkslate/80 font-inter mt-1">
              Tindakan ini tidak dapat dibatalkan. Produk dan semua varian akan
              dihapus permanen.
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-jetbrains font-medium transition-colors flex items-center gap-2"
          >
            <HiOutlineTrash className="w-4 h-4" />
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}

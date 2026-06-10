"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineUpload,
  HiOutlineArrowLeft,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { createProduct, uploadProductImage } from "@/lib/product/product";
import SubProductBulkImport from "@/components/SubProductBulkImport";

interface SubProduct {
  id: string;
  name: string;
  size: string;
  weight: string;
  price: string;
}

export default function TambahProdukPage() {
  const router = useRouter();

  // STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Bulk import states
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  // THUMBNAIL CHANGE
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // SUB PRODUCT HANDLERS
  const addSubProduct = () => {
    setSubProducts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        size: "",
        weight: "",
        price: "",
      },
    ]);
  };

  const removeSubProduct = (id: string) => {
    setSubProducts((prev) => prev.filter((sp) => sp.id !== id));
  };

  const updateSubProduct = (
    id: string,
    field: keyof SubProduct,
    value: string,
  ) => {
    setSubProducts((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, [field]: value } : sp)),
    );
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama produk harus diisi");
      return;
    }

    setLoading(true);
    try {
      let thumbnailUrl = "";

      if (thumbnail) {
        setUploading(true);
        const imageFormData = new FormData();
        imageFormData.append("file", thumbnail);

        thumbnailUrl = await uploadProductImage(imageFormData);
        setUploading(false);
      }

      const subProductsData = subProducts.map((sp) => ({
        name: sp.name,
        size: sp.size || undefined,
        weight: sp.weight || undefined,
        price: sp.price ? parseFloat(sp.price) : undefined,
      }));

      await createProduct({
        name,
        description: description || undefined,
        thumbnail: thumbnailUrl || undefined,
        sub_products: subProductsData,
      });

      toast.success("Produk berhasil ditambahkan");
      router.push("/admin/manage-produk");
    } catch (error: any) {
      toast.error("Gagal menambahkan produk: " + error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleBulkImport = (newSubs: SubProduct[]) => {
    setSubProducts((prev) => [...prev, ...newSubs]);
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
          <h1 className="text-2xl font-grotesk font-bold text-gray-800">
            Tambah Produk Baru
          </h1>
          <p className="text-darkslate/80 font-inter text-sm mt-1">
            Isi detail produk beton pracetak
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Info */}
        <div className="bg-white rounded p-6 shadow-sm border border-gray-300 space-y-5">
          <h2 className="font-semibold text-gray-800 font-grotesk text-lg">
            Informasi Produk
          </h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium font-grotesk text-navy mb-1">
              Nama Produk <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Misal: Panel Beton"
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
              placeholder="Deskripsi singkat produk..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter transition-all resize-none"
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

        {/* Sub Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 font-grotesk">
              Sub Produk (Varian)
            </h2>
            <div className="flex items-center gap-4">
              {/* Bulk Import Button */}
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
                className="inline-flex items-center gap-1.5 text-sm text-navy hover:text-steelblue font-jetbrains font-medium transition-colors"
              >
                <HiOutlinePlus className="w-4 h-4" />
                Tambah Manual
              </button>
            </div>
          </div>

          {subProducts.length > 0 ? (
            <div className="space-y-3">
              {subProducts.map((sp) => (
                <div
                  key={sp.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3 border border-gray-200 rounded-xl relative"
                >
                  <div>
                    <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={sp.name}
                      onChange={(e) =>
                        updateSubProduct(sp.id, "name", e.target.value)
                      }
                      placeholder=""
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                      Ukuran
                    </label>
                    <input
                      type="text"
                      value={sp.size}
                      onChange={(e) =>
                        updateSubProduct(sp.id, "size", e.target.value)
                      }
                      placeholder="10x10x10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                      Berat (Kg)
                    </label>
                    <input
                      type="text"
                      value={sp.weight}
                      onChange={(e) =>
                        updateSubProduct(sp.id, "weight", e.target.value)
                      }
                      placeholder="kg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium font-grotesk text-navy mb-1">
                      Harga (opsional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={sp.price}
                      onChange={(e) =>
                        updateSubProduct(sp.id, "price", e.target.value)
                      }
                      placeholder="Rp"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-navy/20 focus:border-navy outline-none text-sm font-inter"
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      onClick={() => removeSubProduct(sp.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus varian"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 font-manrope py-2">
              Belum ada varian. Gunakan paste spreadsheet atau klik "Tambah
              Manual" untuk menambahkan.
            </p>
          )}
        </div>

        {/* Submit */}
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
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>

      <SubProductBulkImport
        isOpen={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface SubProduct {
  id: string;
  name: string;
  size: string;
  weight: string;
  price: string;
}

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (products: SubProduct[]) => void;
}

function normalizeNumberString(input: string): string {
  if (!input) return "";

  let s = input.trim();
  if (!s) return "";

  // Remove currency symbols, spaces, and non-numeric characters except digits, dots, commas, and minus signs
  s = s.replace(/[^\d.,-]/g, "");

  if (!s || s === "-" || s === "." || s === ",") return "";

  const negative = s.startsWith("-");
  if (negative) s = s.slice(1);

  // 1. Remove all dots (thousands separators)
  s = s.split(".").join("");

  // 2. Change commas to dots (decimal separators)
  s = s.split(",").join(".");

  // If multiple commas accidentally created multiple dots, keep only the last one as the decimal point
  const parts = s.split(".");
  if (parts.length > 2) {
    s = `${parts.slice(0, -1).join("")}.${parts[parts.length - 1]}`;
  }

  // Clean up leading zeros on the integer side
  const [intPartRaw, fracPart] = s.split(".");
  let intPart = intPartRaw.replace(/^0+(?=\d)/, "");
  if (intPart === "") intPart = "0";

  const normalized =
    fracPart !== undefined ? `${intPart}.${fracPart}` : intPart;

  return negative ? `-${normalized}` : normalized;
}

export default function SubProductBulkImport({
  isOpen,
  onClose,
  onImport,
}: BulkImportModalProps) {
  const [bulkText, setBulkText] = useState("");

  const handleBulkImport = () => {
    const lines = bulkText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      toast.error("Tidak ada data yang ditemukan.");
      return;
    }

    const detectDelimiter = (sample: string) => {
      if (sample.includes("\t")) return "\t";
      if (sample.includes(";")) return ";";
      if (sample.includes(",")) return ",";
      return "\t";
    };

    const delimiter = detectDelimiter(lines[0]);

    const newSubProducts: SubProduct[] = [];

    for (const line of lines) {
      const columns = line.split(delimiter).map((col) => col.trim());
      if (columns.length === 0 || columns.every((col) => col === "")) continue;

      const [colName = "", colSize = "", colWeight = "", colPrice = ""] =
        columns;

      newSubProducts.push({
        id: crypto.randomUUID(),
        name: colName,
        size: colSize,
        weight: colWeight,
        price: normalizeNumberString(colPrice),
      });
    }

    if (newSubProducts.length === 0) {
      toast.error("Gagal mengurai data. Pastikan format sesuai.");
      return;
    }

    onImport(newSubProducts);
    setBulkText("");
    onClose();
    toast.success(`${newSubProducts.length} varian berhasil ditambahkan.`);
  };

  const handleCancel = () => {
    setBulkText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl">
        <h3 className="text-lg font-semibold font-grotesk text-gray-800 mb-2">
          Paste Data Varian dari Spreadsheet
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Salin data dari Excel / Google Sheets lalu tempel di sini. Kolom
          otomatis dipisah berdasarkan tab, koma, atau titik koma. Urutan kolom:{" "}
          <strong>Nama, Ukuran, Berat, Harga</strong>.
        </p>

        <textarea
          autoFocus
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder={
            "Panel A\t10x10\t50\t150000\nPanel B\t20x20\t80\t200000\n..."
          }
          rows={10}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none resize-none"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleBulkImport}
            className="px-4 py-2 bg-navy text-white rounded-lg text-sm hover:bg-steelblue transition-colors"
          >
            Import Data
          </button>
        </div>
      </div>
    </div>
  );
}

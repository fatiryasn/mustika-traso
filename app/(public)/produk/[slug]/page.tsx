// app/produk/[slug]/page.tsx
import { getProductBySlug } from "@/lib/product/product";
import Link from "next/link";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Produk tidak ditemukan
          </h1>
          <Link
            href="/produk"
            className="mt-4 inline-flex items-center text-navy hover:text-steelblue font-medium"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // WhatsApp message template
  const whatsappNumber = "628126588348";
  const message = `Halo, saya tertarik dengan produk ${product.name}. Bisa info lebih lanjut?`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/produk"
          className="inline-flex items-center text-navy hover:text-steelblue text-sm font-jetbrains font-medium mb-8"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Katalog Produk
        </Link>

        {/* Product detail card */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Thumbnail – tall ratio */}
            <div className="md:col-span-2 pl-0 md:pl-5 py-5">
              <div className="aspect-[3/4] w-full max-h-[25rem] sm:max-h-[30rem] md:max-h-max overflow-hidden bg-gray-100 border border-bordergray">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-inter">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* Product info – right column */}
            <div className="md:col-span-3 p-5 md:p-7 lg:p-10 flex flex-col justify-center">
              <h1 className="text-2xl md:text-5xl font-black font-grotesk text-darkslate uppercase tracking-wide leading-tight">
                {product.name}
              </h1>

              {product.description && (
                <div className="mt-4 text-darkslate/90 text-sm leading-relaxed font-inter whitespace-pre-line">
                  {product.description}
                </div>
              )}

              {/* Divider with WhatsApp button */}
              <div className="mt-6 pt-6 border-t border-bordergray/60">
                <h2 className="text-xs font-bold text-steelblue font-jetbrains uppercase tracking-widest mb-2">
                  Informasi Produk
                </h2>
                <p className="text-sm text-gray-500 font-inter mb-4">
                  Tersedia berbagai ukuran dan varian. Hubungi kami untuk
                  penawaran terbaik.
                </p>

                {/* WhatsApp button – personalized message */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-green-700 transition-colors rounded-none"
                >
                  <FaWhatsapp className="text-lg" />
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sub Products Table */}
          {product.sub_products && product.sub_products.length > 0 && (
            <div className="p-5 md:p-7 lg:p-10">
              <h2 className="text-lg font-bold font-inter text-darkslate uppercase tracking-wide mb-6">
                Varian & Ukuran
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-bordergray bg-gray-50">
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-gray-600">
                        Nama
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-gray-600">
                        Ukuran
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wider text-gray-600">
                        Berat (Kg)
                      </th>
                      <th className="text-right py-3 px-4 font-bold text-xs uppercase tracking-wider text-gray-600">
                        Harga (IDR)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {product.sub_products.map((sp) => (
                      <tr
                        key={sp.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {sp.name}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {sp.size || "-"}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {sp.weight || "-"}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 font-medium">
                          {sp.price
                            ? `Rp ${sp.price.toLocaleString("id-ID")}`
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

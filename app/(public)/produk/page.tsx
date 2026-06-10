import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Metadata } from "next";

import { getProducts } from "@/lib/product/product";
import { COMPANY_DATA } from "@/data/constants";
import PublicProductPagination from "@/components/PublicProductPagination";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: `Produk Beton Pracetak - ${COMPANY_DATA.name}`,
  description: `Katalog lengkap ${COMPANY_DATA.name}, produk beton pracetak untuk drainase, infrastruktur, dan paving`,

   keywords: [
    "Beton",
    "Beton Pracetak",
    "Beton Pracetak Medan",
    "Beton Pracetak Sumut",
    "Beton Medan Sumatera Utara",
    `${COMPANY_DATA.name}`,
    `${COMPANY_DATA.brand_name}`,
    "Supplier Beton Pracetak",
    "Precast Concrete",
    `Katalog Produk ${COMPANY_DATA.brand_name}`,
    `Produk Beton ${COMPANY_DATA.brand_name}`,
  ],
};
export default async function ProdukPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 30;
  const sort = { column: "name", ascending: true };

  const { data: products, totalCount } = await getProducts({
    search: "",
    sort,
    page: currentPage,
    limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="bg-background min-h-screen pb-16 pt-4">
      {/* BANNER */}
      <PageBanner
        label="Katalog Lengkap"
        title="PRODUK BETON PRACETAK"
        description="Katalog lengkap material drainase, infrastruktur, dan paving"
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PRODUCT GRID */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada produk tersedia.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {products.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/produk/${prod.slug}`}
                  className="group w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white border border-bordergray hover:border-navy/40 hover:shadow-xl transition-all duration-300 rounded-none flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 border-b border-bordergray">
                    {prod.thumbnail ? (
                      <img
                        src={prod.thumbnail}
                        alt={prod.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-inter">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      <h3 className="text-lg font-black font-inter text-darkslate uppercase tracking-wide group-hover:text-navy transition-colors line-clamp-2">
                        {prod.name}
                      </h3>
                      {prod.description && (
                        <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                          {prod.description}
                        </p>
                      )}
                    </div>
                    <div className="pt-5 border-t border-bordergray/60 mt-5 flex justify-between items-center">
                      <span className="inline-flex items-center text-xs font-black font-jetbrains uppercase tracking-wider text-navy">
                        <span>SPESIFIKASI & UKURAN</span>
                        <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <PublicProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                limit={limit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

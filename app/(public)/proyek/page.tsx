import { Metadata } from "next";

import { getProjects } from "@/lib/project/project";
import { COMPANY_DATA } from "@/data/constants";
import PublicProjectPagination from "@/components/PublicProjectPagination";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";
import PageBanner from "@/components/PageBanner";

//metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const currentPage = Number(pageParam) || 1;

  const title =
    currentPage > 1
      ? `Portofolio Proyek & Referensi - ${COMPANY_DATA.name} - Halaman ${currentPage}`
      : `Portofolio Proyek & Referensi - ${COMPANY_DATA.name}`;

  const description =
    currentPage > 1
      ? `Dokumentasi proyek beton pra‑cetak ${COMPANY_DATA.name} – Halaman ${currentPage}`
      : `Dokumentasi pengiriman dan pemasangan beton pra‑cetak ${COMPANY_DATA.name} di lapangan`;

  const canonicalUrl = `${COMPANY_DATA.base_url}/proyek${currentPage > 1 ? `?page=${currentPage}` : ""}`;

  return {
    title,
    description,
    keywords: [
      "Beton",
      "Beton Pracetak",
      "Beton Pracetak Medan",
      "Beton Pracetak Sumut",
      "Beton Medan Sumatera Utara",
      COMPANY_DATA.name,
      COMPANY_DATA.brand_name,
      "Supplier Beton Pracetak",
      "Precast Concrete",
      `Portofolio ${COMPANY_DATA.brand_name}`,
      `Proyek ${COMPANY_DATA.brand_name}`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      images: ["/og-image.png"],
      url: canonicalUrl,
      siteName: COMPANY_DATA.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

//main component
export default async function ProyekPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Number(pageParam) || 1;
  const limit = 30;

  const { data, totalCount } = await getProjects({
    search: "",
    sort: { column: "created_at", ascending: true },
    page: currentPage,
    limit,
  });

  const projects: ProjectCardData[] = data.map((p) => {
    let year: string | null = null;
    if (p.project_date) {
      const d = new Date(p.project_date);
      if (!isNaN(d.getTime())) year = d.getFullYear().toString();
    }
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      thumbnail: p.thumbnail,
      client_name: p.client_name,
      year,
    };
  });

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="bg-background min-h-screen pb-16 pt-4">
      {/* BANNER */}
      <PageBanner
        label="Portofolio & Referensi"
        title="PORTOFOLIO PROYEK & REFERENSI"
        description="Dokumentasi pengiriman dan pemasangan beton pra‑cetak di lapangan"
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada proyek tersedia.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {projects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>

            {totalPages > 1 && (
              <PublicProjectPagination
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

import { Metadata } from "next";

import { getProjects } from "@/lib/project/project";
import { COMPANY_DATA } from "@/data/constants";
import PublicProjectPagination from "@/components/PublicProjectPagination";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: `Portofolio Proyek & Referensi - ${COMPANY_DATA.name}`,
  description: `Dokumentasi pengiriman dan pemasangan beton pra‑cetak ${COMPANY_DATA.name} di
                lapangan`,

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
    `Portofolio ${COMPANY_DATA.brand_name}`,
    `Proyek ${COMPANY_DATA.brand_name}`,
  ],
};
export default async function ProyekPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
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
        label=" Portofolio & Referensi"
        title="PORTOFOLIO PROYEK & REFERENSI"
        description="Dokumentasi pengiriman dan pemasangan beton pra‑cetak di
                lapangan"
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
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

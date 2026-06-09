// app/proyek/page.tsx
import { getProjects } from "@/lib/project/project";
import PublicProjectPagination from "@/components/PublicProjectPagination";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";
import PageBanner from "@/components/PageBanner";

export default async function ProyekPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 30;

  const { data, totalCount } = await getProjects({
    search: "",
    sort: { column: "title", ascending: true },
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

      {/* Main content */}
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

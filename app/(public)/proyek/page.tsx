// app/proyek/page.tsx
import { getProjects } from "@/lib/project/project";
import PublicProjectPagination from "@/components/PublicProjectPagination";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";

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
      {/* Banner – bold & wide */}
      <div className="max-w-[100rem] mx-auto relative bg-darkslate text-white overflow-hidden mb-12 p-8 md:p-16 lg:p-20 rounded">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Angled accent line */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/20 -skew-x-12 transform origin-top-right" />

        {/* Content */}
        <div className="relative max-w-7xl z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-cyan-500" />
                <span className="text-cyan-400 text-xs font-bold font-jetbrains uppercase tracking-widest">
                  Portofolio & Referensi
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-white">
                PORTOFOLIO PROYEK & REFERENSI
              </h1>
              <p className="text-white/90 font-inter text-xs sm:text-sm tracking-widest uppercase max-w-xl">
                Dokumentasi pengiriman dan pemasangan beton pra‑cetak di
                lapangan
              </p>
            </div>
          </div>
        </div>
      </div>

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

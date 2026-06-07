// app/artikel/page.tsx
import { getArticles } from "@/lib/article/article";
import PublicArticlePagination from "@/components/PublicArticlePagination";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

// Type for rendered article
type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  created_at: string;
};

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 30;

  const { data, totalCount } = await getArticles({
    search: "",
    sort: { column: "created_at", ascending: false },
    page: currentPage,
    limit,
  });

  const articles: ArticleCard[] = data.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    thumbnail: a.thumbnail,
    created_at: a.created_at,
  }));

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="bg-background min-h-screen pb-16 pt-4">
      {/* Banner – bold & wide, matching product page style */}
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
                  Wawasan & Edukasi
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tighter text-white">
                ARTIKEL & WAWASAN BETON
              </h1>
              <p className="text-white/90 font-inter text-xs sm:text-sm tracking-widest uppercase max-w-xl">
                Edukasi konstruksi, pedoman pemilihan mutu beton, dan riset
                sipil
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada artikel tersedia.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/artikel/${article.slug}`}
                  className="group bg-white border border-bordergray hover:border-navy/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 border-b border-bordergray">
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-inter">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                        {new Date(article.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <h3 className="text-lg font-bold font-display text-darkslate uppercase tracking-wide leading-tight group-hover:text-navy transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-darkslate/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-inter">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="pt-5 border-t border-bordergray/60 mt-5 flex justify-between items-center">
                      <span className="inline-flex items-center text-xs font-black font-jetbrains uppercase tracking-wider text-navy group-hover:text-steelblue transition-colors">
                        <span>BACA SELENGKAPNYA</span>
                        <FaArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <PublicArticlePagination
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

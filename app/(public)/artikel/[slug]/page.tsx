// app/artikel/[slug]/page.tsx
import { getArticleBySlug } from "@/lib/article/article";
import Link from "next/link";
import { FaArrowLeft, FaUser, FaCalendarAlt } from "react-icons/fa";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Artikel tidak ditemukan
          </h1>
          <Link
            href="/artikel"
            className="mt-4 inline-flex items-center text-navy hover:text-steelblue font-medium"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Thumbnail at top */}
        <div className="w-full mb-8">
          <div className="aspect-video w-full overflow-hidden bg-gray-100 border border-bordergray">
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-inter">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Metadata: author and date */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 font-mono font-bold uppercase tracking-wider mb-4">
          {article.author && (
            <div className="flex items-center gap-1.5">
              <FaUser className="h-3.5 w-3.5 text-steelblue" />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="h-3.5 w-3.5 text-steelblue" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-black font-grotesk text-darkslate uppercase tracking-wide leading-tight mb-8">
          {article.title}
        </h1>

        {/* Content (HTML) */}
        {article.content && (
          <div
            className="prose prose-sm max-w-none text-darkslate/90 font-inter 
                       prose-headings:font-grotesk prose-headings:font-bold prose-headings:text-darkslate
                       prose-a:text-navy prose-a:no-underline hover:prose-a:underline
                       prose-img:border prose-img:border-bordergray prose-img:rounded-sm
                       prose-blockquote:border-l-4 prose-blockquote:border-navy prose-blockquote:bg-background prose-blockquote:py-2 prose-blockquote:px-4
                       prose-li:marker:text-navy"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}

        {/* Back button */}
        <Link
          href="/artikel"
          className="inline-flex items-center text-navy hover:text-steelblue text-sm font-jetbrains font-medium mt-6"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Daftar Artikel
        </Link>
      </div>
    </div>
  );
}

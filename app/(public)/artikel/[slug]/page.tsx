import Link from "next/link";
import { FaArrowLeft, FaUser, FaCalendarAlt } from "react-icons/fa";

import { getArticleBySlug } from "@/lib/article/article";
import { Metadata } from "next";
import { COMPANY_DATA } from "@/data/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

//metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel tidak ditemukan",
    };
  }

  return {
    title: article.title,
    description: article.excerpt ?? article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? article.title,
      images: article.thumbnail ? [article.thumbnail] : [],
      type: "article",
      publishedTime: article.created_at,
      authors: article.author ? [article.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt ?? article.title,
      images: article.thumbnail ? [article.thumbnail] : [],
    },
    alternates: {
      canonical: `${COMPANY_DATA.base_url}/artikel/${slug}`,
    },
  };
}

//main component
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
        {/* THUMBNAIL*/}
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

        {/* AUTHOR & DATE */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-darkslate/90 font-jetbrains font-bold uppercase tracking-wider mb-4">
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

        {/* TITLE */}
        <h1 className="text-2xl md:text-4xl font-black font-grotesk text-darkslate uppercase tracking-wide leading-tight mb-8">
          {article.title}
        </h1>

        {/* CONTENT */}
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

        {/* BACK BUTTON */}
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

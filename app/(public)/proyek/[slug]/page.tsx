import Link from "next/link";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";

import { getProjectBySlug } from "@/lib/project/project";
import { COMPANY_DATA } from "@/data/constants";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Proyek tidak ditemukan
          </h1>
          <Link
            href="/proyek"
            className="mt-4 inline-flex items-center text-navy hover:text-steelblue font-medium"
          >
            <FaArrowLeft className="mr-2" /> Kembali ke Portofolio
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = project.project_date
    ? new Date(project.project_date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3 lg:gap-6">
          {/* LEFT IMAGE */}
          <div className="md:col-span-3 p-5 md:p-10 lg:p-5">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 border border-bordergray">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-inter">
                  No Image Available
                </div>
              )}
            </div>
          </div>

          {/* RIGHT DATA */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-black font-grotesk text-darkslate uppercase tracking-wide leading-tight">
              {project.title}
            </h1>

            {project.client_name && (
              <p className="mt-3 text-sm font-inter font-bold uppercase tracking-wider">
                Klien: {project.client_name}
              </p>
            )}

            {formattedDate && (
              <p className="mt-1 text-darkslate/90 text-sm font-inter">
                Tanggal Proyek: {formattedDate}
              </p>
            )}

            {project.description && (
              <p className="mt-6 text-darkslate/90 text-sm leading-relaxed font-inter whitespace-pre-line">
                {project.description}
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-bordergray/60">
              <a
                href={`https://wa.me/${COMPANY_DATA.wa_number}`}
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

        {/* Back button */}
        <Link
          href="/proyek"
          className="inline-flex items-center text-navy hover:text-steelblue text-sm font-jetbrains font-medium mt-8"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Daftar Proyek
        </Link>
      </div>
    </div>
  );
}

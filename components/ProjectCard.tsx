// components/ProjectCard.tsx
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export interface ProjectCardData {
  id: string;
  title: string;
  slug: string;
  description: string | null; // not shown on card, used on detail page
  thumbnail: string | null;
  client_name: string | null;
  year: string | null;
}

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link
      href={`/proyek/${project.slug}`}
      className="group relative block w-full overflow-hidden border border-bordergray hover:shadow-xl transition-all duration-300"
    >
      {/* Aspect‑ratio container – near‑square (4:3) */}
      <div className="aspect-[4/3] w-full bg-gray-100">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700
                       group-hover:opacity-100 opacity-80"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Dark overlay – lightens on hover */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/0 transition-colors duration-500" />

      {/* Content overlay – positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        {project.client_name && (
          <div className="flex items-center text-xs sm:text-sm font-jetbrains font-bold uppercase tracking-wider text-white/80">
            <FaMapMarkerAlt className="h-4 w-4 mr-1 shrink-0" />
            <span>{project.client_name}</span>
          </div>
        )}
        <h3 className="text-lg sm:text-xl font-black font-grotesk uppercase tracking-wide leading-tight mt-2">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

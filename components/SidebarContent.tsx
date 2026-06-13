"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineCube,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

interface SidebarContentProps {
  collapsed: boolean;
  onToggle: () => void;
  onLinkClick?: () => void; // optional: close mobile sidebar on nav click
}

const navItems = [
  {
    name: "Overview",
    href: "/admin",
    icon: <MdOutlineDashboard className="w-5 h-5" />,
  },
  {
    name: "Artikel",
    href: "/admin/manage-artikel",
    icon: <HiOutlineDocumentText className="w-5 h-5" />,
  },
  {
    name: "Proyek",
    href: "/admin/manage-proyek",
    icon: <HiOutlineBriefcase className="w-5 h-5" />,
  },
  {
    name: "Produk",
    href: "/admin/manage-produk",
    icon: <HiOutlineCube className="w-5 h-5" />,
  },
];

export default function SidebarContent({
  collapsed,
  onToggle,
  onLinkClick,
}: SidebarContentProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* LOGO + TOGGLE */}
      <div className="flex items-center justify-between p-6 border-b border-navy/50 min-h-[104px]">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 flex-1"
            >
              <img
                src="/mustika-traso-logo-white.png"
                alt="Admin Logo"
                className="object-contain w-auto h-16"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          className={`p-2 rounded-lg hover:bg-navy-700/50 text-gray-400 hover:text-white transition-colors duration-200 flex-shrink-0 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {collapsed ? (
            <HiOutlineChevronRight className="w-5 h-5" />
          ) : (
            <HiOutlineChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick} // closes mobile overlay if provided
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                active
                  ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white shadow-lg shadow-blue-500/10 border border-blue-500/20"
                  : "text-gray-400 hover:text-white hover:bg-navy-700/50 border border-transparent"
              }`}
            >
              <span
                className={`flex-shrink-0 ${
                  active
                    ? "text-blue-400"
                    : "text-gray-500 group-hover:text-blue-400"
                } transition-colors duration-200`}
              >
                {item.icon}
              </span>

              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-grotesk text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

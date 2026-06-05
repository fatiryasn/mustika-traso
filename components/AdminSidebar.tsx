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

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ isCollapsed, onToggle }: AdminSidebarProps) => {
  const pathname = usePathname();

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

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 80 : 250 }}
      animate={{ width: isCollapsed ? "80px" : "250px" }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed left-0 top-0 h-screen bg-[#0a1929] border-r border-navy/50 shadow-2xl z-50 flex flex-col overflow-hidden"
    >
      {/* LOGO */}
      <div className="flex items-center justify-between p-6 border-b border-navy/50 min-h-[104px]">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
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
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          {isCollapsed ? (
            <HiOutlineChevronRight className="w-5 h-5" />
          ) : (
            <HiOutlineChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
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
                {!isCollapsed && (
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
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-r-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;

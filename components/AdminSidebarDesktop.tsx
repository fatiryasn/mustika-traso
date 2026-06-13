"use client";

import { motion } from "framer-motion";
import SidebarContent from "./SidebarContent";

interface DesktopSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebarDesktop({
  isCollapsed,
  onToggle,
}: DesktopSidebarProps) {
  return (
    <motion.aside
      initial={{ width: isCollapsed ? 80 : 250 }}
      animate={{ width: isCollapsed ? 80 : 250 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="hidden lg:flex fixed left-0 top-0 h-screen bg-[#0a1929] border-r border-navy/50 shadow-2xl z-50 flex-col overflow-hidden"
    >
      <SidebarContent collapsed={isCollapsed} onToggle={onToggle} />
    </motion.aside>
  );
}

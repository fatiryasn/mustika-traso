"use client";

import { motion, AnimatePresence } from "framer-motion";
import SidebarContent from "./SidebarContent";

interface MobileSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebarMobile({
  isOpen,
  onToggle,
}: MobileSidebarProps) {
  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onToggle}
            />
            <motion.aside
              key="mobile-sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed left-0 top-0 h-screen w-[60vw] bg-[#0a1929] border-r border-navy/50 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <SidebarContent
                collapsed={false}
                onToggle={onToggle}
                onLinkClick={onToggle}
              />{" "}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

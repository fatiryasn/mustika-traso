"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

import AdminSidebarDesktop from "@/components/AdminSidebarDesktop";
import AdminSidebarMobile from "@/components/AdminSidebarMobile";
import AdminTopbar from "@/components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />

      <AdminSidebarDesktop
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <AdminSidebarMobile
        isOpen={mobileSidebarOpen}
        onToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      <div
        className={`flex-1 min-w-0 transition-all duration-300
          lg:ml-[80px] ${!sidebarCollapsed ? "lg:ml-[250px]" : ""}
        `}
      >
        <AdminTopbar
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        <main className="p-4 md:p-6 pb-16">{children}</main>
      </div>
    </div>
  );
}

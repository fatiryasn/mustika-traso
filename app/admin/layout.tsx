"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page - render without sidebar/topbar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Other admin pages - render with sidebar, topbar, and toaster
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />

      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-[80px]" : "ml-[250px]"
        }`}
      >
        {/* Topbar */}
        <AdminTopbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          userName="Admin User"
          userEmail="admin@example.com"
        />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

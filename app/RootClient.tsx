"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export default function RootClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isHomePage = pathname === "/";

  return (
    <>
      {isAdminRoute ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <>
          <Navbar />
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className={isHomePage ? "" : "pt-20"}>{children}</div>
          </motion.div>
          <Footer />
          <WhatsappButton />
        </>
      )}
    </>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RootClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <>
          <Navbar />
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.div>
          <Footer />
          <WhatsappButton />
        </>
      )}
    </>
  );
}

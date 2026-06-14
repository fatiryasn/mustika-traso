"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLogout,
  HiOutlineChevronDown,
  HiOutlineQuestionMarkCircle,
  HiOutlineMenu,
  HiOutlineUser,
} from "react-icons/hi";
import { toast } from "sonner";

import { logout, getProfile } from "@/lib/auth/auth";

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
  userName?: string;
  userEmail?: string;
  userImage?: string;
}

const AdminTopbar = ({
  onToggleSidebar,
  userName: initialUserName = "Admin User",
  userEmail: initialUserEmail = "admin@example.com",
  userImage,
}: AdminTopbarProps) => {
  const router = useRouter();
  const [userName, setUserName] = useState(initialUserName);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // get profile
  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getProfile();
      if (profile) {
        setUserName(profile.name);
        setUserEmail(profile.email ?? "");
      }
    };
    fetchUser();
  }, []);

  // close profile on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // logout
  const handleLogout = useCallback(() => {
    toast("Keluar dari aplikasi?", {
      action: {
        label: "Ya, keluar",
        onClick: async () => {
          try {
            await logout();
            router.push("/admin/login");
          } catch (err) {
            toast.error("Gagal keluar. Coba lagi.");
          }
        },
      },
    });
  }, [router]);

  return (
    <header className="sticky top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-40 shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200 lg:hidden"
        >
          <HiOutlineMenu className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:gap-1">
          <span className="text-sm md:text-base font-grotesk font-semibold text-gray-800">
            PT. Mustika Traso
          </span>
          <span className="inline-block text-[8px] md:text-sm text-navy font-inter">
            Content Management
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* Guide button */}
        <button
          onClick={() =>
            window.open(
              "https://docs.google.com/document/d/1np31UA4_nfGRDfb1d2blxBhtPVt8f8oC075PWjfdxFk/edit?usp=sharing",
              "_blank",
            )
          }
          className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
          title="Panduan"
        >
          <HiOutlineQuestionMarkCircle className="w-5 h-5" />
        </button>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              ) : (
                <span className="text-white text-xs font-bold">
                  {getInitials(userName)}
                </span>
              )}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-700 font-manrope leading-tight">
                {userName}
              </span>
              <span className="text-xs text-gray-500 font-manrope leading-tight">
                Admin
              </span>
            </div>
            <HiOutlineChevronDown
              className={`hidden md:block w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {getInitials(userName)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 font-sora truncate">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500 font-manrope truncate">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dropdown menu items */}
                <div className="p-2">
                  {/* Profile Settings (inactive) */}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 cursor-not-allowed">
                    <HiOutlineUser className="w-5 h-5" />
                    <span className="text-sm font-manrope">
                      Profile Settings
                    </span>
                    <span className="ml-auto text-xs text-gray-300 font-manrope">
                      Soon
                    </span>
                  </div>

                  {/* Sign Out */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 mt-1"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    <span className="text-sm font-manrope font-medium">
                      Sign Out
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;

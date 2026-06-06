"use client";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { login } from "@/lib/auth/auth"; 
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email dan password harus diisi");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await login(formData);

      if (result && result.error) {
        toast.error(result.error);
      } else if (result?.success) {
        router.push("/admin");
      }
      
    } catch (err) {
      toast.error("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <img
                src="/mustika-traso-logo-2.png"
                alt="Mustika Traso"
                className="h-12 mx-auto mb-4"
              />
              <h1 className="text-2xl font-grotesk font-bold text-gray-800">
                CMS Login
              </h1>
              <p className="text-sm text-gray-500 font-inter mt-1">
                Masuk ke panel kontrol admin
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 font-inter mb-1.5"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mustika-traso.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all text-sm font-inter"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 font-inter mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-navy/20 focus:border-navy outline-none transition-all text-sm font-inter"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy hover:bg-steelblue text-white font-grotesk font-semibold py-2.5 px-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? "Memproses.." : "Masuk"}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-navy font-inter transition-colors"
            >
              ← Kembali ke halaman utama
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

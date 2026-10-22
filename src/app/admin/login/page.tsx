"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@duhockts.vn");
  const [password, setPassword] = useState("admin123456");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      if (supabase) {
        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If Supabase credentials are wrong or user not created yet in Supabase Auth,
          // check if default development credential is used
          if (
            (email === "admin@duhockts.vn" || email === "admin@eduglobal.vn") &&
            password === "admin123456"
          ) {
            if (typeof window !== "undefined") {
              localStorage.setItem("eduglobal_admin_session", "dev-admin-token");
              document.cookie = "admin_token=dev-admin-token; path=/; max-age=86400";
            }
            router.push("/admin");
            return;
          }
          setErrorMessage(error.message || "Tài khoản hoặc mật khẩu không chính xác");
          setIsLoading(false);
          return;
        }

        if (data.user) {
          if (typeof window !== "undefined") {
            localStorage.setItem("eduglobal_admin_session", data.session?.access_token || "supabase-auth");
            document.cookie = `admin_token=${data.session?.access_token || "supabase-auth"}; path=/; max-age=86400`;
          }
          router.push("/admin");
          return;
        }
      } else {
        // Supabase not configured in local environment, allow standard initial admin login
        if (
          (email === "admin@duhockts.vn" || email === "admin@eduglobal.vn") &&
          password === "admin123456"
        ) {
          if (typeof window !== "undefined") {
            localStorage.setItem("eduglobal_admin_session", "dev-admin-token");
            document.cookie = "admin_token=dev-admin-token; path=/; max-age=86400";
          }
          router.push("/admin");
        } else {
          setErrorMessage("Sai thông tin đăng nhập. Tài khoản mặc định: admin@duhockts.vn / admin123456");
        }
      }
    } catch {
      setErrorMessage("Đã xảy ra sự cố trong quá trình xác thực");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 animate-scale-up">
        <div className="text-center mb-6">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm inline-block mb-3">
            <img
              src="/images/logo/logo-kts-png.png"
              alt="Công Ty Tư Vấn Du Học KTS"
              className="h-14 w-auto object-contain mx-auto"
            />
          </div>
          <h1 className="text-xl font-extrabold text-brand-navy">Cổng Quản Trị Du Học KTS</h1>
          <p className="text-xs text-slate-500 mt-1">Đăng nhập tài khoản quản trị viên và cố vấn học thuật</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Email công tác
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@duhockts.vn"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-sheen w-full py-3 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <span>ĐĂNG NHẬP HỆ THỐNG</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-500 mb-4 text-left">
            <p className="font-bold text-slate-700">Tài khoản quản trị khởi tạo:</p>
            <p>Email: <span className="font-mono text-brand-navy">admin@duhockts.vn</span></p>
            <p>Mật khẩu: <span className="font-mono text-brand-navy">admin123456</span></p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang chủ người dùng</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

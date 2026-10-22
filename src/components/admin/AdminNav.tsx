"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Globe,
  BookOpen,
  Award,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Tổng quan", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Khách hàng (Leads CRM)", href: "/admin/leads", icon: <Users className="w-4 h-4" /> },
    { label: "Quốc gia", href: "/admin/countries", icon: <Globe className="w-4 h-4" /> },
    { label: "Chương trình", href: "/admin/programs", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Học bổng", href: "/admin/scholarships", icon: <Award className="w-4 h-4" /> },
    { label: "Tin tức & Bài viết", href: "/admin/posts", icon: <FileText className="w-4 h-4" /> },
    { label: "Cấu hình Website", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eduglobal_admin_session");
      document.cookie = "admin_token=; path=/; max-age=0";
    }
    router.push("/admin/login");
  };

  return (
    <header className="bg-brand-navy text-white sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal title */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-sm flex items-center justify-center">
              <img
                src="/images/logo/Logo-KTS-in.png"
                alt="Du Học KTS"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight">KTS Admin Portal</span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded ml-2 uppercase">
                CRM & CMS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                    isActive
                      ? "bg-brand-blue text-white shadow-sm font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Web View & Logout */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1"
            >
              <span>Xem trang web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold transition flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-700 bg-brand-navy px-4 py-3 space-y-1 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-200 hover:bg-white/10 flex items-center gap-2"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-700 flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 px-3 rounded-lg bg-white/10 text-xs font-semibold text-center text-slate-300 block"
            >
              Xem trang web
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-lg bg-rose-600 text-xs font-bold text-white"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

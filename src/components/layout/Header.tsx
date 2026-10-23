"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Clock,
  ChevronDown,
  Menu,
  X,
  Compass,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCountryDropdown(false);
  }, [pathname]);

  const countries = [
    { name: "Du học Mỹ", slug: "my", tag: "Ivy League & STEM" },
    { name: "Du học Úc", slug: "uc", tag: "Visa 485 & Group of 8" },
    { name: "Du học Anh", slug: "anh", tag: "Thạc sĩ 1 năm tiết kiệm" },
    { name: "Du học Canada", slug: "canada", tag: "PGWP 3 năm & Định cư" },
    { name: "Du học New Zealand", slug: "new-zealand", tag: "Top 3% thế giới" },
    { name: "Du học Singapore", slug: "singapore", tag: "Đầu tàu châu Á" },
    { name: "Du học Hàn Quốc", slug: "han-quoc", tag: "Học bổng 30-100%" },
    { name: "Du học Nhật Bản", slug: "nhat-ban", tag: "Học bổng & Việc làm" },
  ];

  return (
    <header className="w-full z-50 sticky top-0 bg-white transition-all duration-300">
      {/* Top utility bar */}
      <div className="bg-brand-navy text-slate-200 text-xs py-2 border-b border-brand-navy-light/40 hidden md:block transition-all">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>{siteConfig.contact.workingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-slate-300">Tư vấn viên KTS trực tuyến</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.contact.hotline.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-brand-gold font-bold hover:text-amber-300 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline 24/7: {siteConfig.contact.hotlineDisplay}</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/dat-lich-tu-van"
              className="hover:text-white transition flex items-center gap-1.5 text-slate-300"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>Đặt lịch hẹn</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/admin/login" className="hover:text-white transition text-slate-400">
              Cổng nội bộ
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`w-full transition-all duration-300 border-b border-slate-100 ${
          isScrolled
            ? "shadow-lg bg-white/95 backdrop-blur-md py-2"
            : "py-3 bg-white"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo with KTS Official Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center h-11 md:h-12 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo/logo-kts-png.png"
                alt="Công Ty Tư Vấn Du Học KTS"
                className="h-10 md:h-11 w-auto object-contain"
                onError={(e) => {
                  // Fallback to square logo if landscape not found
                  (e.target as HTMLImageElement).src = "/images/logo/Logo-KTS-in.png";
                }}
              />
            </div>
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-brand-navy group-hover:text-brand-blue transition">
                  DU HỌC KTS
                </span>
                <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  EST. 2005
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Công Ty Tư Vấn Du Học KTS
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === "/"
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              Trang chủ
            </Link>

            <Link
              href="/ve-chung-toi"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === "/ve-chung-toi"
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              Về KTS
            </Link>

            {/* Countries Dropdown (Du học) */}
            <div
              className="relative"
              onMouseEnter={() => setCountryDropdown(true)}
              onMouseLeave={() => setCountryDropdown(false)}
            >
              <button
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all duration-200 ${
                  pathname.startsWith("/quoc-gia")
                    ? "text-brand-blue bg-blue-50 font-bold"
                    : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
                }`}
                aria-expanded={countryDropdown}
              >
                <span>Du học</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    countryDropdown ? "rotate-180 text-brand-blue" : ""
                  }`}
                />
              </button>

              {countryDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-scale-up">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-slate-400">Điểm đến hàng đầu</span>
                    <Link
                      href="/quoc-gia"
                      className="text-xs font-bold text-brand-blue hover:underline"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-1">
                    {countries.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/quoc-gia/${c.slug}`}
                        className="px-3 py-2 rounded-xl hover:bg-blue-50/70 flex items-center justify-between transition-all duration-150 group"
                      >
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-blue group-hover:translate-x-1 transition-transform">
                          {c.name}
                        </span>
                        <span className="text-[11px] text-slate-400 group-hover:text-brand-blue/80">
                          {c.tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/truong-hoc"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === "/truong-hoc"
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              Trường học
            </Link>

            <Link
              href="/hoc-bong"
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                pathname === "/hoc-bong"
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              <Award className="w-4 h-4 text-brand-gold animate-bounce" />
              <span>Học bổng</span>
            </Link>

            <Link
              href="/dich-vu"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === "/dich-vu"
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              Dịch vụ
            </Link>

            <Link
              href="/tin-tuc"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname.startsWith("/tin-tuc")
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              Tin tức
            </Link>

            <Link
              href="/lien-he"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === "/lien-he"
                  ? "text-brand-blue bg-blue-50 font-bold"
                  : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dat-lich-tu-van"
              className="btn-sheen px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold shadow-md hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: "12s" }} />
              <span>ĐĂNG KÝ TƯ VẤN</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${siteConfig.contact.hotline.replace(/\s/g, "")}`}
              className="p-2 rounded-xl bg-blue-50 text-brand-blue font-bold text-xs flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi KTS</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 p-5 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <img
              src="/images/logo/logo-kts-png.png"
              alt="Công Ty Tư Vấn Du Học KTS"
              className="h-10 w-auto object-contain"
            />
            <div>
              <p className="font-extrabold text-sm text-brand-navy">Du Học KTS</p>
              <p className="text-[11px] text-slate-500">Công Ty Tư Vấn Du Học KTS</p>
            </div>
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Trang chủ
            </Link>
            <Link
              href="/ve-chung-toi"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Về Công Ty KTS
            </Link>
            <Link
              href="/quoc-gia"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Du học
            </Link>
            <div className="pl-4 space-y-1 border-l-2 border-slate-100 my-1">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/quoc-gia/${c.slug}`}
                  className="block py-1 text-sm text-slate-600 hover:text-brand-blue"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <Link
              href="/truong-hoc"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Trường học quốc tế
            </Link>
            <Link
              href="/hoc-bong"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Học bổng nổi bật
            </Link>
            <Link
              href="/dich-vu"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Dịch vụ tư vấn
            </Link>
            <Link
              href="/tin-tuc"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Tin tức & Cẩm nang
            </Link>
            <Link
              href="/lien-he"
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Liên hệ
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <Link
              href="/dat-lich-tu-van"
              className="btn-sheen w-full py-3 px-4 rounded-xl bg-brand-blue text-white font-bold text-center block shadow-md"
            >
              ĐĂNG KÝ TƯ VẤN 1-1 MIỄN PHÍ
            </Link>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-slate-600">
              <p className="font-bold text-slate-800">Liên hệ KTS:</p>
              <p>Hotline: <span className="font-bold text-brand-navy">{siteConfig.contact.hotlineDisplay}</span></p>
              <p>Email: {siteConfig.contact.email}</p>
              <p>Giờ làm việc: {siteConfig.contact.workingHours}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

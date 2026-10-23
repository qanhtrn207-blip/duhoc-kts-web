import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-8 border-t border-brand-navy-light/40">
      <div className="container mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-white/20 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo/logo-kts-png.png"
                  alt="Công Ty Tư Vấn Du Học KTS"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  DU HỌC KTS
                </span>
                <span className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold block">
                  {siteConfig.legalName}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300/90 leading-relaxed pr-4">
              <strong>{siteConfig.legalName}</strong> là đơn vị tư vấn du học uy tín và chuyên nghiệp hàng đầu tại Việt Nam. Chúng tôi cam kết đồng hành cùng học sinh và phụ huynh kiến tạo lộ trình du học tối ưu, minh bạch tài chính và hiện thực hóa ước mơ vươn ra thế giới.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Mạng xã hội KTS:</span>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-blue text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href={siteConfig.contact.zaloUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110 font-bold"
                aria-label="Zalo"
              >
                ZL
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>

            <div className="pt-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-brand-gold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Giấy phép tư vấn du học hợp pháp được cấp bởi Sở Giáo dục và Đào tạo.</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ve-chung-toi" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Về Du Học KTS</span>
                </Link>
              </li>
              <li>
                <Link href="/quoc-gia" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Điểm đến du học</span>
                </Link>
              </li>
              <li>
                <Link href="/truong-hoc" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Danh sách trường đại học</span>
                </Link>
              </li>
              <li>
                <Link href="/hoc-bong" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Học bổng du học mới nhất</span>
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Dịch vụ hỗ trợ hồ sơ</span>
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tin tức & Cẩm nang</span>
                </Link>
              </li>
              <li>
                <Link href="/dat-lich-tu-van" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Đặt lịch hẹn tư vấn 1-1</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Countries Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              Quốc gia du học
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/quoc-gia/my" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Du học Mỹ (USA)</span>
                </Link>
              </li>
              <li>
                <Link href="/quoc-gia/uc" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Du học Úc (Australia)</span>
                </Link>
              </li>
              <li>
                <Link href="/quoc-gia/anh" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Du học Anh (UK)</span>
                </Link>
              </li>
              <li>
                <Link href="/quoc-gia/canada" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Du học Canada</span>
                </Link>
              </li>
              <li>
                <Link href="/quoc-gia/new-zealand" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Du học New Zealand</span>
                </Link>
              </li>
              <li>
                <Link href="/quoc-gia/singapore" className="hover:text-brand-gold transition duration-200 flex items-center gap-1.5 hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Du học Singapore</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Offices */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              Văn phòng KTS
            </h4>
            <div className="space-y-3.5 text-xs">
              {siteConfig.offices.map((office, idx) => (
                <div key={idx} className="border-l-2 border-brand-gold/60 pl-3 space-y-1">
                  <p className="font-bold text-white text-xs">{office.city}</p>
                  <p className="text-slate-300 leading-snug">{office.address}</p>
                  <p className="text-brand-gold font-mono">{office.phone}</p>
                </div>
              ))}

              <div className="pt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>{siteConfig.contact.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-white transition">
              Điều khoản sử dụng
            </Link>
            <Link href="/lien-he" className="hover:text-white transition">
              Sơ đồ văn phòng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

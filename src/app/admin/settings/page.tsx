import React from "react";
import AdminNav from "@/components/admin/AdminNav";
import { Settings, Phone, Mail, MapPin, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-brand-navy flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand-blue" />
            <span>Cấu Hình Website & Thông Tin Thương Hiệu</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Các thông tin liên hệ, hotline, địa chỉ văn phòng và mạng xã hội được quản trị tập trung.
          </p>
        </div>

        <div className="space-y-6">
          {/* General Brand Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-slate-100 pb-2">
              1. Nhận diện thương hiệu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase">Tên thương hiệu:</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{siteConfig.name}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Pháp nhân:</span>
                <p className="font-semibold text-slate-700 mt-0.5">{siteConfig.legalName}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 font-bold uppercase">Khẩu hiệu / Slogan:</span>
                <p className="font-semibold text-brand-navy mt-0.5">{siteConfig.slogan}</p>
              </div>
            </div>
          </div>

          {/* Contacts & Hotlines */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-blue" />
              <span>2. Kênh liên lạc & Tiếp nhận khách hàng</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase">Hotline 24/7:</span>
                <p className="font-mono font-bold text-emerald-600 text-sm mt-0.5">{siteConfig.contact.hotlineDisplay}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Email chính thức:</span>
                <p className="font-medium text-slate-800 text-sm mt-0.5">{siteConfig.contact.email}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Đường dẫn Zalo OA / Tư vấn:</span>
                <p className="font-mono text-brand-blue truncate mt-0.5">{siteConfig.contact.zaloUrl}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase">Thời gian làm việc:</span>
                <p className="font-medium text-slate-700 mt-0.5">{siteConfig.contact.workingHours}</p>
              </div>
            </div>
          </div>

          {/* Offices List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>3. Danh sách các văn phòng tư vấn</span>
            </h2>
            <div className="space-y-3">
              {siteConfig.offices.map((office, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-brand-gray border border-slate-200 text-xs">
                  <p className="font-bold text-brand-navy text-sm">{office.city}</p>
                  <p className="text-slate-600 mt-1">Địa chỉ: {office.address}</p>
                  <p className="text-slate-500 font-mono mt-0.5">Điện thoại: {office.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-gray px-4 py-16">
      <div className="text-center max-w-md bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-brand-navy font-mono">404</h1>
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy trang yêu cầu</h2>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
          Đường dẫn bạn đang tìm kiếm có thể đã thay đổi hoặc không còn tồn tại. Hãy quay lại trang chủ hoặc khám phá các chương trình du học.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Về trang chủ</span>
          </Link>
          <Link
            href="/chuong-trinh"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            Xem chương trình
          </Link>
        </div>
      </div>
    </div>
  );
}

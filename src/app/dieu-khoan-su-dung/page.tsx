import React from "react";
import type { Metadata } from "next";
import { FileText, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng — Du Học KTS Vietnam",
  description: "Điều khoản và quy định sử dụng website tư vấn du học Du Học KTS.",
};

export default function TermsPage() {
  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Quy định sử dụng
            </span>
            <h1 className="text-3xl font-extrabold text-brand-navy mt-3">
              Điều Khoản Sử Dụng Dịch Vụ
            </h1>
            <p className="text-xs text-slate-400 mt-2">Áp dụng từ: Tháng 03/2026</p>
          </div>

          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-brand-navy">1. Quyền sở hữu trí tuệ</h2>
            <p>
              Toàn bộ nội dung bài viết, cấu trúc cẩm nang, tài liệu hướng dẫn và hình ảnh mang tính nhận diện trên website <strong>{siteConfig.url}</strong> thuộc quyền sở hữu của {siteConfig.legalName}. Việc sao chép phải trích dẫn nguồn rõ ràng.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-brand-navy">2. Tuyên bố miễn trừ trách nhiệm</h2>
            <p>
              Các thông tin về học phí, quy định thị thực (visa) và điều kiện nhập học có thể thay đổi theo thời gian bởi các cơ quan di trú và ban tuyển sinh của từng trường. Du Học KTS nỗ lực cập nhật dữ liệu thường xuyên nhất có thể, tuy nhiên người dùng nên liên hệ cố vấn để nhận thông tin mới nhất tại thời điểm nộp đơn.
            </p>
            <p>
              Du Học KTS là đơn vị tư vấn giáo dục độc lập, kết quả cấp visa thuộc toàn quyền quyết định của Đại sứ quán / Tổng Lãnh sự quán của các quốc gia sở tại.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { getServices } from "@/lib/data/repository";
import ConsultationForm from "@/components/forms/ConsultationForm";

export const metadata: Metadata = {
  title: "Dịch Vụ Tư Vấn Du Học Toàn Diện — Du Học KTS Vietnam",
  description:
    "Các dịch vụ hỗ trợ hồ sơ du học, định hướng ngành học, luyện thi tiếng Anh, săn học bổng và luyện phỏng vấn visa chuyên nghiệp.",
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Giải pháp đồng hành toàn diện</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy">
            Dịch Vụ Tư Vấn Du Học Du Học KTS
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            Chúng tôi cung cấp hệ sinh thái dịch vụ khép kín từ những ngày đầu định hướng ngành học, tối ưu bài luận săn học bổng, xử lý visa đến khi bạn đặt chân đến vùng đất mới.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={svc.image_url}
                    alt={svc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-blue transition leading-snug">
                    <Link href={`/dich-vu/${svc.slug}`}>{svc.name}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {svc.short_description}
                  </p>

                  {svc.features && svc.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      {svc.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 mt-4 border-t border-slate-100">
                <Link
                  href={`/dich-vu/${svc.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-brand-blue hover:text-white text-brand-navy font-bold text-xs transition border border-slate-200 hover:border-brand-blue flex items-center justify-center gap-2"
                >
                  <span>Tìm hiểu chi tiết dịch vụ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Section */}
        <div className="max-w-4xl mx-auto">
          <ConsultationForm
            sourcePage="/dich-vu"
            title="Đăng ký nhận tư vấn lộ trình dịch vụ"
            subtitle="Để lại thông tin để chuyên viên Du Học KTS phân tích tình trạng hồ sơ miễn phí."
          />
        </div>
      </div>
    </div>
  );
}

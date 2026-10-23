import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Award, DollarSign, CheckCircle2 } from "lucide-react";
import { getCountries } from "@/lib/data/repository";

export const metadata: Metadata = {
  title: "Điểm Đến Du Học — Mỹ, Úc, Anh, Canada, New Zealand, Singapore",
  description:
    "Khám phá lộ trình du học, điều kiện tuyển sinh, học phí, học bổng và quy trình xin visa tại các quốc gia hàng đầu thế giới cùng Du Học KTS.",
};

export const revalidate = 3600;

export default async function CountriesListPage() {
  const countries = await getCountries();

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Mạng lưới điểm đến toàn cầu</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy">
            Các Quốc Gia Du Học Hàng Đầu
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            Mỗi đất nước mang một bản sắc văn hóa và thế mạnh giáo dục riêng. Hãy chọn quốc gia bạn quan tâm để khám phá chi tiết về hệ thống trường, học phí, học bổng và chính sách visa mới nhất.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-brand-navy/90 text-white font-mono font-bold text-xs">
                    {c.code}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition">
                    <Link href={`/quoc-gia/${c.slug}`}>{c.name}</Link>
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {c.short_description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    {c.average_tuition && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span>Học phí TB: <strong className="text-slate-800">{c.average_tuition}</strong></span>
                      </div>
                    )}
                    {c.popular_majors && c.popular_majors.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">
                          Ngành nổi bật: <strong className="text-slate-800">{c.popular_majors.slice(0, 2).join(", ")}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/quoc-gia/${c.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-brand-blue hover:text-white text-brand-navy font-bold text-xs transition border border-slate-200 hover:border-brand-blue flex items-center justify-center gap-2"
                >
                  <span>Tìm hiểu cẩm nang du học</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

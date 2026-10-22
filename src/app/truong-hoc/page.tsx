import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Building, MapPin, ExternalLink, ArrowRight, Award } from "lucide-react";
import { getUniversities, getCountries } from "@/lib/data/repository";

export const metadata: Metadata = {
  title: "Danh Sách Các Trường Đại Học Quốc Tế Đối Tác — EduGlobal",
  description:
    "Danh sách các trường đại học, cao đẳng uy tín hàng đầu tại Mỹ, Úc, Anh, Canada, New Zealand, Singapore và Hàn Quốc.",
};

export const revalidate = 3600;

export default async function UniversitiesPage() {
  const [universities, countries] = await Promise.all([
    getUniversities(),
    getCountries(),
  ]);

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Đối tác giáo dục toàn cầu</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy">
            Các Trường Đại Học & Cao Đẳng Quốc Tế
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            EduGlobal tự hào là đối tác tuyển sinh chính thức của hàng trăm trường đại học danh tiếng, mang lại cơ hội tiếp cận học bổng và thủ tục nhập học nhanh chóng.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={uni.cover_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {uni.ranking && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-brand-navy/90 text-brand-gold font-bold text-xs backdrop-blur-sm">
                      {uni.ranking}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-blue transition leading-snug">
                    <Link href={`/truong-hoc/${uni.slug}`}>{uni.name}</Link>
                  </h2>

                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{uni.location}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {uni.description}
                  </p>

                  {uni.tuition_range && (
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">Học phí ước tính:</span>{" "}
                      <strong className="text-brand-navy font-bold">{uni.tuition_range}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <Link
                  href={`/truong-hoc/${uni.slug}`}
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>Xem thông tin trường</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {uni.website_url && (
                  <a
                    href={uni.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-brand-navy transition p-1"
                    title="Website chính thức"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

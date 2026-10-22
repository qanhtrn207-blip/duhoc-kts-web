import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Building,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  DollarSign,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { getUniversityBySlug, getUniversities, getPrograms } from "@/lib/data/repository";

interface UniversityDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: UniversityDetailPageProps): Promise<Metadata> {
  const uni = await getUniversityBySlug(params.slug);
  if (!uni) return { title: "Không tìm thấy trường" };

  return {
    title: `${uni.name} — Bảng Xếp Hạng & Chương Trình Đào Tạo`,
    description: uni.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const unis = await getUniversities();
  return unis.map((u) => ({ slug: u.slug }));
}

export const revalidate = 3600;

export default async function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const uni = await getUniversityBySlug(params.slug);
  if (!uni) notFound();

  const allPrograms = await getPrograms();
  const uniPrograms = allPrograms.filter((p) => p.university_id === uni.id);

  return (
    <div className="bg-brand-gray min-h-screen py-10">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/truong-hoc" className="hover:text-brand-blue">Trường học</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">{uni.name}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm mb-10">
          <div className="relative aspect-[21/9] max-h-96 w-full bg-slate-900">
            <img
              src={uni.cover_url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"}
              alt={uni.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              {uni.ranking && (
                <span className="px-3 py-1 rounded-md bg-brand-gold text-brand-navy font-bold text-xs inline-block mb-2">
                  {uni.ranking}
                </span>
              )}
              <h1 className="text-2xl md:text-4xl font-extrabold">{uni.name}</h1>
              <p className="text-xs md:text-sm text-slate-300 flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{uni.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <Building className="w-5 h-5 text-brand-blue" />
                <span>Giới thiệu về trường</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {uni.description}
              </p>

              {uni.website_url && (
                <div className="pt-2">
                  <a
                    href={uni.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                  >
                    <span>Truy cập trang chủ chính thức ({uni.website_url})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Programs Offered */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-blue" />
                <span>Các chương trình tiêu biểu tại trường</span>
              </h2>

              {uniPrograms.length === 0 ? (
                <p className="text-sm text-slate-500 italic">
                  Hiện trường có nhiều chuyên ngành đa dạng. Vui lòng liên hệ cố vấn EduGlobal để nhận danh sách ngành đào tạo chi tiết của trường.
                </p>
              ) : (
                <div className="space-y-3">
                  {uniPrograms.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 bg-brand-gray flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-brand-navy text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Thời gian: {p.duration} — Bậc: {p.degree_level.toUpperCase()}</p>
                      </div>
                      <Link
                        href={`/chuong-trinh/${p.slug}`}
                        className="px-3.5 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold text-center"
                      >
                        Xem ngành học
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <ConsultationForm
                sourcePage={`/truong-hoc/${uni.slug}`}
                title={`Đăng ký tư vấn trường ${uni.name}`}
                subtitle="Nhận bảng học phí chi tiết, điều kiện đầu vào và xét học bổng của trường."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Award,
  Calendar,
  Building,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { getScholarshipBySlug, getScholarships } from "@/lib/data/repository";

interface ScholarshipDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ScholarshipDetailPageProps): Promise<Metadata> {
  const s = await getScholarshipBySlug(params.slug);
  if (!s) return { title: "Không tìm thấy học bổng" };

  return {
    title: `${s.name} — Điều Kiện & Hướng Dẫn Nộp Đơn`,
    description: s.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const list = await getScholarships();
  return list.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600;

export default async function ScholarshipDetailPage({ params }: ScholarshipDetailPageProps) {
  const s = await getScholarshipBySlug(params.slug);
  if (!s) notFound();

  return (
    <div className="bg-brand-gray min-h-screen py-10">
      <div className="container mx-auto">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/hoc-bong" className="hover:text-brand-blue">Học bổng</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold line-clamp-1">{s.name}</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 font-bold text-xs uppercase mb-3">
            <Award className="w-4 h-4 text-brand-gold" />
            <span>Quốc gia: {s.country?.name || "Quốc tế"}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-brand-navy leading-tight">
            {s.name}
          </h1>

          {s.university && (
            <p className="text-sm font-semibold text-brand-blue mt-2 flex items-center gap-1.5">
              <Building className="w-4 h-4" />
              <span>{s.university.name}</span>
            </p>
          )}

          <div className="mt-8 p-6 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase">Giá trị học bổng:</p>
              <p className="text-xl md:text-2xl font-black text-brand-blue mt-1">
                {s.amount_description}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold text-slate-500 uppercase">Hạn chót nhận hồ sơ:</p>
              <p className="text-base font-extrabold text-rose-600 mt-1">{s.application_deadline}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy">Mô tả học bổng</h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {s.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Tiêu chí & Điều kiện ứng tuyển</span>
              </h2>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                {s.eligibility}
              </div>

              {s.source_url && (
                <div className="pt-2">
                  <a
                    href={s.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                  >
                    <span>Xem thông tin học bổng tại website trường</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <ConsultationForm
                sourcePage={`/hoc-bong/${s.slug}`}
                title="Đăng ký xét duyệt học bổng này"
                subtitle="Cố vấn học thuật Du Học KTS sẽ đánh giá hồ sơ và hỗ trợ chiến lược bài luận cá nhân cho bạn."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

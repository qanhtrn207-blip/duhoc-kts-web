import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  Calendar,
  Building,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { getProgramBySlug, getPrograms } from "@/lib/data/repository";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ProgramDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProgramDetailPageProps): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  if (!program) return { title: "Không tìm thấy chương trình" };

  return {
    title: `${program.name} — Điều Kiện Tuyển Sinh & Học Phí`,
    description: program.description.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const program = await getProgramBySlug(params.slug);
  if (!program) notFound();

  return (
    <div className="bg-brand-gray min-h-screen py-10">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/chuong-trinh" className="hover:text-brand-blue">Chương trình đào tạo</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold line-clamp-1">{program.name}</span>
        </nav>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/90 shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-md bg-blue-50 text-brand-blue font-bold text-xs uppercase">
              Bậc: {program.degree_level}
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold text-xs">
              Ngành: {program.field_of_study}
            </span>
            <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold text-xs">
              Quốc gia: {program.country?.name || "Quốc tế"}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-brand-navy leading-tight">
            {program.name}
          </h1>

          {program.university && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Building className="w-4 h-4 text-brand-blue" />
              <span>Được đào tạo tại: <strong className="text-brand-navy">{program.university.name}</strong></span>
              {program.university.location && <span>— {program.university.location}</span>}
            </div>
          )}

          {/* Key Facts Matrix */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-brand-gray border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Thời lượng khóa học</p>
              <p className="text-sm md:text-base font-extrabold text-brand-navy mt-1">{program.duration}</p>
            </div>

            <div className="p-4 rounded-xl bg-brand-gray border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Học phí tham khảo</p>
              <p className="text-sm md:text-base font-extrabold text-brand-blue mt-1">
                {formatCurrency(program.tuition_min, program.currency)} - {formatCurrency(program.tuition_max, program.currency)}/năm
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-gray border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Kỳ nhập học</p>
              <p className="text-xs md:text-sm font-bold text-slate-800 mt-1 line-clamp-2">
                {program.intake_information}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-gray border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Trạng thái xác minh</p>
              <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã kiểm chứng</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-blue" />
                <span>Giới thiệu chương trình học</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {program.description}
              </p>
            </div>

            {/* Entry Requirements */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Điều kiện đầu vào & Yêu cầu hồ sơ</span>
              </h2>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-sm text-slate-700 leading-relaxed">
                {program.entry_requirements}
              </div>
              <p className="text-xs text-slate-500 italic">
                * Học sinh chưa đạt chuẩn tiếng Anh có thể đăng ký các khóa dự bị hoặc khóa bổ trợ tiếng Anh trực tiếp trước khi vào khóa chính.
              </p>
            </div>

            {/* Intake details */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-blue" />
                <span>Các kỳ nhập học & Mốc thời gian quan trọng</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {program.intake_information}
              </p>

              {program.source_url && (
                <div className="pt-2">
                  <a
                    href={program.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                  >
                    <span>Xem website khoa đào tạo chính thức</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <ConsultationForm
                defaultCountry={program.country?.name}
                defaultLevel={program.degree_level}
                sourcePage={`/chuong-trinh/${program.slug}`}
                title="Đăng ký xét tuyển chương trình này"
                subtitle="Chuyên viên EduGlobal sẽ hỗ trợ bạn kiểm tra hồ sơ và hướng dẫn các bước xin học bổng."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

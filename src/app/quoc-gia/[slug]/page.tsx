import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  GraduationCap,
  DollarSign,
  ShieldCheck,
  Award,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  HelpCircle,
  Building,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import {
  getCountryBySlug,
  getCountries,
  getUniversities,
  getPrograms,
  getScholarships,
} from "@/lib/data/repository";
import { formatCurrency } from "@/lib/utils";

interface CountryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const country = await getCountryBySlug(params.slug);
  if (!country) return { title: "Không tìm thấy quốc gia" };

  return {
    title: `${country.name} — Cẩm Nang Lộ Trình, Học Phí & Học Bổng Chi Tiết`,
    description: country.short_description,
  };
}

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ slug: c.slug }));
}

export const revalidate = 3600;

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const country = await getCountryBySlug(params.slug);
  if (!country) notFound();

  const [universities, programs, scholarships] = await Promise.all([
    getUniversities(country.id),
    getPrograms({ country: country.slug }),
    getScholarships({ country: country.slug }),
  ]);

  const faqs = [
    {
      q: `Chi phí du học tại ${country.name} mỗi năm khoảng bao nhiêu?`,
      a: `Mức học phí trung bình dao động khoảng ${country.average_tuition || "tùy ngành học"} và sinh hoạt phí khoảng ${country.average_living_cost || "10.000 - 15.000 USD/năm"}. Ngoài ra, bạn có thể giảm bớt gánh nặng tài chính thông qua các suất học bổng 20% - 100% và cơ hội làm thêm hợp pháp.`,
    },
    {
      q: `Cần chuẩn bị hồ sơ du học ${country.name} trước bao lâu?`,
      a: `Để kịp các kỳ nhập học và săn học bổng giá trị cao, học sinh nên bắt đầu chuẩn bị hồ sơ học thuật, ôn thi chứng chỉ ngoại ngữ (IELTS/PTE) trước từ 6 đến 9 tháng.`,
    },
    {
      q: `Quy trình xin visa du học ${country.name} có khó không?`,
      a: `Quy trình đòi hỏi tính minh bạch cao về năng lực học thuật và nguồn gốc tài chính gia đình. Khi đồng hành cùng Du Học KTS, bạn sẽ được hướng dẫn chuẩn hóa giấy tờ và luyện phỏng vấn 1-1 với kịch bản sát thực tế.`,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative bg-brand-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={country.banner_url || country.image_url}
            alt={country.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/90 to-transparent"></div>

        <div className="container mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <Link href="/" className="hover:text-white transition">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/quoc-gia" className="hover:text-white transition">Quốc gia du học</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-brand-gold font-semibold">{country.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-brand-gold font-mono font-bold text-xs uppercase mb-3">
              <span>Mã quốc gia: {country.code}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {country.name}
            </h1>
            <p className="text-slate-200 text-sm md:text-base mt-4 leading-relaxed">
              {country.short_description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details Guide */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
                <Globe className="w-6 h-6 text-brand-blue" />
                <span>Tổng quan du học {country.name}</span>
              </h2>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {country.description}
              </div>
            </section>

            {/* Education System & Degrees */}
            {country.education_system && (
              <section className="p-6 md:p-8 rounded-2xl bg-brand-gray border border-slate-200 space-y-4">
                <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-brand-blue" />
                  <span>Hệ thống giáo dục & Các bậc học</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {country.education_system}
                </p>

                {country.degree_levels && (
                  <div className="pt-3">
                    <p className="text-xs font-bold text-slate-700 uppercase mb-2">Các bậc học tiêu biểu:</p>
                    <div className="flex flex-wrap gap-2">
                      {country.degree_levels.map((lvl, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-brand-navy shadow-sm"
                        >
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Popular Majors & Costs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Popular Majors */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-blue" />
                  <span>Ngành học thế mạnh</span>
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-600">
                  {country.popular_majors?.map((major, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
                      <span>{major}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Estimated Costs */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-brand-blue" />
                  <span>Chi phí tham khảo</span>
                </h3>
                <div className="space-y-3 text-xs md:text-sm text-slate-600">
                  {country.average_tuition && (
                    <div>
                      <span className="font-semibold text-slate-700">Học phí trung bình:</span>
                      <p className="text-brand-navy font-bold">{country.average_tuition}</p>
                    </div>
                  )}
                  {country.average_living_cost && (
                    <div>
                      <span className="font-semibold text-slate-700">Sinh hoạt phí trung bình:</span>
                      <p className="text-brand-navy font-bold">{country.average_living_cost}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Visa Policy */}
            {country.visa_requirements && (
              <section className="p-6 md:p-8 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-brand-blue" />
                  <span>Thông tin & Điều kiện Visa du học</span>
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {country.visa_requirements}
                </p>
                {country.official_visa_url && (
                  <div className="pt-2">
                    <a
                      href={country.official_visa_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
                    >
                      <span>Tra cứu cổng thị thực chính thức của cơ quan di trú</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </section>
            )}

            {/* Universities in this Country */}
            {universities.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                    <Building className="w-5 h-5 text-brand-blue" />
                    <span>Các trường tiêu biểu tại {country.name}</span>
                  </h3>
                  <Link href="/truong-hoc" className="text-xs font-bold text-brand-blue hover:underline">
                    Xem tất cả
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {universities.map((uni) => (
                    <div
                      key={uni.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white hover:shadow-md transition"
                    >
                      <h4 className="font-bold text-brand-navy text-sm">{uni.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{uni.location}</p>
                      {uni.ranking && (
                        <p className="text-xs font-semibold text-brand-blue mt-2">{uni.ranking}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Available Scholarships */}
            {scholarships.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-gold" />
                  <span>Học bổng nổi bật tại {country.name}</span>
                </h3>

                <div className="space-y-3">
                  {scholarships.map((s) => (
                    <div
                      key={s.id}
                      className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-bold text-brand-navy text-sm">{s.name}</h4>
                        <p className="text-xs font-extrabold text-brand-blue mt-1">
                          {s.amount_description}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">Hạn nộp: {s.application_deadline}</p>
                      </div>

                      <Link
                        href={`/hoc-bong/${s.slug}`}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-brand-navy hover:text-brand-blue transition text-center"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-blue" />
                <span>Câu hỏi thường gặp về du học {country.name}</span>
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-brand-gray">
                    <p className="font-bold text-sm text-brand-navy">{faq.q}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Consultation Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <ConsultationForm
                defaultCountry={country.name}
                sourcePage={`/quoc-gia/${country.slug}`}
                title={`Đăng ký tư vấn du học ${country.name}`}
                subtitle="Chuyên viên phụ trách quốc gia này sẽ tư vấn cụ thể lộ trình trường và học bổng cho bạn."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

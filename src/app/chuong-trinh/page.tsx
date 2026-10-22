import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";
import { getPrograms, getCountries } from "@/lib/data/repository";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Chương Trình Du Học — THPT, Cử Nhân, Thạc Sĩ Quốc Tế",
  description:
    "Tìm kiếm và so sánh các chương trình du học chất lượng tại Mỹ, Úc, Anh, Canada với mức học phí và điều kiện tuyển sinh rõ ràng.",
};

interface ProgramsPageProps {
  searchParams: {
    country?: string;
    level?: string;
    major?: string;
    search?: string;
  };
}

export const revalidate = 0; // Dynamic on filter changes

export default async function ProgramsPage({ searchParams }: ProgramsPageProps) {
  const [programs, countries] = await Promise.all([
    getPrograms({
      country: searchParams.country,
      level: searchParams.level,
      major: searchParams.major,
      search: searchParams.search,
    }),
    getCountries(),
  ]);

  const levelOptions = [
    { value: "", label: "Tất cả bậc học" },
    { value: "thpt", label: "Du học THPT Nội trú" },
    { value: "foundation", label: "Dự bị đại học / Pathway" },
    { value: "college", label: "Cao đẳng / Nghề" },
    { value: "bachelor", label: "Cử nhân / Đại học" },
    { value: "master", label: "Thạc sĩ / MBA" },
  ];

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy">
            Chương Trình Du Học Quốc Tế
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Tìm kiếm khóa học theo bậc học, ngành nghề và quốc gia phù hợp với mục tiêu của bạn.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Search keyword */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Từ khóa tìm kiếm</label>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  defaultValue={searchParams.search || ""}
                  placeholder="Nhập tên khóa học hoặc ngành..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Quốc gia</label>
              <select
                name="country"
                defaultValue={searchParams.country || ""}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                <option value="">Tất cả quốc gia</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Bậc học</label>
              <select
                name="level"
                defaultValue={searchParams.level || ""}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                {levelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit button */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Lọc kết quả</span>
              </button>
              {(searchParams.country || searchParams.level || searchParams.search) && (
                <Link
                  href="/chuong-trinh"
                  className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center transition"
                >
                  Xóa lọc
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Results Counter */}
        <div className="mb-4 text-xs font-semibold text-slate-500">
          Hiển thị <strong>{programs.length}</strong> chương trình đào tạo phù hợp
        </div>

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">Chưa tìm thấy chương trình phù hợp</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm hoặc liên hệ trực tiếp EduGlobal để được cố vấn lộ trình riêng.
            </p>
            <Link
              href="/chuong-trinh"
              className="mt-4 inline-block px-4 py-2 rounded-lg bg-brand-blue text-white text-xs font-bold"
            >
              Xem tất cả chương trình
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue font-bold text-[11px] uppercase">
                      {prog.degree_level}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {prog.country?.name || "Quốc tế"}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-brand-navy leading-snug line-clamp-2 hover:text-brand-blue transition">
                    <Link href={`/chuong-trinh/${prog.slug}`}>{prog.name}</Link>
                  </h3>

                  {prog.university && (
                    <p className="text-xs font-semibold text-brand-blue mt-1">
                      {prog.university.name}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Thời gian: <strong className="text-slate-800">{prog.duration}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Học phí:{" "}
                        <strong className="text-brand-navy">
                          {formatCurrency(prog.tuition_min, prog.currency)} - {formatCurrency(prog.tuition_max, prog.currency)} / năm
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                      <span className="line-clamp-2">
                        Điều kiện: {prog.entry_requirements}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/chuong-trinh/${prog.slug}`}
                    className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <span>Chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/dat-lich-tu-van?program=${encodeURIComponent(prog.name)}`}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition"
                  >
                    Tư vấn ngành này
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

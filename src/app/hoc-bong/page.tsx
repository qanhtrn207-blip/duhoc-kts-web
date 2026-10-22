import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Award, Calendar, CheckCircle2, ArrowRight, Filter } from "lucide-react";
import { getScholarships, getCountries } from "@/lib/data/repository";

export const metadata: Metadata = {
  title: "Học Bổng Du Học 2026 - 2027 — Giá Trị Từ 20% Đến 100% Học Phí",
  description:
    "Tổng hợp danh sách các suất học bổng du học Mỹ, Úc, Anh, Canada đang mở đơn với điều kiện tuyển sinh và hạn nộp rõ ràng.",
};

interface ScholarshipsPageProps {
  searchParams: {
    country?: string;
    status?: string;
  };
}

export const revalidate = 0;

export default async function ScholarshipsPage({ searchParams }: ScholarshipsPageProps) {
  const [scholarships, countries] = await Promise.all([
    getScholarships({
      country: searchParams.country,
      status: searchParams.status,
    }),
    getCountries(),
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "closing_soon":
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">Sắp hết hạn</span>;
      case "closed":
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">Đã đóng đơn</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Đang nhận hồ sơ</span>;
    }
  };

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Quỹ học bổng quốc tế</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy">
            Danh Sách Học Bổng Du Học Mới Nhất
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            EduGlobal cập nhật liên tục các suất học bổng từ 20% đến 100% học phí được thẩm định điều kiện bởi ban cố vấn học thuật.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-3xl mx-auto">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
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

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Trạng thái hồ sơ</label>
              <select
                name="status"
                defaultValue={searchParams.status || ""}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="open">Đang mở đơn</option>
                <option value="closing_soon">Sắp hết hạn</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Lọc học bổng</span>
              </button>
              {(searchParams.country || searchParams.status) && (
                <Link
                  href="/hoc-bong"
                  className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold flex items-center justify-center transition"
                >
                  Xóa lọc
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 md:p-7 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase text-slate-500">
                    {s.country?.name || "Học bổng quốc tế"}
                  </span>
                  {getStatusBadge(s.status)}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-blue transition">
                  <Link href={`/hoc-bong/${s.slug}`}>{s.name}</Link>
                </h3>

                {s.university && (
                  <p className="text-xs font-medium text-slate-600 mt-1">
                    Cơ sở: <strong className="text-slate-800">{s.university.name}</strong>
                  </p>
                )}

                <div className="mt-4 p-3.5 bg-brand-gray rounded-xl border border-amber-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Giá trị học bổng:</span>
                  <span className="text-sm md:text-base font-extrabold text-brand-blue text-right">
                    {s.amount_description}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Điều kiện:</strong> {s.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span><strong>Hạn nộp:</strong> {s.application_deadline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/hoc-bong/${s.slug}`}
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                >
                  <span>Xem hướng dẫn nộp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/dat-lich-tu-van?scholarship=${encodeURIComponent(s.name)}`}
                  className="px-4 py-2 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition"
                >
                  Đánh giá hồ sơ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

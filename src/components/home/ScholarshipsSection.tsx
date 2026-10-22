import React from "react";
import Link from "next/link";
import { Award, Calendar, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Scholarship } from "@/types/database";

interface ScholarshipsSectionProps {
  scholarships: Scholarship[];
}

export default function ScholarshipsSection({ scholarships }: ScholarshipsSectionProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "closing_soon":
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">Sắp hết hạn</span>;
      case "closed":
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">Đã đóng đơn</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold animate-pulse">Đang nhận hồ sơ</span>;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Quỹ học bổng quốc tế
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-navy mt-3">
              Cơ hội học bổng giá trị cao 2026 - 2027
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl">
              Danh sách các suất học bổng từ 20% đến 100% học phí được thẩm định điều kiện bởi ban cố vấn học thuật Du Học KTS.
            </p>
          </div>

          <Link
            href="/hoc-bong"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group transition"
          >
            <span>Xem tất cả học bổng</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="card-hover-effect bg-brand-gray rounded-2xl border border-slate-200 p-6 md:p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-gold" />
                    <span className="text-xs font-bold uppercase text-slate-500">
                      {item.country?.name || "Học bổng quốc tế"}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-blue transition duration-200">
                  <Link href={`/hoc-bong/${item.slug}`}>{item.name}</Link>
                </h3>

                {item.university && (
                  <p className="text-xs font-medium text-slate-600 mt-1">
                    Cơ sở cấp: <strong className="text-slate-800">{item.university.name}</strong>
                  </p>
                )}

                {/* Amount Highlight */}
                <div className="mt-4 p-3.5 bg-white rounded-xl border border-amber-200/60 flex items-center justify-between shadow-sm">
                  <span className="text-xs font-bold text-slate-500 uppercase">Giá trị học bổng:</span>
                  <span className="text-sm md:text-base font-extrabold text-brand-blue text-right">
                    {item.amount_description}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Điều kiện:</strong> {item.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span><strong>Hạn nộp:</strong> {item.application_deadline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href={`/hoc-bong/${item.slug}`}
                  className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1 group"
                >
                  <span>Chi tiết điều kiện</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/dat-lich-tu-van?scholarship=${encodeURIComponent(item.name)}`}
                  className="btn-sheen px-4 py-2 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold transition shadow-sm"
                >
                  Đánh giá hồ sơ xin học bổng
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

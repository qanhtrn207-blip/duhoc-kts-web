import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, DollarSign, BookOpen, GraduationCap } from "lucide-react";
import { Program } from "@/types/database";
import { formatCurrency } from "@/lib/utils";

interface FeaturedProgramsProps {
  programs: Program[];
}

export default function FeaturedPrograms({ programs }: FeaturedProgramsProps) {
  const getLevelLabel = (lvl: string) => {
    switch (lvl) {
      case "thpt":
        return "THPT";
      case "foundation":
        return "Dự bị ĐH";
      case "college":
        return "Cao đẳng";
      case "bachelor":
        return "Cử nhân";
      case "master":
        return "Thạc sĩ";
      default:
        return "Đại học";
    }
  };

  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
              Chương trình tuyển sinh
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-navy mt-3">
              Chương trình đào tạo tiêu biểu
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl">
              Đa dạng bậc học từ THPT, Cao đẳng nghề, Cử nhân đến Thạc sĩ tại các trường đối tác uy tín toàn cầu của KTS.
            </p>
          </div>

          <Link
            href="/chuong-trinh"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group transition"
          >
            <span>Xem tất cả chương trình</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.slice(0, 6).map((prog) => (
            <div
              key={prog.id}
              className="card-hover-effect bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-brand-blue font-bold text-xs">
                    {getLevelLabel(prog.degree_level)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {prog.country?.name || "Quốc tế"}
                  </span>
                </div>

                {/* Program Title */}
                <h3 className="text-lg font-bold text-brand-navy leading-snug line-clamp-2 hover:text-brand-blue transition duration-200">
                  <Link href={`/chuong-trinh/${prog.slug}`}>{prog.name}</Link>
                </h3>

                {/* University Name */}
                {prog.university && (
                  <p className="text-xs font-semibold text-brand-blue mt-1.5 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{prog.university.name}</span>
                  </p>
                )}

                {/* Details List */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>Thời gian: <strong className="text-slate-800">{prog.duration}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>
                      Học phí:{" "}
                      <strong className="text-brand-navy">
                        {formatCurrency(prog.tuition_min, prog.currency)} - {formatCurrency(prog.tuition_max, prog.currency)} / năm
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      Yêu cầu: <span className="text-slate-700">{prog.entry_requirements}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  href={`/chuong-trinh/${prog.slug}`}
                  className="text-xs font-bold text-slate-600 hover:text-brand-blue transition flex items-center gap-1 group"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/dat-lich-tu-van?country=${prog.country_id || ""}&program=${encodeURIComponent(prog.name)}`}
                  className="btn-sheen px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition shadow-sm"
                >
                  Nhận tư vấn
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

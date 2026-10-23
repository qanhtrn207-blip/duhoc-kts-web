import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Award } from "lucide-react";
import { Country } from "@/types/database";

interface FeaturedCountriesProps {
  countries: Country[];
}

export default function FeaturedCountries({ countries }: FeaturedCountriesProps) {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Điểm đến du học hàng đầu cùng KTS</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-navy">
              Khám phá các quốc gia du học nổi bật
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl">
              Công Ty Tư Vấn Du Học KTS hỗ trợ lộ trình du học toàn diện tại các quốc gia có nền giáo dục tiên tiến hàng đầu thế giới.
            </p>
          </div>

          <Link
            href="/quoc-gia"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group transition"
          >
            <span>Xem tất cả quốc gia</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

        {/* Countries Grid with card hover effect (6 destination cards in 2x3 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.slice(0, 6).map((country) => (
            <Link
              key={country.id}
              href={`/quoc-gia/${country.slug}`}
              className="card-hover-effect group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 img-zoom-wrapper">
                <img
                  src={country.image_url}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-brand-navy/90 backdrop-blur-md text-white font-mono font-bold text-xs uppercase tracking-wider shadow">
                  {country.code}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition duration-200">
                    {country.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {country.short_description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Lộ trình tuyển sinh</span>
                  <span className="font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200">
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

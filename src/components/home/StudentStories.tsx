import React from "react";
import Link from "next/link";
import { Quote, Award, GraduationCap } from "lucide-react";
import { Testimonial } from "@/types/database";

interface StudentStoriesProps {
  testimonials: Testimonial[];
}

export default function StudentStories({ testimonials }: StudentStoriesProps) {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
            Chia sẻ thực tế
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-navy mt-3">
            Học sinh & Phụ huynh nói về Du Học KTS
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Lắng nghe cảm nhận và kinh nghiệm chinh phục học bổng cũng như visa từ những học sinh đã tin tưởng đồng hành cùng KTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card-hover-effect bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-brand-gold/60 mb-3" />
                <p className="text-xs md:text-sm text-slate-700 italic leading-relaxed">
                  "{item.student_story}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.image_url}
                  alt={item.display_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue/30 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-brand-navy">{item.display_name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-brand-blue" />
                    <span className="truncate max-w-[140px]">{item.school_name}</span>
                  </p>
                  {item.scholarship_received && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {item.scholarship_received}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Users, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy text-white pt-14 pb-24 md:py-28">
      {/* Background Glows with subtle breathing animation */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "6s" }}></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "8s" }}></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-brand-gold font-semibold backdrop-blur-md shadow-sm transition-transform hover:scale-105 duration-200">
              <Sparkles className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: "10s" }} />
              <span>Công Ty Tư Vấn Du Học KTS — Chuyên nghiệp & Tận tâm</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Khởi đầu hành trình du học — <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-amber-400">
                Kiến tạo tương lai toàn cầu
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200/95 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              <strong>Du Học KTS</strong> đồng hành cùng học sinh và phụ huynh Việt Nam lựa chọn quốc gia, trường học, ngành học và xây dựng hồ sơ xin học bổng tối ưu nhất với mục tiêu học tập cũng như ngân sách gia đình.
            </p>

            {/* CTA Buttons with Sheen Animation */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/dat-lich-tu-van"
                className="btn-sheen w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 group animate-pulse-glow"
              >
                <span>ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>

              <Link
                href="/quoc-gia"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all duration-200 backdrop-blur-md text-center hover:scale-105"
              >
                Khám phá du học
              </Link>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Tư vấn 1-1 chuyên sâu</p>
                  <p className="text-[11px] text-slate-300">Cá nhân hóa theo năng lực và tài chính</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Hỗ trợ hồ sơ chuẩn chỉ</p>
                  <p className="text-[11px] text-slate-300">Dịch thuật & Luyện phỏng vấn visa</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                <Users className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Định hướng học bổng</p>
                  <p className="text-[11px] text-slate-300">Chiến lược bài luận săn học bổng cao</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Image & Floating Badges with animation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image with subtle zoom on hover */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 aspect-[4/5] bg-slate-800 img-zoom-wrapper group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                  alt="Học sinh du học KTS"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent"></div>

                {/* Company Logo Badge in corner */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                  <img
                    src="/images/logo/logo-kts-png.png"
                    alt="Du Học KTS"
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-[11px] font-extrabold text-brand-navy">DU HỌC KTS</span>
                </div>
              </div>

              {/* Floating Badge 1 with Gentle Float Animation */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 animate-float-gentle z-20">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-brand-gold font-bold text-xl shadow-inner">
                  ★
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-navy uppercase tracking-wider">Học bổng nổi bật</p>
                  <p className="text-sm font-extrabold text-brand-blue">30% - 100% Học phí</p>
                  <p className="text-[11px] text-slate-500">Mỹ, Úc, Anh, Canada</p>
                </div>
              </div>

              {/* Floating Badge 2 with Delayed Float Animation */}
              <div className="absolute -top-4 -right-4 bg-brand-navy/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-white/20 hidden sm:flex items-center gap-2.5 animate-float-gentle-delayed z-20">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-semibold">Tuyển sinh Kỳ Thu 2026 đang mở đơn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

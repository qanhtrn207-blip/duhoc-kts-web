import React from "react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { Phone, CheckCircle2, ShieldCheck, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ConsultationCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Convincing Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-brand-gold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: "10s" }} />
              <span>Đồng hành cùng Du Học KTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Bắt đầu kế hoạch du học của bạn ngay hôm nay
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Đừng để những băn khoăn về chọn trường, chứng minh tài chính hay bài kiểm tra phỏng vấn visa làm chậm bước tiến của bạn. Chuyên viên tư vấn của <strong>Công Ty Tư Vấn Du Học KTS</strong> luôn sẵn sàng hỗ trợ bạn 1-1.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 justify-center lg:justify-start text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span>Hoàn toàn miễn phí phân tích hồ sơ và đánh giá học bổng</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span>Bảo mật 100% dữ liệu cá nhân theo quy chuẩn quốc tế</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span>Hơn 18 năm kinh nghiệm đồng hành cùng hàng ngàn du học sinh</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold animate-bounce">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Tư vấn trực tiếp:</p>
                  <a
                    href={`tel:${siteConfig.contact.hotline.replace(/\s/g, "")}`}
                    className="text-white font-extrabold text-base hover:text-brand-gold transition duration-200"
                  >
                    {siteConfig.contact.hotlineDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/30 flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Email KTS:</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white font-medium text-sm hover:text-brand-gold transition duration-200"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Lead Form */}
          <div className="lg:col-span-6 animate-fade-in">
            <ConsultationForm
              sourcePage="homepage-cta-banner"
              title="Đăng ký tư vấn du học KTS miễn phí"
              subtitle="Điền thông tin bên dưới để chuyên viên KTS liên hệ trực tiếp hỗ trợ bạn"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

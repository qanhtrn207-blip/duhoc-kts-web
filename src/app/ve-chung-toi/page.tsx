import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Eye,
  Shield,
  HeartHandshake,
  CheckCircle,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Về Chúng Tôi — Câu Chuyện Thương Hiệu & Sứ Mệnh",
  description:
    "Tìm hiểu về Công Ty Tư Vấn Du Học KTS - Tổ chức tư vấn du học uy tín, tận tâm, cam kết đồng hành cùng học sinh và phụ huynh trên con đường vươn ra thế giới.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "ThS. Hoàng Trí Dũng",
      role: "Giám đốc Học thuật & Cố vấn Trưởng",
      experience: "15 năm kinh nghiệm tư vấn du học Mỹ & Canada, cựu sinh viên Đại học Boston",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Bà Trần Mai Phương",
      role: "Trưởng phòng Hồ sơ & Visa Quốc tế",
      experience: "Chuyên gia xử lý hồ sơ visa Úc, New Zealand và Anh Quốc, hơn 1.000 hồ sơ thành công",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Ông Đặng Thế Anh",
      role: "Chuyên gia Chiến lược Học bổng & Bài luận",
      experience: "Tốt nghiệp Thạc sĩ ĐH Melbourne, chuyên sâu cố vấn bài luận xin học bổng 50-100%",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy text-white py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
            Về Công Ty Tư Vấn Du Học KTS
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
            Kiến tạo tương lai cho thế hệ trẻ Việt Nam
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 leading-relaxed">
            Chúng tôi tin rằng giáo dục quốc tế không chỉ là một tấm bằng, mà là hành trình bứt phá giới hạn bản thân, định hình tư duy toàn cầu và mở khóa những cơ hội nghề nghiệp không biên giới.
          </p>
        </div>
      </section>

      {/* Brand Story & Introduction */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Câu chuyện của chúng tôi
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-brand-navy leading-snug">
                Đồng hành trung thực — Minh bạch từng bước đi
              </h2>
              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>
                  Được thành lập với hơn 18 năm kinh nghiệm trong lĩnh vực giáo dục quốc tế, <strong>{siteConfig.legalName}</strong> (Du Học KTS) ra đời với sứ mệnh xóa bỏ những rào cản thông tin sai lệch, mang lại giải pháp tư vấn du học trung thực, minh bạch và có trách nhiệm nhất cho phụ huynh và học sinh Việt Nam.
                </p>
                <p>
                  Chúng tôi không tiếp cận du học như một dịch vụ thương mại đơn thuần, mà là người bạn đồng hành tin cậy của mỗi gia đình. Mỗi bộ hồ sơ đều được phân tích kỹ lưỡng nhằm tìm ra giải pháp tối ưu nhất giữa năng lực học thuật, sở thích cá nhân và ngân sách chi trả của cha mẹ.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-brand-gray border border-slate-200">
                  <p className="text-2xl font-extrabold text-brand-blue">100%</p>
                  <p className="text-xs text-slate-600 mt-1">Minh bạch tài chính & hợp đồng dịch vụ</p>
                </div>
                <div className="p-4 rounded-xl bg-brand-gray border border-slate-200">
                  <p className="text-2xl font-extrabold text-brand-gold">500+</p>
                  <p className="text-xs text-slate-600 mt-1">Trường THPT, Cao đẳng & Đại học đối tác</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Đội ngũ tư vấn Du Học KTS"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision & Core Values */}
      <section className="py-20 bg-brand-gray">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
              Định hướng phát triển
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy mt-3">
              Tầm nhìn, Sứ mệnh & Giá trị cốt lõi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Sứ mệnh</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trang bị cho học sinh, sinh viên Việt Nam kiến thức, kỹ năng và lộ trình học tập tối ưu để tự tin tỏa sáng tại các nền giáo dục tiên tiến trên toàn thế giới.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Tầm nhìn</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trở thành tổ chức tư vấn du học chuẩn mực, tận tâm và được các gia đình Việt Nam tin cậy nhất về tính trung thực, chuyên môn sâu và chất lượng dịch vụ đồng hành.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Giá trị cốt lõi</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Tận tâm — Minh bạch — Trách nhiệm — Chuyên nghiệp.</strong> Luôn đặt quyền lợi lâu dài và sự an toàn của học sinh lên trên hết trong mọi khuyến nghị.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Team */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Nhân sự chủ chốt
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy mt-3">
              Đội ngũ chuyên gia & cố vấn học thuật
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              Những chuyên gia giàu kinh nghiệm quốc tế trực tiếp phụ trách và dẫn dắt từng hồ sơ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-brand-gray rounded-2xl overflow-hidden border border-slate-200 p-6 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
                />
                <h4 className="text-lg font-bold text-brand-navy">{member.name}</h4>
                <p className="text-xs font-bold text-brand-blue mt-1 uppercase tracking-wider">{member.role}</p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Form */}
      <section className="py-16 bg-brand-gray border-t border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <ConsultationForm
            sourcePage="/ve-chung-toi"
            title="Sẵn sàng thảo luận về kế hoạch du học của bạn?"
            subtitle="Đặt lịch hẹn trò chuyện 1-1 trực tiếp cùng giám đốc học thuật Du Học KTS."
          />
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { UserCheck, FileText, School, Send, ShieldCheck, Plane, ArrowRight } from "lucide-react";

export default function ConsultingProcess() {
  const steps = [
    {
      step: "01",
      icon: <UserCheck className="w-6 h-6 text-brand-blue" />,
      title: "Đăng ký tư vấn ban đầu",
      description: "Để lại thông tin qua website hoặc hotline KTS. Chuyên viên tư vấn liên hệ trong vòng 24h để nắm bắt nhu cầu học tập và nguyện vọng của bạn.",
    },
    {
      step: "02",
      icon: <FileText className="w-6 h-6 text-brand-blue" />,
      title: "Đánh giá hồ sơ & ngân sách",
      description: "Phân tích học bạ, trình độ ngoại ngữ, điểm mạnh hoạt động ngoại khóa và năng lực tài chính gia đình để định vị lộ trình học tập phù hợp.",
    },
    {
      step: "03",
      icon: <School className="w-6 h-6 text-brand-blue" />,
      title: "Lựa chọn quốc gia & trường",
      description: "Lên danh sách tối ưu từ 3 - 5 trường đại học mục tiêu (nguyện vọng 1, nguyện vọng an toàn) và xác định các gói học bổng tiềm năng.",
    },
    {
      step: "04",
      icon: <Send className="w-6 h-6 text-brand-blue" />,
      title: "Chuẩn bị & nộp đơn tuyển sinh",
      description: "Dịch thuật công chứng học bạ, hiệu đính bài luận cá nhân (SOP/Essay), nộp hồ sơ trực tiếp đến phòng tuyển sinh và theo dõi thư mời (Offer Letter).",
    },
    {
      step: "05",
      icon: <ShieldCheck className="w-6 h-6 text-brand-blue" />,
      title: "Hướng dẫn & Luyện phỏng vấn Visa",
      description: "Chuẩn hóa hồ sơ tài chính pháp lý, hướng dẫn khám sức khỏe và tổ chức các buổi luyện phỏng vấn giả định 1-1 với cựu chuyên gia KTS.",
    },
    {
      step: "06",
      icon: <Plane className="w-6 h-6 text-brand-blue" />,
      title: "Hành trang trước khi bay & Sau khi đến",
      description: "Tham dự buổi Pre-departure briefing, hướng dẫn tìm ký túc xá/nhà ở, đặt vé máy bay, bảo hiểm và kết nối cộng đồng cựu sinh viên KTS tại nước sở tại.",
    },
  ];

  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "7s" }}></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
            Lộ trình bài bản
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mt-3">
            Quy trình tư vấn du học 6 bước tại KTS
          </h2>
          <p className="text-slate-300 text-sm md:text-base mt-3 leading-relaxed">
            Mỗi bước đi đều có cố vấn học thuật đồng hành sát cánh, minh bạch hóa tiến độ và đảm bảo bạn luôn nắm rõ lộ trình hồ sơ của mình.
          </p>
        </div>

        {/* 6 Steps Grid with card hover effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="card-hover-effect relative p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-gold group-hover:text-brand-navy">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-white/20 group-hover:text-brand-gold/50 transition-colors duration-300 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-gold transition duration-200">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA within section */}
        <div className="mt-14 text-center">
          <Link
            href="/dat-lich-tu-van"
            className="btn-sheen inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>BẮT ĐẦU BƯỚC 1: ĐĂNG KÝ TƯ VẤN CÙNG KTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-400 mt-3">
            * Quy trình mang tính chất tham khảo chuẩn mực; kết quả visa và tuyển sinh do trường học và cơ quan ngoại giao có thẩm quyền quyết định.
          </p>
        </div>
      </div>
    </section>
  );
}

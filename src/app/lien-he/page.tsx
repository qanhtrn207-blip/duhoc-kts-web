import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Liên Hệ Văn Phòng Tư Vấn Du Học KTS",
  description:
    "Thông tin liên hệ, hotline, email và địa chỉ các văn phòng Du Học KTS tại TP. Hồ Chí Minh, Hà Nội và Đà Nẵng.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
            Kết nối cùng chúng tôi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy mt-3">
            Hệ Thống Văn Phòng & Liên Hệ
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            Chúng tôi luôn sẵn sàng đón tiếp phụ huynh và học sinh tại các văn phòng trên toàn quốc hoặc hỗ trợ trực tuyến 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Office Cards List */}
          <div className="lg:col-span-6 space-y-6">
            {siteConfig.offices.map((office, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h2 className="text-lg font-bold text-brand-navy">{office.city}</h2>
                </div>

                <p className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </p>

                <p className="text-xs md:text-sm text-slate-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Điện thoại bàn: <strong className="text-brand-navy font-mono">{office.phone}</strong></span>
                </p>

                <p className="text-xs md:text-sm text-slate-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Email: {office.email}</span>
                </p>
              </div>
            ))}

            {/* Quick Contact Box */}
            <div className="bg-brand-navy text-white rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>Thời gian tiếp khách tại văn phòng</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {siteConfig.contact.workingHours}. Để đảm bảo cố vấn chuyên trách quốc gia có mặt và hỗ trợ bạn chu đáo nhất, bạn vui lòng đặt hẹn trước.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                <a
                  href={`tel:${siteConfig.contact.hotline.replace(/\s/g, "")}`}
                  className="px-4 py-2 rounded-xl bg-brand-gold text-brand-navy hover:bg-amber-400 transition"
                >
                  Hotline: {siteConfig.contact.hotlineDisplay}
                </a>

                <a
                  href={siteConfig.contact.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Zalo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <ConsultationForm
              sourcePage="/lien-he"
              title="Gửi tin nhắn hoặc yêu cầu hỗ trợ"
              subtitle="Điền thông tin và câu hỏi, chuyên viên phụ trách sẽ phản hồi qua điện thoại hoặc email."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

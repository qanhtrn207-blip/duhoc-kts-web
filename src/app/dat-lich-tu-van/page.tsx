"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Send,
  Building,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const bookingSchema = z.object({
  full_name: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ").max(15, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  country_name: z.string().min(1, "Vui lòng chọn quốc gia"),
  education_level: z.string().min(1, "Vui lòng chọn bậc học"),
  field_of_study: z.string().optional(),
  budget: z.string().optional(),
  target_intake: z.string().min(1, "Vui lòng chọn thời điểm dự kiến du học"),
  preferred_contact_method: z.enum(["phone", "zalo", "in_person", "email"]),
  preferred_consultation_time: z.string().min(1, "Vui lòng chọn khung giờ hẹn mong muốn"),
  message: z.string().optional(),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "Bạn cần đồng ý với chính sách bảo mật để tiếp tục",
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [leadCode, setLeadCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      preferred_contact_method: "phone",
      privacy_consent: true,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source_page: "/dat-lich-tu-van",
        }),
      });

      const res = await response.json();
      if (res.success) {
        setSubmitStatus("success");
        setLeadCode(res.leadId || "");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(res.error || "Gửi yêu cầu thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Không thể kết nối máy chủ lúc này. Vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full">
            Tư vấn cá nhân hóa
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy mt-3">
            Đặt Lịch Hẹn Tư Vấn Du Học 1-1
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Chọn thời gian và hình thức gặp gỡ thuận tiện nhất. Cố vấn học thuật chuyên trách sẽ chuẩn bị tài liệu trước buổi hẹn để giải đáp toàn bộ thắc mắc của bạn.
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-emerald-200 shadow-xl text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-bold text-brand-navy">Gửi Yêu Cầu Đặt Lịch Thành Công!</h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              Cảm ơn bạn đã gửi yêu cầu. Bộ phận điều phối của EduGlobal sẽ gọi điện thoại hoặc gửi tin nhắn Zalo trong vòng <strong>24 giờ</strong> để xác nhận lịch hẹn chính thức.
            </p>
            {leadCode && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl inline-block text-xs font-mono font-bold">
                Mã theo dõi yêu cầu: {leadCode}
              </div>
            )}
            <div className="pt-4">
              <button
                onClick={() => setSubmitStatus("idle")}
                className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs hover:bg-brand-blue-hover transition"
              >
                Đặt thêm lịch hẹn khác
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl">
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mb-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
              <span>
                <strong>Lưu ý quan trọng:</strong> Đây là biểu mẫu gửi yêu cầu khung giờ mong muốn, chưa phải lịch hẹn đã được xác nhận tự động. Cố vấn EduGlobal sẽ liên hệ xác nhận trạng thái lịch hẹn qua số điện thoại của bạn.
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-2 mb-4">
                  1. Thông tin người đăng ký
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      {...register("full_name")}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    />
                    {errors.full_name && (
                      <p className="text-rose-600 text-xs mt-1">{errors.full_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số điện thoại / Zalo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="0912 345 678"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    />
                    {errors.phone && (
                      <p className="text-rose-600 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      placeholder="example@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Study Plan */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-2 mb-4">
                  2. Định hướng du học & Ngân sách
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Quốc gia quan tâm nhất <span className="text-rose-500">*</span>
                    </label>
                    <select
                      {...register("country_name")}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    >
                      <option value="">-- Chọn quốc gia --</option>
                      <option value="Mỹ">Mỹ (USA)</option>
                      <option value="Úc">Úc (Australia)</option>
                      <option value="Anh">Anh (UK)</option>
                      <option value="Canada">Canada</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Hàn Quốc">Hàn Quốc</option>
                      <option value="Nhật Bản">Nhật Bản</option>
                      <option value="Chưa xác định">Cần cố vấn tư vấn thêm</option>
                    </select>
                    {errors.country_name && (
                      <p className="text-rose-600 text-xs mt-1">{errors.country_name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bậc học dự kiến <span className="text-rose-500">*</span>
                    </label>
                    <select
                      {...register("education_level")}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    >
                      <option value="">-- Chọn bậc học --</option>
                      <option value="THPT">Du học THPT Nội trú</option>
                      <option value="Dự bị đại học">Dự bị đại học / Pathway</option>
                      <option value="Cao đẳng">Cao đẳng / Nghề</option>
                      <option value="Đại học">Cử nhân / Đại học</option>
                      <option value="Thạc sĩ">Thạc sĩ / MBA</option>
                    </select>
                    {errors.education_level && (
                      <p className="text-rose-600 text-xs mt-1">{errors.education_level.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ngành học dự kiến
                    </label>
                    <input
                      {...register("field_of_study")}
                      placeholder="Ví dụ: Khoa học máy tính, Tài chính, Y tế..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Thời điểm muốn du học (Kỳ nhập học) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      {...register("target_intake")}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    >
                      <option value="">-- Chọn kỳ nhập học --</option>
                      <option value="Kỳ Thu 2026 (Tháng 8 - 9/2026)">Kỳ Thu 2026 (Tháng 8 - 9/2026)</option>
                      <option value="Kỳ Xuân 2027 (Tháng 1 - 2/2027)">Kỳ Xuân 2027 (Tháng 1 - 2/2027)</option>
                      <option value="Kỳ Thu 2027 (Tháng 8 - 9/2027)">Kỳ Thu 2027 (Tháng 8 - 9/2027)</option>
                      <option value="Năm 2028 trở đi">Năm 2028 trở đi (Chuẩn bị từ sớm)</option>
                    </select>
                    {errors.target_intake && (
                      <p className="text-rose-600 text-xs mt-1">{errors.target_intake.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ngân sách dự kiến mỗi năm
                  </label>
                  <select
                    {...register("budget")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  >
                    <option value="">-- Chọn mức ngân sách --</option>
                    <option value="Dưới 400 triệu VNĐ/năm">Dưới 400 triệu VNĐ/năm (Mục tiêu học bổng cao)</option>
                    <option value="400 - 700 triệu VNĐ/năm">400 - 700 triệu VNĐ/năm</option>
                    <option value="700 triệu - 1 tỷ VNĐ/năm">700 triệu - 1 tỷ VNĐ/năm</option>
                    <option value="Trên 1 tỷ VNĐ/năm">Trên 1 tỷ VNĐ/năm</option>
                  </select>
                </div>
              </div>

              {/* Consultation Preference */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-2 mb-4">
                  3. Thời gian & Hình thức tư vấn mong muốn
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hình thức tư vấn ưu tiên <span className="text-rose-500">*</span>
                    </label>
                    <select
                      {...register("preferred_contact_method")}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    >
                      <option value="phone">Gọi điện thoại tư vấn trực tiếp</option>
                      <option value="zalo">Tư vấn qua tin nhắn & gọi Zalo</option>
                      <option value="in_person">Gặp trực tiếp tại Văn phòng EduGlobal</option>
                      <option value="email">Gửi tài liệu phân tích qua Email trước</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Khung giờ thuận tiện nhất <span className="text-rose-500">*</span>
                    </label>
                    <select
                      {...register("preferred_consultation_time")}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                    >
                      <option value="">-- Chọn khung giờ mong muốn --</option>
                      <option value="Sáng (08:30 - 11:30) các ngày trong tuần">Sáng (08:30 - 11:30) Thứ 2 - Thứ 6</option>
                      <option value="Chiều (14:00 - 17:00) các ngày trong tuần">Chiều (14:00 - 17:00) Thứ 2 - Thứ 6</option>
                      <option value="Tối (18:00 - 20:00) qua Zalo / Online">Tối (18:00 - 20:00) qua Zalo / Online</option>
                      <option value="Sáng Thứ 7 tại văn phòng">Sáng Thứ Bảy (09:00 - 11:30)</option>
                    </select>
                    {errors.preferred_consultation_time && (
                      <p className="text-rose-600 text-xs mt-1">{errors.preferred_consultation_time.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ghi chú thêm về học lực hoặc câu hỏi đặc biệt
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Ví dụ: Em đã có IELTS 7.0, muốn săn học bổng trên 50% ngành IT tại Melbourne..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  />
                </div>
              </div>

              {/* Privacy consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("privacy_consent")}
                    className="mt-0.5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
                  />
                  <span>
                    Tôi xác nhận đã đọc và đồng ý với{" "}
                    <Link href="/chinh-sach-bao-mat" className="text-brand-blue font-bold hover:underline" target="_blank">
                      Chính sách bảo mật
                    </Link>{" "}
                    của EduGlobal. Tôi đồng ý để chuyên viên liên hệ phục vụ mục đích tư vấn giáo dục.
                  </span>
                </label>
                {errors.privacy_consent && (
                  <p className="text-rose-600 text-xs mt-1">{errors.privacy_consent.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Đang tiếp nhận lịch hẹn...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>XÁC NHẬN GỬI YÊU CẦU ĐẶT LỊCH</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

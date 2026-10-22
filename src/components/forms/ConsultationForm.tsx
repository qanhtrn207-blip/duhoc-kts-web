"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  country_name: z.string().optional(),
  education_level: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ConsultationFormProps {
  defaultCountry?: string;
  defaultLevel?: string;
  sourcePage?: string;
  compact?: boolean;
  title?: string;
  subtitle?: string;
}

export default function ConsultationForm({
  defaultCountry = "",
  defaultLevel = "",
  sourcePage = "/",
  compact = false,
  title = "Đăng ký nhận tư vấn lộ trình 1-1",
  subtitle = "Chuyên viên Du Học KTS sẽ liên hệ và giải đáp chi tiết trong 24 giờ hoàn toàn miễn phí.",
}: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [leadCode, setLeadCode] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country_name: defaultCountry,
      education_level: defaultLevel,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source_page: sourcePage,
          preferred_contact_method: "phone",
        }),
      });

      const resData = await response.json();

      if (resData.success) {
        setSubmitStatus("success");
        setLeadCode(resData.leadId || "");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(resData.error || "Gửi thông tin thất bại. Vui lòng thử lại!");
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-scale-up">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-emerald-900 mb-2">Đăng ký thành công!</h3>
        <p className="text-emerald-700 text-sm mb-4">
          Cảm ơn bạn đã tin tưởng Du Học KTS. Cố vấn học thuật chuyên trách sẽ gọi điện trực tiếp để đồng hành cùng bạn.
        </p>
        {leadCode && (
          <p className="text-xs text-emerald-800 bg-emerald-100/80 py-1.5 px-3 rounded-md inline-block font-mono">
            Mã yêu cầu: <span className="font-bold">{leadCode}</span>
          </p>
        )}
        <div className="mt-5">
          <button
            onClick={() => setSubmitStatus("idle")}
            className="text-xs font-semibold text-emerald-700 underline hover:text-emerald-900 transition"
          >
            Gửi thêm yêu cầu khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl ${compact ? "p-4" : "p-6 md:p-8"} shadow-xl border border-slate-100`}>
      {title && (
        <div className="mb-6 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-brand-navy">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Họ và tên học sinh / phụ huynh <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("full_name")}
            type="text"
            placeholder="Ví dụ: Nguyễn Văn A"
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition ${
              errors.full_name ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
            }`}
          />
          {errors.full_name && (
            <p className="text-rose-600 text-xs mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Số điện thoại / Zalo <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="0912 345 678"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition ${
                errors.phone ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
              }`}
            />
            {errors.phone && (
              <p className="text-rose-600 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email nhận tài liệu
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            />
            {errors.email && (
              <p className="text-rose-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Quốc gia quan tâm
            </label>
            <select
              {...register("country_name")}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            >
              <option value="">-- Chọn quốc gia --</option>
              <option value="Mỹ">Du học Mỹ</option>
              <option value="Úc">Du học Úc</option>
              <option value="Anh">Du học Anh</option>
              <option value="Canada">Du học Canada</option>
              <option value="New Zealand">Du học New Zealand</option>
              <option value="Singapore">Du học Singapore</option>
              <option value="Hàn Quốc">Du học Hàn Quốc</option>
              <option value="Nhật Bản">Du học Nhật Bản</option>
              <option value="Chưa xác định">Cần tư vấn thêm</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Bậc học dự kiến
            </label>
            <select
              {...register("education_level")}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            >
              <option value="">-- Chọn bậc học --</option>
              <option value="THPT">Du học THPT</option>
              <option value="Dự bị đại học">Dự bị đại học / Pathway</option>
              <option value="Cao đẳng">Cao đẳng / Nghề</option>
              <option value="Đại học">Cử nhân / Đại học</option>
              <option value="Thạc sĩ">Thạc sĩ / Sau đại học</option>
              <option value="Khóa học tiếng">Khóa học tiếng Anh / Tiếng Hàn / Nhật</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Ngân sách dự kiến mỗi năm
          </label>
          <select
            {...register("budget")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
          >
            <option value="">-- Chọn mức ngân sách --</option>
            <option value="Dưới 300 triệu VNĐ/năm">Dưới 300 triệu VNĐ/năm (Săn học bổng cao)</option>
            <option value="300 - 500 triệu VNĐ/năm">300 - 500 triệu VNĐ/năm</option>
            <option value="500 - 800 triệu VNĐ/năm">500 - 800 triệu VNĐ/năm</option>
            <option value="800 triệu - 1.2 tỷ VNĐ/năm">800 triệu - 1.2 tỷ VNĐ/năm</option>
            <option value="Trên 1.2 tỷ VNĐ/năm">Trên 1.2 tỷ VNĐ/năm</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Mục tiêu học tập hoặc câu hỏi cần giải đáp
          </label>
          <textarea
            {...register("message")}
            rows={compact ? 2 : 3}
            placeholder="Ví dụ: Em muốn tìm hiểu học bổng ngành Công nghệ thông tin tại Úc..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-sheen w-full py-3.5 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang xử lý hồ sơ...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>GỬI ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-slate-400 text-center mt-2.5">
            Công Ty Tư Vấn Du Học KTS cam kết bảo mật 100% thông tin cá nhân theo đúng chính sách quyền riêng tư.
          </p>
        </div>
      </form>
    </div>
  );
}

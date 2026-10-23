import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin Khách Hàng — Du Học KTS",
  description: "Cam kết bảo mật dữ liệu và quyền riêng tư của phụ huynh và học sinh tại Du Học KTS Vietnam.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Cam kết quyền riêng tư
            </span>
            <h1 className="text-3xl font-extrabold text-brand-navy mt-3">
              Chính Sách Bảo Mật Quyền Riêng Tư
            </h1>
            <p className="text-xs text-slate-400 mt-2">Cập nhật lần cuối: Tháng 03/2026</p>
          </div>

          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-blue" />
              <span>1. Mục đích thu thập thông tin</span>
            </h2>
            <p>
              Khi quý phụ huynh và học sinh để lại thông tin qua các biểu mẫu tư vấn, đặt lịch hẹn hoặc liên hệ trên website <strong>{siteConfig.url}</strong>, chúng tôi chỉ thu thập các trường thông tin cơ bản gồm: Họ tên, số điện thoại, email, quốc gia quan tâm, ngành học và ngân sách dự kiến.
            </p>
            <p>
              Dữ liệu này được sử dụng duy nhất cho các mục đích:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>Liên hệ tư vấn, giải đáp thắc mắc về điều kiện tuyển sinh, học phí và học bổng.</li>
              <li>Hỗ trợ lập lộ trình học thuật và kiểm tra hồ sơ xin thư mời nhập học.</li>
              <li>Gửi tài liệu cẩm nang du học theo yêu cầu của bạn.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-blue" />
              <span>2. Cam kết không chia sẻ thông tin cho bên thứ ba</span>
            </h2>
            <p>
              {siteConfig.legalName} cam kết tuyệt đối không bán, cho thuê hoặc chia sẻ dữ liệu cá nhân của quý khách hàng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo hoặc tiếp thị không liên quan.
            </p>
            <p>
              Thông tin hồ sơ học bạ chỉ được cung cấp cho trường đại học nước sở tại hoặc cơ quan cấp thị thực sau khi có sự đồng ý trực tiếp của người nộp đơn thông qua hợp đồng dịch vụ tư vấn du học.
            </p>
          </section>

          <section className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-blue" />
              <span>3. Quyền của khách hàng đối với dữ liệu</span>
            </h2>
            <p>
              Bất kỳ lúc nào, quý khách có quyền yêu cầu Du Học KTS kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ vĩnh viễn thông tin cá nhân của mình khỏi cơ sở dữ liệu bằng cách liên hệ qua email: <strong>{siteConfig.contact.email}</strong> hoặc hotline: <strong>{siteConfig.contact.hotline}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

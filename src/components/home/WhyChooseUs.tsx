import React from "react";
import {
  Compass,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  PiggyBank,
  PlaneTakeoff,
} from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Compass className="w-6 h-6 text-brand-blue" />,
      title: "Tư vấn theo năng lực & ngân sách",
      description:
        "Lộ trình du học được KTS thiết kế riêng biệt dựa trên học lực thực tế, nguyện vọng cá nhân và khả năng tài chính của từng gia đình.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-blue" />,
      title: "Hỗ trợ chọn trường & ngành học",
      description:
        "Phân tích thị trường việc làm toàn cầu và danh mục ngành nghề ưu tiên định cư giúp bạn đầu tư học tập đúng hướng và bền vững.",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-brand-blue" />,
      title: "Chuẩn bị & tối ưu hồ sơ học bổng",
      description:
        "Hướng dẫn dịch thuật công chứng tư pháp, rà soát hồ sơ học thuật và hướng dẫn viết bài luận cá nhân (Personal Statement) chỉn chu.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-blue" />,
      title: "Quy trình visa chuẩn mực",
      description:
        "Rà soát tính pháp lý và nguồn gốc tài chính minh bạch; tổ chức các buổi luyện phỏng vấn giả định 1-1 giúp ứng viên tự tin tuyệt đối.",
    },
    {
      icon: <PiggyBank className="w-6 h-6 text-brand-blue" />,
      title: "100% minh bạch chi phí",
      description:
        "Mọi khoản học phí, sinh hoạt phí và chi phí dịch vụ đều được KTS kê khai rõ ràng trong hợp đồng cam kết, không phát sinh chi phí ẩn.",
    },
    {
      icon: <PlaneTakeoff className="w-6 h-6 text-brand-blue" />,
      title: "Đồng hành tiền khởi hành & sau bay",
      description:
        "Trang bị kỹ năng sống trong buổi Pre-departure, hỗ trợ đặt vé máy bay, tìm kiếm nhà ở/ký túc xá và kết nối cộng đồng cựu du học sinh KTS.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Giá trị cốt lõi
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-navy mt-3">
            Vì sao phụ huynh và học sinh lựa chọn Du Học KTS?
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3">
            Chúng tôi hiểu rằng mỗi quyết định du học là bước ngoặt lớn của cả gia đình. Công Ty Tư Vấn Du Học KTS luôn nỗ lực mang lại giải pháp tư vấn trung thực, tận tâm và hiệu quả nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="card-hover-effect p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 shadow-sm group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                <span className="group-hover:text-white transition">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition duration-200">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

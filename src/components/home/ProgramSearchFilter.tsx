"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, GraduationCap, BookOpen, DollarSign } from "lucide-react";

export default function ProgramSearchFilter() {
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [major, setMajor] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (level) params.set("level", level);
    if (major) params.set("major", major);
    if (budget) params.set("budget", budget);

    router.push(`/chuong-trinh?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-brand-navy">
              Tìm kiếm chương trình du học phù hợp
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Lọc theo quốc gia, bậc học, ngành học và ngân sách dự kiến của gia đình
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Country */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brand-blue" />
              <span>Quốc gia</span>
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            >
              <option value="">Tất cả quốc gia</option>
              <option value="my">Mỹ (USA)</option>
              <option value="uc">Úc (Australia)</option>
              <option value="anh">Anh (UK)</option>
              <option value="canada">Canada</option>
              <option value="new-zealand">New Zealand</option>
              <option value="singapore">Singapore</option>
              <option value="han-quoc">Hàn Quốc</option>
              <option value="nhat-ban">Nhật Bản</option>
            </select>
          </div>

          {/* Degree Level */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-brand-blue" />
              <span>Bậc học</span>
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            >
              <option value="">Tất cả bậc học</option>
              <option value="thpt">Du học THPT Nội trú</option>
              <option value="foundation">Dự bị đại học / Pathway</option>
              <option value="college">Cao đẳng nghề / Chuyển tiếp</option>
              <option value="bachelor">Cử nhân / Đại học</option>
              <option value="master">Thạc sĩ / MBA</option>
            </select>
          </div>

          {/* Field of Study */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-blue" />
              <span>Ngành học quan tâm</span>
            </label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            >
              <option value="">Tất cả các ngành</option>
              <option value="Công nghệ thông tin">Công nghệ thông tin & AI</option>
              <option value="Kinh tế">Kinh tế & Quản trị kinh doanh</option>
              <option value="Tài chính">Tài chính - Ngân hàng</option>
              <option value="Kỹ thuật">Kỹ thuật & Công nghệ</option>
              <option value="Y tế">Khoa học sức khỏe & Y dược</option>
              <option value="Truyền thông">Truyền thông & Thiết kế</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-brand-blue" />
              <span>Ngân sách dự kiến</span>
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition"
            >
              <option value="">Tất cả mức học phí</option>
              <option value="low">Dưới 400 triệu VNĐ/năm</option>
              <option value="medium">400 - 800 triệu VNĐ/năm</option>
              <option value="high">Trên 800 triệu VNĐ/năm</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Tìm chương trình</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

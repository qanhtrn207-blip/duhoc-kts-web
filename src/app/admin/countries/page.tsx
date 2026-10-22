import React from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { Globe, Plus, Edit3, Eye, CheckCircle2 } from "lucide-react";
import { getCountries } from "@/lib/data/repository";

export const revalidate = 0;

export default async function AdminCountriesPage() {
  const countries = await getCountries();

  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-navy flex items-center gap-2">
              <Globe className="w-6 h-6 text-brand-blue" />
              <span>Quản Lý Quốc Gia Du Học</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Danh sách các điểm đến du học đang hiển thị trên website</p>
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 opacity-90 hover:opacity-100"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm quốc gia mới</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ảnh & Tên quốc gia</th>
                <th className="py-3 px-4">Mã</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Học phí tham khảo</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {countries.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-3">
                    <img src={c.image_url} alt={c.name} className="w-10 h-7 rounded object-cover shadow-sm" />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-600">{c.code}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{c.slug}</td>
                  <td className="py-3 px-4 text-slate-600">{c.average_tuition || "—"}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Hiển thị
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/quoc-gia/${c.slug}`}
                      target="_blank"
                      className="text-slate-500 hover:text-brand-blue font-semibold"
                    >
                      Xem trang
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

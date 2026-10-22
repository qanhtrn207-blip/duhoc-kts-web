import React from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { Award, Plus } from "lucide-react";
import { getScholarships } from "@/lib/data/repository";

export const revalidate = 0;

export default async function AdminScholarshipsPage() {
  const scholarships = await getScholarships();

  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-navy flex items-center gap-2">
              <Award className="w-6 h-6 text-brand-gold" />
              <span>Quản Lý Quỹ Học Bổng</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Danh sách học bổng du học đang mở đơn</p>
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 opacity-90 hover:opacity-100"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm học bổng</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Tên học bổng</th>
                <th className="py-3 px-4">Giá trị</th>
                <th className="py-3 px-4">Quốc gia / Trường</th>
                <th className="py-3 px-4">Hạn nộp</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholarships.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-800">{s.name}</td>
                  <td className="py-3 px-4 font-extrabold text-brand-blue">{s.amount_description}</td>
                  <td className="py-3 px-4 text-slate-600">
                    <p className="font-semibold">{s.country?.name || "Quốc tế"}</p>
                    {s.university && <p className="text-[11px] text-slate-400">{s.university.name}</p>}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{s.application_deadline}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/hoc-bong/${s.slug}`}
                      target="_blank"
                      className="text-brand-blue hover:underline font-bold"
                    >
                      Chi tiết
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

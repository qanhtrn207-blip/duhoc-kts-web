import React from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { BookOpen, Plus, ExternalLink } from "lucide-react";
import { getPrograms } from "@/lib/data/repository";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-navy flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-brand-blue" />
              <span>Quản Lý Chương Trình Tuyển Sinh</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Danh sách các chương trình đào tạo quốc tế</p>
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 opacity-90 hover:opacity-100"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm chương trình</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Tên chương trình</th>
                <th className="py-3 px-4">Bậc học</th>
                <th className="py-3 px-4">Quốc gia</th>
                <th className="py-3 px-4">Học phí</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4 text-right">Xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-800">{p.name}</p>
                    {p.university && <p className="text-[11px] text-slate-400">{p.university.name}</p>}
                  </td>
                  <td className="py-3 px-4 uppercase font-bold text-brand-blue">{p.degree_level}</td>
                  <td className="py-3 px-4 text-slate-600 font-semibold">{p.country?.name || "Quốc tế"}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {formatCurrency(p.tuition_min, p.currency)} - {formatCurrency(p.tuition_max, p.currency)}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{p.duration}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/chuong-trinh/${p.slug}`}
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

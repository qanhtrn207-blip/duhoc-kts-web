import React from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Clock,
  CheckCircle2,
  FileText,
  Building,
  GraduationCap,
  ArrowRight,
  Plus,
} from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import { getAdminStats } from "@/lib/data/repository";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Fresh stats on load

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "new":
        return <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Mới</span>;
      case "contacting":
        return <span className="px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue text-[10px] font-bold">Đang liên hệ</span>;
      case "consulted":
        return <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">Đã tư vấn</span>;
      case "converted":
        return <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Đã chuyển đổi</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">{st}</span>;
    }
  };

  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy">
              Bảng Điều Khiển Quản Trị
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Thống kê tổng quan dữ liệu tuyển sinh và khách hàng tiềm năng thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/leads"
              className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Xem danh sách Leads CRM</span>
            </Link>
          </div>
        </div>

        {/* Real Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng số Leads</p>
              <p className="text-2xl font-black text-brand-navy mt-1 font-mono">{stats.totalLeads}</p>
              <span className="text-[11px] text-slate-400 mt-0.5 inline-block">Hồ sơ khách hàng</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Khách mới cần gọi</p>
              <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">{stats.newLeads}</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 inline-block">Chưa liên hệ</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">Đang chăm sóc</p>
              <p className="text-2xl font-black text-brand-navy mt-1 font-mono">{stats.inProgressLeads}</p>
              <span className="text-[11px] text-slate-400 mt-0.5 inline-block">Đang tư vấn / chuẩn bị</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bài viết đã đăng</p>
              <p className="text-2xl font-black text-brand-navy mt-1 font-mono">{stats.totalPosts}</p>
              <span className="text-[11px] text-slate-400 mt-0.5 inline-block">Tin tức & cẩm nang</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-brand-navy">Lượt đăng ký tư vấn gần đây</h2>
              <p className="text-xs text-slate-500">Khách hàng vừa để lại thông tin trên website</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Họ và tên</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Quốc gia quan tâm</th>
                  <th className="py-3 px-4">Nguồn đăng ký</th>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-800">{lead.full_name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{lead.phone}</td>
                    <td className="py-3 px-4 text-slate-700">{lead.country_name || "Chưa chọn"}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{lead.source_page}</td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(lead.created_at)}</td>
                    <td className="py-3 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/leads?search=${encodeURIComponent(lead.phone)}`}
                        className="text-brand-blue font-bold hover:underline"
                      >
                        Chăm sóc
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick CMS Modules Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-brand-navy">Chương trình tuyển sinh</h3>
                <p className="text-xs text-slate-500">{stats.totalPrograms} chương trình trong hệ thống</p>
              </div>
            </div>
            <Link
              href="/admin/programs"
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>Quản lý chương trình</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-brand-navy">Trường đại học đối tác</h3>
                <p className="text-xs text-slate-500">{stats.totalUniversities} cơ sở đào tạo</p>
              </div>
            </div>
            <Link
              href="/admin/countries"
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>Quản lý danh sách đối tác</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-brand-navy">Bài viết & Cẩm nang</h3>
                <p className="text-xs text-slate-500">{stats.totalPosts} bài viết công khai</p>
              </div>
            </div>
            <Link
              href="/admin/posts"
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>Quản lý bài viết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import AdminNav from "@/components/admin/AdminNav";
import {
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Edit3,
  Calendar,
  X,
  Save,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/database";
import { formatDate, exportToCSV } from "@/lib/utils";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Edit lead modal state
  const [editingStatus, setEditingStatus] = useState<LeadStatus>("new");
  const [internalNotes, setInternalNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [dbDiagnostics, setDbDiagnostics] = useState<{ isConfigured: boolean; hasUrl: boolean; hasAnonKey: boolean } | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      let combinedLeads: Lead[] = data.success ? (data.leads || []) : [];

      if (data.diagnostics) {
        setDbDiagnostics(data.diagnostics);
      }

      // Merge leads saved locally on this browser (e.g. from local tests)
      try {
        const localRaw = localStorage.getItem("kts_client_leads");
        if (localRaw) {
          const localList: Lead[] = JSON.parse(localRaw);
          const existingIds = new Set(combinedLeads.map((l) => l.id));
          const newLocals = localList.filter((l) => !existingIds.has(l.id));
          combinedLeads = [...newLocals, ...combinedLeads];
        }
      } catch (e) {}

      // Apply filter
      if (statusFilter !== "all") {
        combinedLeads = combinedLeads.filter((l) => l.status === statusFilter);
      }

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        combinedLeads = combinedLeads.filter(
          (l) =>
            l.full_name?.toLowerCase().includes(q) ||
            l.phone?.toLowerCase().includes(q) ||
            (l.email && l.email.toLowerCase().includes(q))
        );
      }

      setLeads(combinedLeads);
    } catch (err) {
      console.error("Fetch leads error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleOpenLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditingStatus(lead.status);
    setInternalNotes(lead.internal_notes || "");
    setActionMessage("");
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    setSaving(true);
    setActionMessage("");

    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          status: editingStatus,
          internalNotes: internalNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setActionMessage("Đã cập nhật trạng thái thành công!");
        // Update local list
        setLeads((prev) =>
          prev.map((l) =>
            l.id === selectedLead.id
              ? { ...l, status: editingStatus, internal_notes: internalNotes }
              : l
          )
        );

        // Update localStorage as well
        try {
          const raw = localStorage.getItem("kts_client_leads");
          if (raw) {
            const list = JSON.parse(raw);
            const updated = list.map((l: any) =>
              l.id === selectedLead.id
                ? { ...l, status: editingStatus, internal_notes: internalNotes }
                : l
            );
            localStorage.setItem("kts_client_leads", JSON.stringify(updated));
          }
        } catch (e) {}
        setSelectedLead((prev) =>
          prev ? { ...prev, status: editingStatus, internal_notes: internalNotes } : null
        );
      } else {
        setActionMessage("Lỗi cập nhật: " + (data.error || "Thử lại sau"));
      }
    } catch {
      setActionMessage("Lỗi kết nối khi cập nhật!");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    exportToCSV(
      leads.map((l) => ({
        "Mã Lead": l.id,
        "Họ và tên": l.full_name,
        "Số điện thoại": l.phone,
        "Email": l.email || "",
        "Quốc gia quan tâm": l.country_name || "",
        "Bậc học": l.education_level || "",
        "Ngành học": l.field_of_study || "",
        "Ngân sách": l.budget || "",
        "Kỳ nhập học": l.target_intake || "",
        "Hình thức liên hệ": l.preferred_contact_method || "",
        "Khung giờ mong muốn": l.preferred_consultation_time || "",
        "Nội dung / Tin nhắn": l.message || "",
        "Nguồn": l.source_page,
        "Trạng thái": l.status,
        "Ghi chú chăm sóc": l.internal_notes || "",
        "Thời gian tạo": l.created_at,
      })),
      `KTS-Leads-${new Date().toISOString().slice(0, 10)}`
    );
  };

  const getStatusBadge = (st: LeadStatus) => {
    switch (st) {
      case "new":
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Mới</span>;
      case "contacting":
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-brand-blue text-[11px] font-bold">Đang liên hệ</span>;
      case "consulted":
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">Đã tư vấn</span>;
      case "processing":
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">Đang xử lý hồ sơ</span>;
      case "converted":
        return <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold">Đã chuyển đổi</span>;
      case "cancelled":
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">Không tiếp tục</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">{st}</span>;
    }
  };

  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy flex items-center gap-2">
              <Users className="w-7 h-7 text-brand-blue" />
              <span>Quản Lý Khách Hàng Tiềm Năng (Leads CRM)</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-1.5">
              <p className="text-xs text-slate-500">
                Tiếp nhận, phân bổ, theo dõi quy trình tư vấn và chăm sóc hồ sơ du học sinh.
              </p>
              {dbDiagnostics && (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight ${
                    dbDiagnostics.isConfigured
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      dbDiagnostics.isConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                  {dbDiagnostics.isConfigured
                    ? "Supabase Database: Đã kết nối"
                    : "Chế độ Test (Local CRM)"}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchLeads}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleExport}
              disabled={leads.length === 0}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Xuất file CSV</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: "all", label: "Tất cả" },
              { id: "new", label: "Mới" },
              { id: "contacting", label: "Đang liên hệ" },
              { id: "consulted", label: "Đã tư vấn" },
              { id: "processing", label: "Đang xử lý hồ sơ" },
              { id: "converted", label: "Đã chuyển đổi" },
              { id: "cancelled", label: "Không tiếp tục" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  statusFilter === tab.id
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc SĐT..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Họ và tên</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Quốc gia</th>
                  <th className="py-3 px-4">Bậc học / Ngành</th>
                  <th className="py-3 px-4">Thời gian gửi</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-blue" />
                      <span>Đang tải danh sách khách hàng...</span>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      Không tìm thấy lead nào phù hợp bộ lọc.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => handleOpenLead(lead)}
                      className="hover:bg-blue-50/50 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-800">{lead.full_name}</td>
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">{lead.phone}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-semibold">{lead.country_name || "Chưa chọn"}</td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span>{lead.education_level || "—"}</span>
                        {lead.field_of_study && <span className="text-slate-400"> ({lead.field_of_study})</span>}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{formatDate(lead.created_at)}</td>
                      <td className="py-3.5 px-4">{getStatusBadge(lead.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-brand-blue font-bold hover:underline">Mở hồ sơ</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail & Care Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-100 shadow-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">{selectedLead.full_name}</h3>
                  <p className="text-xs text-slate-400">Mã Lead: {selectedLead.id} — Tạo lúc: {formatDate(selectedLead.created_at)}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {actionMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold">
                  {actionMessage}
                </div>
              )}

              {/* Lead Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Điện thoại / Zalo:</span>
                  <p className="font-mono font-bold text-brand-navy text-sm mt-0.5">{selectedLead.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Email:</span>
                  <p className="font-medium text-slate-700 mt-0.5">{selectedLead.email || "Không cung cấp"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Quốc gia quan tâm:</span>
                  <p className="font-bold text-brand-blue text-sm mt-0.5">{selectedLead.country_name || "Chưa xác định"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Bậc học & Ngành:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {selectedLead.education_level || "Chưa chọn"} — {selectedLead.field_of_study || "Chưa rõ"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Ngân sách dự kiến:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.budget || "Chưa chọn"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Kỳ nhập học mong muốn:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.target_intake || "Chưa chọn"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Hình thức liên hệ:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.preferred_contact_method || "Điện thoại"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Khung giờ hẹn mong muốn:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedLead.preferred_consultation_time || "Bất kỳ lúc nào"}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-slate-400 font-semibold uppercase">Nội dung ghi chú của khách:</span>
                  <p className="text-slate-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                    {selectedLead.message || "Không có ghi chú thêm."}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-slate-400 font-semibold uppercase">Trang nguồn đăng ký:</span>
                  <span className="ml-2 font-mono text-slate-600">{selectedLead.source_page}</span>
                </div>
              </div>

              {/* Status Update & Internal CRM Notes */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Trạng thái tiến trình chăm sóc
                  </label>
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value as LeadStatus)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  >
                    <option value="new">Mới (Chưa gọi)</option>
                    <option value="contacting">Đang liên hệ (Đã gọi nhưng chưa chốt lịch)</option>
                    <option value="consulted">Đã tư vấn (Đã gửi danh sách trường & học bổng)</option>
                    <option value="processing">Đang xử lý hồ sơ (Đã ký thỏa thuận dịch vụ / nộp hồ sơ)</option>
                    <option value="converted">Đã chuyển đổi (Đã nhận visa / Nhập học thành công)</option>
                    <option value="cancelled">Không tiếp tục (Hủy kế hoạch du học)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Ghi chú chăm sóc nội bộ (Counselor Notes)
                  </label>
                  <textarea
                    rows={4}
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Ghi nhận nhật ký liên hệ: Lịch hẹn vào thứ 7, điểm IELTS 6.5, học sinh muốn nộp UniMelb..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={handleUpdateLead}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-70"
                  >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Lưu cập nhật</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

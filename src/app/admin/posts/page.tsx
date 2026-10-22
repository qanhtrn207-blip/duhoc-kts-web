import React from "react";
import AdminNav from "@/components/admin/AdminNav";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { getPosts } from "@/lib/data/repository";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <>
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-navy flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-blue" />
              <span>Quản Lý Bài Viết & Cẩm Nang</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Hệ thống bài viết tin tức, cẩm nang và hội thảo</p>
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 opacity-90 hover:opacity-100"
          >
            <Plus className="w-4 h-4" />
            <span>Viết bài mới</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Tiêu đề bài viết</th>
                <th className="py-3 px-4">Chuyên mục</th>
                <th className="py-3 px-4">Tác giả</th>
                <th className="py-3 px-4">Ngày đăng</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-bold text-slate-800 max-w-xs truncate">{post.title}</td>
                  <td className="py-3 px-4 uppercase font-semibold text-brand-blue">{post.category}</td>
                  <td className="py-3 px-4 text-slate-600">{post.author_name}</td>
                  <td className="py-3 px-4 text-slate-500">{formatDate(post.published_at)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Đã xuất bản
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/tin-tuc/${post.slug}`}
                      target="_blank"
                      className="text-brand-blue hover:underline font-bold"
                    >
                      Đọc thử
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

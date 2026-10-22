import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getPosts } from "@/lib/data/repository";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tin Tức & Cẩm Nang Du Học — Kinh Nghiệm, Học Bổng & Visa",
  description:
    "Cập nhật những tin tức du học mới nhất, chính sách visa, kinh nghiệm săn học bổng và cuộc sống của du học sinh quốc tế.",
};

interface NewsPageProps {
  searchParams: {
    category?: string;
  };
}

export const revalidate = 3600;

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const posts = await getPosts(searchParams.category);

  const categories = [
    { slug: "", label: "Tất cả bài viết" },
    { slug: "visa", label: "Chính sách Visa" },
    { slug: "hoc-bong", label: "Học bổng" },
    { slug: "cam-nang", label: "Cẩm nang & Kinh nghiệm" },
    { slug: "su-kien", label: "Sự kiện & Hội thảo" },
  ];

  return (
    <div className="bg-brand-gray min-h-screen py-12">
      <div className="container mx-auto">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thư viện kiến thức du học</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy">
            Tin Tức & Cẩm Nang Du Học
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            Nơi chia sẻ kiến thức chuẩn xác, kinh nghiệm thực tế và những cập nhật quy định mới nhất từ các cơ quan di trú và các trường đại học quốc tế.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = (searchParams.category || "") === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug ? `/tin-tuc?category=${cat.slug}` : "/tin-tuc"}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  isActive
                    ? "bg-brand-blue text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-navy/90 text-white font-bold text-[11px] backdrop-blur-sm uppercase">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.published_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.reading_time || "5 phút đọc"}
                    </span>
                  </div>

                  <h2 className="text-base md:text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition line-clamp-2">
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 mt-2.5 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/tin-tuc/${post.slug}`}
                  className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Đọc bài viết đầy đủ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

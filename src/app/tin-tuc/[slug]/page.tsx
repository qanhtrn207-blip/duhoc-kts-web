import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  List,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { getPostBySlug, getPosts } from "@/lib/data/repository";
import { formatDate } from "@/lib/utils";

interface PostDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover_image }],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Extract headings for Table of Contents
  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("### "))
    .map((line) => line.replace("### ", "").trim());

  return (
    <div className="bg-brand-gray min-h-screen py-10">
      <div className="container mx-auto">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tin-tuc" className="hover:text-brand-blue">Tin tức & Cẩm nang</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6">
            <span className="px-3 py-1 rounded-md bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider inline-block">
              {post.category}
            </span>

            <h1 className="text-2xl md:text-4xl font-extrabold text-brand-navy leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-blue" />
                <span>{post.author_name || "Ban Cố Vấn Du Học KTS"}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(post.published_at)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.reading_time || "5 phút đọc"}</span>
              </span>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Table of contents */}
            {headings.length > 0 && (
              <div className="p-5 rounded-2xl bg-brand-gray border border-slate-200 space-y-2">
                <p className="font-bold text-xs uppercase tracking-wider text-brand-navy flex items-center gap-2">
                  <List className="w-4 h-4 text-brand-blue" />
                  <span>Mục lục nội dung bài viết</span>
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-decimal">
                  {headings.map((h, idx) => (
                    <li key={idx} className="hover:text-brand-blue transition">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content Body */}
            <div className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {post.content}
            </div>

            {/* Social Share & Tags */}
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Share2 className="w-4 h-4 text-brand-blue" />
                <span>Chia sẻ bài viết này:</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.slug)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded bg-blue-50 text-brand-blue font-bold text-xs hover:bg-blue-100 transition"
                >
                  Facebook
                </a>
                <a
                  href={`https://zalo.me`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded bg-sky-50 text-sky-700 font-bold text-xs hover:bg-sky-100 transition"
                >
                  Zalo
                </a>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="pt-10 border-t border-slate-100 space-y-4">
                <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-blue" />
                  <span>Bài viết liên quan</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.id}
                      href={`/tin-tuc/${rp.slug}`}
                      className="group p-3 rounded-xl border border-slate-200 hover:border-brand-blue transition flex flex-col justify-between"
                    >
                      <h4 className="font-bold text-xs text-brand-navy group-hover:text-brand-blue line-clamp-2">
                        {rp.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-2">{formatDate(rp.published_at)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Right Column: Lead Form */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28">
              <ConsultationForm
                sourcePage={`/tin-tuc/${post.slug}`}
                title="Cần hỗ trợ thông tin chi tiết?"
                subtitle="Chuyên viên Du Học KTS luôn sẵn sàng giải đáp mọi thắc mắc của bạn."
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

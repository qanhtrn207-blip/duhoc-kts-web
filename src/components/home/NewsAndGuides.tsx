import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ChevronRight, Clock } from "lucide-react";
import { Post } from "@/types/database";
import { formatDate } from "@/lib/utils";

interface NewsAndGuidesProps {
  posts: Post[];
}

export default function NewsAndGuides({ posts }: NewsAndGuidesProps) {
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "visa":
        return "Chính sách Visa";
      case "hoc-bong":
        return "Săn học bổng";
      case "cam-nang":
        return "Cẩm nang du học";
      case "su-kien":
        return "Sự kiện - Hội thảo";
      default:
        return "Tin tức du học";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Kiến thức & Thông tin
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-navy mt-3">
              Tin tức & Cẩm nang du học KTS
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl">
              Cập nhật liên tục những thay đổi chính sách visa, kinh nghiệm nộp hồ sơ và sự kiện hội thảo giáo dục quốc tế mới nhất.
            </p>
          </div>

          <Link
            href="/tin-tuc"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blue-hover group transition"
          >
            <span>Xem tất cả bài viết</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(0, 4).map((post) => (
            <article
              key={post.id}
              className="card-hover-effect group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 img-zoom-wrapper">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-navy/90 text-white font-bold text-[11px] backdrop-blur-sm">
                    {getCategoryLabel(post.category)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
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

                  <h3 className="text-base font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition duration-200 line-clamp-2">
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <Link
                  href={`/tin-tuc/${post.slug}`}
                  className="text-xs font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200"
                >
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

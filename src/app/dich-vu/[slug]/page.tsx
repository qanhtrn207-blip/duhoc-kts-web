import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ShieldCheck, HeartHandshake } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { getServiceBySlug, getServices } from "@/lib/data/repository";

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const svc = await getServiceBySlug(params.slug);
  if (!svc) return { title: "Không tìm thấy dịch vụ" };

  return {
    title: `${svc.name} — Du Học KTS Vietnam`,
    description: svc.short_description,
  };
}

export async function generateStaticParams() {
  const list = await getServices();
  return list.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600;

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const svc = await getServiceBySlug(params.slug);
  if (!svc) notFound();

  return (
    <div className="bg-brand-gray min-h-screen py-10">
      <div className="container mx-auto">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-blue">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/dich-vu" className="hover:text-brand-blue">Dịch vụ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">{svc.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6">
              <h1 className="text-2xl md:text-4xl font-extrabold text-brand-navy leading-tight">
                {svc.name}
              </h1>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <img
                  src={svc.image_url}
                  alt={svc.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-4">
                {svc.content}
              </div>

              {svc.features && svc.features.length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-brand-navy mb-4">Cam kết chất lượng dịch vụ:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-gray border border-slate-200 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <ConsultationForm
                sourcePage={`/dich-vu/${svc.slug}`}
                title={`Đăng ký tư vấn: ${svc.name}`}
                subtitle="Chuyên viên phụ trách dịch vụ này sẽ liên hệ trực tiếp hướng dẫn chi tiết cho bạn."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

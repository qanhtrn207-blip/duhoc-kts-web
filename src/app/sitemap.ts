import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  getCountries,
  getPrograms,
  getScholarships,
  getPosts,
  getUniversities,
  getServices,
} from "@/lib/data/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static routes
  const routes = [
    "",
    "/ve-chung-toi",
    "/quoc-gia",
    "/chuong-trinh",
    "/truong-hoc",
    "/hoc-bong",
    "/dich-vu",
    "/tin-tuc",
    "/lien-he",
    "/dat-lich-tu-van",
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const [countries, programs, scholarships, posts, universities, services] = await Promise.all([
    getCountries(),
    getPrograms(),
    getScholarships(),
    getPosts(),
    getUniversities(),
    getServices(),
  ]);

  const countryRoutes = countries.map((c) => ({
    url: `${baseUrl}/quoc-gia/${c.slug}`,
    lastModified: new Date(c.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const programRoutes = programs.map((p) => ({
    url: `${baseUrl}/chuong-trinh/${p.slug}`,
    lastModified: new Date(p.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const uniRoutes = universities.map((u) => ({
    url: `${baseUrl}/truong-hoc/${u.slug}`,
    lastModified: new Date(u.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const scholarshipRoutes = scholarships.map((s) => ({
    url: `${baseUrl}/hoc-bong/${s.slug}`,
    lastModified: new Date(s.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/tin-tuc/${post.slug}`,
    lastModified: new Date(post.published_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((svc) => ({
    url: `${baseUrl}/dich-vu/${svc.slug}`,
    lastModified: new Date(svc.updated_at || new Date()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...routes,
    ...countryRoutes,
    ...programRoutes,
    ...uniRoutes,
    ...scholarshipRoutes,
    ...postRoutes,
    ...serviceRoutes,
  ];
}

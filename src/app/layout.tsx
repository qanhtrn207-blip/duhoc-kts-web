import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} — Tư Vấn Du Học & Học Bổng Chuyên Nghiệp`,
    template: `%s | ${siteConfig.legalName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/logo/Logo-KTS-in.png",
    shortcut: "/images/logo/logo-kts-png.png",
    apple: "/images/logo/Logo-KTS-in.png",
  },
  keywords: [
    "du học KTS",
    "công ty tư vấn du học KTS",
    "du học kts",
    "duhockts",
    "tư vấn du học uy tín",
    "du học mỹ kts",
    "du học úc kts",
    "du học anh kts",
    "du học canada kts",
    "học bổng du học",
    "xin visa du học",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    telephone: siteConfig.contact.hotline,
    email: siteConfig.contact.email,
    address: siteConfig.offices.map((off) => ({
      "@type": "PostalAddress",
      addressLocality: off.city,
      streetAddress: off.address,
      addressCountry: "VN",
    })),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.youtube,
      siteConfig.social.tiktok,
      siteConfig.social.linkedin,
    ],
  };

  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,600;1,700&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-brand-text antialiased selection:bg-brand-blue selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}

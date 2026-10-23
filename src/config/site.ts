export const siteConfig = {
  name: "Du Học KTS",
  shortName: "KTS",
  legalName: "Công Ty Tư Vấn Du Học KTS",
  slogan: "Khởi đầu hành trình du học — Kiến tạo tương lai toàn cầu",
  description:
    "Công Ty Tư Vấn Du Học KTS đồng hành cùng học sinh, sinh viên và phụ huynh Việt Nam lựa chọn quốc gia, trường học, ngành học và lộ trình du học tối ưu với mục tiêu nghề nghiệp và ngân sách gia đình.",
  url: "https://duhockts.vn",
  ogImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",

  logo: "/images/logo/logo-kts-png.png",
  logoSquare: "/images/logo/Logo-KTS-in.png",

  contact: {
    hotline: "0977 100 283",
    hotlineDisplay: "0977.100.283",
    tollFree: "0977 100 283",
    email: "info@duhockts.vn",
    zaloUrl: "https://zalo.me/0977100283",
    workingHours: "Thứ Hai - Thứ Bảy: 08:00 - 18:00 (Nghỉ Chủ Nhật)",
  },

  offices: [
    {
      city: "Hà Nội",
      address: "52/22 Lương Khánh Thiện, Hoàng Mai, Hà Nội",
      phone: "0977 100 283",
      email: "info@duhockts.vn",
    },
  ],

  social: {
    facebook: "https://facebook.com/duhockts",
    youtube: "https://youtube.com/@duhockts",
    tiktok: "https://tiktok.com/@duhockts",
    linkedin: "https://linkedin.com/company/duhockts",
  },

  mainNav: [
    { title: "Trang chủ", href: "/" },
    { title: "Về chúng tôi", href: "/ve-chung-toi" },
    {
      title: "Du học",
      href: "/quoc-gia",
      children: [
        { title: "Du học Mỹ", href: "/quoc-gia/my", description: "Hệ thống đại học hàng đầu thế giới với học bổng đa dạng" },
        { title: "Du học Anh", href: "/quoc-gia/anh", description: "Nền giáo dục chuẩn mực, chương trình thạc sĩ 1 năm tiết kiệm" },
        { title: "Du học Úc", href: "/quoc-gia/uc", description: "Cơ hội việc làm rộng mở và chính sách định cư hấp dẫn" },
        { title: "Du học Canada", href: "/quoc-gia/canada", description: "Chất lượng sống hàng đầu, visa làm việc sau tốt nghiệp lên đến 3 năm" },
        { title: "Du học New Zealand", href: "/quoc-gia/new-zealand", description: "Môi trường học tập thanh bình, chuẩn giáo dục Anh quốc" },
        { title: "Du học Singapore", href: "/quoc-gia/singapore", description: "Đầu tàu giáo dục châu Á, gần gũi và chi phí tối ưu" },
      ],
    },
    { title: "Trường học", href: "/truong-hoc" },
    { title: "Học bổng", href: "/hoc-bong" },
    { title: "Dịch vụ", href: "/dich-vu" },
    { title: "Tin tức & Cẩm nang", href: "/tin-tuc" },
    { title: "Liên hệ", href: "/lien-he" },
  ],
};

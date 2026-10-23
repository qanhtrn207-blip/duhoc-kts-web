export const siteConfig = {
  name: "Du Học KTS",
  shortName: "KTS",
  legalName: "Công Ty Tư Vấn Du Học KTS",
  slogan: "Khởi đầu hành trình du học — Kiến tạo tương lai toàn cầu",
  description:
    "Công Ty Tư Vấn Du Học KTS đồng hành cùng học sinh, sinh viên và phụ huynh Việt Nam lựa chọn quốc gia, trường học, ngành học và lộ trình du học tối ưu với mục tiêu nghề nghiệp và ngân sách gia đình.",
  url: "https://duhockts.vn",
  ogImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",

  logo: "/images/logo/logo-kts-png.png",
  logoSquare: "/images/logo/Logo-KTS-in.png",

  contact: {
    hotline: "0907 249 788",
    hotlineDisplay: "0907.249.788",
    tollFree: "1800 6868",
    email: "info@duhockts.vn",
    zaloUrl: "https://zalo.me/0907249788",
    workingHours: "Thứ Hai - Thứ Bảy: 08:00 - 18:00 (Nghỉ Chủ Nhật)",
  },

  offices: [
    {
      city: "TP. Hồ Chí Minh (Văn phòng chính)",
      address: "Số 52/22 Cù Lao, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh",
      phone: "(028) 3848 7671",
      email: "hcm@duhockts.vn",
    },
    {
      city: "Hà Nội",
      address: "Tòa nhà Capital Building, 109 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
      phone: "(024) 3974 6688",
      email: "hanoi@duhockts.vn",
    },
    {
      city: "Đà Nẵng",
      address: "Tầng 3, Tòa nhà Indochina Riverside, 74 Bạch Đằng, Hải Châu, Đà Nẵng",
      phone: "(0236) 366 7788",
      email: "danang@duhockts.vn",
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
        { title: "Du học Hàn Quốc", href: "/quoc-gia/han-quoc", description: "Chi phí hợp lý, ngành truyền thông & công nghệ tiên phong" },
        { title: "Du học Nhật Bản", href: "/quoc-gia/nhat-ban", description: "Vừa học vừa làm, cơ hội nghề nghiệp kỹ thuật cao" },
      ],
    },
    { title: "Trường học", href: "/truong-hoc" },
    { title: "Học bổng", href: "/hoc-bong" },
    { title: "Dịch vụ", href: "/dich-vu" },
    { title: "Tin tức & Cẩm nang", href: "/tin-tuc" },
    { title: "Liên hệ", href: "/lien-he" },
  ],
};

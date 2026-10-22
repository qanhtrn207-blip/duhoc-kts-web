# Du Học KTS — Website Công Ty Tư Vấn Du Học KTS Chuyên Nghiệp

Website tư vấn du học tiêu chuẩn cao của **Công Ty Tư Vấn Du Học KTS** (https://duhockts.vn) dành cho học sinh, sinh viên và phụ huynh Việt Nam. Dự án được xây dựng với kiến trúc **Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL & Auth**.

---

## 1. Công nghệ sử dụng

- **Frontend & Full-stack Framework:** Next.js 14 (App Router, Server Components & Client Components).
- **Ngôn ngữ:** TypeScript chuẩn kiểu dữ liệu (Strict typing, no `any`).
- **Giao diện & Thiết kế:** Tailwind CSS kết hợp bảng màu giáo dục:
  - **Navy:** `#102A43` (Tiêu đề, nhận diện thương hiệu).
  - **Blue:** `#2563EB` (Nút hành động CTA, liên kết).
  - **Gold:** `#F4B942` (Màu nhấn học bổng & thành tựu).
  - **Font:** Be Vietnam Pro / Sans-serif tiếng Việt dễ đọc.
- **Biểu tượng:** Lucide Icons.
- **Biểu mẫu & Xác thực:** React Hook Form kết hợp Zod validation cả Client & Server.
- **Cơ sở dữ liệu & Xác thực:** Supabase PostgreSQL, Row Level Security (RLS) & Supabase Auth.
- **SEO & Tối ưu hóa:** Dynamic Metadata, Sitemap XML, robots.txt, Schema.org JSON-LD (EducationalOrganization).

---

## 2. Kiến trúc thư mục dự án

```
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── admin/                         # Khu vực Quản trị & CRM
│   │   │   ├── login/                     # Đăng nhập Admin
│   │   │   ├── leads/                     # Quản lý khách hàng tiềm năng CRM (Lọc, Chăm sóc, Xuất CSV)
│   │   │   ├── countries/                 # Quản lý quốc gia
│   │   │   ├── programs/                  # Quản lý chương trình đào tạo
│   │   │   ├── scholarships/              # Quản lý học bổng
│   │   │   ├── posts/                     # Quản lý tin tức & cẩm nang
│   │   │   ├── settings/                  # Xem cấu hình thương hiệu
│   │   │   └── page.tsx                   # Dashboard thống kê thời gian thực
│   │   ├── api/
│   │   │   ├── leads/route.ts             # API tiếp nhận form tư vấn (Zod validated)
│   │   │   └── admin/leads/route.ts       # API CRM cập nhật trạng thái lead
│   │   ├── ve-chung-toi/                  # Trang giới thiệu
│   │   ├── quoc-gia/                      # Danh sách & Cẩm nang từng quốc gia ([slug])
│   │   ├── chuong-trinh/                  # Tìm kiếm & Chi tiết chương trình ([slug])
│   │   ├── truong-hoc/                    # Danh sách trường & Chi tiết trường ([slug])
│   │   ├── hoc-bong/                      # Quỹ học bổng & Chi tiết học bổng ([slug])
│   │   ├── dich-vu/                       # Dịch vụ tư vấn & Chi tiết dịch vụ ([slug])
│   │   ├── tin-tuc/                       # CMS Tin tức, Cẩm nang, Visa, Hội thảo ([slug])
│   │   ├── lien-he/                       # Văn phòng & Thông tin liên hệ
│   │   ├── dat-lich-tu-van/               # Đặt lịch hẹn tư vấn 1-1
│   │   ├── chinh-sach-bao-mat/            # Chính sách bảo mật dữ liệu
│   │   ├── dieu-khoan-su-dung/            # Điều khoản sử dụng
│   │   ├── not-found.tsx                  # Trang 404 thân thiện
│   │   ├── sitemap.ts                     # Tự động tạo sitemap.xml
│   │   ├── robots.ts                      # Cấu hình robots.txt (Chặn index /admin/)
│   │   ├── layout.tsx                     # Layout chung (Header, Footer, Floating Contact, JSON-LD)
│   │   └── page.tsx                       # Trang chủ 12 Section hoàn chỉnh
│   ├── components/
│   │   ├── layout/                        # Header, Footer, Floating Quick Contact
│   │   ├── forms/                         # ConsultationForm (Client + Server Validated)
│   │   ├── home/                          # Hero, SearchFilter, Countries, WhyUs, Programs, Process...
│   │   └── admin/                         # AdminNav
│   ├── config/
│   │   └── site.ts                        # CẤU HÌNH THƯƠNG HIỆU TẬP TRUNG (Hotline, Email, Địa chỉ, Zalo)
│   ├── lib/
│   │   ├── supabase/                      # Client, Admin (Service Role), Config
│   │   ├── data/                          # Data Repository & Mock Fallback Layer
│   │   └── utils.ts                       # Class merger, format tiền tệ VND/USD, format ngày, Export CSV
│   └── types/
│       └── database.ts                    # TypeScript Interfaces cho toàn bộ 9 bảng Supabase
├── supabase/
│   ├── migrations/
│   │   └── 20261022000000_init_schema.sql # File Migration SQL (9 bảng, RLS, Indexes, Triggers)
│   └── seed.sql                           # File Seed SQL dữ liệu mẫu thực tế
└── package.json
```

---

## 3. Hướng dẫn cài đặt & Khởi chạy dự án

### 3.1. Cài đặt các gói phụ thuộc

```bash
npm install
```

### 3.2. Cấu hình biến môi trường (`.env.local`)

Tạo file `.env.local` từ mẫu `.env.example`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Website URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Lưu ý quan trọng về Data Layer:** Dự án được thiết kế với cơ chế **Graceful Fallback**:
> - Nếu bạn đã cấu hình Supabase credentials, website sẽ tự động kết nối và lưu dữ liệu trực tiếp vào Supabase PostgreSQL.
> - Nếu chưa có tài khoản Supabase (môi trường dev cục bộ ban đầu), hệ thống sẽ tự động chuyển sang lớp dữ liệu hạt giống phong phú (Seed Repository) và bộ nhớ tạm (In-memory Lead store). Toàn bộ các trang công khai, bộ lọc tìm kiếm và bảng quản trị CRM đều hoạt động 100% trơn tru mà không bị crash.

### 3.3. Chạy môi trường phát triển (Development)

```bash
npm run dev
```

Truy cập website tại: `http://localhost:3000`

### 3.4. Kiểm tra TypeScript & Build Production

```bash
npm run build
```

---

## 4. Thiết lập Supabase Database & Auth

Khi triển khai lên môi trường thực tế với Supabase:

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com).
2. Tạo một Project mới.
3. Mở **SQL Editor** trong Supabase Dashboard:
   - Dán toàn bộ nội dung từ file `supabase/migrations/20261022000000_init_schema.sql` và nhấn **Run** để khởi tạo 9 bảng, các chỉ mục (indexes), triggers và chính sách Row Level Security (RLS).
   - Tiếp tục dán nội dung từ file `supabase/seed.sql` và nhấn **Run** để nạp dữ liệu ban đầu về các quốc gia, trường đại học, học bổng và bài viết.
4. Lấy các thông số trong **Project Settings > API**:
   - `Project URL` -> điền vào `NEXT_PUBLIC_SUPABASE_URL`.
   - `anon public` -> điền vào `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - `service_role` -> điền vào `SUPABASE_SERVICE_ROLE_KEY`.
5. Tạo tài khoản quản trị viên trong **Authentication > Users**:
   - Tạo user với Email: `admin@eduglobal.vn` và mật khẩu an toàn.

---

## 5. Hướng dẫn thay đổi thông tin thương hiệu tập trung

Bạn **không cần sửa đổi code** khi muốn đổi số hotline, email hoặc địa chỉ văn phòng. Toàn bộ thông tin được quản trị tập trung tại tệp:

👉 `src/config/site.ts`

- **Tên thương hiệu:** `siteConfig.name`
- **Hotline & Số điện thoại:** `siteConfig.contact.hotline`, `siteConfig.contact.hotlineDisplay`
- **Email tiếp nhận:** `siteConfig.contact.email`
- **Đường dẫn Zalo Official:** `siteConfig.contact.zaloUrl`
- **Hệ thống địa chỉ văn phòng:** Mảng `siteConfig.offices` (Hà Nội, TP.HCM, Đà Nẵng).
- **Mạng xã hội:** `siteConfig.social` (Facebook, YouTube, TikTok, LinkedIn).

---

## 6. Hướng dẫn quản trị viên & Quy trình xử lý khách hàng (CRM)

1. Truy cập: `/admin/login`
2. Đăng nhập với tài khoản:
   - Email: `admin@eduglobal.vn`
   - Mật khẩu: `admin123456`
3. Quản lý khách hàng tiềm năng (`/admin/leads`):
   - Xem toàn bộ danh sách đăng ký từ tất cả các trang nguồn.
   - Lọc theo trạng thái: **Mới (new)** -> **Đang liên hệ (contacting)** -> **Đã tư vấn (consulted)** -> **Đang xử lý hồ sơ (processing)** -> **Đã chuyển đổi (converted)** -> **Không tiếp tục (cancelled)**.
   - Bấm vào hàng để mở modal xem chi tiết nhu cầu học sinh, ngân sách, ghi chú nhật ký cuộc gọi (**Internal Counselor Notes**) và cập nhật trạng thái.
   - Nhấn nút **"Xuất file CSV"** để tải toàn bộ danh sách khách hàng về máy tính phục vụ báo cáo.

---

## 7. Triển khai lên Vercel

1. Đẩy mã nguồn lên kho lưu trữ GitHub/GitLab.
2. Đăng nhập [Vercel](https://vercel.com) và Import Repository.
3. Thiết lập các biến môi trường trong phần **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Domain thực tế, ví dụ `https://eduglobal.vn`)
4. Bấm **Deploy**. Vercel sẽ tự động build và cung cấp liên kết chạy thực tế.

-- Schema Migration for EduGlobal Study Abroad Consulting
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Admin & Counselors)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'counselor' CHECK (role IN ('admin', 'counselor', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. COUNTRIES
CREATE TABLE IF NOT EXISTS public.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    banner_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    education_system TEXT,
    degree_levels TEXT[],
    popular_majors TEXT[],
    average_tuition TEXT,
    average_living_cost TEXT,
    visa_requirements TEXT,
    official_visa_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_countries_slug ON public.countries(slug);
CREATE INDEX IF NOT EXISTS idx_countries_sort ON public.countries(sort_order);

-- 3. UNIVERSITIES
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    website_url TEXT,
    description TEXT NOT NULL,
    logo_url TEXT,
    cover_url TEXT,
    ranking TEXT,
    tuition_range TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_universities_country ON public.universities(country_id);
CREATE INDEX IF NOT EXISTS idx_universities_slug ON public.universities(slug);

-- 4. PROGRAMS
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
    university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
    degree_level TEXT NOT NULL CHECK (degree_level IN ('thpt', 'foundation', 'college', 'bachelor', 'master', 'phd', 'language', 'summer_camp')),
    field_of_study TEXT NOT NULL,
    duration TEXT NOT NULL,
    tuition_min NUMERIC NOT NULL DEFAULT 0,
    tuition_max NUMERIC NOT NULL DEFAULT 0,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    entry_requirements TEXT NOT NULL,
    description TEXT NOT NULL,
    intake_information TEXT NOT NULL,
    source_url TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_programs_country ON public.programs(country_id);
CREATE INDEX IF NOT EXISTS idx_programs_university ON public.programs(university_id);
CREATE INDEX IF NOT EXISTS idx_programs_level ON public.programs(degree_level);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);

-- 5. SCHOLARSHIPS
CREATE TABLE IF NOT EXISTS public.scholarships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
    university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
    amount_description TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    application_deadline TEXT NOT NULL,
    source_url TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closing_soon', 'closed')),
    description TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_scholarships_country ON public.scholarships(country_id);
CREATE INDEX IF NOT EXISTS idx_scholarships_slug ON public.scholarships(slug);

-- 6. POSTS (News & Guides)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('tin-tuc', 'cam-nang', 'hoc-bong', 'visa', 'su-kien')),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'Ban Biên Tập EduGlobal',
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    meta_title TEXT,
    meta_description TEXT,
    reading_time TEXT DEFAULT '5 phút đọc',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(status, published_at DESC);

-- 7. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    features TEXT[],
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);

-- 8. TESTIMONIALS (Student Stories)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name TEXT NOT NULL,
    student_story TEXT NOT NULL,
    school_name TEXT NOT NULL,
    country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
    country_name TEXT,
    program_name TEXT,
    scholarship_received TEXT,
    image_url TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. LEADS (Consultation Inquiries & Booking)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
    country_name TEXT,
    education_level TEXT,
    field_of_study TEXT,
    budget TEXT,
    target_intake TEXT,
    preferred_contact_method TEXT DEFAULT 'phone',
    preferred_consultation_time TEXT,
    message TEXT,
    source_page TEXT NOT NULL DEFAULT '/',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacting', 'consulted', 'processing', 'converted', 'cancelled')),
    internal_notes TEXT,
    privacy_consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Auto updated_at Trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON public.countries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON public.universities FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON public.scholarships FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public can view published countries" ON public.countries FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published universities" ON public.universities FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published programs" ON public.programs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published scholarships" ON public.scholarships FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published posts" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);

-- Public can insert leads (submit consultation forms)
CREATE POLICY "Public can submit leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Authenticated admins/staff have full access
CREATE POLICY "Admins full access profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access countries" ON public.countries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access universities" ON public.universities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access programs" ON public.programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access scholarships" ON public.scholarships FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');

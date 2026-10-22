export type LeadStatus =
  | "new"
  | "contacting"
  | "consulted"
  | "processing"
  | "converted"
  | "cancelled";

export type DegreeLevel =
  | "thpt"
  | "foundation"
  | "college"
  | "bachelor"
  | "master"
  | "phd"
  | "language"
  | "summer_camp";

export interface Profile {
  id: string;
  full_name: string;
  role: "admin" | "counselor" | "editor";
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  code: string; // US, UK, AU, CA, NZ, SG, KR, JP
  short_description: string;
  description: string;
  image_url: string;
  banner_url?: string;
  is_published: boolean;
  sort_order: number;
  // Extended country guide data
  education_system?: string;
  degree_levels?: string[];
  popular_majors?: string[];
  average_tuition?: string;
  average_living_cost?: string;
  visa_requirements?: string;
  official_visa_url?: string;
  created_at: string;
  updated_at: string;
}

export interface University {
  id: string;
  name: string;
  slug: string;
  country_id: string;
  country?: Country;
  location: string;
  website_url?: string;
  description: string;
  logo_url?: string;
  cover_url?: string;
  ranking?: string;
  tuition_range?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  country_id: string;
  country?: Country;
  university_id?: string;
  university?: University;
  degree_level: DegreeLevel;
  field_of_study: string;
  duration: string;
  tuition_min: number;
  tuition_max: number;
  currency: string;
  entry_requirements: string;
  description: string;
  intake_information: string;
  source_url?: string;
  last_verified_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Scholarship {
  id: string;
  name: string;
  slug: string;
  country_id: string;
  country?: Country;
  university_id?: string;
  university?: University;
  amount_description: string;
  eligibility: string;
  application_deadline: string;
  source_url?: string;
  last_verified_at?: string;
  status: "open" | "closing_soon" | "closed";
  description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: "tin-tuc" | "cam-nang" | "hoc-bong" | "visa" | "su-kien";
  author_id?: string;
  author_name?: string;
  status: "draft" | "published";
  published_at: string;
  meta_title?: string;
  meta_description?: string;
  reading_time?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  content: string;
  image_url: string;
  features?: string[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  display_name: string;
  student_story: string;
  school_name: string;
  country_id?: string;
  country_name?: string;
  image_url: string;
  program_name?: string;
  scholarship_received?: string;
  is_published: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  country_id?: string;
  country_name?: string;
  education_level?: string;
  field_of_study?: string;
  budget?: string;
  target_intake?: string;
  preferred_contact_method?: "phone" | "zalo" | "email" | "in_person";
  preferred_consultation_time?: string;
  message?: string;
  source_page: string;
  status: LeadStatus;
  internal_notes?: string;
  privacy_consent_at: string;
  created_at: string;
  updated_at: string;
}

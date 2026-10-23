import {
  Country,
  University,
  Program,
  Scholarship,
  Post,
  Service,
  Testimonial,
  Lead,
  LeadStatus,
} from "@/types/database";
import {
  initialCountries,
  initialUniversities,
  initialPrograms,
  initialScholarships,
  initialPosts,
  initialServices,
  initialTestimonials,
  initialLeads,
} from "./mock-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAdminClient } from "@/lib/supabase/admin";

// In-memory leads storage for when Supabase is not connected
let memoryLeads: Lead[] = [...initialLeads];

export async function getCountries(): Promise<Country[]> {
  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        const { data, error } = await admin
          .from("countries")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });
        if (!error && data && data.length > 0) return data as Country[];
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to seed data:", e);
    }
  }
  return initialCountries.filter((c) => c.is_published).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const countries = await getCountries();
  return countries.find((c) => c.slug === slug) || null;
}

export async function getUniversities(countryId?: string): Promise<University[]> {
  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        let query = admin
          .from("universities")
          .select("*, countries(*)")
          .eq("is_published", true);
        if (countryId) query = query.eq("country_id", countryId);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as University[];
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to seed data:", e);
    }
  }
  let results = initialUniversities.filter((u) => u.is_published);
  if (countryId) {
    results = results.filter((u) => u.country_id === countryId);
  }
  return results.map((u) => ({
    ...u,
    country: initialCountries.find((c) => c.id === u.country_id),
  }));
}

export async function getUniversityBySlug(slug: string): Promise<University | null> {
  const unis = await getUniversities();
  return unis.find((u) => u.slug === slug) || null;
}

export async function getPrograms(filters?: {
  country?: string;
  level?: string;
  major?: string;
  search?: string;
}): Promise<Program[]> {
  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        let query = admin
          .from("programs")
          .select("*, countries(*), universities(*)")
          .eq("is_published", true);
        if (filters?.country) query = query.eq("country_id", filters.country);
        if (filters?.level) query = query.eq("degree_level", filters.level);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Program[];
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to seed data:", e);
    }
  }

  let list = initialPrograms.filter((p) => p.is_published);
  if (filters?.country) {
    const targetCountry = filters.country.toLowerCase();
    list = list.filter((p) => {
      const country = initialCountries.find((c) => c.id === p.country_id);
      return (
        p.country_id === filters.country ||
        country?.slug === filters.country ||
        country?.code.toLowerCase() === targetCountry
      );
    });
  }
  if (filters?.level) {
    list = list.filter((p) => p.degree_level === filters.level);
  }
  if (filters?.major) {
    const m = filters.major.toLowerCase();
    list = list.filter((p) => p.field_of_study.toLowerCase().includes(m));
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.field_of_study.toLowerCase().includes(q)
    );
  }

  return list.map((p) => ({
    ...p,
    country: initialCountries.find((c) => c.id === p.country_id),
    university: initialUniversities.find((u) => u.id === p.university_id),
  }));
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const list = await getPrograms();
  return list.find((p) => p.slug === slug) || null;
}

export async function getScholarships(filters?: {
  country?: string;
  status?: string;
}): Promise<Scholarship[]> {
  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        let query = admin
          .from("scholarships")
          .select("*, countries(*), universities(*)")
          .eq("is_published", true);
        if (filters?.country) query = query.eq("country_id", filters.country);
        if (filters?.status) query = query.eq("status", filters.status);
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data as Scholarship[];
      }
    } catch (e) {
      console.warn("Supabase query error, falling back to seed data:", e);
    }
  }

  let list = initialScholarships.filter((s) => s.is_published);
  if (filters?.country) {
    const targetCountry = filters.country.toLowerCase();
    list = list.filter((s) => {
      const c = initialCountries.find((item) => item.id === s.country_id);
      return (
        s.country_id === filters.country ||
        c?.slug === filters.country ||
        c?.code.toLowerCase() === targetCountry
      );
    });
  }
  if (filters?.status) {
    list = list.filter((s) => s.status === filters.status);
  }

  return list.map((s) => ({
    ...s,
    country: initialCountries.find((c) => c.id === s.country_id),
    university: initialUniversities.find((u) => u.id === s.university_id),
  }));
}

export async function getScholarshipBySlug(slug: string): Promise<Scholarship | null> {
  const list = await getScholarships();
  return list.find((s) => s.slug === slug) || null;
}

export async function getServices(): Promise<Service[]> {
  return initialServices.filter((s) => s.is_published).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const list = await getServices();
  return list.find((s) => s.slug === slug) || null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return initialTestimonials.filter((t) => t.is_published);
}

export async function getPosts(category?: string): Promise<Post[]> {
  let list = initialPosts.filter((p) => p.status === "published");
  if (category) {
    list = list.filter((p) => p.category === category);
  }
  return list.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// LEADS CRM FUNCTIONS
export async function createLead(
  leadData: Omit<Lead, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; data?: Lead; error?: string }> {
  const now = new Date().toISOString();
  const newLead: Lead = {
    ...leadData,
    id: "lead-" + Date.now(),
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        const insertPayload: any = {
          full_name: leadData.full_name,
          phone: leadData.phone,
          email: leadData.email || null,
          country_name: leadData.country_name || null,
          education_level: leadData.education_level || null,
          field_of_study: leadData.field_of_study || null,
          budget: leadData.budget || null,
          target_intake: leadData.target_intake || null,
          preferred_contact_method: leadData.preferred_contact_method || "phone",
          preferred_consultation_time: leadData.preferred_consultation_time || null,
          message: leadData.message || null,
          source_page: leadData.source_page || "/",
          status: leadData.status || "new",
          privacy_consent_at: leadData.privacy_consent_at || now,
        };

        if (leadData.country_id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadData.country_id)) {
          insertPayload.country_id = leadData.country_id;
        }

        const { data, error } = await admin
          .from("leads")
          .insert([insertPayload])
          .select()
          .single();

        if (error) {
          console.error("Supabase createLead error:", error.message || error);
          // Fall back to memory so submission does not fail for the user
          memoryLeads.unshift(newLead);
          return { success: true, data: newLead };
        }
        return { success: true, data: data as Lead };
      }
    } catch (e: any) {
      console.warn("Supabase lead insert failed, saving to memory:", e);
    }
  }

  // In-memory storage fallback
  memoryLeads.unshift(newLead);
  return { success: true, data: newLead };
}

export async function getLeads(filters?: {
  status?: string;
  search?: string;
}): Promise<Lead[]> {
  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        let query = admin.from("leads").select("*").order("created_at", { ascending: false });
        if (filters?.status && filters.status !== "all") {
          query = query.eq("status", filters.status);
        }
        const { data, error } = await query;
        if (!error && data) return data as Lead[];
      }
    } catch (e) {
      console.warn("Supabase fetch leads error:", e);
    }
  }

  let list = [...memoryLeads];
  if (filters?.status && filters.status !== "all") {
    list = list.filter((l) => l.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (l) =>
        l.full_name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email && l.email.toLowerCase().includes(q))
    );
  }
  return list;
}

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
  internalNotes?: string
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const admin = getAdminClient();
      if (admin) {
        const updatePayload: any = {
          status,
          updated_at: new Date().toISOString(),
        };
        if (internalNotes !== undefined) {
          updatePayload.internal_notes = internalNotes;
        }
        const { error } = await admin.from("leads").update(updatePayload).eq("id", leadId);
        if (error) throw error;
        return { success: true };
      }
    } catch (e: any) {
      console.error("Supabase update lead error:", e);
    }
  }

  const idx = memoryLeads.findIndex((l) => l.id === leadId);
  if (idx !== -1) {
    memoryLeads[idx] = {
      ...memoryLeads[idx],
      status,
      internal_notes: internalNotes !== undefined ? internalNotes : memoryLeads[idx].internal_notes,
      updated_at: new Date().toISOString(),
    };
    return { success: true };
  }

  return { success: false, error: "Lead not found" };
}

export async function getAdminStats() {
  const leads = await getLeads();
  const posts = await getPosts();
  const universities = await getUniversities();
  const programs = await getPrograms();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const inProgressLeads = leads.filter(
    (l) => l.status === "contacting" || l.status === "consulted" || l.status === "processing"
  ).length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;

  return {
    totalLeads,
    newLeads,
    inProgressLeads,
    convertedLeads,
    totalPosts: posts.length,
    totalUniversities: universities.length,
    totalPrograms: programs.length,
    recentLeads: leads.slice(0, 5),
  };
}

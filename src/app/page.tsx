import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProgramSearchFilter from "@/components/home/ProgramSearchFilter";
import FeaturedCountries from "@/components/home/FeaturedCountries";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";
import ScholarshipsSection from "@/components/home/ScholarshipsSection";
import ConsultingProcess from "@/components/home/ConsultingProcess";
import StudentStories from "@/components/home/StudentStories";
import NewsAndGuides from "@/components/home/NewsAndGuides";
import ConsultationCTA from "@/components/home/ConsultationCTA";

import {
  getCountries,
  getPrograms,
  getScholarships,
  getPosts,
  getTestimonials,
} from "@/lib/data/repository";

export const revalidate = 3600; // 1 hour ISR

export default async function HomePage() {
  const [countries, programs, scholarships, posts, testimonials] = await Promise.all([
    getCountries(),
    getPrograms(),
    getScholarships(),
    getPosts(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <ProgramSearchFilter />
      <FeaturedCountries countries={countries} />
      <WhyChooseUs />
      <FeaturedPrograms programs={programs} />
      <ScholarshipsSection scholarships={scholarships} />
      <ConsultingProcess />
      <StudentStories testimonials={testimonials} />
      <NewsAndGuides posts={posts} />
      <ConsultationCTA />
    </>
  );
}

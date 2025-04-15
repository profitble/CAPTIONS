import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import TestimonialsList from "@/components/TestimonialsList";
import ResponsiveLayout from "@/components/ResponsiveLayout";
import Pricing from "@/components/Pricing";
import Testimonials11 from "@/components/Testimonials11";

export default function Home() {
  const desktopContent = (
    <>
      <main>
        <Hero />
        <FeaturesAccordion />
        <Pricing />
        <Testimonials11 />
        <FAQ />
      </main>
    </>
  );

  const mobileContent = (
    <main className="flex flex-col">
      <Hero />
      <FeaturesAccordion />
      <FAQ />
      <TestimonialsList />
    </main>
  );

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <ResponsiveLayout 
        desktopContent={desktopContent}
        mobileContent={mobileContent}
      />
      <Footer />
    </>
  );
}

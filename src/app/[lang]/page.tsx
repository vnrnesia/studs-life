import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Countries from "@/components/Countries";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import Statistics from "@/components/Statistics";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ContactFormSection from "@/components/ContactFormSection";
import Form from "@/components/Form";

import LatestJournal from "@/components/LatestJournal";
import FeatureTabs from "@/components/FeatureTabs";
import HowItWorks from "@/components/HowItWorks";
import OfficeLocations from "@/components/OfficeLocations";
import ProcessSection from "@/components/ProcessSection";
import { getTeamMembers, getLatestBlogs, getLatestCities } from "@/lib/strapi";

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const teamMembers = await getTeamMembers(lang);
  const latestBlogs = await getLatestBlogs(lang);
  const latestCities = await getLatestCities(lang);

  const features = [
    {
      id: "admissions",
      title: dict.featureTabs?.features?.admissions?.title || "University Admissions",
      description: dict.featureTabs?.features?.admissions?.description || "Guiding through top-tier university applications with personalized strategy and detailed roadmap planning.",
      iconName: "graduation",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"
    },
    {
      id: "visa", 
      title: dict.featureTabs?.features?.visa?.title || "Visa Assistance",
      description: dict.featureTabs?.features?.visa?.description || "Hassle-free student visa processing with high success rates and comprehensive document verification.",
      iconName: "plane",
      image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?q=80&w=1000"
    },
    {
      id: "accommodation",
      title: dict.featureTabs?.features?.accommodation?.title || "Accommodation",
      description: dict.featureTabs?.features?.accommodation?.description || "Finding safe, affordable, and comfortable housing options near your campus.",
      iconName: "home",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000"
    },
    {
      id: "career",
      title: dict.featureTabs?.features?.career?.title || "Career Guidance",
      description: dict.featureTabs?.features?.career?.description || "Post-graduation planning, resume building, and interview preparation for a successful career launch.",
      iconName: "briefcase",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000"
    }
  ];

  const howItWorksSteps = [
    {
      id: "consultation",
      stepNumber: "01",
      title: dict.howItWorks?.steps?.consultation?.title || "Free Consultation",
      description: dict.howItWorks?.steps?.consultation?.description || "We analyze your academic profile and career goals to recommend the best universities and programs tailored to your aspirations.",
      iconName: "search",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000"
    },
    {
      id: "preparation",
      stepNumber: "02",
      title: dict.howItWorks?.steps?.preparation?.title || "Preparation & Visa",
      description: dict.howItWorks?.steps?.preparation?.description || "Our experts handle the entire application process, document verification, and visa submission to ensure a smooth approval.",
      iconName: "clipboard",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000"
    },
    {
      id: "departure",
      stepNumber: "03",
      title: dict.howItWorks?.steps?.departure?.title || "Departure & Support",
      description: dict.howItWorks?.steps?.departure?.description || "From flight bookings to finding accommodation, we support you until you are settled in your new student life.",
      iconName: "rocket",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero lang={lang} dict={dict.hero} />
      <FeatureTabs 
        features={features} 
        title={dict.featureTabs?.title || "Comprehensive Student Support"}
        subtitle={dict.featureTabs?.subtitle || "Detailed assistance at every step of your study abroad journey."} 
      />
      <Services lang={lang} dict={dict.services} />
      <Countries lang={lang} dict={dict.countries} />
      <WhyChooseUs lang={lang} dict={dict.whyUs} />
      <HowItWorks steps={howItWorksSteps} dict={dict.howItWorks} />
      
      <Team lang={lang} dict={dict.team} teamMembers={teamMembers.slice(0, 6)} showViewAll={true} />
      <Statistics lang={lang} dict={dict.statistics} />
      <TestimonialsCarousel title={dict.team.testimonials_title} />
      <ContactFormSection lang={lang} dict={dict.contactForm} />

      <LatestJournal lang={lang} dict={dict.latestJournal} posts={latestCities} />


      <ProcessSection lang={lang} dict={(dict as any).processWorkflow} />
      <OfficeLocations lang={lang} dict={dict.offices} />
    </main>
  );
}

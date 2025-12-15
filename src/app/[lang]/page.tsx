import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Countries from "@/components/Countries";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import Statistics from "@/components/Statistics";
import Form from "@/components/Form";

import LatestJournal from "@/components/LatestJournal";
import FeatureTabs from "@/components/FeatureTabs";
import HowItWorks from "@/components/HowItWorks";
import { getTeamMembers, getLatestBlogs } from "@/lib/strapi";

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const teamMembers = await getTeamMembers(lang);
  const latestBlogs = await getLatestBlogs(lang);

  const features = [
    {
      id: "admissions",
      title: "University Admissions",
      description: "Guiding through top-tier university applications with personalized strategy and detailed roadmap planning.",
      iconName: "graduation",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"
    },
    {
      id: "visa", 
      title: "Visa Assistance",
      description: "Hassle-free student visa processing with high success rates and comprehensive document verification.",
      iconName: "plane",
      image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?q=80&w=1000"
    },
    {
      id: "accommodation",
      title: "Accommodation",
      description: "Finding safe, affordable, and comfortable housing options near your campus.",
      iconName: "home",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000"
    },
    {
      id: "career",
      title: "Career Guidance",
      description: "Post-graduation planning, resume building, and interview preparation for a successful career launch.",
      iconName: "briefcase",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000"
    }
  ];

  const howItWorksSteps = [
    {
      id: "consultation",
      stepNumber: "01",
      title: "Free Consultation",
      description: "We analyze your academic profile and career goals to recommend the best universities and programs tailored to your aspirations.",
      iconName: "search",
      image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000"
    },
    {
      id: "preparation",
      stepNumber: "02",
      title: "Preparation & Visa",
      description: "Our experts handle the entire application process, document verification, and visa submission to ensure a smooth approval.",
      iconName: "clipboard",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000"
    },
    {
      id: "departure",
      stepNumber: "03",
      title: "Departure & Support",
      description: "From flight bookings to finding accommodation, we support you until you are settled in your new student life.",
      iconName: "rocket",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Hero lang={lang} dict={dict.hero} />
      <Services lang={lang} dict={dict.services} />
      <Countries lang={lang} dict={dict.countries} />
      <WhyChooseUs lang={lang} dict={dict.whyUs} />
      <Team lang={lang} dict={dict.team} teamMembers={teamMembers.slice(0, 4)} showViewAll={true} />
      <LatestJournal lang={lang} dict={dict.latestJournal} posts={latestBlogs} />
      <HowItWorks steps={howItWorksSteps} />
      <FeatureTabs 
        features={features} 
        title="Comprehensive Student Support" 
        subtitle="Detailed assistance at every step of your study abroad journey." 
      />
      <Statistics lang={lang} dict={dict.statistics} />
      <Form lang={lang} dict={dict.form} />
    </main>
  );
}

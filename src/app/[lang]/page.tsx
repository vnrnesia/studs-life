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
import LeadMagnet from "@/components/LeadMagnet";
import { getTeamMembers, getLatestBlogs, getLatestCities } from "@/lib/strapi";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Import Support Icons
import supportUniversityIcon from "@/assets/support_icons/admission.png";
import supportVisaIcon from "@/assets/support_icons/visa.png";
import supportAccommodationIcon from "@/assets/support_icons/accommadation.png";
import supportCareerIcon from "@/assets/support_icons/career.png";

// Import Student Support Images
import universityImg from "@/assets/student_support/university.png";
import visaImg from "@/assets/student_support/visa.png";
import accommodationImg from "@/assets/student_support/accommadation.png";
import careerImg from "@/assets/student_support/career.png";

// Import How It Works Images
import consultationImg from "@/assets/how_it_works/free_consultation.png";
import preparationImg from "@/assets/how_it_works/visa.png";
import departureImg from "@/assets/how_it_works/departure_support.png";

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
      icon: supportUniversityIcon,
      image: universityImg.src
    },
    {
      id: "visa",
      title: dict.featureTabs?.features?.visa?.title || "Visa Assistance",
      description: dict.featureTabs?.features?.visa?.description || "Hassle-free student visa processing with high success rates and comprehensive document verification.",
      icon: supportVisaIcon,
      image: visaImg.src
    },
    {
      id: "accommodation",
      title: dict.featureTabs?.features?.accommodation?.title || "Accommodation",
      description: dict.featureTabs?.features?.accommodation?.description || "Finding safe, affordable, and comfortable housing options near your campus.",
      icon: supportAccommodationIcon,
      image: accommodationImg.src
    },
    {
      id: "career",
      title: dict.featureTabs?.features?.career?.title || "Career Guidance",
      description: dict.featureTabs?.features?.career?.description || "Post-graduation planning, resume building, and interview preparation for a successful career launch.",
      icon: supportCareerIcon,
      image: careerImg.src
    }
  ];

  const howItWorksSteps = [
    {
      id: "consultation",
      stepNumber: "01",
      title: dict.howItWorks?.steps?.consultation?.title || "Free Consultation",
      description: dict.howItWorks?.steps?.consultation?.description || "We analyze your academic profile and career goals to recommend the best universities and programs tailored to your aspirations.",
      iconName: "search",
      image: consultationImg.src
    },
    {
      id: "preparation",
      stepNumber: "02",
      title: dict.howItWorks?.steps?.preparation?.title || "Preparation & Visa",
      description: dict.howItWorks?.steps?.preparation?.description || "Our experts handle the entire application process, document verification, and visa submission to ensure a smooth approval.",
      iconName: "clipboard",
      image: preparationImg.src
    },
    {
      id: "departure",
      stepNumber: "03",
      title: dict.howItWorks?.steps?.departure?.title || "Departure & Support",
      description: dict.howItWorks?.steps?.departure?.description || "From flight bookings to finding accommodation, we support you until you are settled in your new student life.",
      iconName: "rocket",
      image: departureImg.src
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero lang={lang} dict={dict.hero} />

      <ScrollReveal direction="up" distance={50}>
        <FeatureTabs
          features={features}
          title={dict.featureTabs?.title || "Comprehensive Student Support"}
          subtitle={dict.featureTabs?.subtitle || "Detailed assistance at every step of your study abroad journey."}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <Services lang={lang} dict={dict.services} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Countries lang={lang} dict={dict.countries} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <WhyChooseUs lang={lang} dict={dict.whyUs} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <HowItWorks steps={howItWorksSteps} dict={dict.howItWorks} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Team lang={lang} dict={dict.team} teamMembers={teamMembers.slice(0, 6)} showViewAll={true} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <Statistics lang={lang} dict={dict.statistics} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <TestimonialsCarousel title={dict.team.testimonials_title} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <ContactFormSection lang={lang} dict={dict.contactForm} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <LatestJournal lang={lang} dict={dict.latestJournal} posts={latestCities} />
      </ScrollReveal>

      {/* Lead Magnet - Below Blog */}
      <LeadMagnet lang={lang} />

      {/* ProcessSection - No ScrollReveal to preserve sticky animation */}
      <ProcessSection lang={lang} dict={(dict as any).processWorkflow} />

      <ScrollReveal direction="up">
        <OfficeLocations lang={lang} dict={dict.offices} />
      </ScrollReveal>
    </main>
  );
}

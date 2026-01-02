import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import AboutHero from "./components/AboutHero";
import MissionVisionCards from "./components/MissionVisionCards";
import CompanyTimeline from "./components/CompanyTimeline";
import DepartmentsGrid from "./components/DepartmentsGrid";
import LicensesCertificates from "./components/LicensesCertificates";
import CTABanner from "./components/CTABanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const breadcrumbData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://studs-life.com/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `https://studs-life.com/${lang}/about`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <AboutHero dict={dict.aboutPage.hero} />
      
      <ScrollReveal direction="up">
        <MissionVisionCards dict={dict.aboutPage} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <CompanyTimeline dict={dict.aboutPage.timeline} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <DepartmentsGrid dict={dict.aboutPage.departments} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <LicensesCertificates dict={dict.aboutPage.licenses} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <CTABanner dict={dict.aboutPage.cta} />
      </ScrollReveal>
    </main>
  );
}

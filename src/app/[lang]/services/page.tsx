import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import ServicesHero from "./components/ServicesHero";
import ServicesGrid from "./components/ServicesGrid";
import CostOfLiving from "./components/CostOfLiving";
import DestinationsHub from "./components/DestinationsHub";
import AccommodationAssistant from "./components/AccommodationAssistant";
import TrustSection from "./components/TrustSection";
import FAQ from "./components/FAQ";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { FAQPage, BreadcrumbList, WithContext } from "schema-dts";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const faqItems = Object.keys(dict.servicesPage.faq)
    .filter((key) => key.startsWith("q"))
    .map((key) => {
      const item = dict.servicesPage.faq[key as keyof typeof dict.servicesPage.faq] as any;
      return {
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      };
    });

  const jsonLdData: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems as any,
  };

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
        name: "Services",
        item: `https://studs-life.com/${lang}/services`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd<FAQPage> data={jsonLdData} />
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <ServicesHero dict={dict.servicesPage.hero} />
      
      <ScrollReveal direction="up">
        <ServicesGrid dict={dict.servicesPage.coreServices} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <CostOfLiving dict={dict.servicesPage.costOfLiving} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <DestinationsHub dict={dict.servicesPage.destinations} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <AccommodationAssistant dict={dict.servicesPage.accommodationAssistant} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <TrustSection dict={dict.servicesPage.trust} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <FAQ dict={dict.servicesPage.faq} />
      </ScrollReveal>
    </main>
  );
}

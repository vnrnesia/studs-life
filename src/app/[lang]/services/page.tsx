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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-gray-50">
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

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import ServicesHero from "./components/ServicesHero";
import ServicesGrid from "./components/ServicesGrid";
import CostOfLiving from "./components/CostOfLiving";
import DestinationsHub from "./components/DestinationsHub";
import AccommodationAssistant from "./components/AccommodationAssistant";
import TrustSection from "./components/TrustSection";
import FAQ from "./components/FAQ";

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
      <ServicesGrid dict={dict.servicesPage.coreServices} />
      <CostOfLiving dict={dict.servicesPage.costOfLiving} />
      <DestinationsHub dict={dict.servicesPage.destinations} />
      <AccommodationAssistant dict={dict.servicesPage.accommodationAssistant} />
      <TrustSection dict={dict.servicesPage.trust} />
      <FAQ dict={dict.servicesPage.faq} />
    </main>
  );
}

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Countries from "@/components/Countries";
import WhyChooseUs from "@/components/WhyChooseUs";
import Team from "@/components/Team";
import Statistics from "@/components/Statistics";
import Form from "@/components/Form";

import { getTeamMembers } from "@/lib/strapi";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const teamMembers = await getTeamMembers(lang);

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Hero lang={lang} dict={dict.hero} />
      <Services lang={lang} dict={dict.services} />
      <Countries lang={lang} dict={dict.countries} />
      <WhyChooseUs lang={lang} dict={dict.whyUs} />
      <Team lang={lang} dict={dict.team} teamMembers={teamMembers.slice(0, 4)} showViewAll={true} />
      <Statistics lang={lang} dict={dict.statistics} />
      <Form lang={lang} dict={dict.form} />
    </main>
  );
}

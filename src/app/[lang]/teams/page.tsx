import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Team from "@/components/Team";
import { getTeamMembers } from "@/lib/strapi";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export default async function TeamsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const teamMembers = await getTeamMembers(lang);

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
        name: "Team",
        item: `https://studs-life.com/${lang}/teams`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-10">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <Team lang={lang} dict={dict.team} teamMembers={teamMembers} />
    </main>
  );
}

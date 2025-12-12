import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Team from "@/components/Team";
import { getTeamMembers } from "@/lib/strapi";

export default async function TeamsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const teamMembers = await getTeamMembers(lang);

  return (
    <main className="min-h-screen bg-gray-50 pt-10">
      <Team lang={lang} dict={dict.team} teamMembers={teamMembers} />
    </main>
  );
}

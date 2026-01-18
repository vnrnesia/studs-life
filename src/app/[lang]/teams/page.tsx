import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import Team from "@/components/Team";
import { getTeamMembers } from "@/lib/strapi";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const pageMeta = dict.metadata?.pages?.teams;

  return generateSEOMetadata({
    lang,
    path: '/teams',
    title: pageMeta?.title || `${dict.team?.title || 'Our Team'} | Student's Life`,
    description: pageMeta?.description || "Meet our diverse team of education consultants dedicated to helping students achieve their study abroad goals.",
  });
}

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

  // Person schema for team members
  const personSchemas = teamMembers.map((member) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.fullName,
    jobTitle: member.role,
    worksFor: {
      "@type": "Organization",
      name: "Student's Life",
      url: "https://studs-life.com"
    },
    ...(member.email && { email: member.email }),
    ...(member.phone && { telephone: member.phone }),
    ...(member.photo?.url && { image: member.photo.url }),
  }));

  return (
    <div className="bg-gray-50 pt-10 pb-40">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      {personSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Team lang={lang} dict={dict.team} teamMembers={teamMembers} />
    </div>
  );
}

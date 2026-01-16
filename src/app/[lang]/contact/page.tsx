import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo";
import MultiStepContactForm from "@/components/MultiStepContactForm";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const pageMeta = dict.metadata?.pages?.contact;

  return generateSEOMetadata({
    lang,
    path: '/contact',
    title: pageMeta?.title || `${dict.nav?.contact || 'Contact'} | Student's Life`,
    description: pageMeta?.description || "Get in touch with us for your study abroad journey. Free consultation available.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

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
        name: "Contact",
        item: `https://studs-life.com/${lang}/contact`,
      },
    ],
  };

  return (
    <main className="flex-grow">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <MultiStepContactForm lang={lang} dict={dict.form} />
    </main>
  );
}

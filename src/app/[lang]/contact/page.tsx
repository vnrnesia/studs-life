import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import MultiStepContactForm from "@/components/MultiStepContactForm";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Contact Us | Student's Life",
  description: "Get in touch with us for your study abroad journey.",
};

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

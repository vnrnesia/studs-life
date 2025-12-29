import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import MultiStepContactForm from "@/components/MultiStepContactForm";
import type { Metadata } from "next";

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

  return (
    <main className="flex-grow">
      <MultiStepContactForm lang={lang} dict={dict.form} />
    </main>
  );
}

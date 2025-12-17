import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Form from "@/components/Form";
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
      <Form lang={lang} dict={dict.form} />
    </main>
  );
}

import type { Metadata } from "next";
import { Manrope } from "next/font/google"; 
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import { getCountriesWithCities } from "@/lib/strapi";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Student's Life",
  description: "Study Abroad, Visa & Travel Services",
};

export const revalidate = 60;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const countries = await getCountriesWithCities(lang);
  console.log('Loaded dictionary for:', lang, 'Keys:', Object.keys(dict || {}));

  return (
    <html lang={lang}>
      <body className={`${manrope.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <Navbar lang={lang as Locale} dict={dict} countries={countries} />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}

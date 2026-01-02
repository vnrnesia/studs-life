import type { Metadata } from "next";
import { Manrope } from "next/font/google"; 
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionary";
import { getCountriesWithCities } from "@/lib/strapi";
import JsonLd from "@/components/JsonLd";
import { Organization } from "schema-dts";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });

const BASE_URL = 'https://studs-life.com';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const title = dict.metadata?.title || "Student's Life | Study Abroad, Visa & Travel Services";
  const description = dict.metadata?.description || "Guiding students through university applications, visa processing, and relocation support for a successful study abroad experience.";

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: '/favicon.webp',
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'ru': '/ru',
        'tk': '/tk',
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}`,
      siteName: "Student's Life",
      locale: lang === 'tk' ? 'tr_TR' : lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/logo.png',
          width: 800,
          height: 600,
          alt: "Student's Life Logo",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
  };
}

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
      <head>
        <link href="https://fonts.cdnfonts.com/css/octin-stencil" rel="stylesheet" />
      </head>
      <body className={`${manrope.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <JsonLd<Organization>
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Student's Life",
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            sameAs: [
              "https://instagram.com/defyzerglobal",
              "https://twitter.com/defyzerglobal",
            ],
          }}
        />
        <Navbar lang={lang as Locale} dict={dict} countries={countries} />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}

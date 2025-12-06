import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google"; // Using requested fonts
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat", weight: ["400", "700", "900"] });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Student's Life",
  description: "Study Abroad, Visa & Travel Services",
};

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

  return (
    <html lang={lang}>
      <body className={`${montserrat.variable} ${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}

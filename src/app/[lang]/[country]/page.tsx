import { notFound } from 'next/navigation';
import { getCountry, getCities } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import { BreadcrumbList, WithContext } from 'schema-dts';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const OfficeLocations = dynamic(() => import('@/components/OfficeLocations'));
const ContactFormSection = dynamic(() => import('@/components/ContactFormSection'));
import ScrollReveal from '@/components/ui/ScrollReveal';

interface CountryPageProps {
  params: Promise<{
    lang: string;
    country: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const countries = await import('@/lib/strapi').then(m => m.getCountries());
    return countries.map((country) => ({
      country: country.slug,
    }));
  } catch (error) {
    console.error('Build-time fetch failed:', error);
    return [];
  }
}

export const revalidate = 60;

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  try {
    const { country: countrySlug, lang } = await params;
    const country = await getCountry(countrySlug, lang);
    if (!country) return { title: 'Country Not Found' };

    return generateSEOMetadata({
      lang,
      path: `/${countrySlug}`,
      title: `${country.name} | Student's Life`,
      description: country.description || `Discover study opportunities in ${country.name}. Universities, cities, and student life guide.`,
    });
  } catch (error) {
    return { title: 'Student\'s Life' };
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug, lang } = await params;
  const country = await getCountry(countrySlug, lang);
  const cities = await getCities(countrySlug, lang);

  if (!country) notFound();

  const dict: any = await getDictionary(lang as Locale);

  const breadcrumbData: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://studs-life.com/${lang}` },
      { "@type": "ListItem", position: 2, name: country.name, item: `https://studs-life.com/${lang}/${countrySlug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-white pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Image or Gradient */}
        {country.images?.[0] ? (
          <>
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${country.images[0].url}`}
              alt={country.images[0].alternativeText || country.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06182E]/80 via-[#06182E]/60 to-[#06182E]/90 z-[1]" />
          </>
        ) : (
          <div className="absolute inset-0 z-0 bg-[#06182E]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
          </div>
        )}

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-crimson text-sm font-bold tracking-widest uppercase">
              STUDY IN {country.name.toUpperCase()}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-rose-400">{country.name}</span>
          </h1>
          {country.description && (
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              {country.description}
            </p>
          )}
        </div>
      </section>

      {/* 1.5. ABOUT COUNTRY SECTION (if description or multiple images exist) */}
      {(country.description || (country.images && country.images.length > 1)) && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Images Gallery */}
              {country.images && country.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {country.images.slice(1, 5).map((img, idx) => (
                    <div key={img.id} className={`relative overflow-hidden rounded-2xl shadow-lg ${idx === 0 ? 'row-span-2 h-full min-h-[300px]' : 'h-48'}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${img.url}`}
                        alt={img.alternativeText || `${country.name} photo ${idx + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* Description */}
              {country.description && (
                <div className={country.images && country.images.length > 1 ? '' : 'lg:col-span-2 text-center'}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    {lang === 'ru' ? `О стране ${country.name}` : `About ${country.name}`}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {country.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. CITIES SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {lang === 'ru' ? 'Города для обучения' : 'Cities for Studying'}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {lang === 'ru' ? 'Откройте для себя лучшие города для студенческой жизни.' : 'Discover the best cities for your student life.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/${lang}/${countrySlug}/${city.slug}`}
                className="group block bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {city.images?.[0] && (
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${city.images[0].url}`}
                      alt={`${city.name} - Student life`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-2 text-gray-900 group-hover:text-crimson transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 leading-relaxed">
                    {city.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {cities.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xl text-gray-500">
                {lang === 'ru' ? 'Города скоро появятся' : 'Cities coming soon'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. CONTACT FORM */}
      <ScrollReveal direction="up">
        <ContactFormSection lang={lang} dict={dict.contactForm} />
      </ScrollReveal>

      {/* 4. OFFICE SECTION */}
      <ScrollReveal direction="up">
        <OfficeLocations lang={lang} dict={dict.offices} />
      </ScrollReveal>

    </main>
  );
}

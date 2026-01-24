import { notFound } from 'next/navigation';
import { getCountry, getCities } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import { BreadcrumbList, WithContext } from 'schema-dts';

interface CountryPageProps {
  params: Promise<{
    lang: string;
    country: string;
  }>;
}

// Generate static params for all countries
export async function generateStaticParams() {
  try {
    const countries = await import('@/lib/strapi').then(m => m.getCountries());

    return countries.map((country) => ({
      country: country.slug,
    }));
  } catch (error) {
    console.error('Build-time fetch failed (this is expected if Strapi is not reachable during build):', error);
    return [];
  }
}

// Revalidate every 60 seconds (1 minute)
export const revalidate = 60;

// Generate metadata with canonical and hreflang
export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  try {
    const { country: countrySlug, lang } = await params;
    const country = await getCountry(countrySlug, lang);

    if (!country) {
      return {
        title: 'Country Not Found',
      };
    }

    return generateSEOMetadata({
      lang,
      path: `/${countrySlug}`,
      title: `${country.name} | Student's Life`,
      description: country.description || `Discover study opportunities in ${country.name}. Universities, cities, and student life guide.`,
    });
  } catch (error) {
    console.error('Build-time fetch failed in generateMetadata:', error);
    return {
      title: 'Student\'s Life',
      description: 'Discover global study opportunities.'
    };
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug, lang } = await params;
  const country = await getCountry(countrySlug, lang);
  const cities = await getCities(countrySlug, lang);

  if (!country) {
    notFound();
  }

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
        name: country.name,
        item: `https://studs-life.com/${lang}/${countrySlug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen pt-32 pb-16">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{country.name}</h1>
          {country.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {country.description}
            </p>
          )}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${lang}/${countrySlug}/${city.slug}`}
              className="group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {city.images?.[0] && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${city.images[0].url}`}
                    alt={`${city.name} - Student life and universities`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {city.name}
                </h2>
                <p className="text-gray-600 line-clamp-2">
                  {city.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {cities.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              {lang === 'ru'
                ? 'Города скоро появятся'
                : 'Cities coming soon'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}


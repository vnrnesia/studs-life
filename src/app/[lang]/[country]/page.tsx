import { notFound } from 'next/navigation';
import { getCountry, getCities } from '@/lib/strapi';
import Link from 'next/link';

interface CountryPageProps {
  params: {
    lang: string;
    country: string;
  };
}

// Generate static params for all countries
export async function generateStaticParams() {
  const countries = await import('@/lib/strapi').then(m => m.getCountries());

  return countries.map((country) => ({
    country: country.slug,
  }));
}

// Revalidate every 60 seconds (1 minute)
export const revalidate = 60;

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug, lang } = await params;
  const country = await getCountry(countrySlug, lang);
  const cities = await getCities(countrySlug, lang);

  if (!country) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
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
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${city.images[0].url}`}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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

// Generate metadata
export async function generateMetadata({ params }: CountryPageProps) {
  const { country: countrySlug, lang } = await params;
  const country = await getCountry(countrySlug, lang);

  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.name} | Student's Life`,
    description: country.description || `Discover student cities in ${country.name}`,
  };
}

import { notFound } from 'next/navigation';
import { getCity, getCities, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';

interface CityPageProps {
  params: Promise<{
    lang: string;
    country: string;
    city: string;
  }>;
}

// Generate static params for all cities
export async function generateStaticParams() {
  const cities = await getCities();
  
  return cities
    .filter((city) => city?.country?.slug) // Filter out cities without country
    .map((city) => ({
      country: city.country.slug,
      city: city.slug,
    }));
}

// Revalidate every hour
export const revalidate = 3600;

export default async function CityPage({ params }: CityPageProps) {
  const { country, city: citySlug, lang } = await params;
  const city = await getCity(country, citySlug, lang);

  if (!city) {
    notFound();
  }

  // Destructure directly from city object (flattened structure)
  const { 
    title, 
    intro, 
    economyContent, 
    housingContent, 
    transportContent, 
    climateContent,
    climateTable,
    conclusion,
    images: cityImages,
    country: cityCountry 
  } = city;

  // Access images array directly if it exists
  const heroImage = cityImages?.[0];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        {heroImage && (
          <Image
            src={getStrapiImageUrl(heroImage.url)}
            alt={heroImage.alternativeText || title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {cityCountry?.name}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Introduction */}
        {intro && (
          <div 
            className="prose prose-lg max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        )}

        {/* Economy Section */}
        {economyContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">💰</span>
              {lang === 'ru' ? 'Экономика и стоимость жизни' : 'Economy & Cost of Living'}
            </h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: economyContent }}
            />
          </section>
        )}

        {/* Housing Section */}
        {housingContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">🏠</span>
              {lang === 'ru' ? 'Варианты проживания студентов' : 'Student Accommodation'}
            </h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: housingContent }}
            />
          </section>
        )}

        {/* Transport Section */}
        {transportContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">🚇</span>
              {lang === 'ru' ? 'Городская инфраструктура и транспорт' : 'Transport & Infrastructure'}
            </h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: transportContent }}
            />
          </section>
        )}

        {/* Climate Section */}
        {climateContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">🌦️</span>
              {lang === 'ru' ? 'Климат' : 'Climate'}
            </h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: climateContent }}
            />
            
            {/* Climate Table */}
            {climateTable && (
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        {lang === 'ru' ? 'Сезон' : 'Season'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        {lang === 'ru' ? 'Температура' : 'Temperature'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        {lang === 'ru' ? 'Особенности' : 'Features'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {climateTable.seasons?.map((season: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-2">{season.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{season.temperature}</td>
                        <td className="border border-gray-300 px-4 py-2">{season.features}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Conclusion */}
        {conclusion && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              {lang === 'ru' ? 'Итог' : 'Conclusion'}
            </h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: conclusion }}
            />
          </section>
        )}

        {/* Image Gallery */}
        {cityImages && cityImages.length > 1 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">
              {lang === 'ru' ? 'Галерея' : 'Gallery'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cityImages.slice(1).map((image) => (
                <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={getStrapiImageUrl(image.url)}
                    alt={image.alternativeText || ''}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// Generate metadata
export async function generateMetadata({ params }: CityPageProps) {
  const { country, city: citySlug, lang } = await params;
  const city = await getCity(country, citySlug, lang);

  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `${city.title} | Student's Life`,
    description: city.metaDescription || city.intro?.substring(0, 160),
  };
}

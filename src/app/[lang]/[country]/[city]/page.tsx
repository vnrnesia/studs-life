import { notFound } from 'next/navigation';
import { getCity, getCities, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import { marked } from 'marked';

interface CityPageProps {
  params: Promise<{
    lang: string;
    country: string;
    city: string;
  }>;
};

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

// Revalidate every 60 seconds (1 minute)
export const revalidate = 60;

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
  if (heroImage) {
    console.log('Hero Image URL (raw):', heroImage.url);
    console.log('Hero Image URL (full):', getStrapiImageUrl(heroImage.url));
  }

  // Helper to safely parse markdown
  const parseMarkdown = (content?: string) => {
    if (!content) return null;
    return { __html: marked.parse(content) as string };
  };

  return (
    // DEĞİŞİKLİK BURADA: bg-gray-50 ve text-black eklendi
    <main className="min-h-screen bg-gray-50 text-black">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        {heroImage && (
          <Image
            src={getStrapiImageUrl(heroImage.url)}
            alt={heroImage.alternativeText || title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        {/* Buradaki text-white, yukarıdaki text-black'i ezer (istenilen durum) */}
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
            className="prose prose-lg max-w-none mb-16 text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
            dangerouslySetInnerHTML={parseMarkdown(intro) || { __html: '' }}
          />
        )}

        {/* Economy Section */}
        {economyContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-black">
              <span className="text-4xl">💰</span>
              {lang === 'ru' ? 'Экономика и стоимость жизни' : 'Economy & Cost of Living'}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
              dangerouslySetInnerHTML={parseMarkdown(economyContent) || { __html: '' }}
            />
          </section>
        )}

        {/* Housing Section */}
        {housingContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-black">
              <span className="text-4xl">🏠</span>
              {lang === 'ru' ? 'Варианты проживания студентов' : 'Student Accommodation'}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
              dangerouslySetInnerHTML={parseMarkdown(housingContent) || { __html: '' }}
            />
          </section>
        )}

        {/* Transport Section */}
        {transportContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-black">
              <span className="text-4xl">🚇</span>
              {lang === 'ru' ? 'Городская инфраструктура и транспорт' : 'Transport & Infrastructure'}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
              dangerouslySetInnerHTML={parseMarkdown(transportContent) || { __html: '' }}
            />
          </section>
        )}

        {/* Climate Section */}
        {climateContent && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-black">
              <span className="text-4xl">🌦️</span>
              {lang === 'ru' ? 'Климат' : 'Climate'}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
              dangerouslySetInnerHTML={parseMarkdown(climateContent) || { __html: '' }}
            />
            
            {/* Climate Table */}
            {climateTable && (
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-black">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold text-black">
                        {lang === 'ru' ? 'Сезон' : 'Season'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold text-black">
                        {lang === 'ru' ? 'Температура' : 'Temperature'}
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-bold text-black">
                        {lang === 'ru' ? 'Особенности' : 'Features'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {climateTable.seasons?.map((season: any, index: number) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
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
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-black">
              <span className="text-4xl">🎯</span>
              {lang === 'ru' ? 'Итог' : 'Conclusion'}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
              dangerouslySetInnerHTML={parseMarkdown(conclusion) || { __html: '' }}
            />
          </section>
        )}

        {/* Image Gallery */}
        {cityImages && cityImages.length > 1 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-black">
              {lang === 'ru' ? 'Галерея' : 'Gallery'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cityImages.slice(1).map((image) => (
                <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={getStrapiImageUrl(image.url)}
                    alt={image.alternativeText || ''}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
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
import { notFound } from 'next/navigation';
import { getCity, getCities, getStrapiImageUrl } from '@/lib/strapi';
import { generateSEOMetadata } from '@/lib/seo';
import Image from 'next/image';
import { marked } from 'marked';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { Article, BreadcrumbList, WithContext } from 'schema-dts';
interface CityPageProps {
  params: Promise<{
    lang: string;
    country: string;
    city: string;
  }>;
};
export async function generateStaticParams() {
  try {
    const cities = await getCities();
    return cities
      .filter((city) => city?.country?.slug)
      .map((city) => ({
        country: city.country.slug,
        city: city.slug,
      }));
  } catch (error) {
    console.error('Build-time fetch failed (this is expected if Strapi is not reachable during build):', error);
    return [];
  }
}
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  try {
    const { country, city: citySlug, lang } = await params;
    const city = await getCity(country, citySlug, lang);
    if (!city) {
      return {
        title: 'City Not Found',
      };
    }
    const title = city.metaDescription || `${city.title} | Student's Life`;
    const description = city.intro ? city.intro.substring(0, 160) : `Study in ${city.title}, ${city.country?.name}. Comprehensive guide for international students.`;
    const image = city.images && city.images.length > 0 ? getStrapiImageUrl(city.images[0].url) : undefined;
    return generateSEOMetadata({
      lang,
      path: `/${country}/${citySlug}`,
      title,
      description,
      image,
    });
  } catch (error) {
    console.error('Build-time fetch failed in generateMetadata:', error);
    return {
      title: 'Student\'s Life',
      description: 'Comprehensive guide for international students.'
    };
  }
}
export const revalidate = 60;
export default async function CityPage({ params }: CityPageProps) {
  const { country, city: citySlug, lang } = await params;
  const city = await getCity(country, citySlug, lang);
  if (!city) {
    notFound();
  }
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
    country: cityCountry,
    publishedAt,
    updatedAt
  } = city;
  const heroImage = cityImages?.[0];
  const heroImageUrl = heroImage ? getStrapiImageUrl(heroImage.url) : '';
  const parseMarkdown = (content?: string) => {
    if (!content) return null;
    return { __html: marked.parse(content) as string };
  };
  const articleSchema: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: intro ? intro.substring(0, 160) : undefined,
    image: heroImageUrl ? [heroImageUrl] : undefined,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Organization",
      name: "Student's Life",
      url: "https://studs-life.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Student's Life",
      logo: {
        "@type": "ImageObject",
        url: "https://studs-life.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://studs-life.com/${lang}/${country}/${citySlug}`,
    },
  };
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
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
        name: cityCountry?.name || country,
        item: `https://studs-life.com/${lang}/${country}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://studs-life.com/${lang}/${country}/${citySlug}`,
      },
    ],
  };
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <JsonLd<Article> data={articleSchema} />
      <JsonLd<BreadcrumbList> data={breadcrumbSchema} />
      {}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        {heroImage && (
          <Image
            src={heroImageUrl}
            alt={heroImage.alternativeText || title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        {}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              {cityCountry?.name}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        </div>
      </section>
      {}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {}
        {intro && (
          <div
            className="prose prose-lg max-w-none mb-16 text-black prose-headings:text-black prose-p:text-black prose-strong:text-black"
            dangerouslySetInnerHTML={parseMarkdown(intro) || { __html: '' }}
          />
        )}
        {}
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
        {}
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
        {}
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
        {}
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
            {}
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
        {}
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
        {}
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
                    sizes="(max-width: 768px) 50vw, 33vw"
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

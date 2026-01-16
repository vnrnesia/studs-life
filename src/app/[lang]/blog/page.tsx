import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getCities, getStrapiImageUrl } from "@/lib/strapi";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { BreadcrumbList, WithContext } from "schema-dts";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const pageMeta = dict.metadata?.pages?.blog;

  return generateSEOMetadata({
    lang,
    path: '/blog',
    title: pageMeta?.title || `${dict.latestJournal?.label || 'Blog'} | Student's Life`,
    description: pageMeta?.description || "Latest news, guides, and articles for international students.",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dict = await getDictionary(lang);
  const cities = await getCities(undefined, lang);

  const blogDict = dict.latestJournal || {};

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
        name: blogDict.label || "Blog",
        item: `https://studs-life.com/${lang}/blog`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <JsonLd<BreadcrumbList> data={breadcrumbData} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-6">
            {blogDict.label || "Journal"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            {blogDict.title_part1 || "Our"} <span className="text-navy">{blogDict.title_part2 || "Journal"}</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            {lang === 'ru'
              ? 'Узнайте больше об обучении и жизни в разных странах через наши подробные статьи.'
              : 'Learn more about studying and living in different countries through our detailed articles.'}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((post) => {
            // Image extraction
            let imageUrl = null;
            const images = post.images;
            if (images) {
              if (Array.isArray(images) && images.length > 0) {
                imageUrl = images[0].url;
              } else if ((images as any).data && Array.isArray((images as any).data) && (images as any).data.length > 0) {
                imageUrl = (images as any).data[0].url || (images as any).data[0].attributes?.url;
              }
            }
            const finalImageUrl = imageUrl ? getStrapiImageUrl(imageUrl) : null;

            return (
              <article
                key={post.id}
                className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col"
              >
                {/* Image Container */}
                <Link href={`/${lang}/${post.country?.slug}/${post.slug}`} className="relative h-64 overflow-hidden block">
                  {finalImageUrl ? (
                    <Image
                      src={finalImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      {blogDict.noImage || "No Image"}
                    </div>
                  )}

                  {/* Country Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-navy border border-white/20 shadow-sm">
                      {post.country?.name}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(lang === 'tk' ? 'tk-TM' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{blogDict.admin || "Admin"}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-navy transition-colors line-clamp-2 leading-tight">
                    <Link href={`/${lang}/${post.country?.slug}/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.intro || post.metaDescription}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <Link
                      href={`/${lang}/${post.country?.slug}/${post.slug}`}
                      className="text-sm font-bold text-navy flex items-center gap-2 group/btn"
                    >
                      {blogDict.readMore || "Read More"}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

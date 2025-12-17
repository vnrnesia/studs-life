"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { City, getStrapiImageUrl } from "@/lib/strapi";

interface LatestJournalProps {
  lang: string;
  dict: any;
  posts: City[];
}

export default function LatestJournal({ lang, dict, posts = [] }: LatestJournalProps) {
  // If no posts, don't render section
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Side: Text & Button */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <div className="mb-2 text-sm font-bold tracking-wider text-gray-500 uppercase">
              {dict?.label || "Insights & Inspiration"}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              {dict?.title_part1 || "Explore our"} <br />
              <span className="font-serif italic font-normal text-6xl md:text-7xl">
                {dict?.title_part2 || "Latest journal"}
              </span>
            </h2>
            
            <div className="flex">
              <Link 
                href={`/${lang}/countries`}
                className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all font-montserrat"
              >
                {dict?.viewAll || "View all blogs"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side: Vertical List */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {posts.map((post: any) => {
               // Robust image extraction for different Strapi structures
               let imageUrl = null;
               const images = post.images;
               
               if (images) {
                 if (Array.isArray(images) && images.length > 0) {
                   // Case 1: Array of objects { url: ... } or { attributes: { url: ... } }
                   const firstImage = images[0];
                   imageUrl = firstImage.url || firstImage.attributes?.url;
                 } else if (images.data && Array.isArray(images.data) && images.data.length > 0) {
                    // Case 2: { data: [ { attributes: { url: ... } } ] }
                    const firstImage = images.data[0];
                    imageUrl = firstImage.url || firstImage.attributes?.url;
                 }
               }

               const finalImageUrl = imageUrl ? getStrapiImageUrl(imageUrl) : null;

               return (
                <Link 
                  key={post.id} 
                  href={`/${lang}/${post.country?.slug}/${post.slug}`}
                  className="group flex flex-col md:flex-row gap-6 p-4 rounded-3xl hover:bg-gray-50 transition-colors"
                >
                  {/* Image */}
                  <div className="relative h-48 md:h-32 w-full md:w-48 overflow-hidden rounded-2xl flex-shrink-0">
                    {finalImageUrl ? (
                      <Image
                        src={finalImageUrl}
                        alt={post.name || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">{dict?.noImage || "No Image"}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center flex-grow">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{post.country?.name || post.country?.data?.attributes?.name}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-crimson transition-colors line-clamp-2 mb-2">
                       {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-2">
                       {post.intro || post.metaDescription || post.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

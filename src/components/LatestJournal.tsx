"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  image?: string;
  author?: string;
  readTime?: string;
}

interface LatestJournalProps {
  lang: string;
  dict: any;
  posts: any[]; // Using any[] to match Strapi response structure
}

export default function LatestJournal({ lang, dict, posts = [] }: LatestJournalProps) {
  // If no posts, don't render section
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              {dict?.title || "Latest From Our Journal"}
            </h2>
            <p className="text-lg text-gray-600">
               {dict?.subtitle || "Stay updated with the latest news, tips, and study abroad guides from our experts."}
            </p>
          </div>
          
          <Link 
            href={`/${lang}/blog`}
            className="group hidden md:flex items-center gap-2 text-crimson font-bold hover:gap-3 transition-all"
          >
            {dict?.viewAll || "View All Posts"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/${lang}/blog/${post.slug || '#'}`}
              className="group flex flex-col h-full bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-60 w-full overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">{dict?.noImage || "No Image"}</span>
                  </div>
                )}
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-2 shadow-sm">
                  <Calendar className="w-3 h-3 text-crimson" />
                  {new Date(post.publishedAt).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.author || dict?.admin || "Admin"}
                  </div>
                  {post.readTime && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div>{post.readTime}</div>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-crimson transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {post.summary || post.description}
                </p>

                <div className="flex items-center text-crimson text-sm font-bold mt-auto">
                  {dict?.readMore || "Read More"}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 text-center md:hidden">
           <Link 
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-crimson font-bold"
          >
            {dict?.viewAll || "View All Posts"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

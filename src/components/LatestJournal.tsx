"use client";

import { BlogPost, getStrapiImageUrl } from "@/lib/strapi";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LatestJournalProps {
    lang: string;
    dict: any;
    posts: BlogPost[];
}

export default function LatestJournal({ lang, dict, posts }: LatestJournalProps) {
    // If no posts, we might still want to show the section if the design requires it, 
    // but usually better to hide or show placeholders.
    // For now, if empty, we hide it.
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    {/* Left Column */}
                    <div className="lg:w-1/3 flex flex-col items-start text-left">
                        <div className="flex items-center gap-2 mb-6">
                             <Sparkles className="w-5 h-5 text-black" />
                             <span className="font-bold text-gray-900">{dict.smallTitle}</span>
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-10">
                            {/* Best effort to reproduce the style safely across languages by rendering whole string */}
                            {dict.title}
                        </h2>

                        <Link
                            href={`/${lang}/#countries`}
                            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all group"
                        >
                            {dict.viewAll}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-2/3 flex flex-col gap-6 w-full">
                        {posts.map((post) => (
                            <Link 
                                href={`/${lang}/${post.slug}`} 
                                key={post.id} 
                                className="group bg-white rounded-3xl p-4 flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 items-center border border-gray-100"
                            >
                                <div className="w-full sm:w-48 h-48 sm:h-32 relative rounded-2xl overflow-hidden shrink-0">
                                    {post.cover ? (
                                        <Image
                                            src={getStrapiImageUrl(post.cover.url)}
                                            alt={post.cover.alternativeText || post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                           <span className="text-4xl">📄</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full sm:w-auto">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
                                        <span>{new Date(post.publishedAt).toLocaleDateString(lang, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{post.readingTime || '5'} {dict.readTime}</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
             </div>
        </section>
    );
}

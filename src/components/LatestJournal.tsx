"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight, Calendar, Clock, User } from "lucide-react";
import { getStrapiImageUrl } from "@/lib/strapi";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface BlogPost {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    publishedAt: string;
    image?: {
        url: string;
        alternativeText?: string;
    };
    author?: {
        fullName: string;
    };
    readTime?: string;
    locale: string;
}

interface LatestJournalProps {
    lang: string;
    dict: {
        label: string;
        title_part1: string;
        title_part2: string;
        viewAll: string;
        noImage: string;
        admin: string;
        readMore: string;
    };
    posts: BlogPost[];
}

export default function LatestJournal({ lang, dict, posts = [] }: LatestJournalProps) {
    // Use a default empty array if posts is null/undefined to prevent crashes
    const displayPosts = posts || [];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-crimson font-bold tracking-wider uppercase text-sm bg-crimson/5 px-4 py-2 rounded-full border border-crimson/10 inline-block mb-4">
                            {dict.label}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            {dict.title_part1} <span className="text-crimson">{dict.title_part2}</span>
                        </h2>
                    </div>

                    <div className="hidden md:block">
                        <Link href={`/${lang}/blog`}>
                            <InteractiveHoverButton className="w-auto">
                                {dict.viewAll}
                            </InteractiveHoverButton>
                        </Link>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post) => {
                        const imageUrl = post.image?.url
                            ? getStrapiImageUrl(post.image.url)
                            : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop";

                        const formattedDate = new Date(post.publishedAt).toLocaleDateString(
                            lang === 'ru' ? 'ru-RU' : lang === 'tk' ? 'tk-TM' : 'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                        );

                        return (
                            <Link
                                href={`/${lang}/blog/${post.slug}`}
                                key={post.id}
                                className="group flex flex-col h-full bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-crimson/20 hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={post.image?.alternativeText || post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow p-8">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{formattedDate}</span>
                                        </div>
                                        {post.readTime && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-crimson transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed mb-6 flex-grow">
                                        {post.summary}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                {post.author?.fullName || dict.admin}
                                            </span>
                                        </div>

                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-crimson group-hover:gap-3 transition-all duration-300">
                                            {dict.readMore}
                                            <MoveRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile View All */}
                <div className="md:hidden mt-10 flex justify-center">
                    <Link href={`/${lang}/blog`}>
                        <InteractiveHoverButton className="w-full">
                            {dict.viewAll}
                        </InteractiveHoverButton>
                    </Link>
                </div>

            </div>
        </section>
    );
}

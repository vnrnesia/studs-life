"use client";
import { motion } from "framer-motion";
import { GraduationCap, Handshake, ArrowDown } from "lucide-react";
import Link from "next/link";

interface PartnershipHeroProps {
    dict: any;
    lang: string;
}

export default function PartnershipHero({ dict, lang }: PartnershipHeroProps) {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-[#06182E] overflow-hidden pt-24 pb-16">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson/10 border border-crimson/20 rounded-full mb-8"
                >
                    <GraduationCap className="w-4 h-4 text-crimson" />
                    <span className="text-crimson text-xs font-bold tracking-widest uppercase">
                        {dict.badge}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
                >
                    {dict.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg md:text-xl text-blue-100/70 max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    {dict.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <Link
                        href={`/${lang}/contact`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-crimson text-white font-bold text-lg rounded-full hover:bg-crimson/90 transition-all duration-300 shadow-lg shadow-crimson/30 hover:shadow-xl hover:shadow-crimson/40 hover:-translate-y-1"
                    >
                        <Handshake className="w-5 h-5" />
                        {dict.cta}
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowDown className="w-6 h-6 text-white/30" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

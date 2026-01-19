"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import heroGuy from "@/assets/hero_guy.webp";

interface HeroProps {
    lang: string;
    dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBlue = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center pt-20 bg-[#6d1314] overflow-hidden"
        >

            {/* Background Parallax Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Blue Angled Background */}
                <motion.div
                    style={{
                        y: yBlue,
                        clipPath: "polygon(0 65%, 100% 55%, 100% 100%, 0 100%)",
                        height: "140%",
                        top: "0"
                    }}
                    className="absolute inset-0 bg-navy"
                />

                {/* Background Lighting Effects (Overlaying Navy) */}
                <div className="absolute inset-0 z-[1] overflow-hidden">
                    <div className="absolute top-[10%] right-[-10%] w-[80%] h-[80%] bg-white/12 rounded-full blur-[180px]" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[140px]" />
                </div>

                {/* Large Parallax Text */}
                <motion.div
                    style={{ y: yText }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span
                        className="text-[28vw] md:text-[15vw] font-black text-[#06182E] font-[family-name:var(--font-octin)] tracking-widest uppercase whitespace-nowrap select-none italic -rotate-[16.5deg] md:-rotate-[4.0deg] translate-y-[30vh] md:translate-y-[25vh] 2xl:translate-y-[23vh]"
                        style={{ WebkitTextStroke: "2px #06182E", opacity: 0.9 }}
                    >
                        STUDENT&apos;S
                    </span>
                </motion.div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-4 md:gap-8 md:items-center pt-10 md:pt-0 h-full py-6 sm:py-8 md:py-0">

                {/* --- SOL KOLON: YAZILAR --- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center md:text-left"
                >

                    {/* Ana Başlık */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-montserrat text-white leading-[0.9] uppercase drop-shadow-md px-2 sm:px-0 tracking-tighter">
                        {dict.title}
                    </h1>

                    {/* Alt Başlık */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 tracking-wide px-2 sm:px-0">
                        {dict.subtitle}
                    </h2>

                    {/* Açıklama */}
                    <p className="text-base sm:text-lg text-gray-100 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed opacity-90 px-4 sm:px-0">
                        {dict.description}
                    </p>

                    {/* Buton */}
                    <div className="flex justify-center md:justify-start pt-2 sm:pt-4">
                        <Link href={`/${lang}/contact`} className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-crimson font-bold tracking-widest uppercase overflow-hidden hover:text-white hover:bg-crimson transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 text-sm sm:text-base">
                            <span className="relative z-10 flex items-center gap-2">
                                {dict.cta} <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </motion.div>

                {/* --- SAĞ KOLON: HERO GUY IMAGE --- */}
                <motion.div
                    style={{ y: yImage }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex relative h-full w-full justify-center md:justify-end items-end"
                >
                    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] flex items-end justify-center md:justify-end translate-y-12 md:translate-y-20">
                        <Image
                            src={heroGuy}
                            alt="International student celebrating study abroad success"
                            className="object-contain w-auto h-full object-bottom"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

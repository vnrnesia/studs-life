"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import whyUsStudent from '@/assets/whyus_student.webp';

interface WhyChooseUsProps {
  lang: string;
  dict: any;
}

export default function WhyChooseUs({ lang, dict }: WhyChooseUsProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - elements move slightly upwards as we scroll down
  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yBgText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Sol alttaki maddeler (Left Features)
  const leftFeatures: string[] = dict.leftFeatures || [];

  // Sağ taraftaki maddeler (Right Features)
  const rightFeatures: string[] = dict.rightFeatures || [];

  return (
    <section
      ref={containerRef}
      className="relative w-full md:min-h-[85vh] bg-[#061832] text-white overflow-hidden flex flex-col lg:flex-row lg:items-center py-20 px-4 md:px-8"
    >

      {/* Arka Plan Dekoratif Yazısı */}
      <motion.div
        style={{ y: yBgText }}
        className="absolute bottom-[0%] left-0 w-full select-none pointer-events-none opacity-5 px-4 text-center"
      >
        <span className="text-[12vw] md:text-[9vw] font-black uppercase tracking-widest text-white leading-none whitespace-nowrap block w-full">
          {dict.decoration}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* --- SOL KOLON (Başlık ve Sol Alt Liste) --- */}
        <motion.div
          style={{ y: yLeft }}
          className="lg:col-span-4 flex flex-col justify-start h-full"
        >

          {/* Ana Başlık */}
          <div className="mb-10 lg:mb-12 relative">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-bold tracking-wider uppercase text-white/50 mb-6">
              {dict.badge || "Why Choose Us"}
            </div>
            <h2 className="font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              <span className="text-[#C62828] block">{dict.titlePart1}</span>
              <span className="text-[#C62828] block">{dict.titlePart2}</span>
              <span className="text-white block">{dict.titlePart3}</span>
            </h2>
          </div>

          {/* Sol Alt Liste (Mobilde gizle, Desktopta göster) */}
          <div className="hidden lg:flex flex-col gap-8 mt-auto pb-10">
            {leftFeatures.map((item, idx) => (
              <FeatureItem key={idx} text={item} />
            ))}
          </div>
        </motion.div>

        {/* --- ORTA KOLON (Görsel Alanı) --- */}
        <motion.div
          style={{ y: yCenter }}
          className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[400px] md:min-h-[500px]"
        >

          <div className="relative w-full h-full flex items-center justify-center">

            {/* White Light/Glow behind the image (Reduced opacity) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-white/[0.05] rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-white/[0.08] rounded-full blur-[60px] pointer-events-none z-0" />

            {/* Görsel Alanı */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <Image
                src={whyUsStudent}
                alt="Why Choose Us"
                width={450}
                height={700}
                className="object-contain"
                priority
              />
            </div>

            {/* "7 Neden" Etiketi */}
            <div className="absolute top-[20%] right-[0%] z-20">
              <div className="relative bg-white text-[#061832] font-bold py-1 px-8 shadow-lg transform rotate-[-90deg] origin-bottom-right translate-x-10">
                <span className="text-lg tracking-widest uppercase whitespace-nowrap">{dict.badge}</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* --- SAĞ KOLON (Liste) --- */}
        <motion.div
          style={{ y: yRight }}
          className="lg:col-span-4 flex flex-col justify-center gap-8 py-4 lg:pl-8"
        >
          {rightFeatures.map((item, idx) => (
            <FeatureItem key={idx} text={item} />
          ))}

          {/* Contact Information - Desktop only: inside right column */}
          {dict.partnersContact && (
            <div className="hidden lg:block pt-6 mt-6 border-t border-white/20">
              <div className="grid grid-cols-2 gap-6">
                {/* Partners Contact */}
                <div className="space-y-2">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    {dict.partnersContact}
                  </p>
                  <div className="space-y-1">
                    <a
                      href={`mailto:${dict.partnersEmail}`}
                      className="block text-white/90 hover:text-white text-sm transition-colors"
                    >
                      {dict.partnersEmail}
                    </a>
                    <a
                      href={`tel:${dict.partnersPhone}`}
                      className="block text-white/90 hover:text-white text-sm transition-colors"
                    >
                      {dict.partnersPhone}
                    </a>
                  </div>
                </div>

                {/* Universities Contact */}
                <div className="space-y-2">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    {dict.universitiesContact}
                  </p>
                  <div className="space-y-1">
                    <a
                      href={`mailto:${dict.universitiesEmail}`}
                      className="block text-white/90 hover:text-white text-sm transition-colors"
                    >
                      {dict.universitiesEmail}
                    </a>
                    <a
                      href={`tel:${dict.universitiesPhone}`}
                      className="block text-white/90 hover:text-white text-sm transition-colors"
                    >
                      {dict.universitiesPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobilde Sol Alt Listeyi de buraya ekliyoruz */}
          <div className="lg:hidden flex flex-col gap-8 pt-4 md:border-t border-white/10">
            {leftFeatures.map((item, idx) => (
              <FeatureItem key={`mobile-${idx}`} text={item} />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Contact Information - Mobile only: after all features */}
      {dict.partnersContact && (
        <div className="lg:hidden max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 mt-4">
          <div className="pt-4 border-t border-white/20 flex flex-col gap-6">
            {/* Partners Contact */}
            <div className="space-y-3">
              <p className="text-[#2196F3] text-sm font-bold uppercase tracking-widest">
                {dict.partnersContact}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${dict.partnersEmail}`}
                  className="text-white text-lg font-medium hover:text-[#2196F3] transition-colors"
                >
                  {dict.partnersEmail}
                </a>
                <a
                  href={`tel:${dict.partnersPhone}`}
                  className="text-white text-lg font-medium hover:text-[#2196F3] transition-colors"
                >
                  {dict.partnersPhone}
                </a>
              </div>
            </div>

            {/* Universities Contact */}
            <div className="space-y-3">
              <p className="text-[#2196F3] text-sm font-bold uppercase tracking-widest">
                {dict.universitiesContact}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${dict.universitiesEmail}`}
                  className="text-white text-lg font-medium hover:text-[#2196F3] transition-colors"
                >
                  {dict.universitiesEmail}
                </a>
                <a
                  href={`tel:${dict.universitiesPhone}`}
                  className="text-white text-lg font-medium hover:text-[#2196F3] transition-colors"
                >
                  {dict.universitiesPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// Liste Maddesi Bileşeni
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="group flex items-start gap-4">
      <div className="mt-1 w-5 h-5 flex-shrink-0 text-[#2196F3]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>
      <p className="text-gray-300 text-sm md:text-base font-medium leading-snug group-hover:text-white transition-colors duration-300">
        {text}
      </p>
    </div>
  );
}

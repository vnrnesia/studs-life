"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Locale } from "@/i18n-config";

interface ProcessSectionProps {
  lang: Locale;
  dict: any;
}

// Kart Bileşeni
const Card = ({
  i,
  step,
  progress,
  range,
  targetScale,
  totalSteps,
}: {
  i: number;
  step: any;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  totalSteps: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      // Sticky kapsayıcı
      className="h-[500px] lg:h-screen flex items-start lg:items-center justify-center sticky top-0 pt-14 lg:pt-0"
      style={{
        // Kartlar arası dikey mesafe (Top ofset)
        top: `calc(5vh + ${i * 25}px)`,
        marginBottom: "-5vh", // Daha sıkı bir dizilim için mobilde azaltıldı
      }}
    >
      <motion.div
        style={{
          scale,
          // Kart yukarı çıkarken biraz şeffaflaşsın istersen açabilirsin:
          // opacity: useTransform(progress, range, [1, 0.5]), 
        }}
        className="relative flex flex-col h-[450px] w-full max-w-xl rounded-3xl border border-gray-200 bg-white shadow-2xl p-8 origin-top"
      >
        {/* Numara Alanı */}
        <div className="absolute top-0 left-0 bg-red-50 px-6 py-4 rounded-br-3xl border-b border-r border-red-100">
          <span className="text-3xl font-bold text-red-600">
            0{step.number}
          </span>
        </div>

        <div className="mt-12 flex flex-col justify-center h-full px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {step.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSection({ lang, dict }: ProcessSectionProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (!dict) return null;

  const steps = [
    dict.steps.s1,
    dict.steps.s2,
    dict.steps.s3,
    dict.steps.s4,
    dict.steps.s5,
  ];

  return (
    // mt-32 vb. yerine padding kullanarak scroll alanı yaratıyoruz
    <section ref={container} className="bg-gray-50 relative pt-12 md:pt-24 pb-24 md:pb-48">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ÖNEMLİ DÜZELTME: items-start kaldırıldı. 
            Böylece sol ve sağ kolon aynı yüksekliğe sahip olur, 
            bu da sticky elementin hareket edebileceği bir 'ray' (track) oluşturur. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 relative">

          {/* SOL KOLON - Sticky Başlık */}
          <div className="w-full h-full">
            {/* Sticky kapsayıcı */}
            <div className="lg:sticky lg:top-32 flex flex-col gap-4 md:gap-8 pr-0 md:pr-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-4 md:gap-8"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  {dict.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {dict.description}
                </p>

                <Link href={`/${lang}/contact`}>
                  <InteractiveHoverButton
                    className="bg-white text-black border-gray-200"
                    dotClassName="bg-crimson"
                  >
                    {dict.cta}
                  </InteractiveHoverButton>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* SAĞ KOLON - Kartlar */}
          <div className="w-full relative">
            {steps.map((step: any, i: number) => {
              // Animasyonun başlayacağı ve biteceği aralıkları daha hassas ayarladık
              const targetScale = 1 - (steps.length - i - 1) * 0.05;

              // range hesabı: her kartın animasyonu scroll'un belli bir yüzdesinde tetiklenir
              const rangeStart = i * (1 / steps.length);
              const rangeEnd = 1;

              return (
                <Card
                  key={i}
                  i={i}
                  step={step}
                  progress={scrollYProgress}
                  range={[rangeStart, rangeEnd]}
                  targetScale={targetScale}
                  totalSteps={steps.length}
                />
              );
            })}
          </div>

        </div>
      </div>
      {/* Scroll mesafesi için alt kısma ekstra boşluk bırakmamız gerekebilir, 
        padding-bottom (pb-48) bunu hallediyor ama gerekirse buraya spacer eklenebilir.
      */}
    </section>
  );
}
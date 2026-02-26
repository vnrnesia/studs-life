"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import girlImg from "@/assets/girl.webp";
interface ServicesHeroProps {
  dict: any;
}
export default function ServicesHero({ dict }: ServicesHeroProps) {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center bg-[#06182E] overflow-hidden pt-24 lg:pt-32">
      {}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[800px] h-full lg:h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-10 lg:py-0">
          {}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col justify-between h-auto lg:h-full lg:py-32 space-y-6 lg:space-y-0 text-center lg:text-left"
          >
            <div>
              <h2 className="text-white font-bold text-xs md:text-sm leading-tight tracking-wide uppercase mb-4 md:mb-6">
                {dict.companyTitle}
              </h2>
              <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                {dict.companyDescription}
              </p>
            </div>
            <div className="mt-auto hidden lg:block">
              <p className="text-white/40 text-[10px] md:text-xs leading-relaxed max-w-xs font-medium">
                {dict.officialReps}
              </p>
            </div>
          </motion.div>
          {}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-4 flex justify-center items-center pointer-events-none order-first lg:order-none"
          >
            <div className="relative w-full max-w-[280px] md:max-w-[380px] lg:max-w-[420px] aspect-square lg:h-[75vh] flex items-center justify-center">
              <Image
                src={girlImg}
                alt="Student Success"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
          {}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4 flex flex-col justify-center lg:items-end space-y-6 md:space-y-10"
          >
            {}
            <div className="text-center lg:text-right">
              <h1 className="flex flex-col text-4xl md:text-6xl lg:text-[6.5rem] font-extrabold lg:font-black leading-[0.85] tracking-tighter uppercase">
                <span className="text-crimson block">{dict.mainHeading.part1}</span>
                <span className="text-crimson block translate-x-4 lg:translate-x-0">{dict.mainHeading.part2}</span>
                <span className="text-white block translate-x-8 lg:translate-x-0">{dict.mainHeading.part3}</span>
              </h1>
            </div>
            {}
            <ul className="space-y-2 md:space-y-3 lg:text-right px-4 lg:px-0">
              {dict.services.map((service: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start lg:flex-row-reverse gap-3 text-white/80 text-[10px] md:text-xs lg:text-sm font-medium"
                >
                  <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <span className="leading-tight">{service}</span>
                </motion.li>
              ))}
            </ul>
            <div className="lg:hidden text-center pt-6">
              <p className="text-white/40 text-[9px] leading-relaxed max-w-xs mx-auto font-medium italic">
                {dict.officialReps}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}

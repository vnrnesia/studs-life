"use client";

import TornPaper from "./TornPaper";
import Image from "next/image";
import { motion } from "framer-motion";

interface CountriesProps {
  lang: string;
  dict: any;
}

const countriesList = [
  { key: "russia", img: "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1000&auto=format&fit=crop" },
  { key: "china", img: "https://images.unsplash.com/photo-1547981609-4b6bfe95e300?q=80&w=1000&auto=format&fit=crop" },
  { key: "turkey", img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1000&auto=format&fit=crop" },
  { key: "cyprus", img: "https://images.unsplash.com/photo-1528659560411-eb652bb2d3a3?q=80&w=1000&auto=format&fit=crop" },
  { key: "belarus", img: "https://images.unsplash.com/photo-1622312634351-1e9444f6f1c7?q=80&w=1000&auto=format&fit=crop" },
];

export default function Countries({ lang, dict }: CountriesProps) {
  return (
    <section className="relative py-32 bg-gray-50 overflow-hidden">
      <TornPaper position="top" className="rotate-180 -top-1" color="white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-gray-900">
          {dict.title}
        </h2>
      </div>

      <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar">
        <div className="flex gap-6 px-4 sm:px-6 lg:px-8 min-w-max">
          {countriesList.map((country) => (
            <motion.div
              key={country.key}
              className="relative w-[300px] h-[400px] md:w-[350px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={country.img}
                alt={dict[country.key]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-crimson font-bold text-sm tracking-widest uppercase mb-2 block">Study in</span>
                <h3 className="text-3xl font-black text-white uppercase font-montserrat">{dict[country.key]}</h3>
                <div className="mt-4 w-full h-[2px] bg-white/20 group-hover:bg-crimson transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <TornPaper position="bottom" color="white" />
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";


interface DestinationsHubProps {
  dict: any;
}

export default function DestinationsHub({ dict }: DestinationsHubProps) {
  return (
    <section className="relative py-24 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>

        {/* Horizontal Scroll / Grid */}
        <div className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:overflow-visible">
          {dict.cities.map((city: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative min-w-[300px] h-[400px] rounded-2xl overflow-hidden group snap-center cursor-pointer border border-white/10 hover:border-crimson/50 transition-colors"
            >
              <Image
                src={city.img}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-2 mb-2 text-crimson font-bold text-sm tracking-wider uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>{city.country}</span>
                </div>
                <h3 className="text-3xl font-black font-montserrat mb-2">{city.name}</h3>
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs text-gray-300">{city.majors}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      

    </section>
  );
}

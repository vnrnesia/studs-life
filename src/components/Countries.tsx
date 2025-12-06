"use client";

import TornPaper from "./TornPaper";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  { key: "bulgaria", img: "https://images.unsplash.com/photo-1565439931720-z94336c25736?q=80&w=1000&auto=format&fit=crop" },
];

export default function Countries({ lang, dict }: CountriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative py-32 bg-gray-50 overflow-hidden">
      <TornPaper position="top" className="rotate-180 -top-1" color="white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-gray-900">
          {dict.title}
        </h2>
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-crimson hover:border-crimson hover:text-white transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-crimson hover:border-crimson hover:text-white transition-all"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-6 px-4 sm:px-6 lg:px-8 min-w-max select-none">
          {countriesList.map((country) => (
            <motion.div
              key={country.key}
              className="relative w-[300px] h-[400px] md:w-[350px] md:h-[500px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={country.img}
                alt={dict[country.key]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
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

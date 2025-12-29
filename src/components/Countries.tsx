"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Globe, ArrowLeft, ArrowRight } from "lucide-react";

interface CountryData {
  name: string;
  slogan: string;
  description: string;
  tags: string[];
}

interface CountriesProps {
  lang: string;
  dict: {
    title: string;
    description: string;
    viewMore: string;
    russia: CountryData;
    china: CountryData;
    turkey: CountryData;
    cyprus: CountryData;
    belarus: CountryData;
    bulgaria: CountryData;
  };
}

import russiaImg from "../assets/images/russia.png";
import chinaImg from "../assets/images/china.png";
import turkeyImg from "../assets/images/turkey.png";
import cyprusImg from "../assets/images/cyprus.png";
import belarusImg from "../assets/images/belarus.png";
import bulgariaImg from "../assets/images/bulgaria.png";

const countriesList = [
  { key: "china", img: chinaImg },
  { key: "russia", img: russiaImg },
  { key: "turkey", img: turkeyImg },
  { key: "cyprus", img: cyprusImg },
  { key: "belarus", img: belarusImg },
  { key: "bulgaria", img: bulgariaImg },
];

export default function Countries({ lang, dict }: CountriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize scroll to the second card (index 1)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 900 + 32; // card width + gap
      scrollContainerRef.current.scrollLeft = cardWidth * 0.8; // Approximate position for partial 1st card visibility
      setActiveIndex(1);
    }
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current && !isDragging) {
      const { scrollLeft } = scrollContainerRef.current;
      const cardWidth = 900 + 32;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 900 + 32;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    // Disable snapping during drag to prevent "shift"
    scrollContainerRef.current.style.scrollSnapType = 'none';
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (isDragging && scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
      setIsDragging(false);
      // Update active index after snapping back
      setTimeout(() => {
        handleScroll();
      }, 100);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="relative py-16 bg-[#F8F9FA] text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 text-center md:text-left">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat tracking-tight mb-4">
              {dict.title}
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium">
              {dict.description}
            </p>
          </div>
          
          <button className="group flex items-center gap-4 px-8 py-4 bg-gray-50 border border-gray-200 rounded-full hover:border-gray-900 transition-all duration-300 shadow-sm whitespace-nowrap">
            <span className="font-bold text-sm tracking-tight">Form doldura git</span>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-[-45deg]">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-8 px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2))] min-w-max select-none">
          {countriesList.map((country, index) => {
            const countryData = dict[country.key as keyof typeof dict] as CountryData;
            return (
              <motion.div
                key={country.key}
                initial={{ opacity: 0, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row w-[350px] md:w-[900px] h-[480px] md:h-[420px] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Content Left */}
                <div className="flex-[1.2] p-8 md:p-10 flex flex-col justify-between bg-white z-10">
                  <div>
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-crimson group-hover:text-white transition-colors duration-300">
                      <Globe className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-crimson transition-colors font-montserrat tracking-tight">
                      {countryData.name}
                    </h3>
                    
                    <p className="text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed text-sm md:text-base mb-6">
                      {countryData.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {countryData.tags?.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[11px] font-bold tracking-widest uppercase px-4 py-2 bg-gray-50 text-gray-400 rounded-full border border-gray-100 group-hover:border-crimson/20 group-hover:bg-crimson/5 group-hover:text-crimson transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button className="flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-xl hover:bg-crimson/90 transition-all font-bold tracking-tight shadow-md shadow-crimson/20">
                      <span className="text-sm">{dict.viewMore}</span>
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Image Right */}
                <div className="flex-1 relative h-full overflow-hidden">
                  <Image
                    src={country.img}
                    alt={countryData.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {countriesList.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-8 bg-crimson" : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

import { MoveRight } from "lucide-react";
import Image from "next/image";
import mainBg from "../assets/herobg.png";
import mainBgMobile from "../assets/mainbg_mobile.png"; 

interface HeroProps {
  lang: string;
  dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative w-full h-screen md:min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* Background Images - Desktop and Mobile */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        <Image 
          src={mainBg}
          alt="Background" 
          fill
          className="hidden md:block object-cover"
          priority
          quality={100}
          unoptimized
        />
        {/* Mobile Background */}
        <Image 
          src={mainBgMobile}
          alt="Background Mobile" 
          fill
          className="block md:hidden object-cover"
          priority
          quality={100}
          unoptimized
        />
      </div>

      {/* =========================================
          ÖN PLAN İÇERİĞİ (TEXT & RESİM)
          ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-4 md:gap-8 md:items-center pt-10 md:pt-0 h-full py-6 sm:py-8 md:py-0">
        
        {/* --- SOL KOLON: YAZILAR --- */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center md:text-left">
          
          {/* Est. Badge */}
          <div className="inline-block px-3 py-1 sm:px-4 border border-white/40 rounded-full bg-white/10 backdrop-blur-sm shadow-sm">
            <span className="text-white font-serif italic tracking-wider text-xs sm:text-sm">Est. 2015</span>
          </div>
          
          {/* Ana Başlık */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-montserrat text-white leading-[1.1] uppercase drop-shadow-md px-2 sm:px-0">
            {dict.title}
          </h1>
          
          {/* Alt Başlık */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 tracking-wide px-2 sm:px-0">
            {dict.subtitle}
          </h2>
          
          {/* Açıklama */}
          <p className="text-base sm:text-lg text-gray-100 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed opacity-90 px-4 sm:px-0">
            {dict.description}
          </p>

          {/* Buton */}
          <div className="flex justify-center md:justify-start pt-2 sm:pt-4">
             <a href="#quick-form" className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 text-crimson font-bold tracking-widest uppercase overflow-hidden hover:text-white hover:bg-red-700 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 text-sm sm:text-base">
               <span className="relative z-10 flex items-center gap-2">
                 {dict.cta} <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
               </span>
             </a>
          </div>
        </div>

        {/* --- SAĞ KOLON: BOŞ ALAN (Mobilde gizli) --- */}
        <div className="hidden md:block relative h-[450px] md:h-[550px] lg:h-[650px] w-full">
          {/* Boş alan - arka plan görseli için */}
        </div>

      </div>
    </section>
  );
}
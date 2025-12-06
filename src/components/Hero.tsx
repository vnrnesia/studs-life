import TornPaper from "./TornPaper";
import { MoveRight } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  lang: string;
  dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 bg-gray-50 overflow-hidden">
      {/* Background Elements if needed */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-[#e5e7eb]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center py-12 md:py-0">
        
        {/* Text Content */}
        <div className="space-y-8 z-10 text-center md:text-left">
          <div className="inline-block px-4 py-1 border border-crimson/50 rounded-full bg-crimson/10">
            <span className="text-crimson font-serif italic tracking-wider text-sm">Est. 2015</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-montserrat text-gray-900 leading-tight uppercase">
            {dict.title.split(",").map((part: string, i: number) => (
               <span key={i} className="block">{part.trim()}{i !== dict.title.split(",").length - 1 && ","}</span>
            ))}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-lg mx-auto md:mx-0">
            {dict.subtitle}
          </p>

          <div className="flex justify-center md:justify-start">
             <a href="#quick-form" className="group relative px-8 py-4 bg-crimson text-white font-bold tracking-widest uppercase overflow-hidden hover:bg-red-700 transition-all shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1">
               <span className="relative z-10 flex items-center gap-2">
                 {dict.cta} <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
             </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative h-[400px] md:h-[600px] w-full z-10">
            <div className="absolute inset-0 bg-crimson/20 rounded-full blur-[100px] transform translate-x-10 -translate-y-10" />
            <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-gray-200 shadow-2xl skew-y-3 md:skew-y-0 md:-rotate-3 hover:rotate-0 transition-transform duration-500">
               <Image 
                 src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
                 alt="Student looking up" 
                 fill
                 className="object-cover"
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-50/80 to-transparent" />
            </div>
        </div>

      </div>

      <TornPaper position="bottom" color="white" />
    </section>
  );
}

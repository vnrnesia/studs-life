import { MoveRight } from "lucide-react";
import Image from "next/image";


interface ServicesHeroProps {
  dict: any;
}

export default function ServicesHero({ dict }: ServicesHeroProps) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center pt-20 bg-gray-50 overflow-hidden">
      {/* Background with gray-50 */}
      <div className="absolute inset-0 bg-gray-50" />
      
      {/* Torn Paper Divider - Top (Optional if needed to transition from another section) */}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center py-12">
        {/* Text Content */}
        <div className="space-y-8 z-10 text-center md:text-left text-gray-900">
          <h1 className="text-4xl md:text-5xl font-black font-montserrat leading-tight uppercase">
            {dict.title}
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

        {/* Image Content - Composite Visual */}
        <div className="relative h-[400px] md:h-[600px] w-full z-10 flex items-center justify-center">
             <div className="absolute inset-0 bg-crimson/10 rounded-full blur-[100px]" />
             {/* Note: In a real scenario, this would be a composite image. Using a placeholder for now. */}
             <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl rotate-3">
               <Image 
                 src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" 
                 alt="Student Journey" 
                 fill
                 className="object-cover opacity-80"
                  priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-transparent to-transparent" />
             </div>
        </div>
      </div>


    </section>
  );
}

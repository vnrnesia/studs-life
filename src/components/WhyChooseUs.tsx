
import React from 'react';
import Image from 'next/image';
import whyUsStudent from '@/assets/whyus_student.png';

interface WhyChooseUsProps {
  lang: string;
  dict: any;
}

export default function WhyChooseUs({ lang, dict }: WhyChooseUsProps) {
  // Sol alttaki maddeler (Left Features)
  const leftFeatures: string[] = dict.leftFeatures || [];

  // Sağ taraftaki maddeler (Right Features)
  const rightFeatures: string[] = dict.rightFeatures || [];

  return (
    <section className="relative w-full min-h-screen bg-[#061832] text-white overflow-hidden flex items-center py-12 px-4 md:px-8">
      
      {/* Arka Plan Dekoratif Yazısı */}
      <div className="absolute bottom-[-5%] left-0 w-full select-none pointer-events-none opacity-5">
        <span className="text-[15vw] font-black uppercase tracking-widest text-white leading-none">
          {dict.decoration}
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* --- SOL KOLON (Başlık ve Sol Alt Liste) --- */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          
          {/* Ana Başlık */}
          <div className="mb-10 lg:mb-0 relative">
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
        </div>

        {/* --- ORTA KOLON (Görsel Alanı) --- */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[400px] md:min-h-[600px]">
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Görsel Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center z-0 rounded-xl overflow-hidden">
                {/* Fallback image if no specific image provided */}
               <Image 
                 src={whyUsStudent} 
                 alt="Why Choose Us" 
                 fill
                 className="object-contain mix-blend-overlay"
                 placeholder="blur"
               />
               <div className="absolute inset-0 mix-blend-multiply"></div>
            </div>

            {/* "7 Neden" Etiketi */}
            <div className="absolute top-[20%] right-[5%] z-20">
                <div className="relative bg-white text-[#061832] font-bold py-1 px-8 shadow-lg transform rotate-[-90deg] origin-bottom-right translate-x-8">
                    <span className="text-lg tracking-widest uppercase whitespace-nowrap">{dict.badge}</span>
                    <div className="absolute top-0 right-full h-full w-4 bg-white/0" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'}}></div>
                </div>
               
            </div>

          </div>
        </div>

        {/* --- SAĞ KOLON (Liste) --- */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-8 py-4 lg:pl-8">
          {rightFeatures.map((item, idx) => (
            <FeatureItem key={idx} text={item} />
          ))}
          
          {/* Mobilde Sol Alt Listeyi de buraya ekliyoruz */}
          <div className="lg:hidden flex flex-col gap-8 pt-4 border-t border-white/10">
            {leftFeatures.map((item, idx) => (
              <FeatureItem key={`mobile-${idx}`} text={item} />
            ))}
          </div>
        </div>

      </div>
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

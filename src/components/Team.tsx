import TornPaper from "./TornPaper";
import { Star } from "lucide-react";

interface TeamProps {
  lang: string;
  dict: any;
}

export default function Team({ lang, dict }: TeamProps) {
  const team = [1, 2, 3]; // Placeholders
  const testimonials = [1, 2, 3]; // Placeholders

  return (
    <section className="relative py-32 bg-gray-50 text-gray-900 overflow-hidden">
      <TornPaper position="top" className="rotate-180 -top-1" color="white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Section */}
        <div className="mb-32">
          <h2 className="text-center text-4xl font-black uppercase font-montserrat mb-16">
            {dict.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {team.map((member) => (
              <div key={member} className="group relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-crimson relative z-10 transform group-hover:scale-110 transition-transform shadow-lg">
                   <img src={`https://i.pravatar.cc/300?img=${member + 10}`} alt="Team Member" className="w-full h-full object-cover" />
                </div>
                {/* Background decorative torn effect behind avatar could be complex, simplifying to just avatars for now */}
                <div className="text-center mt-6">
                   <h3 className="text-xl font-bold uppercase">John Doe</h3>
                   <p className="text-crimson font-serif italic">Senior Consultant</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
           <h2 className="text-center text-4xl font-black uppercase font-montserrat mb-16">
            {dict.testimonials_title}
          </h2>
           <div className="grid md:grid-cols-3 gap-8">
             {testimonials.map((t) => (
               <div key={t} className="bg-white p-8 rounded-2xl border border-gray-200 relative shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                 </div>
                 <p className="text-gray-600 italic mb-6">"Studs Life helped me get into my dream university in Prague. The process was so smooth!"</p>
                 <div className="flex items-center gap-4">
                    <img src={`https://i.pravatar.cc/100?img=${t + 20}`} alt="Student" className="w-10 h-10 rounded-full" />
                    <div>
                       <div className="font-bold text-sm">Alexander B.</div>
                       <div className="text-xs text-gray-500">Studying in Czech Rep.</div>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
      
      {/* No bottom torn paper needed as next section is Form (bg-gray-50) */}
    </section>
  );
}

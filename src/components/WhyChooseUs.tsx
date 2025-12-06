import { ShieldCheck, Headphones, Globe2, Users } from "lucide-react";

interface WhyChooseUsProps {
  lang: string;
  dict: any;
}

export default function WhyChooseUs({ lang, dict }: WhyChooseUsProps) {
  const items = [
    { key: "trust", icon: ShieldCheck, number: "01" },
    { key: "support", icon: Headphones, number: "02" },
    { key: "global", icon: Globe2, number: "03" },
    { key: "team", icon: Users, number: "04" },
  ];

  return (
    <section id="why-us" className="relative py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Grid or Single Image */}
          <div className="relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-xl w-full h-48 object-cover" alt="" />
                   <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-xl w-full h-64 object-cover" alt="" />
                </div>
                <div className="space-y-4">
                   <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-xl w-full h-64 object-cover" alt="" />
                   <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-xl w-full h-48 object-cover" alt="" />
                </div>
             </div>
             {/* Decorative element */}
             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-crimson/5 rounded-full blur-3xl"></div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="text-crimson font-bold tracking-widest uppercase mb-2 block">The Best Choice</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase font-montserrat text-gray-900 mb-12">
              {dict.title}
            </h2>

            <div className="space-y-10">
              {items.map((item) => (
                <div key={item.key} className="flex gap-6 group">
                  <span className="text-6xl font-black text-gray-200 font-montserrat group-hover:text-crimson/20 transition-colors">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 uppercase mb-2 flex items-center gap-3">
                      {dict[item.key].header}
                    </h3>
                    <p className="text-gray-600">
                      {dict[item.key].desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

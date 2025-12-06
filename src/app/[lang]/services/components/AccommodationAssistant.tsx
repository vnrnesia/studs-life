"use client";

import { motion } from "framer-motion";

import { Bed, Users, Key } from "lucide-react";

interface AccommodationAssistantProps {
  dict: any;
}

export default function AccommodationAssistant({ dict }: AccommodationAssistantProps) {
  const options = [
    { key: "dorms", icon: Users, color: "bg-blue-500" },
    { key: "shared", icon: Users, color: "bg-purple-500" }, // Re-using Users for shared or can use other logic
    { key: "private", icon: Key, color: "bg-crimson" },
  ];

  return (
    <section className="relative py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-[#0B1E3D]">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => {
            const data = dict[option.key];
            const Icon = option.icon;
            if (option.key === "shared") {
                 // specific icon adjustment if needed, or just let it be
            }
            
            return (
              <motion.div
                key={option.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative circle */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 ${option.color}`} />
                
                <div className={`w-16 h-16 rounded-2xl ${option.color} flex items-center justify-center mb-6 shadow-md text-white`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold mb-2 font-montserrat text-[#0B1E3D]">{data.title}</h3>
                <div className="text-3xl font-black text-crimson mb-4">{data.price}</div>
                <p className="text-gray-600 leading-relaxed">
                  {data.desc}
                </p>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="text-sm font-bold uppercase tracking-wider text-[#0B1E3D] group-hover:text-crimson transition-colors flex items-center gap-2">
                        View Options <span className="text-lg">→</span>
                    </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

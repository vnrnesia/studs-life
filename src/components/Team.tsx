"use client";

import { Star, X, Phone, Mail, MapPin, Globe, ArrowRight, UserPlus } from "lucide-react";
import { TeamMember, getStrapiImageUrl } from "@/lib/strapi";
import { useState } from "react";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface TeamProps {
  lang: string;
  dict: any;
  teamMembers: TeamMember[];
  showViewAll?: boolean;
}

export default function Team({ lang, dict, teamMembers, showViewAll = false }: TeamProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Helper to safely parse markdown
  const parseMarkdown = (content?: string) => {
    if (!content) return { __html: "" };
    return { __html: marked.parse(content) as string };
  };

  // On home page, show max 6 members to fit the 8-card grid (1 info + 6 members + 1 join)
  const displayMembers = showViewAll ? teamMembers.slice(0, 6) : teamMembers;

  return (
    <section className="relative pt-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Our Team Static Info */}
          <div className="bg-[#0A2647] rounded-[2rem] p-10 flex flex-col justify-start border border-white/10 h-[450px] text-white">
            <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-wider uppercase text-white/50 mb-4 w-fit">
              {dict.badge || "Our Team"}
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
              {dict.title || "The Experts Behind Us"}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mt-auto">
              {dict.description || "Dedicated individuals passionate about holistic well-being. Meet the diverse team driving innovation and shaping the future of wellness."}
            </p>
          </div>

          {/* Cards 2-7: Team Members */}
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onClick={() => setSelectedMember(member)}
              className="group relative cursor-pointer h-[450px] rounded-[2rem] overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {member.photo ? (
                <Image
                  src={getStrapiImageUrl(member.photo.url)}
                  alt={member.fullName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-200">
                  👤
                </div>
              )}
              
              {/* Glassmorphism Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">
                    {member.fullName}
                  </h3>
                  <p className="text-white/80 text-xs mt-1 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Card 8: Join the Team CTA */}
          <div className="bg-[#5D0E0E] rounded-[2rem] p-10 flex flex-col justify-between text-white h-[450px] relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold font-montserrat tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: dict.cta_card_title || "Meet Our<br />Whole Team" }} />
              <p className="text-white/80 text-xs leading-relaxed max-w-[80%]">
                {dict.cta_card_desc || "Explore the full directory of our dedicated professionals."}
              </p>
            </div>
            
            <Link 
              href={`/${lang}/teams`}
              className="relative z-10 bg-white text-[#0A2647] w-full py-4 rounded-full font-bold text-center hover:bg-white/90 transition-colors mt-auto"
            >
              {dict.cta_card_button || "View All Team"}
            </Link>

            {/* Subtle decorative element */}
            <UserPlus className="absolute -top-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
          </div>

        </div>

        {showViewAll && teamMembers.length > 6 && (
          <div className="text-center mt-16">
            <Link href={`/${lang}/teams`}>
            <InteractiveHoverButton 
              className="bg-white text-black border-gray-200"
              dotClassName="bg-crimson"
            >
              {lang === 'ru' ? 'Посмотреть всю команду' : 'View All Team'}
            </InteractiveHoverButton>
            </Link>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" 
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Photo Side */}
              <div className="w-full md:w-2/5 relative h-[300px] md:h-auto overflow-hidden">
                {selectedMember.photo ? (
                    <Image 
                      src={getStrapiImageUrl(selectedMember.photo.url)} 
                      alt={selectedMember.fullName} 
                      fill
                      className="object-cover"
                      unoptimized
                    />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-200">👤</div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                 <div className="absolute bottom-8 left-8 text-white md:hidden">
                    <h3 className="text-3xl font-bold uppercase mb-1 tracking-tight">{selectedMember.fullName}</h3>
                    <p className="text-white/90 italic font-serif">{selectedMember.role}</p>
                 </div>
              </div>

              {/* Info Side */}
              <div className="w-full md:w-3/5 p-8 md:p-14 overflow-y-auto">
                 <div className="hidden md:block mb-8">
                    <h3 className="text-4xl font-bold uppercase mb-2 tracking-tight text-gray-900">{selectedMember.fullName}</h3>
                    <p className="text-crimson font-serif italic text-xl">{selectedMember.role}</p>
                    <div className="flex items-center gap-2 text-gray-400 mt-2 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedMember.city}</span>
                    </div>
                 </div>
                 
                 <div className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {selectedMember.phone && (
                        <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-crimson group-hover:text-white transition-colors">
                            <Phone className="w-5 h-5" />
                          </div>
                          <span className="text-gray-600 font-medium">{selectedMember.phone}</span>
                        </div>
                      )}
                      {selectedMember.email && (
                        <div className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-crimson group-hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <span className="text-gray-600 font-medium break-all">{selectedMember.email}</span>
                        </div>
                      )}
                    </div>
                    {selectedMember.languages && (
                      <div className="flex items-center gap-4 group">
                         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-crimson group-hover:text-white transition-colors">
                            <Globe className="w-5 h-5" />
                         </div>
                         <span className="text-gray-600 font-medium">{selectedMember.languages}</span>
                      </div>
                    )}
                 </div>

                 <div className="prose prose-sm max-w-none">
                    <h4 className="text-lg font-bold border-b border-gray-100 pb-3 mb-4 text-gray-900">
                      {lang === 'ru' ? 'Как я могу вам помочь:' : 'Expertise & Help:'}
                    </h4>
                    <div 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={parseMarkdown(selectedMember.responsibilities)} 
                    />
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

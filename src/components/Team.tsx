"use client";

import { Star, X, Phone, Mail, MapPin, Calendar, Globe, ArrowRight } from "lucide-react";
import { TeamMember, getStrapiImageUrl } from "@/lib/strapi";
import { useState } from "react";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";

interface TeamProps {
  lang: string;
  dict: any;
  teamMembers: TeamMember[];
  showViewAll?: boolean;
}

export default function Team({ lang, dict, teamMembers, showViewAll = false }: TeamProps) {
  const testimonials = [1, 2, 3]; // Keeping testimonials static for now as requested only for team
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Helper to safely parse markdown
  const parseMarkdown = (content?: string) => {
    if (!content) return { __html: '' };
    return { __html: marked.parse(content) as string };
  };

  return (
    <section className="relative py-32 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Section */}
        <div className="mb-32">
          <h2 className="text-center text-4xl font-black uppercase font-montserrat mb-16">
            {dict.title}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12">
            {teamMembers.map((member) => (
              <button 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                className="group relative flex flex-col items-center text-center focus:outline-none bg-gray-100 p-8 rounded-2xl hover:bg-gray-300  transition-colors duration-300 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-crimson relative z-10 transform group-hover:scale-110 transition-transform shadow-lg bg-gray-200 mb-4">
                   {member.photo ? (
                      <Image 
                        src={getStrapiImageUrl(member.photo.url)} 
                        alt={member.fullName} 
                        fill
                        className="object-cover"
                        unoptimized
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-300">
                        👤
                      </div>
                   )}
                </div>
                <div className="mt-6">
                   <h3 className="text-xl font-bold uppercase">{member.fullName}</h3>
                   <p className="text-crimson font-serif italic">{member.role}</p>
                   <p className="text-sm text-gray-500 mt-1">{member.city}</p>
                </div>
              </button>
            ))}
          </div>
          
          {showViewAll && (
            <div className="text-center mt-12">
              <Link 
                href={`/${lang}/teams`}
                className="inline-flex items-center gap-2 bg-crimson text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
              >
                {lang === 'ru' ? 'Посмотреть всю команду' : 'View All Team'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedMember(null)}>
            <div 
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Photo Side */}
              <div className="w-full md:w-1/3 bg-gray-100 p-8 flex flex-col items-center text-center md:border-r border-gray-200">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-crimson shadow-lg mb-6 relative">
                  {selectedMember.photo ? (
                      <Image 
                        src={getStrapiImageUrl(selectedMember.photo.url)} 
                        alt={selectedMember.fullName} 
                        fill
                        className="object-cover"
                        unoptimized
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gray-300">👤</div>
                   )}
                </div>
                <h3 className="text-2xl font-bold uppercase mb-2">{selectedMember.fullName}</h3>
                <p className="text-crimson font-serif italic text-lg mb-6">{selectedMember.role}</p>
                
                <div className="space-y-4 w-full text-left text-sm">
                   {selectedMember.phone && (
                     <div className="flex items-center gap-3">
                       <Phone className="w-4 h-4 text-crimson shrink-0" />
                       <span>{selectedMember.phone}</span>
                     </div>
                   )}
                   {selectedMember.email && (
                     <div className="flex items-center gap-3">
                       <Mail className="w-4 h-4 text-crimson shrink-0" />
                       <span className="break-all">{selectedMember.email}</span>
                     </div>
                   )}
                   {selectedMember.officeAddress && (
                     <div className="flex items-start gap-3">
                       <MapPin className="w-4 h-4 text-crimson shrink-0 mt-1" />
                       <span>{selectedMember.officeAddress}</span>
                     </div>
                   )}
                   {selectedMember.languages && (
                     <div className="flex items-start gap-3">
                       <Globe className="w-4 h-4 text-crimson shrink-0 mt-1" />
                       <span>{selectedMember.languages}</span>
                     </div>
                   )}
                </div>
              </div>

              {/* Info Side */}
              <div className="w-full md:w-2/3 p-8">
                 <div className="prose prose-sm max-w-none text-black prose-headings:text-black prose-p:text-black prose-strong:text-black">
                    <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                      {lang === 'ru' ? 'Как я могу вам помочь:' : 'How I can help you:'}
                    </h3>
                    {selectedMember.responsibilities && (
                      <div dangerouslySetInnerHTML={parseMarkdown(selectedMember.responsibilities)} />
                    )}
                 </div>
              </div>
            </div>
          </div>
        )}

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
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                         <Image src={`https://i.pravatar.cc/100?img=${t + 20}`} alt="Student" fill className="object-cover" unoptimized />
                    </div>
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
    </section>
  );
}

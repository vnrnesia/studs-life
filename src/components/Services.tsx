import { 
  FileText, 
  GraduationCap, 
  Languages, 
  Briefcase, 
  Plane, 
  Ticket,
  Check,
  Star,
  ArrowUpRight,
  CreditCard,
  MessageCircle,
  Shield,
  Zap,
  Users,
  Home,
  CheckCircle2
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import StudentFlyingImg from "@/assets/student-flying.webp";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ServicesProps {
  lang: string;
  dict: any;
}

export default function Services({ lang, dict }: ServicesProps) {
  // Ordered to match the specific grid flow:
  // Row 1: [Wide Card (2)] [Square Card (1)] [Tall Card (1 row-span-2)]
  // Row 2: [Square Card (1)] [Square Card (1)] [Square Card (1)] ... wait, Tall card takes the 4th slot of row 2 too.
  // Correct Flow for 4-col grid:
  // 1. Ticket (span-2)
  // 2. Work (span-1)
  // 3. Visa (span-1 row-span-2) -> Becomes right column
  // 4. University (span-1) -> Wrap to row 2
  // 5. Umra (span-1) -> Wrap to row 2
  // 6. Translation (span-1) -> Wrap to row 2
  
  const services = [
    {
      key: "ticket", 
      icon: Ticket,
      className: "md:col-span-2 bg-white",
      type: "flight-ticket",
      label: "Student Discounts"
    },
    { 
      key: "work", 
      icon: Briefcase,
      className: "md:col-span-1 bg-white",
      type: "career-stats",
      label: "Internships & Jobs"
    },
    {
      key: "visa", 
      icon: FileText,
      className: "md:col-span-1 md:row-span-2 bg-neutral-900 text-white",
      type: "feature-list",
      label: "99% Success Rate",
      features: ["Document checklist", "Application filing", "Consulate interview", "Biometrics booking", "Passport collection"]
    },
    { 
      key: "university", 
      icon: GraduationCap,
      className: "md:col-span-1 bg-white",
      type: "university-logos",
      label: "Top Global Universities"
    },
    { 
      key: "accommodation", 
      icon: Home,
      className: "md:col-span-1 relative overflow-hidden text-white min-h-[200px]",
      type: "image-card",
      label: "Dorms & Apartments"
    },
    { 
      key: "translation", 
      icon: Languages,
      className: "md:col-span-1 bg-white",
      type: "support-chat",
      label: "Certified & Fast"
    },
  ];

  const renderCardContent = (service: any) => {
    switch (service.type) {
      case "flight-ticket":
        return (
          <>
            {/* Image Container representing bottom 75% of the card */}
            <div className="absolute bottom-0 left-0 right-0 h-[75%] overflow-hidden rounded-b-[2rem]">
               <Image 
                 src={StudentFlyingImg} 
                 alt="Student Flying" 
                 fill 
                 className="object-cover object-top opacity-70 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out"
                 style={{
                   maskImage: 'linear-gradient(to bottom, transparent, black 15%)',
                   WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%)'
                 }}
               />
            </div>
          </>
        );

      case "credit-card":
        return (
          <div className="mt-8 flex justify-center">
            <div className="relative w-64 h-40 bg-neutral-900 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="w-10 h-7 bg-yellow-500/80 rounded-md mb-4" />
               <div className="text-gray-500 font-mono text-xs mb-1">#### #### #### 4242</div>
               <div className="absolute bottom-6 left-6 text-white font-mono text-sm tracking-wider">PREMIUM PLUS</div>
               <div className="absolute bottom-6 right-6">
                 <div className="w-4 h-4 bg-white/20 rounded-full" />
               </div>
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none" />
            </div>
          </div>
        );
      
      case "career-stats":
        return (
          <div className="mt-6 text-center">
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="p-2 bg-green-100 rounded-full text-green-600 shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-sm font-bold text-gray-700">Resume Building</span>
               </div>
               <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="p-2 bg-green-100 rounded-full text-green-600 shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                  <span className="text-sm font-bold text-gray-700">Job Placement</span>
               </div>
            </div>
          </div>
        );

      case "feature-list":
        return (
          <div className="mt-8">
            <ul className="space-y-4">
              {service.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center text-gray-300 text-sm">
                  <span className="mr-3 text-crimson">✦</span>
                  {feature}
                </li>
              ))}
            </ul>
            <InteractiveHoverButton className="mt-10 bg-white text-black border-white hover:bg-gray-200">
              Get started
            </InteractiveHoverButton>
          </div>
        );
      
      case "university-logos":
        return (
          <div className="mt-6 grid grid-cols-3 gap-3">
             <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-700"><GraduationCap className="w-5 h-5" /></div>
             <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-700"><Briefcase className="w-5 h-5" /></div>
             <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-700"><Languages className="w-5 h-5" /></div>
             <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-700"><Users className="w-5 h-5" /></div>
             <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-700"><FileText className="w-5 h-5" /></div>
             <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-700"><Globe className="w-5 h-5" /></div>
          </div>
        );
        
      case "image-card":
        return (
          <>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="text-xl font-bold text-white mb-1 shadow-sm">{dict['accommodation'] || "Accommodation"}</h4>
            </div>
          </>
        );

      case "support-chat":
        return (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                <Users className="w-4 h-4 text-gray-500" />
              </div>
              <div className="bg-gray-100 p-2 rounded-2xl rounded-tl-none text-xs text-gray-600">
                Hey there! 👋
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-neutral-900 text-white p-2 rounded-2xl rounded-tr-none text-xs ml-auto">
                How can I help?
              </div>
               <div className="w-8 h-8 rounded-full bg-crimson flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Mock icons for the tech stack just for visualization if actual logos aren't available
  const Globe = Languages;
  const Cpu = MessageCircle;
  const Layout = Briefcase;

  return (
    <section id="services" className="relative py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] md:text-xs font-bold tracking-wider uppercase text-gray-500 mb-4">
            {dict.badge || "Our Services"}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {dict.title}
          </h2>
          {dict.subtitle && (
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
              {dict.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(240px,auto)]">
          {services.map((service) => (
            <div 
              key={service.key}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-300 hover:shadow-xl border border-gray-100",
                service.className
              )}
            >
              {service.type !== "image-card" && (
                <div className="relative z-10 h-full flex flex-col">
                  <div>
                    <h3 className={cn(
                      "text-xl font-bold font-montserrat mb-2",
                      service.type === "feature-list" ? "text-white" : "text-gray-900"
                    )}>
                      {dict[service.key] || service.label}
                    </h3>
                    <p className={cn(
                      "text-sm font-medium",
                      service.type === "feature-list" ? "text-gray-400" : "text-gray-500"
                    )}>
                      {dict[service.key + 'Desc'] || service.label}
                    </p>
                  </div>
                  
                  <div className="flex-grow">
                    {service.type !== "flight-ticket" && renderCardContent(service)}
                  </div>
                </div>
              )}
              
              {(service.type === "image-card" || service.type === "flight-ticket") && renderCardContent(service)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

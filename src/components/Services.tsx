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
  Users
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
      type: "credit-card",
      label: "Cost-Effective plans"
    },
    { 
      key: "work", 
      icon: Briefcase,
      className: "md:col-span-1 bg-white",
      type: "reviews",
      label: "Client Reviews"
    },
    {
      key: "visa", 
      icon: FileText,
      className: "md:col-span-1 md:row-span-2 bg-neutral-900 text-white",
      type: "feature-list",
      label: "Strategic Solutions",
      features: ["Tailored strategy", "High-Quality output", "Timely delivery", "Transparent process", "Post-Launch support"]
    },
    { 
      key: "university", 
      icon: GraduationCap,
      className: "md:col-span-1 bg-white",
      type: "tech-stack",
      label: "Built with the best"
    },
    { 
      key: "umra", 
      icon: Plane,
      className: "md:col-span-1 relative overflow-hidden text-white min-h-[200px]",
      type: "image-card",
      label: "Reliable & Future-ready"
    },
    { 
      key: "translation", 
      icon: Languages,
      className: "md:col-span-1 bg-white",
      type: "support-chat",
      label: "24/7 Support"
    },
  ];

  const renderCardContent = (service: any) => {
    switch (service.type) {
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
      
      case "reviews":
        return (
          <div className="mt-6 text-center">
            <div className="flex justify-center -space-x-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden`}>
                   <Users className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-1">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-sm text-gray-500 font-medium">4.9/5.0 Rating</p>
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
            <button className="mt-10 px-6 py-3 bg-white text-black rounded-full text-sm font-bold flex items-center group-hover:bg-gray-200 transition-colors">
              Get started <ArrowUpRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        );
      
      case "tech-stack":
        return (
          <div className="mt-6 grid grid-cols-3 gap-3">
             {[FileText, Zap, Shield, Globe, Cpu, Layout].map((Icon, idx) => (
               <div key={idx} className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto hover:bg-black hover:text-white transition-colors duration-300">
                 <Icon className="w-5 h-5" />
               </div>
             ))}
          </div>
        );
        
      case "image-card":
        return (
          <>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="text-xl font-bold text-white mb-1 shadow-sm">Reliable & <br/>Future-ready</h4>
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
    <section id="services" className="relative py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-gray-900">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
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
                      {service.label}
                    </p>
                  </div>
                  
                  <div className="flex-grow">
                    {renderCardContent(service)}
                  </div>
                </div>
              )}
              
              {service.type === "image-card" && renderCardContent(service)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

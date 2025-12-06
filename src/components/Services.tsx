import { 
  FileText, 
  GraduationCap, 
  Languages, 
  Briefcase, 
  Plane, 
  Ticket 
} from "lucide-react";
import TornPaper from "./TornPaper";

interface ServicesProps {
  lang: string;
  dict: any;
}

export default function Services({ lang, dict }: ServicesProps) {
  const icons = {
    visa: FileText,
    university: GraduationCap,
    translation: Languages,
    work: Briefcase,
    umra: Plane,
    ticket: Ticket,
  };

  const services = [
    { key: "visa", icon: icons.visa },
    { key: "university", icon: icons.university },
    { key: "translation", icon: icons.translation },
    { key: "work", icon: icons.work },
    { key: "umra", icon: icons.umra },
    { key: "ticket", icon: icons.ticket },
  ];

  return (
    <section id="services" className="relative py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.key}
              className="group p-8 rounded-2xl bg-gray-50 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-crimson/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 mb-6 rounded-lg bg-gray-200 flex items-center justify-center border border-gray-300 group-hover:bg-crimson group-hover:border-crimson transition-colors">
                <service.icon className="w-7 h-7 text-gray-700 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat">{dict[service.key]}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

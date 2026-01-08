import {
  GraduationCap,
  FileText,
  Home,
  Plane,
  Languages,
  LifeBuoy
} from "lucide-react";


interface ServicesGridProps {
  dict: any;
}

export default function ServicesGrid({ dict }: ServicesGridProps) {
  const icons = {
    university: GraduationCap,
    visa: FileText,

    transport: Plane,
    translation: Languages,
    support: LifeBuoy,
  };

  const services = [
    { key: "university", icon: icons.university },
    { key: "visa", icon: icons.visa },

    { key: "transport", icon: icons.transport },
    { key: "translation", icon: icons.translation },
    { key: "support", icon: icons.support },
  ];

  return (
    <section className="relative py-24 bg-gray-50 text-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-montserrat tracking-wide text-[#0B1E3D]">
            {dict.title}
          </h2>
          <div className="mt-4 h-1 w-24 bg-crimson mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className="group p-8 rounded-2xl bg-white backdrop-blur-md border border-gray-200 hover:border-crimson hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-14 h-14 mb-6 rounded-lg bg-crimson/20 flex items-center justify-center border border-crimson/50 group-hover:bg-crimson group-hover:border-crimson transition-colors">
                <service.icon className="w-7 h-7 text-crimson group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat text-[#0B1E3D]">{dict[service.key].title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {dict[service.key].desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/20 rounded-full blur-[120px] pointer-events-none" />


    </section>
  );
}

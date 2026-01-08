"use client";

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
  CheckCircle2,
  Globe
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import StudentFlyingImg from "@/assets/student-flying.webp";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import ScrollReveal from "@/components/ui/ScrollReveal";

// New Background Images
import planeBg from "@/assets/our_services/flight_tickets_photo.png";
import universityBg from "@/assets/our_services/university.png";
import visaBg from "@/assets/our_services/visa.png";
import translationBg from "@/assets/our_services/translation.png";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ServicesProps {
  lang: string;
  dict: any;
}

export default function Services({ lang, dict }: ServicesProps) {
  const services = [
    {
      key: "ticket",
      icon: Ticket,
      className: "md:col-span-2 text-white overflow-hidden",
      type: "image-bg",
      label: "Student Discounts",
      bgImage: planeBg
    },
    {
      key: "university",
      icon: GraduationCap,
      className: "md:col-span-1 text-white overflow-hidden",
      type: "university-logos",
      label: "Top Global Universities",
      bgImage: universityBg
    },
    {
      key: "visa",
      icon: FileText,
      className: "md:col-span-1 md:row-span-2 text-white overflow-hidden",
      type: "feature-list",
      label: "99% Success Rate",
      features: dict.visaFeatures || ["Document checklist", "Application filing", "Consulate interview", "Biometrics booking", "Passport collection"],
      bgImage: visaBg
    },
    {
      key: "translation",
      icon: Languages,
      className: "md:col-span-3 text-white overflow-hidden",
      type: "support-chat",
      label: "Certified & Fast",
      bgImage: translationBg
    },
  ];

  const renderCardContent = (service: any) => {
    switch (service.type) {
      case "career-stats":
        return (
          <div className="mt-6 text-center">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="p-2 bg-green-500/20 rounded-full text-green-400 shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                <span className="text-sm font-bold text-white">{dict.careerStats?.resume || "Resume Building"}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <div className="p-2 bg-green-500/20 rounded-full text-green-400 shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                <span className="text-sm font-bold text-white">{dict.careerStats?.jobPlacement || "Job Placement"}</span>
              </div>
            </div>
          </div>
        );

      case "feature-list":
        return (
          <div className="h-full flex flex-col pt-16">
            <ul className="space-y-4">
              {service.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center text-gray-100 text-sm">
                  <span className="mr-3 text-crimson">✦</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-auto pb-24">
              <InteractiveHoverButton
                className="w-full bg-white text-black border-white"
                dotClassName="bg-crimson"
              >
                {dict.getStarted || "Get started"}
              </InteractiveHoverButton>
            </div>
          </div>
        );

      case "university-logos":
        return (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white"><GraduationCap className="w-5 h-5" /></div>
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white"><Briefcase className="w-5 h-5" /></div>
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white"><Languages className="w-5 h-5" /></div>
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white"><Users className="w-5 h-5" /></div>
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white"><FileText className="w-5 h-5" /></div>
            <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto text-white"><Globe className="w-5 h-5" /></div>
          </div>
        );

      case "support-chat":
        return (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                <Users className="w-4 h-4 text-gray-500" />
              </div>
              <div className="bg-gray-100 p-2 rounded-2xl rounded-tl-none text-xs text-gray-600">
                {dict.chat?.greeting || "Hey there! 👋"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-neutral-900 text-white p-2 rounded-2xl rounded-tr-none text-xs ml-auto">
                {dict.chat?.help || "How can I help?"}
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

  return (
    <section id="services" className="relative py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
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
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(240px,auto)]">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.key}
              direction="up"
              delay={index * 0.1}
              className={service.className}
            >
              <div
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] transition-all duration-300 hover:shadow-xl border border-gray-100 h-full w-full"
                )}
              >
                {/* Background Layer (Full Size) */}
                {(service.bgImage || service.type === "image-card") && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.bgImage || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000"}
                      alt={dict[service.key] || service.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content Layer */}
                <div className={cn(
                  "relative z-10 h-full pb-8 flex flex-col",
                  (service.key === "accommodation" || service.key === "ticket") ? "px-6 pt-5" : "px-8 pt-6"
                )}>
                  {/* Quarter Circle Decoration */}
                  {(service.key === "ticket" || service.key === "accommodation") && (
                    <div className={cn(
                      "absolute top-0 left-0 bg-crimson z-0 opacity-100 rounded-br-[4rem]",
                      service.key === "ticket" ? "w-52 h-28" : "w-44 h-24"
                    )} />
                  )}

                  <div className="relative z-10">
                    <h3 className={cn(
                      "font-bold font-montserrat mb-1",
                      service.key === "accommodation" ? "text-lg" : "text-xl",
                      (service.bgImage || service.type === "image-card" || service.type === "feature-list") ? "text-white" : "text-gray-900"
                    )}>
                      {dict[service.key] || service.label}
                    </h3>
                    <p className={cn(
                      "font-medium",
                      service.key === "accommodation" ? "text-[11px]" : "text-sm",
                      (service.bgImage || service.type === "image-card" || service.type === "feature-list") ? "text-gray-100" : "text-gray-500"
                    )}>
                      {dict[service.key + 'Desc'] || service.label}
                    </p>
                  </div>

                  <div className="flex-grow">
                    {renderCardContent(service)}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  GraduationCap, 
  Plane, 
  Home, 
  Briefcase, 
  FileText,
  type LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map of available icons
const iconMap: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  plane: Plane,
  home: Home,
  briefcase: Briefcase,
  file: FileText,
};

export interface FeatureTab {
  id: string;
  title: string;
  description: string;
  iconName: string; // Changed from icon: LucideIcon to iconName: string
  image: string;
}

interface FeatureTabsProps {
  features: FeatureTab[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FeatureTabs({ 
  features, 
  title, 
  subtitle,
  className 
}: FeatureTabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>("");

  // Set initial active tab
  useEffect(() => {
    if (features.length > 0 && !activeTabId) {
      setActiveTabId(features[0].id);
    }
  }, [features, activeTabId]);

  const activeFeature = features.find(f => f.id === activeTabId) || features[0];
  const ActiveIcon = activeFeature ? iconMap[activeFeature.iconName] || FileText : FileText;

  if (!features.length) return null;

  return (
    <section className={cn("py-24 bg-white text-gray-900 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 max-w-3xl">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Navigation */}
          <div className="flex flex-col space-y-4">
            {features.map((feature) => {
              const isActive = activeTabId === feature.id;
              const Icon = iconMap[feature.iconName] || FileText;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTabId(feature.id)}
                  className={cn(
                    "group relative flex items-start text-left p-6 rounded-2xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-crimson/50",
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  {/* Active Background Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gray-50 border border-gray-200 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex gap-6 items-center">
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                      isActive 
                        ? "bg-crimson text-white shadow-lg shadow-crimson/20" 
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold mb-2 transition-colors",
                        isActive ? "text-gray-900" : "text-gray-700"
                      )}>
                        {feature.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed max-w-sm transition-colors",
                         isActive ? "text-gray-600" : "text-gray-500"
                      )}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Preview */}
          <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl bg-gray-50 border border-gray-200 p-2 overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-neutral-900/20 z-10" />
                
                {/* We use a generic placeholder if image is missing, or the image provided */}
                {activeFeature.image ? (
                  <Image
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                   <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-400">No Image Preview</p>
                   </div>
                )}

                {/* Optional Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white mb-3">
                      <ActiveIcon className="w-3 h-3" />
                      <span>{activeFeature.title}</span>
                   </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}

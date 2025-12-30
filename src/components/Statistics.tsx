"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Locale } from "@/i18n-config";

interface StatisticsProps {
  lang: Locale;
  dict: any;
}

export default function Statistics({ lang, dict }: StatisticsProps) {
  const stats = [
    { 
      number: "1200", 
      label: "Students over all time", 
      icon: true 
    },
    { 
      number: "200", 
      label: "Students only last academic year", 
      icon: true 
    },
    { 
      number: "35%", 
      label: "Average annual growth", 
      icon: true 
    },
    { 
      number: "95%", 
      label: "Enroll on first attempt", 
      icon: false 
    },
    { 
      number: "70%", 
      label: "Receive scholarships", 
      icon: false 
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Badge & Description */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-20">
          <div className="md:col-span-1">
            <div className="inline-flex items-center gap-3 py-1 px-3 rounded-full border border-gray-100 bg-gray-50/50">
              <div className="w-2 h-2 rounded-full bg-[#0A2647] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A2647]">Our Team</span>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A2647] leading-[1.15] tracking-tight">
              Our dedicated team of education consultants, visa experts, and mentors works tirelessly to ensure your success. With deep expertise across global academic systems, we provide the personalized guidance needed to turn your student journey into a life-changing success story.
            </h2>
          </div>
        </div>

        {/* Stats Grid with Dividers */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 relative">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative px-4 first:pl-0 last:pr-0"
            >
              {/* Vertical Divider (Desktop Only) */}
              {index !== 0 && (
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-100" />
              )}
              
              <div className="group">
                <div className="flex items-start gap-1 mb-2">
                  <span className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#0A2647] tracking-tighter">
                    {stat.number}
                  </span>
                  {stat.icon && (
                    <TrendingUp className="w-5 h-5 text-[#0A2647]/20 mt-1 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                  )}
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider leading-relaxed pr-4">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

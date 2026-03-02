"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, GraduationCap, Bookmark } from "lucide-react";
import { useState } from "react";

interface Country {
    name: string;
    flag: string;
    cities: Record<string, string[]>;
    programs?: string[];
}

interface CountryCityShowcaseProps {
    dict: any;
    stats: any;
}

export default function CountryCityShowcase({ dict, stats }: CountryCityShowcaseProps) {
    const [expandedCountry, setExpandedCountry] = useState<string | null>("turkey");

    const countries: Record<string, Country> = dict.countries || {};

    const toggleCountry = (key: string) => {
        setExpandedCountry(expandedCountry === key ? null : key);
    };

    // Count total universities
    const totalUnis = Object.values(countries).reduce((sum, country) => {
        return sum + Object.values(country.cities).reduce((citySum, unis) => citySum + unis.length, 0);
    }, 0);

    return (
        <section className="py-24 bg-[#06182E] text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        {dict.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-blue-100/60 max-w-2xl mx-auto"
                    >
                        {dict.subtitle}
                    </motion.p>
                </div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16"
                >
                    {[
                        { value: stats.students, label: stats.studentsLabel },
                        { value: stats.universities, label: stats.universitiesLabel },
                        { value: stats.countries, label: stats.countriesLabel },
                        { value: stats.cities, label: stats.citiesLabel },
                        { value: stats.years, label: stats.yearsLabel },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            className="text-center bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10 backdrop-blur-sm"
                        >
                            <div className="text-2xl md:text-4xl font-extrabold text-crimson mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-blue-100/50 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Country accordion */}
                <div className="max-w-4xl mx-auto space-y-3">
                    {Object.entries(countries).map(([key, country], index) => {
                        const cityCount = Object.keys(country.cities).length;
                        const uniCount = Object.values(country.cities).reduce((s, u) => s + u.length, 0);

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-crimson/30 transition-colors duration-300"
                            >
                                {/* Country header */}
                                <button
                                    onClick={() => toggleCountry(key)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">{country.flag}</span>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold group-hover:text-crimson transition-colors">
                                                {country.name}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs text-blue-100/40 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {cityCount} {cityCount === 1 ? "city" : "cities"}
                                                </span>
                                                {uniCount > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        <GraduationCap className="w-3 h-3" />
                                                        {uniCount} universities
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-white/40 transition-transform duration-300 ${expandedCountry === key ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* Cities & Universities */}
                                <AnimatePresence>
                                    {expandedCountry === key && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 md:px-6 pb-6 pt-2 space-y-4">
                                                {/* Programs badges */}
                                                {country.programs && country.programs.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {country.programs.map((prog, pidx) => (
                                                            <span
                                                                key={pidx}
                                                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-crimson/20 text-crimson rounded-full text-xs font-medium border border-crimson/20"
                                                            >
                                                                <Bookmark className="w-3 h-3" />
                                                                {prog}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Cities with universities */}
                                                {Object.entries(country.cities).map(([cityName, universities], cidx) => (
                                                    <motion.div
                                                        key={cidx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: cidx * 0.05 }}
                                                        className="bg-white/5 rounded-xl p-4 border border-white/5"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <MapPin className="w-3.5 h-3.5 text-crimson" />
                                                            <span className="text-sm font-semibold text-white">
                                                                {cityName}
                                                            </span>
                                                        </div>
                                                        {universities.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5 ml-5">
                                                                {universities.map((uni, uidx) => (
                                                                    <span
                                                                        key={uidx}
                                                                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/5 hover:border-crimson/30 hover:text-white transition-all duration-200"
                                                                    >
                                                                        <GraduationCap className="w-3 h-3 text-crimson/60" />
                                                                        {uni}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

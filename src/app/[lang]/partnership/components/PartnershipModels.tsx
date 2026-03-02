"use client";
import { motion } from "framer-motion";
import { Building2, Megaphone, Coins, Users, Globe, Headphones, LucideIcon } from "lucide-react";

interface B2BModelItem {
    title: string;
    description: string;
    icon: string;
}

interface PartnershipModelsProps {
    dict: any;
}

const iconMap: Record<string, LucideIcon> = {
    building: Building2,
    megaphone: Megaphone,
    coins: Coins,
    users: Users,
    globe: Globe,
    headphones: Headphones,
};

export default function PartnershipModels({ dict }: PartnershipModelsProps) {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        {dict.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto"
                    >
                        {dict.subtitle}
                    </motion.p>
                </div>

                {/* B2B Models Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dict.items?.map((item: B2BModelItem, index: number) => {
                        const IconComponent = iconMap[item.icon] || Building2;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-crimson/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Number badge */}
                                <div className="absolute top-4 right-4 text-5xl font-black text-gray-100 group-hover:text-crimson/10 transition-colors select-none">
                                    0{index + 1}
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-crimson transition-colors duration-300">
                                    <IconComponent className="w-5 h-5 text-crimson group-hover:text-white transition-colors duration-300" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-crimson transition-colors relative z-10">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed relative z-10">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

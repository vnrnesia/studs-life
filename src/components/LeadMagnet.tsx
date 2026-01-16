"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Gift, ArrowRight } from "lucide-react";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";

interface LeadMagnetProps {
    lang: string;
}

const content = {
    ru: {
        badge: "БЕСПЛАТНО",
        title: "Получите полное руководство для поступления",
        subtitle: "Скачайте наш эксклюзивный PDF-гид с пошаговой инструкцией по поступлению в зарубежные университеты",
        features: [
            "Чек-лист необходимых документов",
            "Календарь важных дат и дедлайнов",
            "Примеры успешных мотивационных писем",
            "Советы по подготовке к интервью"
        ],
        inputPlaceholder: "Ваш email",
        buttonText: "Получить руководство",
        successMessage: "Спасибо! Проверьте вашу почту.",
        noThanks: "Нет, спасибо"
    },
    en: {
        badge: "FREE",
        title: "Get Your Complete Admission Guide",
        subtitle: "Download our exclusive PDF guide with step-by-step instructions for applying to foreign universities",
        features: [
            "Required documents checklist",
            "Calendar of important dates and deadlines",
            "Examples of successful motivation letters",
            "Interview preparation tips"
        ],
        inputPlaceholder: "Your email",
        buttonText: "Get the Guide",
        successMessage: "Thank you! Check your email.",
        noThanks: "No, thanks"
    },
    tk: {
        badge: "MUGT",
        title: "Doly okuwa giriş gollanmasyny alyň",
        subtitle: "Daşary ýurt uniwersitetlerine giriş üçin ädimme-ädim görkezme bilen aýratyn PDF gollanmamyzy göçürip alyň",
        features: [
            "Zerur resminamalaryň sanawы",
            "Möhüm seneleriň we möhletleriň senenamasy",
            "Üstünlikli motiwasion hatlaryň mysallary",
            "Söhbetdeşlige taýýarlyk maslahatlary"
        ],
        inputPlaceholder: "Siziň email",
        buttonText: "Gollanmany alyň",
        successMessage: "Sagbol! Poçtañyzy barlaň.",
        noThanks: "Ýok, sagbol"
    }
};

export default function LeadMagnet({ lang }: LeadMagnetProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dict = content[lang as keyof typeof content] || content.ru;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        const result = await submitToGoogleSheets('Лид-магнит', {
            email: email,
            preference: 'Лид-магнит'
        });

        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        } else {
            alert(result.message);
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-6 right-6 z-50 max-w-md w-full mx-4 md:mx-0"
            >
                <div className="relative bg-gradient-to-br from-[#C62828] to-[#8B1E1E] rounded-2xl shadow-2xl overflow-hidden border border-white/10">

                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                            <Gift className="w-4 h-4 text-[#C62828]" />
                            <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider">
                                {dict.badge}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-14">

                        {!isSubmitted ? (
                            <>
                                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                                    {dict.title}
                                </h3>

                                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                                    {dict.subtitle}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-2 mb-6">
                                    {dict.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-white/90 text-sm">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Email Form */}
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={dict.inputPlaceholder}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-white text-[#C62828] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all group disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-[#C62828]/30 border-t-[#C62828] rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4" />
                                                {dict.buttonText}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* No Thanks */}
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="w-full text-center text-white/60 hover:text-white/80 text-xs mt-3 transition-colors"
                                >
                                    {dict.noThanks}
                                </button>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Download className="w-8 h-8 text-[#C62828]" />
                                </div>
                                <p className="text-white text-lg font-bold">
                                    {dict.successMessage}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

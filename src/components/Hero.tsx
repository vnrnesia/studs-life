import { MoveRight } from "lucide-react";
import Image from "next/image";
import mainBg from "../assets/herobg.webp";
import mainBgMobile from "../assets/mainbg_mobile.webp";
interface HeroProps {
    lang: string;
    dict: any;
}
export default function Hero({ lang, dict }: HeroProps) {
    return (
        <section className="relative w-full h-screen md:min-h-screen flex items-center pt-20 overflow-hidden">
            {}
            <div className="absolute inset-0 z-0">
                {}
                <Image
                    src={mainBg}
                    alt="Background"
                    fill
                    className="hidden md:block object-cover pt-16 "
                    priority
                    quality={100}
                    unoptimized
                />
                {}
                <Image
                    src={mainBgMobile}
                    alt="Background Mobile"
                    fill
                    className="block md:hidden object-cover pt-19"
                    priority
                    quality={100}
                    unoptimized
                />
            </div>
            {}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center h-full pb-10">
                {}
                <div className="flex flex-col items-center md:items-start text-center md:text-left text-white w-full md:w-auto md:max-w-xs h-full md:h-auto pt-10 md:pt-0">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight mb-4">
                        {dict?.title}
                    </h2>
                    <div className="mt-auto md:mt-0 flex flex-col items-center md:items-start pb-10 md:pb-0">
                        <p className="text-sm md:text-base text-white/80 mb-6">
                            {dict?.subtitle}
                        </p>
                        <a
                            href={`/${lang}/contact`}
                            className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-red-700 transition-colors"
                        >
                            {dict?.cta}
                            <MoveRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
                {}
                <div className="hidden md:flex flex-col items-end text-white max-w-xs ml-auto">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight mb-4 text-right">
                        {dict?.rightTitle}
                    </h2>
                    <p className="text-sm md:text-base text-white/80 mb-4 text-right">
                        {dict?.rightSubtitle}
                    </p>
                    <p className="text-xs text-white/60 text-right">
                        {dict?.partnerText}
                    </p>
                </div>
            </div>
        </section>
    );
}
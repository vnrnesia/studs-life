import { TrendingUp } from "lucide-react";
import { Locale } from "@/i18n-config";

interface StatisticsProps {
  lang: Locale;
  dict: any;
}

export default function Statistics({ lang, dict }: StatisticsProps) {
  const results = [
    { number: "1200", label: dict?.results?.totalStudents, icon: true },
    { number: "200", label: dict?.results?.lastYearStudents, icon: true },
    { number: "35%", label: dict?.results?.averageGrowth, icon: true },
    { number: "95%", label: dict?.results?.firstAttempt, icon: false },
    { number: "70%", label: dict?.results?.scholarships, icon: false },
  ];

  const geography = [
    { percentage: "70%", country: dict?.geography?.turkmenistan },
    { percentage: "10%", country: dict?.geography?.turkey },
    { percentage: "8%", country: dict?.geography?.china },
    { percentage: "7%", country: dict?.geography?.uzbekistan },
    { percentage: "5%", country: dict?.geography?.tajikistan },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Section */}
        <div className="mb-20">
          <h2 className="text-white text-base font-bold tracking-wider uppercase mb-12">
            {dict?.resultsTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            {results.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-6xl md:text-7xl font-black leading-none">
                    {stat.number}
                  </span>
                  {stat.icon && (
                    <TrendingUp className="w-10 h-10 text-blue-400 mt-1 flex-shrink-0" strokeWidth={3} />
                  )}
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-line leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Geography Section */}
        <div>
          <h2 className="text-white text-base font-bold tracking-wider uppercase mb-12">
            {dict?.geographyTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
            {geography.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-6xl md:text-7xl font-black mb-3 leading-none">
                  {stat.percentage}
                </div>
                <p className="text-sm text-gray-300">{stat.country}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

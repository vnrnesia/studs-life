"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, i18n } from "@/i18n-config";
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown, ChevronRight, Phone } from "lucide-react";
import { Country } from "@/lib/strapi";
import logo from "../assets/logo.svg";
import Image from "next/image";
import { companyLinks, trustBadges, ceoProfile } from "@/data/navData";

interface NavbarProps {
  lang: Locale;
  dict: any;
  countries: Country[];
}

export default function Navbar({ lang, dict, countries }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}` || pathname === "/";

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const navLinks = [
    { name: dict?.nav?.home, href: `/${lang}` },
    { name: dict?.nav?.countries, href: "#", type: "countries" }, // Special handling
    { name: dict?.nav?.company, href: "#", type: "mega" }, // Special handling
    { name: dict?.nav?.contact, href: `/${lang}/contact` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 relative z-50">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <Image
                src={logo}
                alt="students life"
                priority
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              // 1. Countries Dropdown
              if (link.type === 'countries') {
                return (
                  <div key={index} className="relative group px-3 py-2">
                    <button className={`flex items-center gap-1 text-sm font-bold uppercase transition-colors ${
                      (scrolled || !isHomePage) ? "text-gray-900 hover:text-navy" : "text-white group-hover:text-navy"
                    }`}>
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Countries Dropdown Panel */}
                    <div className="absolute left-0 top-full pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100">
                        <div className="py-2">
                          {countries?.map((country) => (
                            <div key={country.id} className="group/country relative">
                               <button className="w-full text-left px-4 py-3 text-sm text-black hover:bg-gray-50 hover:text-navy flex items-center justify-between font-medium transition-colors">
                                  <span>{country.name || (country as any).attributes?.name}</span>
                                  {country.cities && country.cities.length > 0 && (
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover/country:text-navy" />
                                  )}
                               </button>
    
                               {/* Nested Cities */}
                               {country.cities && country.cities.length > 0 && (
                                 <div className="absolute left-full top-0 ml-2 w-56 opacity-0 invisible group-hover/country:opacity-100 group-hover/country:visible transition-all duration-200">
                                   <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                                     <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/50">
                                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                         {lang === 'ru' ? 'Города' : 'Cities'}
                                       </span>
                                     </div>
                                     {country.cities.map((city: any) => (
                                       <Link
                                         key={city.id}
                                         href={`/${lang}/${country.slug}/${city.slug}`}
                                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors"
                                       >
                                         {city.name}
                                       </Link>
                                     ))}
                                   </div>
                                 </div>
                               )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // 2. Company Mega Menu
              if (link.type === 'mega') {
                return (
                  <div key={index} className="relative group px-3 py-2 cursor-pointer">
                    <button className={`flex items-center gap-1 text-sm font-bold uppercase transition-colors ${
                       (scrolled || !isHomePage) ? "text-gray-900 hover:text-navy" : "text-white hover:text-navy"
                    }`}>
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Mega Menu Panel */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-screen max-w-4xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                       <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden grid grid-cols-12">
                          
                          {/* Left Side: Links */}
                          <div className="col-span-8 p-8">
                             <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                                {companyLinks.map((item, i) => {
                                   const Icon = item.icon;
                                   return (
                                     <Link 
                                       key={i} 
                                       href={`/${lang}${item.href}`}
                                       className="group/item flex items-start gap-4 p-2 -mx-2 rounded-lg hover:bg-gray-200 transition-colors"
                                     >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center text-navy group-hover/item:bg-navy group-hover/item:text-white transition-colors">
                                           <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                           <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-navy transition-colors">
                                              {dict?.nav?.megaMenu?.[item.titleKey]}
                                           </h4>
                                           <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                              {dict?.nav?.megaMenu?.[item.descKey]}
                                           </p>
                                        </div>
                                     </Link>
                                   );
                                })}
                             </div>

                             {/* Bottom Action Area */}
                             <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                                <Link 
                                  href={`/${lang}/contact`}
                                  className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-blue-900 transition-colors"
                                >
                                   {dict?.nav?.megaMenu?.getConsultation}
                                   <ChevronRight className="w-4 h-4" />
                                </Link>
                               
                             </div>
                          </div>

                          {/* Right Side: CEO Profile (Dark Sidebar) */}
                          <div className="col-span-4 bg-slate-900 p-8 text-white relative overflow-hidden">
                             {/* Abstract Decorative Circle */}
                             <div className="absolute top-0 right-0 w-32 h-32 bg-navy blur-[80px] opacity-20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                             
                             <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                   <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/20">
                                      <Image 
                                        src={ceoProfile.image} 
                                        alt={ceoProfile.name}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                      />
                                   </div>
                                   <h3 className="text-lg font-bold">{ceoProfile.name}</h3>
                                   <p className="text-sm text-gray-400 mb-6">{dict?.nav?.megaMenu?.[ceoProfile.roleKey]}</p>
                                   <blockquote className="text-sm italic text-gray-300 border-l-2 border-navy pl-4">
                                      "{dict?.nav?.megaMenu?.[ceoProfile.quoteKey]}"
                                   </blockquote>
                                </div>
                                <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors backdrop-blur-sm border border-white/10">
                                   Linkedin Profile
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                );
              }

              // 3. Simple Link
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-bold uppercase transition-colors ${
                    pathname === link.href 
                      ? "text-navy" 
                      : ((scrolled || !isHomePage) ? "text-gray-900 hover:text-navy" : "text-white hover:text-navy") 
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Area: Language & CTA */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative group">
              <button className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm font-bold transition-colors ${
                 (scrolled || !isHomePage) ? "text-gray-900 hover:text-navy" : "text-white hover:text-navy"
              }`}>
                <div className="relative w-6 h-4 shadow-sm rounded-[2px] overflow-hidden">
                   <Image
                     src={`https://flagcdn.com/w40/${{ en: 'gb', ru: 'ru', tk: 'tm' }[lang]}.png`}
                     alt={lang}
                     fill
                     className="object-cover"
                   />
                </div>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              <div className="absolute right-0 pt-2 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-2">
                  {i18n.locales.map((locale) => {
                    const flags = { en: 'gb', ru: 'ru', tk: 'tm' };
                    const names = { en: 'English', ru: 'Русский', tk: 'Türkmençe' };
                    return (
                      <Link
                        key={locale}
                        href={redirectedPathName(locale)}
                        className={`group flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          lang === locale ? 'text-navy font-bold bg-gray-50' : 'text-gray-700'
                        }`}
                      >
                        <div className="relative w-5 h-3.5 mr-3 shadow-sm rounded-[1px] overflow-hidden">
                          <Image
                            src={`https://flagcdn.com/w40/${flags[locale as keyof typeof flags]}.png`}
                            alt={names[locale as keyof typeof names]}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {names[locale as keyof typeof names]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${lang}/contact`}
              className="px-6 py-2.5 bg-navy text-white text-sm font-bold rounded-full shadow-lg hover:bg-blue-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {dict?.nav?.letsTalk}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Small Language Indicator for Mobile */}
             <div className="flex items-center gap-1">
                <div className="relative w-6 h-4 shadow-sm rounded-[2px] overflow-hidden">
                   <Image
                     src={`https://flagcdn.com/w40/${{ en: 'gb', ru: 'ru', tk: 'tm' }[lang]}.png`}
                     alt={lang}
                     fill
                     className="object-cover"
                   />
                </div>
             </div>

             <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-navy focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
         isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ top: '80px', height: 'calc(100vh - 80px)' }} // Below navbar
      >
        <div className="h-full overflow-y-auto pb-20 px-6 py-8">
           <div className="space-y-4">
              {navLinks.map((link, index) => {
                 // Mobile Countries
                 if (link.type === 'countries') {
                    return (
                       <div key={index} className="border-b border-gray-100 pb-2">
                          <button 
                             onClick={() => setIsMobileCountriesOpen(!isMobileCountriesOpen)}
                             className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-900"
                          >
                             {link.name}
                             <ChevronDown className={`w-5 h-5 transition-transform ${isMobileCountriesOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isMobileCountriesOpen && (
                             <div className="pl-4 space-y-4 pb-4">
                                {countries?.map((country) => (
                                   <div key={country.id}>
                                      <div className="font-bold text-gray-500 mb-2">{country.name}</div>
                                      <div className="grid grid-cols-2 gap-2">
                                         {country.cities && country.cities.map((city: any) => (
                                            <Link
                                               key={city.id}
                                               href={`/${lang}/${country.slug}/${city.slug}`}
                                               onClick={() => setIsOpen(false)}
                                               className="text-sm text-gray-600 py-1 hover:text-navy"
                                            >
                                               {city.name}
                                            </Link>
                                         ))}
                                      </div>
                                   </div>
                                ))}
                             </div>
                          )}
                       </div>
                    );
                 }

                 // Mobile Company
                 if (link.type === 'mega') {
                    return (
                       <div key={index} className="border-b border-gray-100 pb-2">
                          <button 
                             onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                             className="w-full flex items-center justify-between py-3 text-lg font-bold text-gray-900"
                          >
                             {link.name}
                             <ChevronDown className={`w-5 h-5 transition-transform ${isMobileCompanyOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isMobileCompanyOpen && (
                             <div className="pl-4 grid grid-cols-1 gap-4 pb-4">
                                {companyLinks.map((item, i) => (
                                   <Link 
                                     key={i} 
                                     href={`/${lang}${item.href}`}
                                     onClick={() => setIsOpen(false)}
                                     className="flex items-center gap-3 text-gray-600 hover:text-navy"
                                   >
                                      <item.icon className="w-5 h-5 opacity-70" />
                                      <span className="font-medium">{dict?.nav?.megaMenu?.[item.titleKey]}</span>
                                   </Link>
                                ))}
                             </div>
                          )}
                       </div>
                    );
                 }

                 return (
                    <Link
                       key={index}
                       href={link.href}
                       onClick={() => setIsOpen(false)}
                       className="block py-3 text-lg font-bold text-gray-900 border-b border-gray-100 hover:text-navy"
                    >
                       {link.name}
                    </Link>
                 );
              })}
           </div>

           {/* Mobile Languages */}
           <div className="mt-8">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Language</div>
              <div className="grid grid-cols-1 gap-2">
                  {i18n.locales.map((locale) => {
                     const flags = { en: 'gb', ru: 'ru', tk: 'tm' };
                     const names = { en: 'English', ru: 'Русский', tk: 'Türkmençe' };
                     return (
                       <Link
                         key={locale}
                         href={redirectedPathName(locale)}
                         onClick={() => setIsOpen(false)}
                         className={`flex items-center gap-3 p-3 rounded-lg border ${
                           lang === locale ? "border-navy bg-blue-50 text-navy" : "border-gray-200"
                         }`}
                       >
                         <div className="relative w-6 h-4 shadow-sm rounded-[1px] overflow-hidden">
                            <Image
                              src={`https://flagcdn.com/w40/${flags[locale as keyof typeof flags]}.png`}
                              alt={names[locale as keyof typeof names]}
                              fill
                              className="object-cover"
                            />
                         </div>
                         <span className="font-bold">{names[locale as keyof typeof names]}</span>
                       </Link>
                     );
                  })}
              </div>
           </div>

           {/* Mobile CTA */}
           <div className="mt-8">
              <Link
                href={`/${lang}/contact`}
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 text-center bg-navy text-white text-lg font-bold rounded-xl shadow-lg"
              >
                {dict?.nav?.letsTalk}
              </Link>
           </div>
        </div>
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, i18n } from "@/i18n-config";
import { useState } from "react";
import { Menu, X, Globe, ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { Country } from "@/lib/strapi";

interface NavbarProps {
  lang: Locale;
  dict: any;
  countries: Country[];
}

export default function Navbar({ lang, dict, countries }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);
  const pathname = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const navLinks = [
    { name: dict?.nav?.home, href: `/${lang}` },
    { name: dict?.nav?.services, href: `/${lang}/services` },
    { name: dict?.nav?.about, href: `/${lang}/about` },
    { name: dict?.nav?.contact, href: `/${lang}#contact` },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="text-2xl font-black text-gray-900 tracking-widest font-montserrat">
              STUDENTS<span className="text-crimson">LIFE</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-900 hover:text-crimson px-3 py-2 rounded-md text-sm font-bold  transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Countries Mega Menu (Desktop) */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-900 hover:text-crimson px-3 py-2 rounded-md text-sm font-bold  transition-colors">
                  {dict?.nav?.countries || (lang === 'ru' ? 'Страны' : 'Countries')}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Panel */}
                <div className="absolute left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                    <div className="py-2">
                       {/* Country List */}
                      {countries.map((country) => (
                        <div key={country.id} className="group/country relative">
                           <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-crimson flex items-center justify-between font-medium transition-colors">
                              <div className="flex items-center gap-2">
                               
                                {country.name}
                              </div>
                              {/* Show arrow if has cities */}
                              {country.cities && country.cities.length > 0 && (
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover/country:text-crimson" />
                              )}
                           </button>

                           {/* Nested Cities List */}
                           {country.cities && country.cities.length > 0 && (
                             <div className="absolute left-full top-0 ml-0.5 w-56 opacity-0 invisible group-hover/country:opacity-100 group-hover/country:visible transition-all duration-200">
                               <div className="bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-2">
                                 <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                     {lang === 'ru' ? 'Города' : 'Cities'}
                                   </span>
                                 </div>
                                 {country.cities.map((city: any) => (
                                   <Link
                                     key={city.id}
                                     href={`/${lang}/${country.slug}/${city.slug}`}
                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-crimson transition-colors"
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
            </div>
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
               <Globe className="w-4 h-4 text-gray-600" />
               <div className="flex gap-2 text-sm font-bold">
                 {i18n.locales.map((locale) => (
                   <Link
                     key={locale}
                     href={redirectedPathName(locale)}
                     className={`uppercase ${lang === locale ? "text-crimson decoration-2 underline-offset-4 underline" : "text-gray-900 hover:text-gray-700"}`}
                   >
                     {locale}
                   </Link>
                 ))}
               </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-crimson focus:outline-none"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-900 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-bold uppercase"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Countries Accordion */}
            <div className="border-t border-gray-200 pt-2 mt-2">
               <button 
                  onClick={() => setIsMobileCountriesOpen(!isMobileCountriesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-bold uppercase text-gray-900 hover:bg-gray-200 rounded-md"
               >
                  {dict?.nav?.countries || (lang === 'ru' ? 'Страны' : 'Countries')}
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMobileCountriesOpen ? 'rotate-180' : ''}`} />
               </button>
               
               {isMobileCountriesOpen && (
                 <div className="pl-4 space-y-1 mt-1">
                    {countries.map((country) => (
                      <div key={country.id} className="py-1">
                        <div className="font-bold text-gray-700 px-3 py-1 flex items-center gap-2">
                        {country.name}
                        </div>
                        <div className="pl-4 border-l-2 border-gray-200 ml-3 space-y-1 mt-1">
                          {country.cities && country.cities.map((city: any) => (
                            <Link
                              key={city.id}
                              href={`/${lang}/${country.slug}/${city.slug}`}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-crimson rounded-md"
                              onClick={() => setIsOpen(false)}
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

             <div className="border-t border-gray-200 mt-4 pt-4 flex justify-center gap-6">
                 {i18n.locales.map((locale) => (
                   <Link
                     key={locale}
                     href={redirectedPathName(locale)}
                     className={`uppercase font-bold text-lg ${lang === locale ? "text-crimson" : "text-gray-900"}`}
                   >
                     {locale}
                   </Link>
                 ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

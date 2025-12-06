"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, i18n } from "@/i18n-config";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

interface NavbarProps {
  lang: Locale;
  dict: any;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const navLinks = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.services, href: `/${lang}#services` },
    { name: dict.about, href: `/${lang}#why-us` },
    { name: dict.contact, href: `/${lang}#contact` },
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
                  className="text-gray-900 hover:text-crimson px-3 py-2 rounded-md text-sm font-bold uppercase transition-colors"
                >
                  {link.name}
                </Link>
              ))}
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
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
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

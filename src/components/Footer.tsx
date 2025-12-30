import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.svg";
import footerBg from "../assets/footerbg.png";

interface FooterProps {
  lang: string;
  dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="relative bg-[#06182E] text-white overflow-hidden rounded-t-[3rem]">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={footerBg}
          alt="Footer Background"
          fill
          className="object-cover object-left"
          priority
        />
        {/* Gradient Overlay for better text readability on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06182E]/60 to-[#06182E]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Empty space for background image visibility */}
          <div className="hidden lg:block" />

          {/* Right side - All footer content */}
          <div className="space-y-8">
            {/* Logo and Description */}
            <div>
              <Link href={`/${lang}`} className="inline-block mb-4">
                <Image 
                  src={logo} 
                  alt="students life" 
                  priority 
                  className="h-auto w-auto max-h-12 brightness-0 invert" 
                />
              </Link>
              <p className="text-blue-100/80 max-w-md text-sm leading-relaxed">
                {dict?.footer?.description || "Your reliable partner for education abroad and visa services since 2015."}
              </p>
            </div>

            {/* Contact Info and Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Contact */}
              <div>
                <h3 className="font-bold uppercase mb-4 text-white tracking-wider text-sm">
                  {dict?.footer?.contact || "Contact"}
                </h3>
                <ul className="space-y-2 text-blue-100/70 text-sm">
                  <li>+993 71 832 749</li>
                  <li>info@studentslife.agency</li>
                  <li>Turkmenistan, Turkmenabat</li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-bold uppercase mb-4 text-white tracking-wider text-sm">
                  {dict?.footer?.socials || "Follow Us"}
                </h3>
                <div className="flex gap-3">
                  <a 
                    href="https://instagram.com/defyzerglobal" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#06182E] transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://facebook.com/defyzerglobal" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#06182E] transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com/defyzerglobal" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#06182E] transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 pt-6 text-blue-100/60 text-xs">
              © {new Date().getFullYear()} Student's Life Agency. {dict?.footer?.copyright || "All rights reserved."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

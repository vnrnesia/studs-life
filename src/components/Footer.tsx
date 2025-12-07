import { Facebook, Instagram, Twitter } from "lucide-react";

interface FooterProps {
  lang: string;
  dict: any;
}

export default function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="bg-gray-50 text-gray-900 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
               <span className="text-2xl font-black font-montserrat tracking-widest block mb-4">
                 STUDENTS<span className="text-crimson">LIFE</span>
               </span>
               <p className="text-gray-600 max-w-sm">
                 Your reliable partner for education abroad and visa services since 2015.
               </p>
            </div>
            
            <div>
               <h3 className="font-bold uppercase mb-4 text-crimson">{dict?.footer?.contact}</h3>
               <ul className="space-y-2 text-gray-700">
                  <li>+1 (234) 567-890</li>
                  <li>info@studentslife.agency</li>
                  <li>123 Education St, Moscow</li>
               </ul>
            </div>

            <div>
               <h3 className="font-bold uppercase mb-4 text-crimson">{dict?.footer?.socials}</h3>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-crimson hover:text-white transition-colors">
                     <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-crimson hover:text-white transition-colors">
                     <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-crimson hover:text-white transition-colors">
                     <Twitter className="w-5 h-5" />
                  </a>
               </div>
            </div>
         </div>
         
         <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Student's Life Agency. All rights reserved.
         </div>
      </div>
    </footer>
  );
}

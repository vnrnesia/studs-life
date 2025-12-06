"use client";

interface FormProps {
  lang: string;
  dict: any;
}

export default function Form({ lang, dict }: FormProps) {
  return (
    <section id="quick-form" className="relative py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-crimson translate-x-12 -translate-y-12 rotate-45" />

           <div className="relative z-10">
             <h2 className="text-3xl font-black uppercase font-montserrat text-gray-900 mb-8 text-center">{dict.title}</h2>
             
             <form className="grid gap-6">
                <div>
                   <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.name}</label>
                   <input type="text" className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 font-bold transition-colors" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.phone}</label>
                     <input type="tel" className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 font-bold transition-colors" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.country}</label>
                     <select className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 font-bold transition-colors appearance-none">
                        <option>Russia</option>
                        <option>China</option>
                        <option>Turkey</option>
                     </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="button" className="w-full py-4 bg-crimson text-white font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    {dict.submit}
                  </button>
                </div>
             </form>
           </div>
        </div>
      </div>
    </section>
  );
}

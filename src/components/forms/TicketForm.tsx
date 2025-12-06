"use client";

import { useState } from "react";

interface TicketFormProps {
  onBack: () => void;
  dict: {
    backButton: string;
    services: { ticket: { title: string } };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}

const COUNTRIES = ['Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan'];
const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];

export default function TicketForm({ onBack, dict }: TicketFormProps) {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', fromCity: '', toCity: '', travelDate: '',
    needsBaggage: '', citizenship: '', region: '', city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket Booking:', formData);
    alert('Ticket booking submitted! (Demo)');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
      <div className="mb-8">
        <button onClick={onBack} className="text-crimson hover:text-red-700 font-bold flex items-center gap-2 transition-colors">
          ← {dict.backButton}
        </button>
      </div>
      
      <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">{dict.services.ticket.title}</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fullName} *</label>
          <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
            placeholder={dict.placeholders.fullName} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.phone} *</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.phone} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.email} *</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.email} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.fromCity} *</label>
            <input type="text" required value={formData.fromCity} onChange={(e) => setFormData({...formData, fromCity: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.fromCity} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.toCity} *</label>
            <input type="text" required value={formData.toCity} onChange={(e) => setFormData({...formData, toCity: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.toCity} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.travelDate} *</label>
          <input type="date" required value={formData.travelDate} onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.needsBaggage} *</label>
          <select required value={formData.needsBaggage} onChange={(e) => setFormData({...formData, needsBaggage: e.target.value})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            <option value="yes">{dict.options.yesBaggage}</option>
            <option value="no">{dict.options.noBaggage}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.citizenship} *</label>
          <select required value={formData.citizenship} onChange={(e) => setFormData({...formData, citizenship: e.target.value, region: '', city: ''})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {formData.citizenship === 'Turkmenistan' ? (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.region} *</label>
            <select required value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.select}</option>
              {TURKMEN_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        ) : formData.citizenship ? (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.city} *</label>
            <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.city} />
          </div>
        ) : null}

        <div className="pt-6">
          <button type="submit" className="w-full py-4 bg-crimson text-white font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {dict.buttons.bookTicket}
          </button>
        </div>
      </form>
    </div>
  );
}

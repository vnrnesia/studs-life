"use client";

import { useState } from "react";

interface TransferFormProps {
  onBack: () => void;
  dict: {
    backButton: string;
    services: { transfer: { title: string } };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}

const COUNTRIES = ['Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan', 'Russia', 'Kazakhstan'];
const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];

export default function TransferForm({ onBack, dict }: TransferFormProps) {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', relationship: '', currentEducationLevel: '',
    currentUniversity: '', currentCountry: '', currentField: '', paymentType: '',
    transferType: '', targetUniversity: '', targetField: '', citizenship: '', region: '', city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transfer Application:', formData);
    alert('Transfer request submitted! (Demo)');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
      <div className="mb-8">
        <button onClick={onBack} className="text-crimson hover:text-red-700 font-bold flex items-center gap-2 transition-colors">
          ← {dict.backButton}
        </button>
      </div>
      
      <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">{dict.services.transfer.title}</h3>

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

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.relationship} *</label>
          <select required value={formData.relationship} onChange={(e) => setFormData({...formData, relationship: e.target.value})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            <option value="self">{dict.options.self}</option>
            <option value="father">{dict.options.father}</option>
            <option value="mother">{dict.options.mother}</option>
            <option value="friend">{dict.options.friend}</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.currentEducationLevel} *</label>
            <select required value={formData.currentEducationLevel} onChange={(e) => setFormData({...formData, currentEducationLevel: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.select}</option>
              <option value="preparatory">{dict.options.preparatory}</option>
              <option value="bachelor">{dict.options.bachelor}</option>
              <option value="master">{dict.options.master}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.paymentType} *</label>
            <select required value={formData.paymentType} onChange={(e) => setFormData({...formData, paymentType: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
              <option value="">{dict.options.select}</option>
              <option value="paid">{dict.options.paid}</option>
              <option value="grant">{dict.options.grant}</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.currentUniversity} *</label>
            <input type="text" required value={formData.currentUniversity} onChange={(e) => setFormData({...formData, currentUniversity: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.currentCountry} *</label>
            <input type="text" required value={formData.currentCountry} onChange={(e) => setFormData({...formData, currentCountry: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.currentField} *</label>
          <input type="text" required value={formData.currentField} onChange={(e) => setFormData({...formData, currentField: e.target.value})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.transferType} *</label>
          <select required value={formData.transferType} onChange={(e) => setFormData({...formData, transferType: e.target.value})}
            className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
            <option value="">{dict.options.select}</option>
            <option value="same">{dict.options.sameCountry}</option>
            <option value="different">{dict.options.differentCountry}</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.targetUniversity} *</label>
            <input type="text" required value={formData.targetUniversity} onChange={(e) => setFormData({...formData, targetUniversity: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2 uppercase">{dict.fields.targetField} *</label>
            <input type="text" required value={formData.targetField} onChange={(e) => setFormData({...formData, targetField: e.target.value})}
              className="w-full bg-gray-100 border-2 border-transparent focus:border-crimson outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
          </div>
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
            {dict.buttons.submitTransfer}
          </button>
        </div>
      </form>
    </div>
  );
}

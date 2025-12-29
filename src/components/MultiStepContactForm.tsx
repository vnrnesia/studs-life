"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { submitToGoogleSheets } from "@/lib/submitToGoogleSheets";
import { 
  GraduationCap, 
  Users, 
  School, 
  Plane as PlaneIcon, 
  Briefcase, 
  Ticket,
  Check,
  ChevronLeft,
  User,
  MapPin,
  Smile,
  FileText,
  LayoutGrid
} from "lucide-react";

interface MultiStepContactFormProps {
  lang: string;
  dict: {
    title: string;
    selectService: string;
    backButton: string;
    stepIndicator?: string;
    steps?: string;
    navigation?: {
      back: string;
      next: string;
      submit: string;
    };
    stepTitles?: {
      serviceSelection: string;
      personalInfo: string;
      serviceDetails: string;
      additionalInfo: string;
    };
    stepDescriptions?: {
      serviceSelection: string;
      personalInfo: string;
      serviceDetails: string;
      additionalInfo: string;
    };
    services: {
      university: { title: string; desc: string };
      transfer: { title: string; desc: string };
      school: { title: string; desc: string };
      umrah: { title: string; desc: string };
      workVisa: { title: string; desc: string };
      ticket: { title: string; desc: string };
    };
    fields: Record<string, string>;
    placeholders: Record<string, string>;
    options: Record<string, string>;
    buttons: Record<string, string>;
  };
}

type ServiceType = 'university' | 'transfer' | 'school' | 'umrah' | 'workVisa' | 'ticket' | '';

interface FormData {
  // Common fields
  service: ServiceType;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  
  // University specific
  educationLevel?: string;
  relationship?: string;
  targetCountry?: string;
  fieldOfStudy?: string;
  citizenship?: string;
  region?: string;
  city?: string;
  
  // Transfer specific
  currentEducationLevel?: string;
  currentUniversity?: string;
  currentCountry?: string;
  currentField?: string;
  paymentType?: string;
  transferType?: string;
  targetUniversity?: string;
  targetField?: string;
  
  // School specific
  studentName?: string;
  parentName?: string;
  
  // Umrah specific
  hasPassport?: string;
  passportExpiry?: string;
  travelMonth?: string;
  
  // Work Visa specific
  workPreferences?: string;
  previousTravel?: string;
  
  // Ticket specific
  fromCity?: string;
  toCity?: string;
  travelDate?: string;
  needsBaggage?: string;
}

const COUNTRIES = [
  'Turkmenistan', 'China', 'Turkey', 'Uzbekistan', 'Tajikistan', 
  'Russia', 'Kazakhstan', 'Kyrgyzstan', 'Afghanistan', 'Iran'
];

const TURKMEN_REGIONS = ['Lebap', 'Mary', 'Dashoguz', 'Balkan', 'Ahal', 'Ashgabat'];
const TARGET_COUNTRIES = ['Russia', 'China', 'Cyprus', 'Turkey', 'Belarus', 'Uzbekistan', 'Europe'];

export default function MultiStepContactForm({ lang, dict }: MultiStepContactFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    service: 'university',
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    // Shared / Specific fields
    relationship: '',
    educationLevel: '',
    targetCountry: '',
    fieldOfStudy: '',
    citizenship: '',
    region: '',
    city: '',
    // School
    studentName: '',
    parentName: '',
    hasPassport: '',
    passportExpiry: '',
    // Ticket
    fromCity: '',
    toCity: '',
    travelDate: '',
    needsBaggage: '',
    // Transfer
    currentEducationLevel: '',
    currentUniversity: '',
    currentCountry: '',
    currentField: '',
    paymentType: '',
    transferType: '',
    targetUniversity: '',
    targetField: '',
    // Umrah & Work Visa
    travelMonth: '',
    workPreferences: '',
    previousTravel: ''
  });

  const services = [
    { 
      id: 'university' as const, 
      icon: GraduationCap, 
      color: 'bg-blue-500',
      title: dict.services.university.title,
      desc: dict.services.university.desc
    },
    { 
      id: 'transfer' as const, 
      icon: Users, 
      color: 'bg-purple-500',
      title: dict.services.transfer.title,
      desc: dict.services.transfer.desc
    },
    { 
      id: 'school' as const, 
      icon: School, 
      color: 'bg-green-500',
      title: dict.services.school.title,
      desc: dict.services.school.desc
    },
    { 
      id: 'umrah' as const, 
      icon: PlaneIcon, 
      color: 'bg-teal-500',
      title: dict.services.umrah.title,
      desc: dict.services.umrah.desc
    },
    { 
      id: 'workVisa' as const, 
      icon: Briefcase, 
      color: 'bg-orange-500',
      title: dict.services.workVisa.title,
      desc: dict.services.workVisa.desc
    },
    { 
      id: 'ticket' as const, 
      icon: Ticket, 
      color: 'bg-pink-500',
      title: dict.services.ticket.title,
      desc: dict.services.ticket.desc
    },
  ];

  // Define steps based on selected service
  const getSteps = () => {
    const baseSteps = [
      { 
        id: 1, 
        title: dict.stepTitles?.personalInfo || "Tell us about yourself",
        shortTitle: "Personal Info",
        icon: User
      },
      { 
        id: 2, 
        title: dict.stepTitles?.serviceSelection || "Which service do you need?",
        shortTitle: (formData.service && (dict.services as any)[formData.service]) ? (dict.services as any)[formData.service].title : "Service",
        icon: LayoutGrid
      },
      { 
        id: 3, 
        title: dict.stepTitles?.serviceDetails || "Service Details", 
        shortTitle: "Details", 
        icon: GraduationCap 
      },
      { 
        id: 4, 
        title: dict.stepTitles?.additionalInfo || "Location Details", 
        shortTitle: "Location", 
        icon: MapPin 
      }
    ];

    return baseSteps;
  };

  const steps = getSteps();
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission if not on the final step
    if (currentStep < totalSteps) {
      if (canProceed()) {
        handleNext();
      }
      return;
    }

    setIsSubmitting(true);

    const serviceMap = {
      university: 'University',
      transfer: 'Transfer',
      school: 'School',
      umrah: 'Umrah',
      workVisa: 'Work Visa',
      ticket: 'Ticket'
    };

    const result = await submitToGoogleSheets(
      serviceMap[formData.service as keyof typeof serviceMap], 
      formData
    );
    
    if (result.success) {
      router.push(`/${lang}/thanks`);
    } else {
      alert(result.message);
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    // Step 1: Personal Information
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
              {dict.stepTitles?.personalInfo || "Tell us about yourself"}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {dict.stepDescriptions?.personalInfo || "We need to validate your information"}
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {dict.fields.fullName} *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
                placeholder={dict.placeholders.fullName}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {dict.fields.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
                  placeholder={dict.placeholders.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  {dict.fields.email} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
                  placeholder={dict.placeholders.email}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {dict.fields.dateOfBirth} *
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              />
            </div>
          </div>
        </div>
      );
    }

    // Step 2: Service Selection
    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
              {dict.stepTitles?.serviceSelection || "Which service do you need?"}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {dict.stepDescriptions?.serviceSelection || "Choose the service you need"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = formData.service === service.id;
              
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, service: service.id })}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-navy bg-navy/5' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{service.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{service.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-navy rounded-full flex items-center justify-center shadow-sm">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 3 & 4: Service Specific Details
    const renderLocationFields = () => (
      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            {dict.fields.citizenship} *
          </label>
          <select
            required
            value={formData.citizenship}
            onChange={(e) => setFormData({ ...formData, citizenship: e.target.value, region: '', city: '' })}
            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
          >
            <option value="">{dict.options.select}</option>
            {COUNTRIES.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {formData.citizenship === 'Turkmenistan' ? (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              {dict.fields.region} *
            </label>
            <select
              required
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
            >
              <option value="">{dict.options.selectRegion}</option>
              {TURKMEN_REGIONS.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        ) : formData.citizenship ? (
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              {dict.fields.city} *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors"
              placeholder={dict.placeholders.city}
            />
          </div>
        ) : null}
      </div>
    );

    if (currentStep === 3) {
      if (formData.service === 'university') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.stepTitles?.serviceDetails || "Education Details"}</h3>
              <p className="text-sm md:text-base text-gray-600">{dict.stepDescriptions?.serviceDetails || "Tell us about your educational background"}</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.educationLevel} *</label>
                  <select required value={formData.educationLevel} onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.selectLevel}</option>
                    <option value="language">{dict.options.languageCourses}</option>
                    <option value="preparatory">{dict.options.preparatory}</option>
                    <option value="bachelor">{dict.options.bachelor}</option>
                    <option value="master">{dict.options.master}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <select required value={formData.relationship} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.selectRelationship}</option>
                    <option value="self">{dict.options.self}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                    <option value="friend">{dict.options.friend}</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetCountry} *</label>
                  <select required value={formData.targetCountry} onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.selectCountry}</option>
                    {TARGET_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.fieldOfStudy} *</label>
                  <input type="text" required value={formData.fieldOfStudy} onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" placeholder={dict.placeholders.fieldOfStudy} />
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (formData.service === 'school') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.school.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide details about the student and parent.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.studentName} *</label>
                  <input type="text" required value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.parentName} *</label>
                  <input type="text" required value={formData.parentName} onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <select required value={formData.relationship} onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.hasPassport} *</label>
                  <select required value={formData.hasPassport} onChange={(e) => setFormData({...formData, hasPassport: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yes}</option>
                    <option value="no">{dict.options.no}</option>
                  </select>
                </div>
              </div>
              {formData.hasPassport === 'yes' && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.passportExpiry} *</label>
                  <input type="date" required value={formData.passportExpiry} onChange={(e) => setFormData({...formData, passportExpiry: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
              )}
            </div>
          </div>
        );
      }

      if (formData.service === 'ticket') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.ticket.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide flight information.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.fromCity} *</label>
                  <input type="text" required value={formData.fromCity} onChange={(e) => setFormData({...formData, fromCity: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" placeholder={dict.placeholders.fromCity} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.toCity} *</label>
                  <input type="text" required value={formData.toCity} onChange={(e) => setFormData({...formData, toCity: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" placeholder={dict.placeholders.toCity} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.travelDate} *</label>
                  <input type="date" required value={formData.travelDate} onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.needsBaggage} *</label>
                  <select required value={formData.needsBaggage} onChange={(e) => setFormData({...formData, needsBaggage: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yesBaggage}</option>
                    <option value="no">{dict.options.noBaggage}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (formData.service === 'transfer') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.transfer.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide current education details.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentEducationLevel} *</label>
                  <select required value={formData.currentEducationLevel} onChange={(e) => setFormData({...formData, currentEducationLevel: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="preparatory">{dict.options.preparatory}</option>
                    <option value="bachelor">{dict.options.bachelor}</option>
                    <option value="master">{dict.options.master}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.paymentType} *</label>
                  <select required value={formData.paymentType} onChange={(e) => setFormData({...formData, paymentType: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="paid">{dict.options.paid}</option>
                    <option value="grant">{dict.options.grant}</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentUniversity} *</label>
                  <input type="text" required value={formData.currentUniversity} onChange={(e) => setFormData({...formData, currentUniversity: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentCountry} *</label>
                  <input type="text" required value={formData.currentCountry} onChange={(e) => setFormData({...formData, currentCountry: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.currentField} *</label>
                  <input type="text" required value={formData.currentField} onChange={(e) => setFormData({...formData, currentField: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.transferType} *</label>
                  <select required value={formData.transferType} onChange={(e) => setFormData({...formData, transferType: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="same">{dict.options.sameCountry}</option>
                    <option value="different">{dict.options.differentCountry}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (formData.service === 'umrah') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.umrah.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide pilgrimage details.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.travelMonth} *</label>
                  <select required value={formData.travelMonth} onChange={(e) => setFormData({...formData, travelMonth: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.selectMonth}</option>
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <select required value={formData.relationship} onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.selectRelationship}</option>
                    <option value="self">{dict.options.self}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.hasPassport} *</label>
                  <select required value={formData.hasPassport} onChange={(e) => setFormData({...formData, hasPassport: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="yes">{dict.options.yes}</option>
                    <option value="no">{dict.options.no}</option>
                  </select>
                </div>
                {formData.hasPassport === 'yes' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.passportExpiry} *</label>
                    <input type="date" required value={formData.passportExpiry} onChange={(e) => setFormData({...formData, passportExpiry: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }

      if (formData.service === 'workVisa') {
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">{dict.services.workVisa.title}</h3>
              <p className="text-sm md:text-base text-gray-600">Provide work visa details.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetCountry} *</label>
                  <select required value={formData.targetCountry} onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.select}</option>
                    <option value="Russia">Russia</option>
                    <option value="Belarus">Belarus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.relationship} *</label>
                  <select required value={formData.relationship} onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors">
                    <option value="">{dict.options.selectRelationship}</option>
                    <option value="self">{dict.options.self}</option>
                    <option value="father">{dict.options.father}</option>
                    <option value="mother">{dict.options.mother}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.workPreferences} *</label>
                <textarea required value={formData.workPreferences} onChange={(e) => setFormData({...formData, workPreferences: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" rows={2} placeholder={dict.placeholders.workPreferences} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.previousTravel} *</label>
                <textarea required value={formData.previousTravel} onChange={(e) => setFormData({...formData, previousTravel: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" rows={2} placeholder={dict.placeholders.previousTravel} />
              </div>
            </div>
          </div>
        );
      }
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-1 md:mb-2">
              {formData.service === 'transfer' ? "Final Details" : (dict.stepTitles?.additionalInfo || "Location Details")}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {formData.service === 'transfer' ? "Provide target university and your location." : (dict.stepDescriptions?.additionalInfo || "Where are you from?")}
            </p>
          </div>
          
          <div className="space-y-4">
            {formData.service === 'transfer' && (
              <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetUniversity} *</label>
                  <input type="text" required value={formData.targetUniversity} onChange={(e) => setFormData({...formData, targetUniversity: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{dict.fields.targetField} *</label>
                  <input type="text" required value={formData.targetField} onChange={(e) => setFormData({...formData, targetField: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-navy outline-none px-4 py-3 rounded-lg text-gray-900 transition-colors" />
                </div>
              </div>
            )}
            {renderLocationFields()}
          </div>
        </div>
      );
    }

    return null;
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.phone && formData.email && formData.dateOfBirth;
    }
    if (currentStep === 2) {
      return formData.service !== '';
    }
    
    // Step 3 Validation
    if (currentStep === 3) {
      if (formData.service === 'university') {
        return formData.educationLevel && formData.relationship && formData.targetCountry && formData.fieldOfStudy;
      }
      if (formData.service === 'school') {
        return formData.studentName && formData.parentName && formData.relationship && formData.hasPassport && (formData.hasPassport === 'no' || formData.passportExpiry);
      }
      if (formData.service === 'ticket') {
        return formData.fromCity && formData.toCity && formData.travelDate && formData.needsBaggage;
      }
      if (formData.service === 'transfer') {
        return formData.currentEducationLevel && formData.paymentType && formData.currentUniversity && formData.currentCountry && formData.currentField && formData.transferType;
      }
      if (formData.service === 'umrah') {
        return formData.travelMonth && formData.relationship && formData.hasPassport && (formData.hasPassport === 'no' || formData.passportExpiry);
      }
      if (formData.service === 'workVisa') {
        return formData.targetCountry && formData.relationship && formData.workPreferences && formData.previousTravel;
      }
    }

    // Step 4 Validation
    if (currentStep === 4) {
      const locationValid = formData.citizenship && (formData.citizenship === 'Turkmenistan' ? formData.region : formData.city);
      if (formData.service === 'transfer') {
        return locationValid && formData.targetUniversity && formData.targetField;
      }
      return locationValid;
    }

    return true;
  };

  return (
    <section className="relative pt-26 pb-8 md:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-14 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col lg:flex-row w-full md:gap-8 justify-center items-start">
          {/* Left Sidebar - Progress Steps (Desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-7">
              {steps.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isPending = step.id > currentStep;
                const Icon = step.icon;
                const isLast = index === steps.length - 1;

                return (
                  <motion.div 
                    key={step.id} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Connecting Line */}
                    {!isLast && (
                      <div 
                        className={`absolute left-[36px] -translate-x-1/2 top-[52px] w-[2px] h-[calc(100%-44px)] transition-colors duration-500 z-0 ${
                          isCompleted ? 'bg-navy' : 'bg-gray-200'
                        }`} 
                      >
                        {isCompleted && (
                          <motion.div 
                            className="absolute top-0 left-0 w-full bg-navy"
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </div>
                    )}

                    <motion.div
                      className={`flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 ${
                        isCurrent ? 'bg-white shadow-xl ring-1 ring-gray-100 scale-[1.02]' : ''
                      }`}
                      whileHover={{ scale: isCurrent ? 1.02 : 1.01 }}
                    >
                      <div className="relative z-10 flex-shrink-0">
                        {isCompleted ? (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-navy rounded-full flex items-center justify-center shadow-lg shadow-blue-100"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : isCurrent ? (
                          <motion.div 
                            animate={{ 
                              boxShadow: ["0px 0px 0px 0px rgba(0, 0, 128, 0.2)", "0px 0px 0px 10px rgba(0, 0, 128, 0)"]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-8 h-8 bg-white border-2 border-navy rounded-full flex items-center justify-center shadow-lg shadow-blue-50"
                          >
                            <Icon className="w-4 h-4 text-navy" />
                          </motion.div>
                        ) : (
                          <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className={`text-[11px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                          isCompleted ? 'text-navy' : isCurrent ? 'text-navy' : 'text-gray-400'
                        }`}>
                          Step {step.id}
                        </div>
                        <div className={`text-[15px] font-bold mt-0.5 break-words transition-colors duration-300 ${
                          isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </div>
                        <div className={`text-[11px] mt-1 font-bold transition-colors duration-300 ${
                          isCompleted ? 'text-blue-600' : isCurrent ? 'text-blue-600' : 'text-gray-300'
                        }`}>
                          {isCompleted ? 'Complete' : isCurrent ? 'In progress' : 'Pending'}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Progress Bar & Navigation Header */}
          <div className="lg:hidden w-full max-w-3xl mx-auto px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 font-bold transition-colors ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                {dict.navigation?.back || dict.backButton || "Back"}
              </button>
              
              <div className="bg-gray-100 px-3 py-1 rounded-md text-sm font-bold text-gray-600">
                {dict.steps || "Steps"} {currentStep}/{totalSteps}
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-navy"
                />
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="flex-1 max-w-3xl w-full">
            <div className="bg-white lg:rounded-2xl lg:shadow-xl p-4 md:p-8">
              {/* Back Button (Desktop only) */}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="hidden lg:flex items-center gap-2 text-navy hover:text-blue-900 font-bold mb-6 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {dict.navigation?.back || dict.backButton || "Back"}
                </button>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex gap-4">
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex-1 py-4 bg-crimson/80 text-white font-black uppercase tracking-widest rounded-full hover:bg-crimson transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5  disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {dict.navigation?.next || "Next"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !canProceed()}
                      className="flex-1 py-4 bg-navy text-white font-black uppercase tracking-widest rounded-full hover:bg-crimson transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? 'Submitting...' : (dict.navigation?.submit || dict.buttons.submit)}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

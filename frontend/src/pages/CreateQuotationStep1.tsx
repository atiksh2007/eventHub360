import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Search, Info, X, ArrowRight } from 'lucide-react';
import WizardNavbar from '../components/WizardNavbar';
import WizardProgress from '../components/WizardProgress';
import FormInput from '../components/FormInput';
import { api } from '../services/api';

const CreateQuotationStep1 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [saving, setSaving] = React.useState(false);

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      const result = await api.createQuote({
        clientName: data.contactName || data.companyName || 'New Client',
        eventType: 'corporate', // Defaulting for step 1
      });
      navigate(`/quotation-builder?id=${result.id || result.quoteId}`);
    } catch (err: any) {
      console.error('Failed to create quote:', err.message);
      // Fallback if backend is down
      navigate('/quotation-builder?id=Q-8829');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans pb-20">
      <WizardNavbar />
      <WizardProgress />

      <div 
        className="w-full max-w-[900px] mx-auto bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Card Header */}
          <div className="h-[140px] px-10 border-b border-[#ECECF1] flex items-center justify-between bg-white relative z-10">
            <div>
              <h2 className="text-[36px] font-bold text-gray-900 tracking-tight leading-none mb-2">
                Client Information
              </h2>
              <p className="text-[18px] font-medium text-gray-500">
                Identify the recipient of this concierge quotation.
              </p>
            </div>
            <div>
              <span className="text-[14px] font-bold text-[#B3262E] uppercase tracking-widest">
                Step 1 of 6
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-10 space-y-8">
            
            {/* Field 1: Search Existing Client */}
            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-bold text-gray-900">Search Existing Client</label>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Start typing name, email or company..."
                  className="w-full h-14 pl-12 pr-5 bg-[#F5F7FC] border border-transparent rounded-[16px] text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                />
              </div>
              <p className="text-[13px] font-medium text-gray-500 ml-1">
                Leave blank to create a new client record.
              </p>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput 
                label="Primary Contact Name" 
                name="contactName"
                placeholder="e.g. Julianne Moore" 
                register={(name: any) => register(name, { required: 'Primary Contact Name is required' })}
                error={errors.contactName}
              />
              <FormInput 
                label="Company Name" 
                name="companyName"
                placeholder="e.g. Luxe Media Group" 
                register={(name: any) => register(name)}
                error={errors.companyName}
              />
            </div>

            {/* Section Divider */}
            <div className="border-t border-[#ECECF1] my-10"></div>

            {/* Contact Details Section */}
            <div>
              <h3 className="text-[32px] font-semibold text-gray-900 tracking-tight mb-8">
                Contact Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <FormInput 
                  label="Email Address" 
                  name="email"
                  type="email"
                  placeholder="client@example.com" 
                  register={(name: any) => register(name, { 
                    required: 'Email Address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  error={errors.email}
                />
                <FormInput 
                  label="Phone Number" 
                  name="phone"
                  placeholder="+1 (555) 000-0000" 
                  register={(name: any) => register(name, { 
                    required: 'Phone Number is required',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  error={errors.phone}
                />
              </div>

              {/* Privacy Notice Panel */}
              <div className="bg-[#F3F5FF] border border-[#E0E7FF] rounded-[18px] p-6 flex gap-4">
                <div className="shrink-0 mt-0.5">
                  <Info className="w-6 h-6 text-[#B3262E]" />
                </div>
                <div>
                  <p className="text-[15px] font-medium text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Privacy Note:</span> All client data is encrypted and handled according to our enterprise concierge privacy standards. Ensure all primary contact details are verified for accurate billing delivery.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="h-[110px] px-8 border-t border-[#ECECF1] bg-white flex items-center justify-between rounded-b-[32px]">
            <button 
              type="button" 
              className="flex items-center gap-2 text-[16px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancel Quotation
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                className="h-14 w-[180px] rounded-full border border-[#ECECF1] bg-white text-[16px] font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm"
              >
                Save as Draft
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="h-14 w-[260px] rounded-full bg-gradient-to-r from-red-600 to-orange-400 text-white text-[16px] font-bold flex items-center justify-center gap-2 hover:from-red-700 hover:to-orange-500 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {saving ? 'Creating Quote...' : 'Next: Event Details'}
                {!saving && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateQuotationStep1;

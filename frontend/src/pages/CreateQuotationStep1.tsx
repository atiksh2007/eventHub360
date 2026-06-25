import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Search, Info, X, ArrowRight, Sparkles } from 'lucide-react';
import WizardNavbar from '../components/WizardNavbar';
import WizardProgress from '../components/WizardProgress';
import FormInput from '../components/FormInput';
import { api } from '../services/api';

const CreateQuotationStep1 = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [saving, setSaving] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [availableClients, setAvailableClients] = React.useState<any[]>([]);
  const [templatePreset, setTemplatePreset] = React.useState<any>(null);

  React.useEffect(() => {
    const stored = sessionStorage.getItem('templatePreset');
    if (stored) {
      const preset = JSON.parse(stored);
      setTemplatePreset(preset);
    }
  }, []);

  React.useEffect(() => {
    // Fetch live quotes to extract unique clients
    api.getLiveList('all', 1, 100).then((res: any) => {
      const quotes = res.rows || [];
      const uniqueClients = new Map();
      
      quotes.forEach((q: any) => {
        if (q.clientName && q.clientName !== 'Client' && !uniqueClients.has(q.clientName)) {
          uniqueClients.set(q.clientName, {
            id: q.quoteNumber,
            name: q.clientName,
            company: q.clientName.includes('Corp') || q.clientName.includes('Group') ? q.clientName : '',
            email: `${q.clientName.split(' ')[0].toLowerCase()}@example.com`,
            phone: '+1 (555) 000-0000' // Mocked since quotation table doesn't store this
          });
        }
      });
      setAvailableClients(Array.from(uniqueClients.values()));
    }).catch(err => console.error("Failed to fetch clients from quotes:", err));
  }, []);

  const filteredClients = React.useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return availableClients.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.company.toLowerCase().includes(query) || 
      c.email.toLowerCase().includes(query)
    );
  }, [searchQuery, availableClients]);

  const handleSelectClient = (client: any) => {
    setValue('contactName', client.name);
    setValue('companyName', client.company);
    setValue('email', client.email);
    setValue('phone', client.phone);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      const result = await api.createQuote({
        clientName: data.contactName || data.companyName || 'New Client',
        eventType: templatePreset?.eventType || 'corporate',
        expectedGuests: templatePreset?.expectedGuests,
        metadata: {
          email: data.email,
          phone: data.phone,
          companyName: data.companyName,
          contactName: data.contactName
        }
      });

      const newQuoteId = result.id || result.quoteId;

      if (templatePreset && templatePreset.items && templatePreset.items.length > 0) {
        await api.syncQuoteItems(newQuoteId, templatePreset.items);
      }

      const targetUrl = templatePreset 
        ? `/quotation-builder?id=${newQuoteId}` 
        : `/quotations/drafts/continue?id=${newQuoteId}`;

      // Clear preset after successfully using it
      sessionStorage.removeItem('templatePreset');
      navigate(targetUrl);
    } catch (err: any) {
      console.error('Failed to create quote:', err.message);
      alert(`Failed to create quote: ${err.message}\n(Make sure you restarted your frontend dev server!)`);
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
          
          {/* Template Banner */}
          {templatePreset && (
            <div className="mx-10 mt-6 flex items-center gap-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl px-5 py-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-600 to-orange-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-gray-900">Template Pre-filled: <span className="text-red-600">{templatePreset.templateTitle}</span></p>
                <p className="text-[12px] text-gray-600">Event type and line items are ready. Just fill in the client info below.</p>
              </div>
              <button
                type="button"
                onClick={() => { setTemplatePreset(null); sessionStorage.removeItem('templatePreset'); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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
            <div className="flex flex-col gap-2 relative">
              <label className="text-[15px] font-bold text-gray-900">Search Existing Client</label>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Start typing name, email or company..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full h-14 pl-12 pr-5 bg-[#F5F7FC] border border-transparent rounded-[16px] text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                />
              </div>
              
              {showDropdown && filteredClients.length > 0 && (
                <div className="absolute top-[84px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredClients.map(client => (
                    <div 
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <div className="font-bold text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.company ? `${client.company} • ` : ''}{client.email}</div>
                    </div>
                  ))}
                </div>
              )}

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

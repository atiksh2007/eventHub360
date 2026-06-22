import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Download, FileText, FileSpreadsheet, Package, CheckCircle2
} from 'lucide-react';

const DraftExport = () => {
  const navigate = useNavigate();
  const [exportStatus, setExportStatus] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const handleExport = () => {
    setExportStatus('exporting');
    setTimeout(() => {
      setExportStatus('success');
      setTimeout(() => setExportStatus(null), 3000);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[800px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/quotations/drafts/details')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Export Draft Quotation</h1>
                <p className="text-[15px] text-gray-500 mt-1">Download Q-88124 for offline review or client presentation.</p>
              </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-8">
              
              <h2 className="text-[16px] font-bold text-gray-900 mb-6">Select Export Format</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                
                <div 
                  onClick={() => setSelectedFormat('pdf')}
                  className={`p-6 rounded-[20px] border-2 cursor-pointer transition-all ${selectedFormat === 'pdf' ? 'border-red-600 bg-red-50' : 'border-[#ECECF1] hover:border-red-200'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${selectedFormat === 'pdf' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">PDF Document</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Standard formatted proposal document.</p>
                </div>

                <div 
                  onClick={() => setSelectedFormat('excel')}
                  className={`p-6 rounded-[20px] border-2 cursor-pointer transition-all ${selectedFormat === 'excel' ? 'border-emerald-600 bg-emerald-50' : 'border-[#ECECF1] hover:border-emerald-200'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${selectedFormat === 'excel' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Excel Spreadsheet</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Line-item breakdown with pricing formulas.</p>
                </div>

                <div 
                  onClick={() => setSelectedFormat('package')}
                  className={`p-6 rounded-[20px] border-2 cursor-pointer transition-all ${selectedFormat === 'package' ? 'border-blue-600 bg-blue-50' : 'border-[#ECECF1] hover:border-blue-200'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${selectedFormat === 'package' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Full Package (.ZIP)</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">PDF proposal + Excel pricing + attachments.</p>
                </div>

              </div>

              <h2 className="text-[16px] font-bold text-gray-900 mb-4">Export Settings</h2>
              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-3 p-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl cursor-pointer">
                  <input type="radio" name="exportType" defaultChecked className="w-4 h-4 text-red-600 focus:ring-red-500" />
                  <div>
                    <span className="text-[14px] font-bold text-gray-900 block">Internal Review Copy</span>
                    <span className="text-[12px] text-gray-500">Includes internal notes, margins, and cost breakdowns.</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-xl cursor-pointer">
                  <input type="radio" name="exportType" className="w-4 h-4 text-red-600 focus:ring-red-500" />
                  <div>
                    <span className="text-[14px] font-bold text-gray-900 block">Client-Ready Presentation</span>
                    <span className="text-[12px] text-gray-500">Hides internal data, shows only retail pricing and public descriptions.</span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end pt-6 border-t border-[#ECECF1]">
                <button 
                  onClick={handleExport}
                  disabled={exportStatus === 'exporting'}
                  className="px-8 py-3 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[15px] shadow-[0_4px_14px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.4)] transition-all flex items-center gap-2"
                >
                  {exportStatus === 'exporting' ? 'Generating File...' : 
                   exportStatus === 'success' ? <><CheckCircle2 className="w-5 h-5" /> Download Complete</> : 
                   <><Download className="w-5 h-5" /> Download Export</>}
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftExport;

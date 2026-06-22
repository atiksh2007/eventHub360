import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  X, Copy, Link as LinkIcon, Mail, Users, Download, 
  FileText, Share2, Trash2, CheckCircle2, AlertTriangle, Image, Type
} from 'lucide-react';

const ModalBackdrop = ({ children, onClose  }: any) => (
  <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0" onClick={onClose}></div>
    <div className="relative z-10 w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
      {children}
    </div>
  </div>
);

export const ShareTemplateScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Share2 className="w-5 h-5" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Share Template</h2>
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[13px] font-bold text-gray-700 block mb-2">Public Link</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] px-4 py-3 flex items-center gap-2 text-gray-500 text-[14px]">
                <LinkIcon className="w-4 h-4" />
                eventhub360.com/t/eternal-grandeur
              </div>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-[12px] font-bold text-[14px] hover:bg-gray-800 transition-colors">
                Copy
              </button>
            </div>
          </div>

          <div className="h-px bg-[#ECECF1] w-full"></div>

          <div>
            <label className="text-[13px] font-bold text-gray-700 block mb-4">Internal Team Access</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-[#ECECF1] rounded-[12px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[12px]">AC</div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">Alex Chen</p>
                    <p className="text-[12px] text-gray-500">alex@eventhub.com</p>
                  </div>
                </div>
                <select className="text-[13px] font-bold text-gray-700 bg-transparent focus:outline-none cursor-pointer">
                  <option>Owner</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#ECECF1] rounded-[12px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[12px]">SJ</div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">Sarah Jenkins</p>
                    <p className="text-[12px] text-gray-500">sarah@eventhub.com</p>
                  </div>
                </div>
                <select className="text-[13px] font-bold text-gray-700 bg-transparent focus:outline-none cursor-pointer">
                  <option>Can Edit</option>
                  <option>View Only</option>
                </select>
              </div>
            </div>
          </div>
          
          <button className="w-full py-4 mt-2 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[15px] hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Invite Team Member
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export const ExportCenterScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Download className="w-5 h-5" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Export Center</h2>
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-[14px] text-gray-500 mb-6">Choose an export format for The Eternal Grandeur template.</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="p-4 border-2 border-red-200 bg-[#F8F5FF] rounded-[16px] flex flex-col items-center justify-center text-center hover:border-red-400 transition-colors">
            <FileText className="w-8 h-8 text-red-600 mb-2" />
            <span className="text-[15px] font-bold text-gray-900">PDF Document</span>
            <span className="text-[12px] text-gray-500">Best for printing</span>
          </button>
          <button className="p-4 border border-[#ECECF1] rounded-[16px] flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-[15px] font-bold text-gray-900">DOCX Word</span>
            <span className="text-[12px] text-gray-500">Editable format</span>
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
            <span className="text-[14px] font-semibold text-gray-700 flex items-center gap-2"><Image className="w-4 h-4"/> Include High-Res Images</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-red-600 focus:ring-red-500" />
            <span className="text-[14px] font-semibold text-gray-700 flex items-center gap-2"><Type className="w-4 h-4"/> Embed Custom Fonts</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex-1 py-3 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100">Cancel</button>
          <button className="flex-1 py-3 bg-gradient-to-r from-red-700 to-orange-400 text-white rounded-full font-bold text-[14px] hover:shadow-lg">Export Now</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export const DuplicateTemplateScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Copy className="w-5 h-5" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Duplicate Template</h2>
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="text-[13px] font-bold text-gray-700 block mb-2">New Template Name</label>
          <input type="text" defaultValue="The Eternal Grandeur (Copy)" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[15px] focus:outline-none focus:border-emerald-300" />
        </div>

        <div className="space-y-4 mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
            <span className="text-[14px] font-semibold text-gray-700">Copy Branding & Colors</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
            <span className="text-[14px] font-semibold text-gray-700">Copy All Sections</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
            <span className="text-[14px] font-semibold text-gray-700">Copy Uploaded Assets</span>
          </label>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex-1 py-3 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100">Cancel</button>
          <button className="flex-1 py-3 bg-emerald-600 text-white rounded-full font-bold text-[14px] hover:bg-emerald-700 transition-colors">Duplicate</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export const ArchiveTemplateScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-[24px] font-bold text-gray-900 text-center mb-2">Archive Template?</h2>
        <p className="text-[15px] text-gray-500 text-center mb-8 px-4">
          Are you sure you want to archive <strong>The Eternal Grandeur</strong>? It will no longer be available for new quotations.
        </p>

        <div className="bg-[#F8F9FC] rounded-[16px] p-4 mb-8">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Impact Summary</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-medium text-gray-700">Active Proposals using this</span>
            <span className="text-[14px] font-bold text-gray-900">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-medium text-gray-700">Historical Uses</span>
            <span className="text-[14px] font-bold text-gray-900">412</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex-1 py-3.5 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[15px] hover:bg-gray-100">Cancel</button>
          <button onClick={() => navigate('/templates')} className="flex-1 py-3.5 bg-red-600 text-white rounded-full font-bold text-[15px] hover:bg-red-700 transition-colors shadow-md">Yes, Archive</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export const RenameTemplateScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <Type className="w-5 h-5" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Rename Template</h2>
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <label className="text-[13px] font-bold text-gray-700 block mb-2">Template Name</label>
          <input type="text" defaultValue="The Eternal Grandeur" className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[15px] focus:outline-none focus:border-gray-300" />
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex-1 py-3 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100">Cancel</button>
          <button onClick={() => navigate(-1)} className="flex-1 py-3 bg-gray-900 text-white rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors">Save Name</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export const MoveCategoryScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900">Move Category</h2>
          </div>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <label className="text-[13px] font-bold text-gray-700 block mb-2">Select New Category</label>
          <select className="w-full px-4 py-3 bg-[#F8F9FC] border border-[#ECECF1] rounded-[12px] text-[15px] focus:outline-none focus:border-orange-300 cursor-pointer">
            <option>Luxury Weddings</option>
            <option>Corporate Galas</option>
            <option>Hotel Partnerships</option>
            <option>Custom</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex-1 py-3 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[14px] hover:bg-gray-100">Cancel</button>
          <button onClick={() => navigate(-1)} className="flex-1 py-3 bg-orange-600 text-white rounded-full font-bold text-[14px] hover:bg-orange-700 transition-colors">Move Template</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

export const DeleteTemplateScreen = () => {
  const navigate = useNavigate();
  return (
    <ModalBackdrop onClose={() => navigate(-1)}>
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <Trash2 className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-[24px] font-bold text-gray-900 text-center mb-2">Delete Template permanently?</h2>
        <p className="text-[15px] text-gray-500 text-center mb-8 px-4">
          This action cannot be undone. Are you sure you want to permanently delete <strong>The Eternal Grandeur</strong>?
        </p>

        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex-1 py-3.5 bg-[#F8F9FC] text-gray-700 rounded-full font-bold text-[15px] hover:bg-gray-100">Cancel</button>
          <button onClick={() => navigate('/templates')} className="flex-1 py-3.5 bg-red-600 text-white rounded-full font-bold text-[15px] hover:bg-red-700 transition-colors shadow-md">Yes, Delete</button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

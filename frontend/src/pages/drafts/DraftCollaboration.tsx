import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import TopHeader from '../../components/TopHeader';
import { 
  ArrowLeft, Users, MessageSquare, Paperclip, Send, File, 
  MoreVertical, Bell, Clock
} from 'lucide-react';

const DraftCollaboration = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const comments = [
    { id: 1, user: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', time: '2 hours ago', text: 'I\'ve added the AV equipment. We just need to finalize the catering numbers. @Alex, can you confirm if they want the VIP or Standard package?', attachment: null },
    { id: 2, user: 'Alex Sterling', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', time: '1 hour ago', text: 'They confirmed the VIP package via email this morning. I will upload the signed menu selection now.', attachment: null },
    { id: 3, user: 'Alex Sterling', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', time: '55 mins ago', text: 'Here is the file.', attachment: { name: 'VIP_Menu_Selection.pdf', size: '2.4 MB' } },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-8 pb-32">
          <div className="max-w-[1000px] mx-auto space-y-6">
            
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => navigate('/quotations/drafts')}
                className="w-10 h-10 bg-white border border-[#ECECF1] rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Collaboration Center</h1>
                <p className="text-[15px] text-gray-500 mt-1">Discuss quote Q-88124 with your team and share internal files.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Chat Area */}
              <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-[#ECECF1] flex flex-col h-[600px]">
                <div className="p-6 border-b border-[#ECECF1] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <h2 className="text-[18px] font-bold text-gray-900">Internal Discussion</h2>
                  </div>
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-600">+2</div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {comments.map((comment: any) => (
                    <div key={comment.id} className="flex gap-4">
                      <img src={comment.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[14px] font-bold text-gray-900">{comment.user}</span>
                          <span className="text-[12px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {comment.time}</span>
                        </div>
                        <div className="bg-[#F8F9FC] border border-[#ECECF1] rounded-[16px] rounded-tl-none p-4 inline-block max-w-[85%]">
                          <p className="text-[14px] text-gray-700 leading-relaxed">{comment.text}</p>
                          {comment.attachment && (
                            <div className="mt-3 p-3 bg-white border border-[#ECECF1] rounded-xl flex items-center gap-3 w-max">
                              <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                                <File className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[13px] font-bold text-gray-900">{comment.attachment.name}</p>
                                <p className="text-[11px] text-gray-500">{comment.attachment.size}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-[#ECECF1] bg-[#F8F9FC] rounded-b-[24px]">
                  <div className="bg-white border border-[#ECECF1] rounded-[20px] p-2 flex items-end shadow-sm focus-within:border-red-300 transition-colors">
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message or use @ to mention someone..."
                      className="flex-1 resize-none bg-transparent border-none focus:ring-0 p-2 text-[14px] max-h-[120px] min-h-[44px]"
                      rows={1}
                    ></textarea>
                    <button className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm ml-2">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                
                <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-6">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4">Shared Files</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-[#ECECF1] rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <File className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-[13px] font-bold text-gray-900">VIP_Menu_Selection.pdf</p>
                          <p className="text-[11px] text-gray-500">Added by Alex S.</p>
                        </div>
                      </div>
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-[#ECECF1] rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <File className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-[13px] font-bold text-gray-900">Client_Brief_Notes.docx</p>
                          <p className="text-[11px] text-gray-500">Added by Sarah J.</p>
                        </div>
                      </div>
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 border border-dashed border-[#ECECF1] rounded-xl text-[13px] font-bold text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors">
                    + Upload File
                  </button>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-[#ECECF1] p-6">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-orange-500" /> Reminders
                  </h3>
                  <div className="bg-orange-50 text-orange-700 p-4 rounded-xl text-[13px] leading-relaxed font-medium">
                    "Ensure we get final confirmation on the AV setup by tomorrow EOD." - Note pinned by Alex Sterling.
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DraftCollaboration;

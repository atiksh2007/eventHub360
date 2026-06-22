import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProposalToolbar from '../components/ProposalToolbar';
import DocumentMap from '../components/DocumentMap';
import ProposalCanvas from '../components/ProposalCanvas';
import ProposalToolsPanel from '../components/ProposalToolsPanel';
import ProposalSettingsCard from '../components/ProposalSettingsCard';
import { CollaborationCard, SendStatusCard } from '../components/CollaborationCard';

const initialPages = [
  { id: 'cover', title: 'Cover Page', type: 'cover' },
  { id: 'moodboard', title: 'Moodboard', type: 'moodboard' },
  { id: 'agenda', title: 'Event Timeline', type: 'agenda' },
];

const ProposalStudio = () => {
  const [pages, setPages] = useState(initialPages);
  const [activePageId, setActivePageId] = useState(pages[0].id);

  return (
    <div className="flex min-h-screen bg-[#F7F8FC] font-sans overflow-hidden h-screen">
      <Sidebar />
      
      <div className="flex-1 ml-[260px] flex flex-col h-full overflow-hidden">
        <ProposalToolbar />
        
        <main className="flex-1 flex overflow-hidden">
          
          {/* Left Column - Document Map (22%) */}
          <DocumentMap 
            pages={pages} 
            setPages={setPages} 
            activePageId={activePageId} 
            onPageSelect={setActivePageId} 
          />

          {/* Center Column - Canvas (58%) */}
          <ProposalCanvas />

          {/* Right Column - Tools (20%) */}
          <div className="w-[20%] min-w-[280px] max-w-[320px] bg-[#F7F8FC] border-l border-[#ECECF1] h-full overflow-y-auto custom-scrollbar shrink-0">
            <div className="p-6">
              <ProposalToolsPanel />
              <ProposalSettingsCard />
              <CollaborationCard />
              <SendStatusCard />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ProposalStudio;

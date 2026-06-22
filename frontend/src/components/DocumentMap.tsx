import React from 'react';
import DocumentThumbnail from './DocumentThumbnail';

const DocumentMap = ({ pages, setPages, activePageId, onPageSelect  }: any) => {
  return (
    <div className="w-[22%] min-w-[240px] max-w-[280px] bg-[#F4F5FB] border-r border-[#ECECF1] h-full flex flex-col shrink-0">
      <div className="p-6 pb-2 shrink-0">
        <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">
          Document Map
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-20 no-scrollbar custom-scrollbar">
        <ul className="flex flex-col items-center w-full list-none m-0 p-0">
          {pages.map((page: any, index: any) => (
            <DocumentThumbnail 
              key={page.id} 
              page={page} 
              index={index} 
              active={activePageId === page.id}
              onSelect={onPageSelect}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocumentMap;

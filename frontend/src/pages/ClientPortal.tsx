import React from 'react';
import Sidebar from '../components/Sidebar';

const ClientPortal = () => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-sans">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden p-8">
        <h1 className="text-3xl font-bold">Client Portal</h1>
        <p className="mt-4 text-gray-500">This page is under construction.</p>
      </div>
    </div>
  );
};

export default ClientPortal;

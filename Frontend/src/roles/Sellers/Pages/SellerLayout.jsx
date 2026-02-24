import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerSidebar from '../Components/SellerSidebar';
import SellerHeader from '../Components/SellerHeader';

export default function SellerLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-cairo" dir="rtl">
      <SellerSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <SellerHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
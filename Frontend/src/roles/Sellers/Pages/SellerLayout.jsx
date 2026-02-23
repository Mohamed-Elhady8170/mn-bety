import { Outlet } from 'react-router-dom';
import SellerSidebar from '../Components/SellerSidebar';
import SellerHeader from '../Components/SellerHeader';

export default function SellerLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-cairo" dir="rtl">
      {/* 1. Fixed Sidebar on the right */}
      <SellerSidebar />

      {/* 2. Main content area on the left */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <SellerHeader />

        {/* Dynamic Page Content (Dashboard, Products, Orders, etc.) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Note: In the isolated preview, Outlet may throw an error if not wrapped in a Router. 
              It will work perfectly in your actual application routing setup! */}
          <Outlet />
        </div>
        
      </main>
    </div>
  );
}
import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function SellerHeader() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      
      <div className="flex items-center gap-4 w-1/2">
        <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="ابحث في لوحة التحكم..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:border-[#ec4d18]" 
            />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#ec4d18] transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
            <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-[#ec4d18]" 
            />
            <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-900 leading-tight">مشغل نورة</p>
                <p className="text-xs text-gray-500">حرفي معتمد</p>
            </div>
        </div>
      </div>
    </header>
  );
}
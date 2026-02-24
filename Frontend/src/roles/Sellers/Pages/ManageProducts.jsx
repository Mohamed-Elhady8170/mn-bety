import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function ManageProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "حقيبة يدوية مطرزة", category: "حقائب", price: 450, stock: 12, status: "نشط", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=100&auto=format&fit=crop" },
    { id: 2, name: "إناء فخاري", category: "فخاريات", price: 280, stock: 0, status: "نفذت الكمية", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=100&auto=format&fit=crop" },
    { id: 3, name: "محفظة تراثية", category: "حقائب", price: 150, stock: 5, status: "نشط", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=100&auto=format&fit=crop" },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 md:p-8 bg-bg-body min-h-screen font-cairo text-right" dir="rtl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-text-main flex items-center gap-2">
            <Package className="text-primary" /> إدارة المنتجات
          </h1>
          <p className="text-text-soft text-sm mt-1">تحكم في منتجاتك، أضف جديداً أو عدل المخزون</p>
        </div>
        <NavLink 
          to="/seller/addProduct" 
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus size={20} /> إضافة منتج جديد
        </NavLink>
      </div>

      <div className="bg-bg-main rounded-2xl border border-border-warm shadow-sm overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-border-warm flex gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-soft group-focus-within:text-primary transition-colors duration-200" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن منتج..." 
              className="w-full bg-bg-body  border border-border-warm rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-text-main placeholder-text-soft/50" 
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-bg-subtle text-text-soft text-sm border-b border-border-warm">
              <tr>
                <th className="px-6 py-4 font-bold">المنتج</th>
                <th className="px-6 py-4 font-bold">التصنيف</th>
                <th className="px-6 py-4 font-bold">السعر</th>
                <th className="px-6 py-4 font-bold">المخزون</th>
                <th className="px-6 py-4 font-bold">الحالة</th>
                <th className="px-6 py-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-warm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-bg-subtle/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-lg object-cover border border-border-warm" 
                      />
                      <span className="font-bold text-text-main">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-soft">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-text-main">{product.price} ج.م</td>
                  <td className="px-6 py-4 text-text-soft">{product.stock} قطعة</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock > 0 
                        ? 'bg-icon-bg-green text-icon-green' 
                        : 'bg-red-soft text-red-text'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        className="p-2 text-icon-blue hover:bg-icon-bg-blue rounded-lg transition-colors duration-200" 
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className="p-2 text-red-text hover:bg-red-soft rounded-lg transition-colors duration-200" 
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
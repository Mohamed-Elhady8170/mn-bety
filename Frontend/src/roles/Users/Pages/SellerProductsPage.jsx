import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, ShoppingBag, Star } from 'lucide-react';

// بيانات تجريبية (سيتم استبدالها لاحقاً ببيانات من API)
const MOCK_PRODUCTS = [
  { id: 101, sellerId: 1, name: "ثوب مطرز أصيل", price: 850, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=400" },
  { id: 102, sellerId: 1, name: "طرحة شغل يد", price: 200, image: "https://images.unsplash.com/photo-1610030469668-93514276477d?q=80&w=400" },
  { id: 201, sellerId: 2, name: "خاتم فضة ياقوت", price: 1500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400" },
  { id: 301, sellerId: 3, name: "فازة خزف يدوي", price: 350, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400" },
];

export default function SellerProductsPage() {
  const { id } = useParams();
  
  // فلترة المنتجات حسب الـ sellerId المستلم من الرابط
  const products = MOCK_PRODUCTS.filter(p => p.sellerId === parseInt(id));

  return (
    <div className="min-h-screen bg-bg-main text-text-main p-6 md:p-12 font-body" dir="rtl">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link to="/user/contact" className="flex items-center gap-2 text-primary hover:gap-4 transition-all w-fit font-bold">
          <ArrowRight size={20} />
          <span>العودة لجميع الحرفيين</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-10 border-r-4 border-primary pr-4 leading-none">معرض المنتجات</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="card group bg-white dark:bg-bg-dark border border-border-main rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-square overflow-hidden bg-bg-subtle relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-black text-primary">{product.price} <small className="text-xs">ر.س</small></span>
                    <button className="btn btn-primary p-3 rounded-2xl shadow-lg shadow-primary/20 active:scale-90 transition-transform">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-bg-subtle/10 rounded-[3rem] border-2 border-dashed border-border-main">
            <ShoppingBag size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
            <p className="text-text-muted text-xl">هذا الحرفي لم يضف منتجات بعد.</p>
          </div>
        )}
      </div>
    </div>
  );
}
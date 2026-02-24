import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, ShoppingBag, ImageOff } from 'lucide-react';
import useDarkMode from '../../../hooks/useDarkMode';

const MOCK_PRODUCTS = [
  { id: 101, sellerId: 1, name: "ثوب مطرز أصيل", price: 850, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=400" },
  { id: 102, sellerId: 1, name: "طرحة شغل يد", price: 200, image: "https://images.unsplash.com/photo-1610030469668-93514276477d?q=80&w=400" },
  { id: 201, sellerId: 2, name: "خاتم فضة ياقوت", price: 1500, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400" },
  { id: 301, sellerId: 3, name: "فازة خزف يدوي", price: 350, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400" },
  { id: 401, sellerId: 4, name: "منتج بدون صورة", price: 500, image: "https://wrong-url.com/image.jpg" },
];

const ProductImage = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-bg-subtle p-4">
        <ImageOff size={48} className="text-text-muted mb-2 opacity-50" />
        <span className="text-sm text-text-muted text-center">الصورة غير متوفرة</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      onError={() => setImageError(true)}
    />
  );
};

export default function SellerProductsPage() {
  const { id } = useParams();
  useDarkMode();
  
  // فلترة المنتجات حسب الـ sellerId
  const products = MOCK_PRODUCTS.filter(p => p.sellerId === parseInt(id));

  return (
    <div className="min-h-screen bg-bg-main text-text-main p-6 md:p-12 font-body transition-colors duration-300" dir="rtl">
      
      {/* رابط العودة - Back Link */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link 
          to="/user/contact"
          className="flex items-center gap-2 text-primary hover:gap-4 transition-all w-fit font-bold"
        >
          <ArrowRight size={20} />
          <span>العودة لجميع الحرفيين</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black border-r-4 border-primary pr-4 leading-none">
            معرض المنتجات
          </h1>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-bg-main border border-border-main rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-bg-subtle relative border-b border-border-main">
                  <ProductImage src={product.image} alt={product.name} />
                </div>

                {/* تفاصيل المنتج */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 text-text-main group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-primary">
                        {product.price} 
                        <span className="text-xs mr-1 font-medium text-text-subtle">ر.س</span>
                      </span>
                    </div>
                    
                    <button className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-90 transition-all">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* حالة عدم وجود منتجات */
          <div className="text-center py-32 bg-bg-subtle/30 rounded-[3rem] border-2 border-dashed border-border-main">
            <ShoppingBag size={48} className="mx-auto text-text-muted mb-4 opacity-30" />
            <p className="text-text-muted text-xl font-bold">هذا الحرفي لم يضف منتجات بعد.</p>
            <Link to="/user/contact" className="mt-4 inline-block text-primary hover:text-primary/80 transition-colors">
              اكتشف مبدعين آخرين
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
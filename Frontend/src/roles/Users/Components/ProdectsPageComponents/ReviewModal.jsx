import React, { useState } from 'react';
import { FiX, FiStar } from "react-icons/fi"; 

export function ReviewModal({ isOpen, onClose, product }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen || !product) return null;

  const handleSubmit = () => {
    console.log("التقييم المرسل:", {
      productId: product.id,
      productTitle: product.title,
      rating,
      comment
    });
    alert(`شكراً لتقييمك لمنتج ${product.title}! (هذا تنبيه استاتيك)`);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        
        <div className="relative p-6 border-b border-gray-100 flex flex-col items-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
          <img src={product.image} alt={product.title} className="w-16 h-16 rounded-2xl object-cover mb-3 shadow-md" />
          <h2 className="text-base font-bold text-gray-800">تقييمك لمنتج {product.title}</h2>
          <p className="text-xs text-gray-500 mt-1">رأيك بيساعد الأسر المنتجة تطور من نفسها</p>
        </div>
        <div className="p-6 text-center" dir="rtl">
          <div className="flex justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  key={index}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  <FiStar 
                    className={`w-9 h-9 transition-colors ${ratingValue <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                  />
                </button>
              );
            })}
          </div>

          <textarea
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all h-24 resize-none"
            placeholder="اكتب تعليقك هنا عن جودة المنتج والتجربة..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            إرسال التقييم
          </button>
        </div>
      </div>
    </div>
  );
}
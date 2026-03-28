import React from "react";

function OrderItem({ item }) {
  // Extract backend populated data safely
  const product = item.product || {};
  const image = product.images?.[0]?.url || "https://via.placeholder.com/150";
  const title = product.name || "منتج غير معروف";
  
  // Calculate price taking discount into account
  const price = product.discountPrice > 0 ? product.discountPrice : product.price;
  
  return (
    <div className="py-4 space-y-6 border-b border-border-main last:border-0">
      <div className="flex items-center gap-4">
        <div className="img-container w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-border-warm">
          <img src={image} title={title} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-text-main">{title}</h3>
          <p className="text-sm mt-1 text-text-subtle">الكمية: {item.quantity}</p>
        </div>
        <div className="text-left">
          <p className="font-bold text-primary">{(price * item.quantity).toLocaleString()} ج.م</p>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
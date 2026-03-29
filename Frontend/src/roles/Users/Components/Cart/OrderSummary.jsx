import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { selectTotalCartPrice } from "../../Features/cartSlice";
import { checkoutThunk } from "../../Features/orderSlice"; 
import useEmailVerification from "../../../../hooks/useEmailVerification"; 
import toast from "react-hot-toast";

function OrderSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const totalPrice = useSelector(selectTotalCartPrice);
  const { checkVerified } = useEmailVerification();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    city: "",
    street: "",
    country: "مصر", // Defaulted to Egypt
    postalCode: "",
  });

  const handleCheckout = async () => {
    if (!shippingAddress.city || !shippingAddress.street || !shippingAddress.country || !shippingAddress.postalCode) {
      toast.error("يرجى إدخال جميع بيانات الشحن الخاصة بك");
      return;
    }

    const isVerified = await checkVerified();
    if (!isVerified) return;

    setIsLoading(true);

    dispatch(checkoutThunk({ paymentMethod, shippingAddress }))
      .unwrap()
      .then((res) => {
        if (paymentMethod === "Stripe" && res.data?.url) {
           window.location.href = res.data.url; 
        } else {
           toast.success("تم تأكيد طلبك بنجاح!");
           navigate("/customer/cart/order-success");
        }
      })
      .catch((err) => {
        toast.error(err || "حدث خطأ أثناء إتمام الطلب");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="lg:col-span-4 h-fit sticky top-28">
      <div className="bg-bg-subtle p-6 rounded-2xl shadow-sm border border-border-warm">
        <h3 className="font-bold text-xl mb-6 text-text-main">{t('cart.summary.title')}</h3>
        
        <div className="flex justify-between items-center mb-4 text-text-subtle">
          <span>{t('cart.summary.subtotal')}</span>
          <span>{totalPrice.toLocaleString()} ج.م</span>
        </div>
        
        <div className="flex justify-between items-center mb-4 text-text-subtle">
          <span>{t('cart.summary.shipping')}</span>
          <span className="text-success-green font-bold">{t('cart.summary.free')}</span>
        </div>
        
        <div className="border-t border-border-main my-4"></div>
        
        <div className="flex justify-between items-center mb-6 font-bold text-lg">
          <span className="text-text-main">{t('cart.summary.total')}</span>
          <span className="text-primary">{totalPrice.toLocaleString()} ج.م</span>
        </div>

        <div className="flex flex-col gap-3 my-6">
          <h4 className="font-bold text-sm text-text-main mb-1">بيانات التوصيل</h4>
          
          <input 
            type="text" 
            placeholder="المدينة (مثال: القاهرة)" 
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
            className="w-full p-3 rounded-xl border border-border-main bg-bg-main text-sm text-text-main focus:outline-none focus:border-primary"
          />
          
          <input 
            type="text" 
            placeholder="العنوان (الشارع، رقم العمارة)" 
            value={shippingAddress.street}
            onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
            className="w-full p-3 rounded-xl border border-border-main bg-bg-main text-sm text-text-main focus:outline-none focus:border-primary"
          />

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="الرمز البريدي (مثال: 11728)" 
              value={shippingAddress.postalCode}
              onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
              className="w-1/2 p-3 rounded-xl border border-border-main bg-bg-main text-sm text-text-main focus:outline-none focus:border-primary"
            />
            <input 
              type="text" 
              placeholder="الدولة" 
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
              className="w-1/2 p-3 rounded-xl border border-border-main bg-bg-main text-sm text-text-main focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 my-6">
          <h4 className="font-bold text-sm text-text-main mb-1">طريقة الدفع</h4>
          
          <label className={`flex items-center gap-3 cursor-pointer p-3 border rounded-xl transition-all ${paymentMethod === "COD" ? "border-primary bg-primary/5" : "border-border-main hover:bg-bg-main"}`}>
            <input 
              type="radio" 
              value="COD" 
              checked={paymentMethod === "COD"} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="accent-primary w-4 h-4"
            />
            <span className={`font-bold text-sm ${paymentMethod === "COD" ? "text-primary" : "text-text-main"}`}>الدفع عند الاستلام (COD)</span>
          </label>
          
          <label className={`flex items-center gap-3 cursor-pointer p-3 border rounded-xl transition-all ${paymentMethod === "Stripe" ? "border-primary bg-primary/5" : "border-border-main hover:bg-bg-main"}`}>
            <input 
              type="radio" 
              value="Stripe" 
              checked={paymentMethod === "Stripe"} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="accent-primary w-4 h-4"
            />
            <span className={`font-bold text-sm ${paymentMethod === "Stripe" ? "text-primary" : "text-text-main"}`}>الدفع بالبطاقة (Stripe)</span>
          </label>
        </div>

        <button 
          onClick={handleCheckout} 
          disabled={isLoading || totalPrice === 0}
          className="btn btn-primary w-full h-12 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {isLoading ? "جاري المعالجة..." : t('cart.summary.checkout_btn')}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
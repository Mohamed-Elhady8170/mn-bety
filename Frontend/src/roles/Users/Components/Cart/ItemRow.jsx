import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  updateQuantityThunk,
  removeFromCartThunk,
} from "../../Features/cartSlice"; 

function ItemRow({ item }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // 1. Read the populated product from the backend
  const product = item.product; 
  
  // Safety check: if product was deleted from DB but is still in cart
  if (!product) return null;

  // 2. Map data to the UI
  const displayPrice = product.discountPrice > 0 ? product.price - product.discountPrice : product.price;
  const mainImage = product.images?.[0]?.url || "https://via.placeholder.com/150";

  // 3. Handlers that talk to Redis
  const handleIncrease = () => {
    if (item.quantity < product.stock) {
      dispatch(updateQuantityThunk({ productId: product._id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantityThunk({ productId: product._id, quantity: item.quantity - 1 }));
    } else {
      // If it's 1 and they click minus, remove it entirely
      dispatch(removeFromCartThunk(product._id));
    }
  };

  return (
    <li className="card flex gap-4">
      <div className="img-container w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-border-main">
        <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-between">
        
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <button
            onClick={() => dispatch(removeFromCartThunk(product._id))}
            className="text-danger hover:bg-danger/10 rounded-full p-2 transition-colors"
            title={t('cart.item.remove_btn')}
          >
            <FaRegTrashAlt size={18} />
          </button>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center gap-3 bg-bg-subtle border border-border-main rounded-xl h-10 px-1">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-main hover:bg-bg-main transition-colors"
            >
              -
            </button>
            <span className="font-bold w-6 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={item.quantity >= product.stock}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-main hover:bg-bg-main transition-colors disabled:opacity-50"
            >
              +
            </button>
          </div>
          <p className="font-bold text-xl text-primary">
            {(displayPrice * item.quantity).toLocaleString()} ج.م
          </p>
        </div>

      </div>
    </li>
  );
}

export default ItemRow;
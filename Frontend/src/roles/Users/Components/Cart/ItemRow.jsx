import React from "react";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../Features/cartSlice";

function ItemRow({ item }) {
  const dispatch = useDispatch();

  return (
    <li className="card flex gap-4">
      <div className="img-container w-24 h-24 shrink-0">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-between">
        <div className="flex-between">
          <h3 className="font-bold text-lg">{item.title["ar"]}</h3>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-danger hover:bg-danger/25 rounded-full p-1 transition-colors"
          >
            <FaRegTrashAlt />
          </button>
        </div>
        <div className="flex-between">
          <div className="flex items-center gap-3 bg-bg-subtle rounded-lg p-1">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className="w-8 h-8 flex-center rounded-md bg-bg-main shadow-sm hover:text-primary"
              disabled={item.quantity <= 0}
            >
              -
            </button>
            <span className="font-bold w-4 text-center">
              {item.quantity || 0}
            </span>
            <button
              onClick={() => dispatch(addToCart(item))}
              className="w-8 h-8 flex-center rounded-md bg-bg-main shadow-sm hover:text-primary"
            >
              +
            </button>
          </div>
          <p className="font-bold text-lg text-primary">
            {item.price * item.quantity || 0}$
          </p>
        </div>
      </div>
    </li>
  );
}

export default React.memo(ItemRow);

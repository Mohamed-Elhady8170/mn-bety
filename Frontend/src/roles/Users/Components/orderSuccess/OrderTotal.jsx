import { useSelector } from "react-redux";
import { selectTotalCartPrice } from "../../Features/cartSlice";

function OrderTotal() {
  // get cart total price & shipping cost
  const totalCartPrice = useSelector(selectTotalCartPrice);
  const shippingCost = 0;
  // sum all cost
  const totalCost = totalCartPrice + shippingCost;

  return (
    <div className="bg-bg-main/25 p-6 border-t border-primary/10 space-y-3">
      <div className="flex-between text-text-muted">
        <span>اجمالى السعر</span>
        <span>{totalCartPrice + " $"}</span>
      </div>
      <div className="flex-between text-text-muted">
        <span>رسوم التوصيل</span>
        <span>{shippingCost + " $"}</span>
      </div>
      <div className="flex-between text-xl font-bold text-text-main pt-3 border-t border-primary/10">
        <h4>الإجمالي الكلي</h4>
        <span className="text-primary">{totalCost + " $"}</span>
      </div>
    </div>
  );
}

export default OrderTotal;

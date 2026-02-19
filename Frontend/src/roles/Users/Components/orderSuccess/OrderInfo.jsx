import { MdOutlineConfirmationNumber } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
function OrderInfo() {
  // for test !!!
  const orderNumber = "#SH-98231";
  const shippingDate = "15 أكتوبر 2023";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="card flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          <MdOutlineConfirmationNumber />
        </div>
        <div>
          <p className="text-sm text-text-muted font-medium">رقم الطلب</p>
          <p className="text-xl font-bold text-text-main">{orderNumber}</p>
        </div>
      </div>
      <div className="card flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          <MdLocalShipping />
        </div>
        <div>
          <p className="text-sm text-text-muted font-medium">
            موعد التوصيل المتوقع
          </p>
          <p className="text-xl font-bold text-text-main">{shippingDate}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;

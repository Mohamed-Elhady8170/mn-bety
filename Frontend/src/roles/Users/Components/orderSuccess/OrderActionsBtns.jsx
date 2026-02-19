import { MdTrackChanges } from "react-icons/md";
import { CiShoppingBasket } from "react-icons/ci";
import { Link } from "react-router-dom";

function OrderActionsBtns() {
  return (
    <div className="max-w-125 mx-auto flex flex-col sm:flex-row sm:justify-center gap-4">
      <button className="btn btn-primary flex-center gap-2 flex-1">
        <MdTrackChanges />
        تتبع الطلب
      </button>
      <Link to="/user/products" className="btn btn-outline flex-center gap-2 flex-1">
        <CiShoppingBasket />
        متابعة التسوق
      </Link>
    </div>
  );
}

export default OrderActionsBtns;

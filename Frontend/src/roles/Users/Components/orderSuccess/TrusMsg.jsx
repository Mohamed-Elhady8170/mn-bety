import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function TrusMsg() {
  return (
    <div className="order-action-btns mt-12 text-center space-y-4">
      <div className="flex-center gap-2 text-primary/60">
        <RiVerifiedBadgeFill className="text-success-green" />
        <span className="text-sm font-medium">ضمان الجودة اليدوية والأصالة</span>
      </div>
      <p className="text-gray-400 text-sm">
        هل لديك استفسار؟
        <Link className="text-primary underline mx-1" href="#">
          تواصل مع خدمة العملاء
        </Link>
      </p>
    </div>
  );
}

export default TrusMsg;

import { FaRegCheckCircle } from "react-icons/fa";

function SuccessMsg() {
  return (
    <div>
      <div className="flex flex-col items-center text-center mb-10">
        <div className="size-20 bg-success-green/10 text-success-green rounded-full flex items-center justify-center mb-6">
          <FaRegCheckCircle className="text-5xl" />
        </div>
        <h1 className="text-text-main text-4xl font-extrabold mb-3">
          شكراً لطلبك!
        </h1>
        <p className="text-text-muted text-lg max-w-md">
          لقد استلمنا طلبك وبدأنا في تجهيزه بكل حب وعناية. ستصلك رسالة تأكيد عبر
          البريد الإلكتروني قريباً.
        </p>
      </div>
    </div>
  );
}

export default SuccessMsg;

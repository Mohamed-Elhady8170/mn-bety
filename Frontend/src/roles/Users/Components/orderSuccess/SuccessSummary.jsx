import OrderTotal from "./OrderTotal";

function SuccessSummary({children}) {
  return (
    <div className="card mb-8">
      <div className="border-b border-primary/5">
        <h2 className="text-text-main text-xl font-bold">ملخص الطلب</h2>
      </div>
        {children}
      <OrderTotal />
    </div>
  );
}
export default SuccessSummary;

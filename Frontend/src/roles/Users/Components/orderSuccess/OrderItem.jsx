function OrderItem({ item }) {
  const { image, title, price, quantity } = item;
  
  return (
    <div className="py-4 space-y-6">
      <div className="flex items-center gap-4">
        <div className="img-container size-20 shrink-0">
          <img src={image} title={title["ar"]} alt={title["ar"]} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-text-main">{title["ar"]}</h3>
          {/* name here is only for test only !!!!*/}
          <p className="text-sm text-text-muted">Mohamed</p>
          <p className="text-sm mt-1 text-text-muted">الكمية: {quantity}</p>
        </div>
        <div className="text-left">
          <p className="font-bold text-primary">{`${price} $`}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;

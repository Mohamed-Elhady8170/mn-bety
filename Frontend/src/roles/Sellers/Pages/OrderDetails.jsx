import React from 'react';
import Header from '../Components/OrderDetailsComponents/Header';
import InfoCardsGrid from '../Components/OrderDetailsComponents/InfoCardsGrid';
import OrdersProducts from '../Components/OrderDetailsComponents/OrdersProducts';

const OrderDetails = () => {
    return (
        <div className="p-6 bg-bg-main min-h-screen dir-rtl" dir="rtl">
            <Header />
            <InfoCardsGrid />
            <OrdersProducts />
        </div>
    );
};

export default OrderDetails;
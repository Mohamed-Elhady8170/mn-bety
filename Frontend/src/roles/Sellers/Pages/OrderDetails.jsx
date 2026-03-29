import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSellerOrders } from '../../Users/Features/orderSlice';
import Header from '../Components/OrderDetailsComponents/Header';
import InfoCardsGrid from '../Components/OrderDetailsComponents/InfoCardsGrid';
import OrdersProducts from '../Components/OrderDetailsComponents/OrdersProducts';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // Pull orders from Redux
    const { sellerOrders, isLoading } = useSelector(state => state.order);

    // If the user refreshed the page directly on the details page, fetch the orders
    useEffect(() => {
        if (!sellerOrders || sellerOrders.length === 0) {
            dispatch(fetchSellerOrders());
        }
    }, [dispatch, sellerOrders]);

    // Find the specific order that matches the URL ID
    const order = sellerOrders?.find(o => o._id === id);

    if (isLoading) return <div className="p-10 text-center font-bold text-primary animate-pulse">جاري تحميل تفاصيل الطلب...</div>;
    if (!order) return <div className="p-10 text-center">لم يتم العثور على الطلب.</div>;

    return (
        <div className="p-6 bg-bg-main min-h-screen dir-rtl" dir="rtl">
            {/* Pass the found order as a prop to all child components! */}
            <Header order={order} />
            <InfoCardsGrid order={order} />
            <OrdersProducts order={order} />
        </div>
    );
};

export default OrderDetails;
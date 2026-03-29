import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyOrders } from '../Features/orderSlice';
import Header from '../../Sellers/Components/OrderDetailsComponents/Header';
import OrdersProducts from '../../Sellers/Components/OrderDetailsComponents/OrdersProducts';

const UserOrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    // 1. Pull USER orders (purchases) instead of SELLER orders (sales)
    const { userOrders, isLoading } = useSelector(state => state.order);

    // 2. Fetch MY orders if they haven't been loaded yet
    useEffect(() => {
        if (!userOrders || userOrders.length === 0) {
            dispatch(fetchMyOrders());
        }
    }, [dispatch, userOrders]);

    // 3. Find the specific order from the user's purchases
    const order = userOrders?.find(o => o._id === id);

    if (isLoading) return <div className="p-10 text-center font-bold text-primary animate-pulse">جاري تحميل تفاصيل الطلب...</div>;
    if (!order) return <div className="p-10 text-center text-text-main font-bold">لم يتم العثور على الطلب.</div>;

    return (
        <div className="layout-container p-12 bg-bg-main min-h-screen dir-rtl" dir="rtl">
            <Header order={order} />
            <OrdersProducts order={order} />
        </div>
    );
};

export default UserOrderDetails;
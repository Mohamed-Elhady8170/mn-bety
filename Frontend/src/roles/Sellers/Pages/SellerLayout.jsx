import { Outlet } from 'react-router-dom';
import SellerSidebar from '../Components/SellerSidebar';
import SellerHeader from '../Components/SellerHeader';
import { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { socket } from "../../../lib/socket";
import toast from "react-hot-toast";
import { fetchNotifications, addLiveNotification } from "../../Users/Features/notificationSlice";

export default function SellerLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
  const userId = user?._id || user?.userId;
  if (userId) {
    dispatch(fetchNotifications());
    socket.connect();
    socket.emit("register", userId);
    
    socket.on("newNotification", (notification) => {
      toast.success(notification.message, {
        icon: "🔔",
        duration: 5000,
        style: { border: "1px solid #e2e8f0", padding: "16px", color: "#1e293b", fontWeight: "bold" },
      });
      dispatch(addLiveNotification(notification));
    });

    return () => {
      socket.off("newNotification");
      socket.disconnect();
    };
  }
}, [user , dispatch]);
  return (
    <div className="min-h-screen bg-bg-main flex font-cairo" dir="rtl">
      <SellerSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <SellerHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-bg-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
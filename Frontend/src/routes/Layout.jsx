import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../roles/Users/Components/Navbar";
import Footer from "../roles/Users/Components/Footer";
import React, { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import toast from "react-hot-toast"; // Assuming you use react-hot-toast
import { socket } from "../lib/socket"; // Adjust the path to the file we just created
import { fetchNotifications, addLiveNotification } from "../roles/Users/Features/notificationSlice";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
   const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Only connect if we have a logged-in user
    // Note: Use user._id or user.userId depending on how it's saved in your Redux state!
    const userId = user?._id || user?.userId;

    if (userId) {
      dispatch(fetchNotifications());
      // Connect to the socket server
      socket.connect();
      // Tell the backend exactly who is connecting (This matches socket.on("register") in backend)
      socket.emit("register", userId);
      //LISTEN FOR REAL-TIME NOTIFICATIONS
      socket.on("newNotification", (notification) => {
        // Pop up a beautiful toast!
        toast.success(notification.message, {
          icon: "🔔",
          duration: 5000,
          style: {
            border: "1px solid #e2e8f0",
            padding: "16px",
            color: "#1e293b",
            fontWeight: "bold",
          },
        });

        dispatch(addLiveNotification(notification));
      });

      // Cleanup: disconnect when the user logs out or leaves the app
      return () => {
        socket.off("newNotification");
        socket.disconnect();
      };
    }
  }, [user , dispatch]);
  return (
    <>
      <Navbar className="print:hidden" />
      <main>
        <Outlet />
      </main>
      <Footer className="print:hidden" />
    </>
  );
};

export default Layout;

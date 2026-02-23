import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../roles/Users/Pages/Home";
import About from "../roles/Users/Pages/About";
import Services from "../roles/Users/Pages/Services";
import LandingPage from "../Auth/Pages/landingPage";
import ProfilePage from "../roles/Users/Pages/ProfilePage";
import ProductPage from "../roles/Users/Pages/ProductPage";
import Cart from "../roles/Users/Pages/Cart";
import OrderSuccess from "../roles/Users/Pages/OrderSuccess";
import Login from "../Auth/Components/login";
import SignUp from "../Auth/Components/signUp";
import AuthLayout from "../Auth/Pages/AuthLayout";
import ForgotPassword from "../Auth/Components/ForgotPassword";
import VerifyCode from "../Auth/Components/VerifyCode";
import ResetPassword from "../Auth/Components/ResetPassword";
import NotFound from "../Auth/Pages/NotFound";
import ProductDetails from "../roles/Users/Pages/ProductDetails";
import WishList from "../roles/Users/Pages/WishList";
import SellersPage from "../roles/Users/Pages/SellerPage";
import OrderHistory from "../roles/Users/Pages/Orderhistory";
import SellerLayout from "../roles/Sellers/Pages/SellerLayout";
import SellerPage from "../roles/Sellers/Pages/SellerPage";
import ManageProducts from "../roles/Sellers/Pages/ManageProducts";
import AddProduct from "../roles/Sellers/Pages/AddProduct";
import ManageOrders from "../roles/Sellers/Pages/ManageOrders";
import StoreProfile from "../roles/Sellers/Pages/StoreProfile";


export const x = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/user",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <SellersPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/details", element: <ProductDetails /> },
      { path: "wishlist", element: <WishList /> },
      { path: "cart", element: <Cart /> },
      { path: "cart/order-success", element: <OrderSuccess /> },
       { path: "my-orders", element: <OrderHistory/> },

    ],
  },
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      { index: true, element: <SellerPage /> },
      { path: "products", element: <ManageProducts /> },
      { path: "addProduct", element: <AddProduct /> },
      { path: "orders", element: <ManageOrders /> },
      { path: "profile", element: <StoreProfile /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import LandingPage from "../../../Auth/Pages/landingPage";
import ProfilePage from "./ProfilePage";
import ProductPage from "./ProductPage";
import Cart from "../Pages/Cart";
import OrderSuccess from "./OrderSuccess";
import Login from "../../../Auth/Components/login";
import SignUp from "../../../Auth/Components/signUp";
import AuthLayout from "../../../Auth/Pages/AuthLayout";
import ForgotPassword from "../../../Auth/Components/ForgotPassword";
import VerifyCode from "../../../Auth/Components/VerifyCode";
import ResetPassword from "../../../Auth/Components/ResetPassword";
import NotFound from "../../../Auth/Pages/NotFound";
import ProductDetails from "./ProductDetails";
import WishList from "./WishList";
import SellersPage from "./SellerPage";
import OrderHistory from "./Orderhistory";
import SellerLayout from "../../Sellers/Pages/SellerLayout";
import SellerPage from "../../Sellers/Pages/SellerPage";
import ManageProducts from "../../Sellers/Pages/ManageProducts";
import AddProduct from "../../Sellers/Pages/AddProduct";
import ManageOrders from "../../Sellers/Pages/ManageOrders";
import StoreProfile from "../../Sellers/Pages/StoreProfile";


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

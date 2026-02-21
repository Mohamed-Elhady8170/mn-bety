import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
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
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/details", element: <ProductDetails /> },
      { path: "wishlist", element: <WishList /> },
      { path: "cart", element: <Cart /> },
      { path: "cart/order-success", element: <OrderSuccess /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

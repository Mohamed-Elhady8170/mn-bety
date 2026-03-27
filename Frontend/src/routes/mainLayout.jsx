import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from '../roles/Users/Pages/Home';
import About from '../roles/Users/Pages/About';
import Services from '../roles/Users/Pages/Services';
import LandingPage from '../Auth/Pages/landingPage';
import ProfilePage from '../roles/Users/Pages/ProfilePage';
import ProductPage from '../roles/Users/Pages/ProductPage';
import Cart from '../roles/Users/Pages/Cart';
import OrderSuccess from '../roles/Users/Pages/OrderSuccess';
import Login from '../Auth/Components/login';
import SignUp from '../Auth/Components/signUp';
import AuthLayout from '../Auth/Pages/AuthLayout';
import ForgotPassword from '../Auth/Components/ForgotPassword';
import ResetPassword from '../Auth/Components/ResetPassword';
import VerifyEmailPage from '../Auth/Pages/VerifyEmailPage'; // NEW
import NotFound from '../Auth/Pages/NotFound';
import ProductDetails from '../roles/Users/Pages/ProductDetails';
import WishList from '../roles/Users/Pages/WishList';
import SellersPage from '../roles/Users/Pages/SellerPage';
import OrderHistory from '../roles/Users/Pages/OrderHistory';
import SellerLayout from '../roles/Sellers/Pages/SellerLayout';
import Dashboard from '../roles/Sellers/Pages/Dashboard';
import ManageProducts from '../roles/Sellers/Pages/ManageProducts';
import AddProduct from '../roles/Sellers/Pages/AddProduct';
import ManageOrders from '../roles/Sellers/Pages/ManageOrders';
import StoreProfile from '../roles/Sellers/Pages/StoreProfile';
import SellerProductsPage from '../roles/Users/Pages/SellerProductsPage';
import OrderDetails from '../roles/Sellers/Pages/OrderDetails';
import UpgradeToSeller from '../roles/Users/Pages/UpgradeToSeller';
import ProtectedRoute from '../routes/ProtectedRoute';
import EditProduct from "../roles/Sellers/Pages/EditProduct";

export const router = createBrowserRouter([
  // ─── Public ─────────────────────────────────────────────────────────────────
  {
    path: '/',
    element: <LandingPage />,
  },

  // ─── Email Verification (public — link from email) ───────────────────────
  // URL: /verify-email?token=xxxx
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },

  // ─── Auth Pages ──────────────────────────────────────────────────────────────
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      // VerifyCode page removed — backend uses email link, not OTP
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },

  // ─── Customer Area ───────────────────────────────────────────────────────────
  {
    path: '/customer',
    element: (
      <ProtectedRoute requiredRole="customer">
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <SellersPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'products', element: <ProductPage /> },
      { path: 'products/:idOrSlug', element: <ProductDetails /> },
      { path: 'wishlist', element: <WishList /> },
      { path: 'cart', element: <Cart /> },
      { path: 'cart/order-success', element: <OrderSuccess /> },
      { path: 'my-orders', element: <OrderHistory /> },
      { path: 'seller-products/:id', element: <SellerProductsPage /> },
      { path: 'upgrade-to-seller', element: <UpgradeToSeller /> },
    ],
  },

  // ─── Seller Area ─────────────────────────────────────────────────────────────
  {
    path: '/seller',
    element: (
      <ProtectedRoute requiredRole="seller">
        <SellerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <ManageProducts /> },
      { path: 'addProduct', element: <AddProduct /> },
      { path: 'orders', element: <ManageOrders /> },
      { path: 'profile', element: <StoreProfile /> },
      { path: 'seeorderdetails', element: <OrderDetails /> },
      { path: "editProduct/:id", element: <EditProduct /> },
    ],
  },

  // ─── 404 ─────────────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <NotFound />,
  },
]);
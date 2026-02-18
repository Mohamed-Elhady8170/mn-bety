import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import LandingPage from '../../../Auth/Pages/landingPage'; 
import ProfilePage from './ProfilePage';
import ProductPage from './ProductPage';
import Login from '../../../Auth/Components/login';
import SignUp from '../../../Auth/Components/signUp';
import AuthLayout from '../../../Auth/Pages/AuthLayout';


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
      // { path: "reset-password", element: <ResetPassword /> },
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
    ],
  },
   {
    path: "*",
    element: <div>404 - الصفحة مش موجودة</div>,
  },
]);
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import LandingPage from '../../../Auth/landingPage'; 
import ProfilePage from './ProfilePage';


export const x = createBrowserRouter([
  {
    // 1. المسار الرئيسي للموقع هيفتح صفحة اللاندنج
    path: "/",
    element: <LandingPage />, 
  },
  {
    // 2. مسار المستخدم (بعد تسجيل الدخول)
    // لما تعمل navigate("/user") هيدخل هنا ويظهر الناف بار بتاعك
    path: "/user", 
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> }, 
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
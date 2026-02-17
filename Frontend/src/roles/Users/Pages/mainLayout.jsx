
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Services from './Services';
export const x = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> }, 
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
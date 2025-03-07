import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFound from './Components/Notfound/NotFound';
import Login from './Pages/Login';
import Menu from './Pages/Menushow';
import MenuShow from './Pages/Menushow';
import ProfilePage from './Pages/ProfilePage';

// Step 3: Define Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  }, 
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: "/menu",
    element: <MenuShow />,
  },
  {
    path:"/profile",
    element: <ProfilePage/>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Step 4: Render the RouterProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

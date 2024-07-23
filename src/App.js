import React from 'react';
import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from './Pages/SignupPage';

import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';

import ProductDetailPage from './Pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
    
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout/></Protected>,
  },
  {
    path: "/productdetail/:id",
    element:<Protected> <ProductDetailPage/></Protected>,
  },
]);


function App() {
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchIteamsById } from './features/Cart/cartAPI';
// import { selectLoggedInUser } from './features/auth/AuthSlice';
import { fetchIteamsByIdAsync } from './features/Cart/cartSlice';
import Page404 from './Pages/Page404';
import OrderSuccessPage from './Pages/OrderSuccessPage';
import UserOrders from './features/user/components/UserOrders';
import UserOrdersPage from './Pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile';
import UserProfilePage from './Pages/UserProfilePage';
import { fetchLoggedInUserAsync, fetchLoggedInUserOrdersAsync } from './features/user/UserSlice';
import { selectLoggedInUser } from './features/auth/AuthSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './Pages/AdminHome';
import AdminProductDetailPage from './Pages/AdminProductDetailPage ';
import ProductForm from './features/admin/ProductForm';
import AdminProductFormPage from './Pages/AdminProductFormPage';
import AdminOrdersPage from './Pages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
    
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome/></ProtectedAdmin>,
    
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
  {
    path: "/admin/productdetail/:id",
    element:<ProtectedAdmin> <AdminProductDetailPage/></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element:<ProtectedAdmin> <AdminProductFormPage/></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element:<ProtectedAdmin> <AdminOrdersPage/></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element:<ProtectedAdmin> <AdminProductFormPage/></ProtectedAdmin>,
  },
  {
    path: "*",
    element:<Page404/>,
  },
  {
    path: "/orderSuccess/:id",
    element:<OrderSuccessPage/>,
  },
  {
    path: "/orders",
    element:<UserOrdersPage/>,
  },
  {
    path: "/profile",
    element:<UserProfilePage/>,
  },
  {
    path: "/logout",
    element:<Logout/>,
  },
  {
    path: "/forgot-password",
    element:<ForgotPasswordPage/>,
  },
]);


function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  
  useEffect(()=>{
    if(user){
      dispatch(fetchIteamsByIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

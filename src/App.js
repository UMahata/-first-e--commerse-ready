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
import { selectLoggedInUser } from './features/auth/AuthSlice';
import { fetchIteamsByIdAsync } from './features/Cart/cartSlice';

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
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  
  useEffect(()=>{
    if(user){
      dispatch(fetchIteamsByIdAsync(user.id))
    }
  },[dispatch,user])

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

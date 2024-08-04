import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductListSlice'
import authReducer from '../features/auth/AuthSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/Order/orderSlice';
import userReducr from '../features/user/UserSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducr
  },
});

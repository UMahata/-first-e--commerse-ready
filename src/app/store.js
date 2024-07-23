import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product-list/ProductListSlice'
import authReducer from '../features/auth/AuthSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer
  },
});

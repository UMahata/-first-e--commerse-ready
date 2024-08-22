import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteCart,deleteItemFromCart,fetchIteamsById,resetCart,updateCart } from './cartAPI';

const initialState = {
  status:'ideal',
  items: [],
  
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchIteamsByIdAsync = createAsyncThunk(
  'cart/fetchIteamsById',
  async () => {
    const response = await fetchIteamsById();
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
   
    
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload) 
      })
      .addCase(fetchIteamsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIteamsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload ;
      })
      .addCase( updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase( updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload.id)
        state.items[index]= action.payload ;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        const index = state.items.findIndex(item=>item.product.id === action.payload)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
        
        
      })
  },
});

export const { increment} = counterSlice.actions;

export const selectIteams = (state) => state.cart.items;




export default counterSlice.reducer;

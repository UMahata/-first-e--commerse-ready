import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllProducts ,fetchBrands,fetchCategories,fetchProductById,fetchProductsByFilters, updateProduct} from './ProductListAPI';

const initialState = {
  products: [],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts(); 
  return (response.data);
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id); 
  return (response.data);
  
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    
    
    return (response.data);
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/categories',
  async () => {
    const response = await fetchCategories();
       return (response.data);
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'product/brands',
  async () => {
    const response = await fetchBrands();
       return (response.data);
  }
);
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
       return (response.data);
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
       return (response.data);
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    ClearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.products = action.payload;
       
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems
       

      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.products.push(action.payload) ;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        const index = state.products.findIndex(product=>product.id === action.payload.id)
        state.products[index]= action.payload
      })
  },
});

export const { ClearSelectedProduct} = productSlice.actions;
export const selectBrands =(state)=>state.product.brands
export const selectCategories =(state)=>state.product.categories
export const selectedProductById =(state)=>state.product.selectedProduct
export const selectedProductListStatus =(state)=>state.product.status
export const allProducts =(state)=>state.product.products



export default productSlice.reducer;

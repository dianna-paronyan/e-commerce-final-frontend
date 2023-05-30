import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Image {
  fileName: string;
}

export interface ProductSt {
  id: number;
  name: string;
  price: number;
  description: string;
  Images: Image[];
  quantity: number;
}

interface ProductState {
  products: ProductSt[];
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ProductState = {
  products: [],
  error: null,
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("http://localhost:5000/products");
    const json = res.json();
    return json;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id?: string) => {
    const res = await fetch(`http://localhost:5000/product/${id}`);
    const json = res.json();
    return json;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductSt[]>) => {
          state.status = "success";
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.products.push(payload);
      });
  },
});

export default productsSlice.reducer;
export const allProducts = (state: RootState): ProductSt[] => state.products.products;

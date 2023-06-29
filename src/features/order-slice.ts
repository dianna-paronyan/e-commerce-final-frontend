import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';

interface Image {
  fileName: string;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  Image: Image;
}

interface Order {
  cartId: number;
  total: number;
  products: Product[];
}

interface Param {
  token: string;
  cartId: number;
  products: Product[];
}

interface PaymentState {
  status: string;
  clientSecret: string;
  orders: Order[];
  error: string | null;
}

const initialState: PaymentState = {
  status: 'idle',
  clientSecret: '',
  orders: [],
  error: null,
};

export interface UserStorage {
  jwt: string;
  status: string;
  role: number;
  userName: string;
  is_verified: number;
}

const userInStorage = localStorage.getItem("user");
const user: UserStorage  = userInStorage && JSON.parse(userInStorage);
const authorizationHeader = user ? user.jwt : '';

export const createPaymentOrder = createAsyncThunk(
  'paymentOrder/createPaymentOrder',
  async ({ token, cartId, products }: Param) => {
    try {
      const response = await axios.post('http://localhost:5000/createOrderPayment', {
        token,
        cartId,
        products,
      },
      {
        headers: {
          Authorization: authorizationHeader,
        }
      }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to create payment intent');
    }
  }
);

export const orderById = createAsyncThunk(
  'orders/orderById',
  async (id?: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/order/${id}`,{
        // headers:{
        //   Authorization: authorizationHeader
        // }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch order by ID');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPaymentOrder.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.clientSecret = payload;
        state.orders = payload.order;
      })
      .addCase(orderById.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.orders = payload;
        console.log(payload,'orders');
      });
  },
});

export default orderSlice.reducer;
export const getOrders = (state: RootState): Order[] => state.orders.orders;


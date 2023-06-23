import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products-slice";
import usersReducer from "../features/users-slice";
import cartReducer from "../features/cart-slice";
import orderReducer from "../features/order-slice";
import categoriesReducer from "../features/categories-slice";

export const store = configureStore({
    reducer:{
        products: productsReducer,
        users: usersReducer,
        carts: cartReducer,
        categories:categoriesReducer,
        orders: orderReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>



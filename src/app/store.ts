import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products-slice";
import usersReducer from "../features/users-slice";
import cartReducer from "../features/cart-slice";

export const store = configureStore({
    reducer:{
        products: productsReducer,
        users: usersReducer,
        carts: cartReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Layout from "../Layouts/Layout";
import Cart from "../components/Cart";
import Product from "../Pages/SingleProduct/Product";
import CartItemCount from "../Providers/CartItemCount";
import Category from "../Pages/Categories/Category";
import Products from "../Pages/Products/Products";
import Ordered from "../Pages/Orders/Ordered";
import NotFound from "../components/NotFound";
import ProtectedRoute from "./ProtectedRoutes";


function AppRoutes() {
  return (
    <CartItemCount>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/cartItem/:id" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/ordered/:cartId" element={<ProtectedRoute><Ordered /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </CartItemCount>
  );
}

export default AppRoutes;

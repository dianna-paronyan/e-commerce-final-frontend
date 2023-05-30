import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Layout from '../Layouts/Layout';
import Cart from "../components/Cart";
import Product from "../Pages/SingleProduct/Product";

function AppRoutes(){
  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartItem/:id" element={<Cart />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes
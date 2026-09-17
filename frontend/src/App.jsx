import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";

import AdminRoutes from "./admin/AdminRoutes";

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <CartProvider>

          <AdminProvider>

            <NavBar />

            <Routes>

              {/* Customer pages */}

              <Route path="/" element={<Home />} />

              <Route
                path="/categories"
                element={<Categories />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/products/:id"
                element={<ProductDetails />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/order-success"
                element={<OrderSuccess />}
              />

              {/* Authentication */}

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              {/* Admin */}

              <Route
                path="/admin/*"
                element={<AdminRoutes />}
              />
              <Route path="/checkout" element={<Checkout />} />

            </Routes>

          </AdminProvider>

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
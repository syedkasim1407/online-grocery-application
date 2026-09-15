import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";


import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route
            path="/login"
            element={<Login/>}
          />

          <Route
            path="/register"
            element={<Register/>}
          />

          <Route
            path="/cart"
            element={<Cart/>}
          />
          <Route
                path="/admin/*"
                element={
                  <AdminRoutes />
                }
          />
        </Routes>
      </AdminProvider>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
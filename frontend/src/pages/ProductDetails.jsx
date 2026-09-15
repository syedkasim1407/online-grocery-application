import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find product using URL id
  const product = products.find(
    (product) => product.id === Number(id)
  );

  const { cartItems, addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Set quantity from cart when product page is opened
  useEffect(() => {
    if (!product) return;

    const cartItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [product?.id]);

  // Product not found
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-red-600">
          Product not found
        </h1>
      </div>
    );
  }

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  };

  // Add / update cart
  const handleAddToCart = () => {
    // User must login first
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Add selected quantity to cart
    addToCart(product, quantity);

    // Show success message
    setAddedToCart(true);

    // Hide message after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-6xl px-6">

        {/* Back Button */}
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-green-600"
        >
          ← Back to Products
        </Link>

        {/* Product Container */}
        <div className="grid grid-cols-1 gap-10 rounded-2xl bg-white p-8 shadow-md md:grid-cols-2">

          {/* ================= IMAGE ================= */}

          <div className="flex items-center justify-center rounded-xl bg-gray-100 p-6">

            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-[400px] w-full rounded-xl object-cover"
            />

          </div>

          {/* ================= PRODUCT INFO ================= */}

          <div className="flex flex-col justify-center">

            {/* Brand */}
            <p className="font-semibold text-green-600">
              {product.brand}
            </p>

            {/* Product Name */}
            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Description */}
            <p className="mt-5 text-lg leading-8 text-gray-600">
              {product.description}
            </p>

            {/* Unit */}
            <p className="mt-5 text-gray-500">
              Unit: {product.unit}
            </p>

            {/* Price */}
            <p className="mt-4 text-3xl font-bold text-green-600">
              ₹{product.price}
            </p>

            {/* Stock */}
            <p className="mt-3 text-sm text-gray-500">
              Available stock: {product.stock}
            </p>

            {/* ================= QUANTITY ================= */}

            {product.available ? (

              <div className="mt-8">

                <p className="mb-3 font-semibold text-gray-900">
                  Quantity
                </p>

                <div className="flex items-center gap-4">

                  {/* Decrease */}
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-xl font-bold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    -
                  </button>

                  {/* Quantity */}
                  <span className="w-8 text-center text-lg font-semibold">
                    {quantity}
                  </span>

                  {/* Increase */}
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-xl font-bold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>

                </div>

                {/* ================= ADD TO CART ================= */}

                <button
                  onClick={handleAddToCart}
                  className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  {isAuthenticated
                    ? "Add To Cart"
                    : "Login To Add"}
                </button>

                {/* Success Message */}
                {addedToCart && (
                  <p className="mt-3 font-medium text-green-600">
                    ✓ {quantity} item(s) added to your cart.
                  </p>
                )}

              </div>

            ) : (

              /* ================= OUT OF STOCK ================= */

              <button
                disabled
                className="mt-8 cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-500"
              >
                Out of Stock
              </button>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;
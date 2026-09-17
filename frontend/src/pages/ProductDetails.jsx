import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { cartItems, addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [quantityChanged, setQuantityChanged] = useState(false);

  const [addedToCart, setAddedToCart] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);

        setError("Product not found");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =====================================================
  // FIND PRODUCT IN CART
  // =====================================================

  const cartItem = product
    ? cartItems.find(
        (item) => item.productId === product.id
      )
    : null;

  // =====================================================
  // DISPLAY QUANTITY
  // =====================================================

  const displayedQuantity =
    quantityChanged && quantity !== undefined
      ? quantity
      : cartItem
      ? cartItem.quantity
      : quantity;

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = () => {
    setQuantityChanged(true);

    setQuantity((current) =>
      Math.max(1, displayedQuantity - 1)
    );
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    setQuantityChanged(true);

    setQuantity((current) =>
      Math.min(product.stock, displayedQuantity + 1)
    );
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = async () => {

    // User must login first
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const result = await addToCart(
      product,
      displayedQuantity
    );

    if (!result?.success) {
      setError(
        result?.message ||
        "Failed to add product to cart"
      );

      return;
    }

    // Show success message
    setAddedToCart(true);

    // Reset quantity state
    setQuantityChanged(false);

    // Hide message after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Loading product...
        </p>
      </div>
    );
  }

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (error && !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <h1 className="text-2xl font-bold text-red-600">
            Product not found
          </h1>

          <Link
            to="/products"
            className="mt-4 inline-block font-semibold text-green-600 hover:text-green-700"
          >
            ← Back to Products
          </Link>

        </div>

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

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

            {product.available && product.stock > 0 ? (

              <div className="mt-8">

                <p className="mb-3 font-semibold text-gray-900">
                  Quantity
                </p>

                <div className="flex items-center gap-4">

                  {/* Decrease */}

                  <button
                    onClick={decreaseQuantity}
                    disabled={displayedQuantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-xl font-bold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    -
                  </button>

                  {/* Quantity */}

                  <span className="w-8 text-center text-lg font-semibold">
                    {displayedQuantity}
                  </span>

                  {/* Increase */}

                  <button
                    onClick={increaseQuantity}
                    disabled={
                      displayedQuantity >= product.stock
                    }
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

                {/* Error */}

                {error && (
                  <p className="mt-3 font-medium text-red-600">
                    {error}
                  </p>
                )}

                {/* Success */}

                {addedToCart && (
                  <p className="mt-3 font-medium text-green-600">
                    ✓ {displayedQuantity} item(s) added to your cart.
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
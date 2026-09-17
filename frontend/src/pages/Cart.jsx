import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    loading,
  } = useCart();

  const { isAuthenticated } = useAuth();

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 py-20">

        <div className="mx-auto max-w-2xl px-6 text-center">

          <div className="rounded-2xl bg-white p-10 shadow-md">

            <div className="text-7xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Please Login
            </h1>

            <p className="mt-3 text-gray-600">
              Login to view your shopping cart.
            </p>

            <Link
              to="/login"
              className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Login
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-20">

        <div className="flex items-center justify-center">

          <p className="text-gray-600">
            Loading your cart...
          </p>

        </div>

      </main>
    );
  }

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-20">

        <div className="mx-auto max-w-2xl px-6 text-center">

          <div className="rounded-2xl bg-white p-10 shadow-md">

            <div className="text-7xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Your Cart Is Empty
            </h1>

            <p className="mt-3 text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // =====================================================
  // CART PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-10">

          <p className="font-semibold text-green-600">
            Your Shopping Bag
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            My Cart
          </h1>

        </div>

        {/* Cart Layout */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Items */}

          <div className="space-y-5 lg:col-span-2">

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}

          </div>

          {/* Summary */}

          <div>

            <CartSummary
              cartItems={cartItems}
              cartTotal={cartTotal}
            />

          </div>

        </div>

      </div>

    </main>
  );
}

export default Cart;
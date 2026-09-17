import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    loading,
  } = useCart();

  const { isAuthenticated } = useAuth();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 py-20">

        <div className="mx-auto max-w-2xl px-6 text-center">

          <div className="rounded-2xl bg-white p-10 shadow-md">

            <h1 className="text-3xl font-bold text-gray-900">
              Please Login
            </h1>

            <p className="mt-3 text-gray-600">
              Login to continue with checkout.
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

        <div className="flex justify-center">

          <p className="text-gray-600">
            Loading checkout...
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
              Add some products before proceeding to checkout.
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
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();

    setError("");

    // Validate address
    if (!deliveryAddress.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    try {

      setPlacingOrder(true);

      const orderData = {
        deliveryAddress: deliveryAddress.trim(),
        paymentMethod: paymentMethod,
      };

      const response = await api.post(
        "/order/place",
        orderData
      );

      console.log(
        "Order placed successfully:",
        response.data
      );

      // Backend returns OrderResponseDTO
      const orderId = response.data.id;

      // Go to success page
      navigate(`/order-success/${orderId}`);

    } catch (error) {

      console.error(
        "Error placing order:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to place order. Please try again."
      );

    } finally {

      setPlacingOrder(false);

    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-7xl px-6">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-10">

          <Link
            to="/cart"
            className="font-semibold text-gray-600 hover:text-green-600"
          >
            ← Back to Cart
          </Link>

          <p className="mt-6 font-semibold text-green-600">
            Complete Your Purchase
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Checkout
          </h1>

        </div>

        {/* =================================================
            CHECKOUT LAYOUT
        ================================================= */}

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="space-y-8 lg:col-span-2">

            {/* DELIVERY ADDRESS */}

            <div className="rounded-xl bg-white p-6 shadow-md">

              <h2 className="text-xl font-bold text-gray-900">
                Delivery Address
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter the address where you want your order delivered.
              </p>

              <textarea
                value={deliveryAddress}
                onChange={(e) =>
                  setDeliveryAddress(e.target.value)
                }
                placeholder="Enter your complete delivery address"
                rows="5"
                required
                className="mt-5 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
              />

            </div>

            {/* PAYMENT METHOD */}

            <div className="rounded-xl bg-white p-6 shadow-md">

              <h2 className="text-xl font-bold text-gray-900">
                Payment Method
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Select how you want to pay for your order.
              </p>

              <div className="mt-5 space-y-3">

                {/* COD */}

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order is delivered.
                    </p>
                  </div>

                </label>

                {/* UPI */}

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      UPI
                    </p>

                    <p className="text-sm text-gray-500">
                      UPI payment option.
                    </p>
                  </div>

                </label>

                {/* CARD */}

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CARD"
                    checked={paymentMethod === "CARD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Card
                    </p>

                    <p className="text-sm text-gray-500">
                      Card payment option.
                    </p>
                  </div>

                </label>

                {/* NET BANKING */}

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="NET_BANKING"
                    checked={paymentMethod === "NET_BANKING"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Net Banking
                    </p>

                    <p className="text-sm text-gray-500">
                      Net banking payment option.
                    </p>
                  </div>

                </label>

              </div>

              {/* NOTE */}

              <div className="mt-5 rounded-lg bg-green-50 p-4">

                <p className="text-sm text-green-700">
                  No payment gateway is connected. The selected
                  payment method will be stored with your order.
                </p>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="rounded-lg bg-red-50 p-4">

                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>

              </div>
            )}

          </div>

          {/* =================================================
              RIGHT SIDE — ORDER SUMMARY
          ================================================= */}

          <div>

            <div className="rounded-xl bg-white p-6 shadow-md">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="mt-6 space-y-4">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >

                    <div className="flex-1">

                      <p className="font-medium text-gray-900">
                        {item.productName}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹{Number(item.productPrice).toFixed(2)}
                        {" × "}
                        {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold text-gray-900">
                      ₹{Number(item.price).toFixed(2)}
                    </p>

                  </div>

                ))}

              </div>

              {/* TOTAL */}

              <div className="mt-6 border-t pt-5">

                <div className="flex justify-between text-gray-600">

                  <span>
                    Items
                  </span>

                  <span>
                    {cartItems.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    )}
                  </span>

                </div>

                <div className="mt-3 flex justify-between text-gray-600">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{Number(cartTotal).toFixed(2)}
                  </span>

                </div>

                <div className="mt-4 flex justify-between border-t pt-4">

                  <span className="text-lg font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-green-600">
                    ₹{Number(cartTotal).toFixed(2)}
                  </span>

                </div>

              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                disabled={placingOrder}
                className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </main>
  );
}

export default Checkout;
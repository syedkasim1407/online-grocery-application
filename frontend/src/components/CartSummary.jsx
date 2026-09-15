import { Link } from "react-router-dom";

function CartSummary({ cartItems, cartTotal }) {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">

      <h2 className="text-xl font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between text-gray-600">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">
              Total
            </span>

            <span className="text-xl font-bold text-green-600">
              ₹{cartTotal.toFixed(2)}
            </span>
          </div>
        </div>

      </div>

      <Link
        to="/checkout"
        className="mt-6 block w-full rounded-lg bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
      >
        Proceed To Checkout
      </Link>

    </div>
  );
}

export default CartSummary;
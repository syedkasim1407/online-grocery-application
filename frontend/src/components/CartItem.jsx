function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">

      {/* Image */}
      <img
        src={item.imageURL}
        alt={item.productName}
        className="h-24 w-24 rounded-lg object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">

        <h2 className="mt-1 text-lg font-bold text-gray-900">
          {item.productName}
        </h2>

        <p className="mt-2 font-semibold text-green-600">
          ₹{Number(item.productPrice).toFixed(2)}
        </p>

      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">

        {/* Decrease */}
        <button
          onClick={() =>
            onUpdateQuantity(
              item.productId,
              Math.max(1, item.quantity - 1)
            )
          }
          disabled={item.quantity <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          -
        </button>

        {/* Quantity */}
        <span className="w-6 text-center font-semibold">
          {item.quantity}
        </span>

        {/* Increase */}
        <button
          onClick={() =>
            onUpdateQuantity(
              item.productId,
              item.quantity + 1
            )
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-bold hover:bg-gray-100"
        >
          +
        </button>

      </div>

      {/* Item Total */}

      <p className="w-24 text-right font-bold text-gray-900">
        ₹{Number(item.price).toFixed(2)}
      </p>

      {/* Remove */}

      <button
        onClick={() => onRemove(item.id)}
        className="text-sm font-medium text-red-500 hover:text-red-700"
      >
        Remove
      </button>

    </div>
  );
}

export default CartItem;
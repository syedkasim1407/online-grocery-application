import { Link } from "react-router-dom";
function ProductCard({ product }) {
    return (
      <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="h-52 w-full bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
  
        {/* Product Information */}
        <div className="p-5">
  
          <p className="text-sm font-medium text-green-600">
            {product.brand}
          </p>
          <Link to={`/products/${product.id}`}>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {product.name}
            </h2>
          </Link>
  
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {product.description}
          </p>
  
          <p className="mt-3 text-sm text-gray-500">
            {product.unit}
          </p>
  
          <div className="mt-4 flex items-center justify-between">
  
            <p className="text-xl font-bold text-green-600">
              ₹{product.price}
            </p>
  
            {product.available ? (
            <Link
              to={`/products/${product.id}`}
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
            >
              Add
            </Link>
            ) : (
              <span className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600">
                Out of Stock
              </span>
            )}
  
          </div>
  
        </div>
      </div>
    );
  }
  
  export default ProductCard;
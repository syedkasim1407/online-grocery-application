import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
      <Link
        to={`/products?category=${encodeURIComponent(category.name)}`}
        className="block overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
      >
      <img
        src={category.imageUrl}
        alt={category.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900">
          {category.name}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

export default CategoryCard;
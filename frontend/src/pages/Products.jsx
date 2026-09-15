import { useSearchParams } from "react-router-dom";

import ProductList from "../components/ProductList";
import { useAdmin } from "../context/AdminContext";

function Products() {
  const [searchParams] = useSearchParams();
  const { products } = useAdmin();
  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter(
        (product) => product.category === category
      )
    : products;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <section className="bg-green-50 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <p className="font-semibold text-green-600">
            {category ? "Category" : "Fresh From Our Store"}
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            {category || "All Products"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {category
              ? `Explore our ${category.toLowerCase()} products.`
              : "Explore our fresh groceries and everyday essentials."}
          </p>

        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">

          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                No Products Found
              </h2>

              <p className="mt-2 text-gray-600">
                There are no products in this category.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Products;
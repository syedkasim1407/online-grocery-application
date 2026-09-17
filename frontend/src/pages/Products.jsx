import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductList from "../components/ProductList";

import {
  getProducts,
  getProductsByCategory,
} from "../services/productService";

import { getCategories } from "../services/categoryService";

function Products() {

  const [searchParams] = useSearchParams();

  const categoryIdFromUrl =
    searchParams.get("categoryId");

  const categoryNameFromUrl =
    searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(categoryIdFromUrl || "");

  const [sortBy, setSortBy] = useState("");

  const [visibleCount, setVisibleCount] =
    useState(10);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =====================================================
  // FETCH CATEGORIES
  // =====================================================

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const data = await getCategories();

        setCategories(data);

      } catch (error) {

        console.error(
          "Error fetching categories:",
          error
        );

      }

    };

    fetchCategories();

  }, []);


  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);
        setError("");

        let data;

        // -------------------------------------------------
        // CATEGORY SELECTED
        // -------------------------------------------------

        if (categoryIdFromUrl) {

          data =
            await getProductsByCategory(
              categoryIdFromUrl
            );

        }

        // -------------------------------------------------
        // NO CATEGORY
        // -------------------------------------------------

        else {

          data = await getProducts();

        }

        setProducts(data);

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

        setProducts([]);

        setError(
          "Failed to load products"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, [categoryIdFromUrl]);


  // =====================================================
  // CATEGORY FROM URL
  // =====================================================

  useEffect(() => {

    setSelectedCategory(
      categoryIdFromUrl || ""
    );

    setVisibleCount(10);

  }, [categoryIdFromUrl]);


  // =====================================================
  // FILTER + SEARCH
  // =====================================================

  let filteredProducts =
    products.filter((product) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchText) ||

        product.brand
          ?.toLowerCase()
          .includes(searchText);

      return matchesSearch;

    });


  // =====================================================
  // OLD NAME-BASED CATEGORY URL
  // =====================================================

  // This keeps old Home page links working.
  //
  // Example:
  // /products?category=Fruits

  if (
    categoryNameFromUrl &&
    !categoryIdFromUrl
  ) {

    filteredProducts =
      products.filter((product) => {

        const searchText =
          search.toLowerCase();

        const matchesSearch =
          product.name
            ?.toLowerCase()
            .includes(searchText) ||

          product.brand
            ?.toLowerCase()
            .includes(searchText);

        const matchesCategory =
          product.category?.name
            ?.toLowerCase() ===
          categoryNameFromUrl.toLowerCase();

        return (
          matchesSearch &&
          matchesCategory
        );

      });

  }


  // =====================================================
  // SORT
  // =====================================================

  if (sortBy === "price-low-high") {

    filteredProducts.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  if (sortBy === "price-high-low") {

    filteredProducts.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  if (sortBy === "name-a-z") {

    filteredProducts.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );

  }

  if (sortBy === "name-z-a") {

    filteredProducts.sort(
      (a, b) =>
        b.name.localeCompare(a.name)
    );

  }


  // =====================================================
  // VISIBLE PRODUCTS
  // =====================================================

  const visibleProducts =
    filteredProducts.slice(
      0,
      visibleCount
    );


  // =====================================================
  // SEARCH CHANGE
  // =====================================================

  const handleSearchChange = (e) => {

    setSearch(e.target.value);

    setVisibleCount(10);

  };


  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (e) => {

    const categoryId =
      e.target.value;

    setSelectedCategory(categoryId);

    setVisibleCount(10);

    // URL is updated through normal navigation
    // using the current browser URL.

    const newUrl =
      categoryId
        ? `/products?categoryId=${categoryId}`
        : "/products";

    window.history.pushState(
      {},
      "",
      newUrl
    );

    // Trigger React Router to notice URL change
    window.dispatchEvent(
      new PopStateEvent("popstate")
    );

  };


  // =====================================================
  // SORT CHANGE
  // =====================================================

  const handleSortChange = (e) => {

    setSortBy(e.target.value);

    setVisibleCount(10);

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <p className="text-gray-600">
          Loading products...
        </p>

      </div>
    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <p className="text-red-600">
          {error}
        </p>

      </div>
    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <main className="px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-2 text-gray-600">
            Browse our grocery products
          </p>

        </div>


        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          />


          {/* CATEGORY */}

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          >

            <option value="">
              All Categories
            </option>

            {categories
              .filter(
                (category) =>
                  category.active
              )
              .sort((a, b) =>
                a.name.localeCompare(
                  b.name
                )
              )
              .map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>

              ))}

          </select>


          {/* SORT */}

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          >

            <option value="">
              Sort By
            </option>

            <option value="price-low-high">
              Price: Low to High
            </option>

            <option value="price-high-low">
              Price: High to Low
            </option>

            <option value="name-a-z">
              Name: A to Z
            </option>

            <option value="name-z-a">
              Name: Z to A
            </option>

          </select>

        </div>


        {/* =================================================
            PRODUCT COUNT
        ================================================= */}

        <div className="mb-5 text-sm text-gray-500">

          Showing{" "}
          {visibleProducts.length}
          {" "}of{" "}
          {filteredProducts.length}
          {" "}products

        </div>


        {/* =================================================
            PRODUCTS
        ================================================= */}

        {visibleProducts.length === 0 ? (

          <div className="py-16 text-center">

            <p className="text-gray-600">
              No products found.
            </p>

          </div>

        ) : (

          <ProductList
            products={visibleProducts}
          />

        )}


        {/* =================================================
            LOAD MORE
        ================================================= */}

        {visibleCount <
          filteredProducts.length && (

          <div className="mt-10 flex justify-center">

            <button
              onClick={() =>
                setVisibleCount(
                  (previous) =>
                    previous + 10
                )
              }
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Load More
            </button>

          </div>

        )}

      </div>

    </main>

  );
}

export default Products;
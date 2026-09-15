import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import { useAdmin } from "../../context/AdminContext";

function AdminProducts() {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useAdmin();

  const [showForm, setShowForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    unit: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    available: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      unit: "",
      brand: "",
      price: "",
      stock: "",
      category: "",
      available: true,
    });

    setEditingProduct(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      available: Number(formData.stock) > 0,
    };

    if (editingProduct) {
      updateProduct({
        ...product,
        id: editingProduct.id,
      });
    } else {
      addProduct(product);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      unit: product.unit,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      category: product.category,
      available: product.available,
    });

    setShowForm(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="flex">

        <AdminSidebar />

        <section className="flex-1 p-8">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Products
              </h1>

              <p className="mt-2 text-gray-600">
                Add, edit and remove products.
              </p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              + Add Product
            </button>

          </div>

          {/* Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-xl bg-white p-6 shadow-sm"
            >

              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  required
                  className="rounded-lg border px-4 py-3"
                />

                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  required
                  className="rounded-lg border px-4 py-3"
                />

                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="Unit e.g. 1 kg"
                  required
                  className="rounded-lg border px-4 py-3"
                />

                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  min="0"
                  required
                  className="rounded-lg border px-4 py-3"
                />

                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  min="0"
                  required
                  className="rounded-lg border px-4 py-3"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="rounded-lg border px-4 py-3"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.name}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="rounded-lg border px-4 py-3 md:col-span-2"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows="4"
                  required
                  className="rounded-lg border px-4 py-3 md:col-span-2"
                />

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

          {/* Products Table */}
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm text-gray-600">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-sm text-gray-600">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm text-gray-600">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm text-gray-600">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-left text-sm text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {products.map((product) => (

                    <tr key={product.id}>

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />

                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {product.category}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        ₹{product.price}
                      </td>

                      <td className="px-6 py-4">
                        {product.stock}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-4">

                          <button
                            onClick={() =>
                              handleEdit(product)
                            }
                            className="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(product.id)
                            }
                            className="font-medium text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default AdminProducts;
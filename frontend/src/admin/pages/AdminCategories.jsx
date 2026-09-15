import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import { useAdmin } from "../../context/AdminContext";

function AdminCategories() {
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useAdmin();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      imageUrl: "",
      isActive: true,
    });

    setEditingCategory(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategory) {
      updateCategory({
        ...formData,
        name: editingCategory.name,
      });
    } else {
      addCategory(formData);
    }

    resetForm();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      isActive: category.isActive,
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
                Categories
              </h1>

              <p className="mt-2 text-gray-600">
                Manage grocery categories.
              </p>

            </div>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              + Add Category
            </button>

          </div>

          {/* Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-xl bg-white p-6 shadow-sm"
            >

              <h2 className="text-xl font-bold">
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <div className="mt-6 space-y-5">

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Category name"
                  required
                  disabled={!!editingCategory}
                  className="w-full rounded-lg border px-4 py-3 disabled:bg-gray-100"
                />

                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="Image URL"
                  className="w-full rounded-lg border px-4 py-3"
                />

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  rows="4"
                  required
                  className="w-full rounded-lg border px-4 py-3"
                />

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                  {editingCategory
                    ? "Update Category"
                    : "Add Category"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border px-5 py-3 font-semibold text-gray-700"
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

          {/* Categories */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {categories.map((category) => (

              <div
                key={category.name}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >

                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-40 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-900">
                    {category.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    {category.description}
                  </p>

                  <div className="mt-5 flex gap-4">

                    <button
                      onClick={() =>
                        handleEdit(category)
                      }
                      className="font-medium text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCategory(category.name)
                      }
                      className="font-medium text-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}

export default AdminCategories;
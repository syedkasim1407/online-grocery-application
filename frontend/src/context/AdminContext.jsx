import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export const AdminContext = createContext(null);

export function AdminProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);


  // =====================================================
  // FETCH PRODUCTS + CATEGORIES
  // =====================================================

  const fetchAdminData = async () => {

    try {

      setLoading(true);

      const [productData, categoryData] =
        await Promise.all([
          getProducts(),
          getCategories(),
        ]);

      setProducts(productData);
      setCategories(categoryData);

    } catch (error) {

      console.error(
        "Error loading admin data:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchAdminData();

  }, []);


  // =====================================================
  // ADD PRODUCT
  // =====================================================

  const addProduct = async (
    product,
    categoryId
  ) => {

    try {

      const newProduct =
        await createProduct(
          product,
          categoryId
        );

      setProducts((current) => [
        ...current,
        newProduct,
      ]);

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error adding product:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to add product",
      };

    }

  };


  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  const handleUpdateProduct = async (
    productId,
    product
  ) => {

    try {

      const updatedProduct =
        await updateProduct(
          productId,
          product
        );

      setProducts((current) =>
        current.map((item) =>
          item.id === productId
            ? updatedProduct
            : item
        )
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error updating product:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to update product",
      };

    }

  };


  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDeleteProduct = async (
    productId
  ) => {

    try {

      await deleteProduct(productId);

      setProducts((current) =>
        current.filter(
          (product) =>
            product.id !== productId
        )
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to delete product",
      };

    }

  };


  // =====================================================
  // ADD CATEGORY
  // =====================================================

  const addCategory = async (category) => {

    try {

      const newCategory =
        await createCategory(category);

      setCategories((current) => [
        ...current,
        newCategory,
      ]);

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error adding category:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to add category",
      };

    }

  };


  // =====================================================
  // UPDATE CATEGORY
  // =====================================================

  const handleUpdateCategory = async (
    categoryId,
    category
  ) => {

    try {

      const updatedCategory =
        await updateCategory(
          categoryId,
          category
        );

      setCategories((current) =>
        current.map((item) =>
          item.id === categoryId
            ? updatedCategory
            : item
        )
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error updating category:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to update category",
      };

    }

  };


  // =====================================================
  // DELETE CATEGORY
  // =====================================================

  const handleDeleteCategory = async (
    categoryId
  ) => {

    try {

      await deleteCategory(categoryId);

      setCategories((current) =>
        current.filter(
          (category) =>
            category.id !== categoryId
        )
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Error deleting category:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to delete category",
      };

    }

  };


  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        loading,

        addProduct,

        updateProduct:
          handleUpdateProduct,

        deleteProduct:
          handleDeleteProduct,

        addCategory,

        updateCategory:
          handleUpdateCategory,

        deleteCategory:
          handleDeleteCategory,

        refreshAdminData:
          fetchAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}


export function useAdmin() {
  return useContext(AdminContext);
}
import { createContext, useContext, useState } from "react";

import { products as initialProducts } from "../data/products";
import { categories as initialCategories } from "../data/categories";
import { users as initialUsers } from "../data/users";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState(initialUsers);

  // ================= PRODUCTS =================

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId
      )
    );
  };

  // ================= CATEGORIES =================

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now(),
    };

    setCategories((currentCategories) => [
      ...currentCategories,
      newCategory,
    ]);
  };

  const updateCategory = (updatedCategory) => {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === updatedCategory.id
          ? updatedCategory
          : category
      )
    );
  };

  const deleteCategory = (categoryName) => {
    setCategories((currentCategories) =>
      currentCategories.filter(
        (category) => category.name !== categoryName
      )
    );
  };

  // ================= USERS =================

  const deleteUser = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );
  };

  const toggleUserStatus = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            }
          : user
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        categories,
        users,

        addProduct,
        updateProduct,
        deleteProduct,

        addCategory,
        updateCategory,
        deleteCategory,

        deleteUser,
        toggleUserStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
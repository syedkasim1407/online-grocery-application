import api from "../utils/api";


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export const getProducts = async () => {

  const response =
    await api.get("/product");

  return response.data;
};


// =====================================================
// GET PRODUCT BY ID
// =====================================================

export const getProductById = async (id) => {

  const response =
    await api.get(`/product/${id}`);

  return response.data;
};


// =====================================================
// GET PRODUCTS BY CATEGORY
// =====================================================

export const getProductsByCategory = async (
  categoryId
) => {

  const response =
    await api.get(
      `/product/category/${categoryId}`
    );

  return response.data;
};


// =====================================================
// CREATE PRODUCT - ADMIN
// =====================================================

export const createProduct = async (
  product,
  categoryId
) => {

  const response =
    await api.post(
      `/product/${categoryId}`,
      {
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        unit: product.unit,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        available: product.available,
      }
    );

  return response.data;
};


// =====================================================
// UPDATE PRODUCT - ADMIN
// =====================================================

export const updateProduct = async (
  id,
  product
) => {

  const response =
    await api.put(
      `/product/${id}`,
      {
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        unit: product.unit,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        available: product.available,
      }
    );

  return response.data;
};


// =====================================================
// DELETE PRODUCT - ADMIN
// =====================================================

export const deleteProduct = async (
  id
) => {

  await api.delete(
    `/product/${id}`
  );
};
import api from "../utils/api";

export const getCategories = async () => {

  const response =
    await api.get("/category");

  return response.data;
};



export const getCategoryById = async (id) => {

  const response =
    await api.get(`/category/${id}`);

  return response.data;
};

export const createCategory = async (
  category
) => {

  const response =
    await api.post(
      "/category",
      {
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
        isActive: category.isActive,
      }
    );

  return response.data;
};


export const updateCategory = async (id,category) => {
  const response =
    await api.put(
      `/category/${id}`,
      {
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
        isActive: category.isActive,
      }
    );

  return response.data;
};


export const deleteCategory = async (
  id
) => {

  await api.delete(
    `/category/${id}`
  );
};
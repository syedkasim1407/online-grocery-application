package com.onlinegrocery.backend.service;

import java.util.List;

import java.util.Optional;

import com.onlinegrocery.backend.dto.CategoryRegisterDTO;
import com.onlinegrocery.backend.dto.CategoryResponseDTO;
import com.onlinegrocery.backend.model.Category;

public interface CategoryService {
    CategoryResponseDTO createCategory(CategoryRegisterDTO request);
    List<CategoryResponseDTO> getAllCategories();
    CategoryResponseDTO getCategoryById(Long id);
    CategoryResponseDTO updateCategory(Long id, CategoryRegisterDTO request);
    String deleteCategory(Long id);
}

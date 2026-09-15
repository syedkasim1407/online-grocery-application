package com.onlinegrocery.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.onlinegrocery.backend.dto.CategoryRegisterDTO;
import com.onlinegrocery.backend.dto.CategoryResponseDTO;

import com.onlinegrocery.backend.model.Category;
import com.onlinegrocery.backend.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponseDTO createCategory(CategoryRegisterDTO request)
    {
        Category register=Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .isActive(request.isActive())
                .build();

        Category savedCategory=categoryRepository.save(register);
        return CategoryResponseDTO.builder()
                .name(savedCategory.getName())
                .description(savedCategory.getDescription())
                .imageUrl(savedCategory.getImageUrl())
                .isActive(savedCategory.isActive())
                .build();
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories()
    {
       List<Category> categories = categoryRepository.findAll();
       List<CategoryResponseDTO> response=new ArrayList<>();
       for(Category category:categories)
       {
            CategoryResponseDTO eachCategory=CategoryResponseDTO.builder()
                .name(category.getName())
                .description(category.getDescription())
                .imageUrl(category.getImageUrl())
                .isActive(category.isActive())
                .build();

            response.add(eachCategory);

       }
       return response;

    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {
        Category category= categoryRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("No category id is present in this id "+id));
        return CategoryResponseDTO.builder()
                .name(category.getName())
                .description(category.getDescription())
                .imageUrl(category.getImageUrl())
                .isActive(category.isActive())
                .build();     
        
    }

    @Override
    public CategoryResponseDTO updateCategory(Long id,CategoryRegisterDTO request)
    {
        Category existingCategory=categoryRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("No category is found in this id: "+id));
        
            Category updatedCategory=existingCategory;
            updatedCategory.setName(request.getName());
            updatedCategory.setDescription(request.getDescription());
            updatedCategory.setImageUrl(request.getImageUrl());
            Category savedCategory= categoryRepository.save(updatedCategory);
            return CategoryResponseDTO.builder()
                .name(savedCategory.getName())
                .description(savedCategory.getDescription())
                .imageUrl(savedCategory.getImageUrl())
                .isActive(savedCategory.isActive())
                .build();
    }

    @Override
    public String deleteCategory(Long id)
    {
        Category existingCategory=categoryRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("No category is found in this id: "+id));
        categoryRepository.deleteById(id);
        return "Category deleted successfully";
        
    }
}

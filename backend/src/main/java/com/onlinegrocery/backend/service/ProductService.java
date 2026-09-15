package com.onlinegrocery.backend.service;
import java.util.List;

import com.onlinegrocery.backend.dto.ProductRegisterDTO;
import com.onlinegrocery.backend.dto.ProductResponseDTO;
import com.onlinegrocery.backend.model.Product;

public interface ProductService {
    ProductResponseDTO createProduct(Long id,ProductRegisterDTO request);
    List<ProductResponseDTO> getAllProducts();
    List<ProductResponseDTO> getProductsByCategory(Long categoryId);
    ProductResponseDTO getProductById(Long id);
    ProductResponseDTO updateProductById(Long id, ProductRegisterDTO request);
    // Product patchProduct(Long id, Product product);
    void deleteProductById(Long id);
} 
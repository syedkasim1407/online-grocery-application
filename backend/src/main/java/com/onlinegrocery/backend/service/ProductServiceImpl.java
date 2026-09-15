package com.onlinegrocery.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.onlinegrocery.backend.dto.ProductRegisterDTO;
import com.onlinegrocery.backend.dto.ProductResponseDTO;
import com.onlinegrocery.backend.model.Category;
import com.onlinegrocery.backend.model.Product;
import com.onlinegrocery.backend.repository.CategoryRepository;
import com.onlinegrocery.backend.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponseDTO createProduct(Long categoryId, ProductRegisterDTO request) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Product product=Product.builder()
            .name(request.getName())
            .description(request.getDescription())
            .imageUrl(request.getImageUrl())
            .unit(request.getUnit())
            .brand(request.getBrand())
            .price(request.getPrice())
            .stock(request.getStock())
            .available(request.isAvailable())
            .category(category)
            .build();

        Product savedProduct=productRepository.save(product);
        
        ProductResponseDTO response=ProductResponseDTO.builder()
            .name(savedProduct.getName())
            .description(savedProduct.getDescription())
            .imageUrl(savedProduct.getImageUrl())
            .unit(savedProduct.getUnit())
            .brand(savedProduct.getBrand())
            .price(savedProduct.getPrice())
            .stock(savedProduct.getStock())
            .available(savedProduct.isAvailable())
            .category(savedProduct.getCategory().getName())
            .build();

        return response;
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        List<Product> products=productRepository.findAll();
        List<ProductResponseDTO> response=new ArrayList<>();
        for(Product product:products)
        {
            ProductResponseDTO eachProduct=ProductResponseDTO.builder()
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .unit(product.getUnit())
                .brand(product.getBrand())
                .price(product.getPrice())
                .stock(product.getStock())
                .available(product.isAvailable())
                .category(product.getCategory().getName())
                .build();
            
            response.add(eachProduct);
        }
        return response;
        

    }

    @Override
    public List<ProductResponseDTO> getProductsByCategory(Long categoryId) {
        List<Product> products=productRepository.findByCategoryId(categoryId);
        List<ProductResponseDTO> response=new ArrayList<>();
        for(Product product:products)
        {
            ProductResponseDTO eachProduct=ProductResponseDTO.builder()
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .unit(product.getUnit())
                .brand(product.getBrand())
                .price(product.getPrice())
                .stock(product.getStock())
                .available(product.isAvailable())
                .category(product.getCategory().getName())
                .build();
            
            response.add(eachProduct);
        }
        return response;
        
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product=productRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("No Product Id is found in this id: "+id));
        ProductResponseDTO response=ProductResponseDTO.builder()
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .unit(product.getUnit())
                .brand(product.getBrand())
                .price(product.getPrice())
                .stock(product.getStock())
                .available(product.isAvailable())
                .category(product.getCategory().getName())
                .build();
            
        return response;
    }

    @Override
    public ProductResponseDTO updateProductById(Long id, ProductRegisterDTO request) {

        Product currentProduct = productRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("No Product Id is found in this id: "+id));

        currentProduct.setName(request.getName());
        currentProduct.setDescription(request.getDescription());
        currentProduct.setImageUrl(request.getImageUrl());
        currentProduct.setBrand(request.getBrand());
        currentProduct.setUnit(request.getUnit());
        currentProduct.setPrice(request.getPrice());
        currentProduct.setStock(request.getStock());
        currentProduct.setAvailable(request.isAvailable());

        // Uncomment if you want to allow category updates
        /*
        if (product.getCategory() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            currentProduct.setCategory(category);
        }
        */
        Product savedProduct=productRepository.save(currentProduct);
        ProductResponseDTO response=ProductResponseDTO.builder()
                .name(savedProduct.getName())
                .description(savedProduct.getDescription())
                .imageUrl(savedProduct.getImageUrl())
                .unit(savedProduct.getUnit())
                .brand(savedProduct.getBrand())
                .price(savedProduct.getPrice())
                .stock(savedProduct.getStock())
                .available(savedProduct.isAvailable())
                .category(savedProduct.getCategory().getName())
                .build();
            
        return response;
    }

    

    @Override
    public void deleteProductById(Long id) {

        Product product =productRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("No Product Id is found in this id: "+id));
;

        productRepository.delete(product);
    }

    
}
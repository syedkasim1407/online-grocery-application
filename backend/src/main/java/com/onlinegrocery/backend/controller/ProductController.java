package com.onlinegrocery.backend.controller;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocery.backend.dto.ProductRegisterDTO;
import com.onlinegrocery.backend.dto.ProductResponseDTO;
import com.onlinegrocery.backend.model.Product;
import com.onlinegrocery.backend.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> createProduct(@PathVariable Long id,@RequestBody ProductRegisterDTO request)
    {
        ProductResponseDTO createdProduct = productService.createProduct(id,request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts()
    {
        List<ProductResponseDTO> allProducts=productService.getAllProducts();
        return new ResponseEntity<>(allProducts,HttpStatus.OK);
    }

    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {

        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id,@RequestBody ProductRegisterDTO request)
    {
        return ResponseEntity.ok(productService.updateProductById(id,request));
    }

    // @PatchMapping("/{id}")
    // public ResponseEntity<Product> patchProduct(
    //         @PathVariable Long id,
    //         @RequestBody Product product) {

    //     return ResponseEntity.ok(productService.patchProduct(id, product));
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok("Product Deleted Successfully");
    }

}

package com.onlinegrocery.backend.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocery.backend.dto.CartItemResponseDTO;
import com.onlinegrocery.backend.dto.CartResponseDTO;
import com.onlinegrocery.backend.security.SecurityUtil;
import com.onlinegrocery.backend.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    public final CartService cartService;

    public CartController(CartService  cartService)
    {
        this.cartService=cartService;
       
    }
    
    @PostMapping
    public ResponseEntity<CartResponseDTO> addToCart(
        @RequestParam Long productId,
        @RequestParam Integer quantity)
    {
        Long userId=SecurityUtil.getCurrentUser().id();
         return new ResponseEntity<>(cartService.addToCart(userId, productId, quantity),HttpStatus.CREATED );
    }

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCartByUser()
    {
        Long id=SecurityUtil.getCurrentUser().id();
        return ResponseEntity.ok(cartService.getCartByUser(id));
    }

    @PutMapping("/update")
    public ResponseEntity<CartItemResponseDTO> updateCartItem(
            @RequestParam Long productId,@RequestParam Integer quantity) 
    {
        Long userId=SecurityUtil.getCurrentUser().id();
        return ResponseEntity.ok(
                cartService.updateCartItem(userId, productId, quantity)
        );
    }
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable Long itemId){
        Long userId=SecurityUtil.getCurrentUser().id();

        cartService.deleteCartItem(itemId,userId);

        return ResponseEntity.ok("Cart Item Deleted Successfully");

    }


}

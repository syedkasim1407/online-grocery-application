package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.dto.CartItemResponseDTO;
import com.onlinegrocery.backend.dto.CartResponseDTO;
import com.onlinegrocery.backend.model.Cart;
import com.onlinegrocery.backend.model.CartItem;

public interface CartService {
    CartResponseDTO addToCart(Long userId, Long productId, Integer quantity);
    CartResponseDTO getCartByUser(Long userId);
    CartItemResponseDTO updateCartItem(Long userId, Long productId, Integer quantity);
    void deleteCartItem(Long itemId,Long userId);
}

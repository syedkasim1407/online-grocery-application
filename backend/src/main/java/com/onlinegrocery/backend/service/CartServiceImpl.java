package com.onlinegrocery.backend.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.onlinegrocery.backend.dto.CartItemResponseDTO;
import com.onlinegrocery.backend.dto.CartResponseDTO;
import com.onlinegrocery.backend.model.Cart;
import com.onlinegrocery.backend.model.CartItem;
import com.onlinegrocery.backend.model.Product;
import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.repository.CartItemRepository;
import com.onlinegrocery.backend.repository.CartRepository;
import com.onlinegrocery.backend.repository.ProductRepository;
import com.onlinegrocery.backend.repository.UserRepository;

@Service
public class CartServiceImpl implements CartService 
{
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(CartRepository cartRepository,
        UserRepository userRepository,
        CartItemRepository cartItemRepository,
        ProductRepository productRepository) 
    {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public CartResponseDTO addToCart(Long userId, Long productId, Integer quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id: " + productId));

        Cart cart = cartRepository.findByUserId(userId)
                .orElse(null);

        // Create cart if it doesn't exist
        if (cart == null) {

            cart = new Cart();
            cart.setUser(user);
            cart.setTotalPrice(BigDecimal.ZERO);
            cart.setCartItems(new ArrayList<>());
        }

        boolean found = false;

        // Check whether product already exists
        for (CartItem cartItem : cart.getCartItems()) {

            if (cartItem.getProduct().getId().equals(product.getId())) {

                cartItem.setQuantity(
                        cartItem.getQuantity() + quantity
                );

                BigDecimal subtotal = product.getPrice()
                        .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

                cartItem.setPrice(subtotal);

                found = true;
                break;
            }
        }

        // Product doesn't exist in cart
        if (!found) {

            CartItem item = new CartItem();

            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);

            BigDecimal subtotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(quantity));

            item.setPrice(subtotal);

            cart.getCartItems().add(item);
        }

        // Recalculate total
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cart.getCartItems()) {
            total = total.add(item.getPrice());
        }

        cart.setTotalPrice(total);

        // CascadeType.ALL saves CartItems too
        Cart savedCart = cartRepository.save(cart);

        return mapToCartResponseDTO(savedCart);
    }
        

    @Override
    public CartResponseDTO getCartByUser(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("No cart found for user id: " + userId));

        List<CartItemResponseDTO> itemResponses = new ArrayList<>();

        for (CartItem item : cart.getCartItems()) {

            CartItemResponseDTO dto = CartItemResponseDTO.builder()
                    .productName(item.getProduct().getName())
                    .productPrice(item.getProduct().getPrice())
                    .quantity(item.getQuantity())
                    .imageURL(item.getProduct().getImageUrl())
                    .price(item.getPrice())
                    .build();

            itemResponses.add(dto);
        }

        return CartResponseDTO.builder()
                .totalPrice(cart.getTotalPrice())
                .cartItems(itemResponses)
                .build();
    }
    @Override
    public CartItemResponseDTO updateCartItem(Long userId, Long productId, Integer quantity) 
    {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found for user id: " + userId));

        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        item.setQuantity(quantity);

        BigDecimal subtotal = product.getPrice()
                .multiply(BigDecimal.valueOf(quantity));

        item.setPrice(subtotal);

        cartItemRepository.save(item);

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getCartItems()) {
            total = total.add(cartItem.getPrice());
        }

        cart.setTotalPrice(total);

        cartRepository.save(cart);

        return CartItemResponseDTO.builder()
                .productName(item.getProduct().getName())
                .productPrice(item.getProduct().getPrice())
                .quantity(item.getQuantity())
                .imageURL(item.getProduct().getImageUrl())
                .price(item.getPrice())
                .build();
    }

    @Override
    @Transactional
    public void deleteCartItem(Long itemId,Long userId) {

        CartItem item = cartItemRepository.findById(itemId).orElseThrow();
        Cart cart = item.getCart();
        if(!cart.getUser().getId().equals(userId))
        {
                throw new RuntimeException("You are not allowed to delete this cart item");
        }

        cart.setTotalPrice(
                cart.getTotalPrice().subtract(item.getPrice())
        );

        cartRepository.save(cart);
        cartItemRepository.delete(item);
    }
    
    //DTO builder for response
    private CartResponseDTO mapToCartResponseDTO(Cart cart) {

        List<CartItemResponseDTO> itemResponses = new ArrayList<>();

        for (CartItem item : cart.getCartItems()) {

            CartItemResponseDTO dto = CartItemResponseDTO.builder()
                    .productName(item.getProduct().getName())
                    .productPrice(item.getProduct().getPrice())
                    .quantity(item.getQuantity())
                    .imageURL(item.getProduct().getImageUrl())
                    .price(item.getPrice())
                    .build();

            itemResponses.add(dto);
        }

        return CartResponseDTO.builder()
                .totalPrice(cart.getTotalPrice())
                .cartItems(itemResponses)
                .build();
    }
    
}

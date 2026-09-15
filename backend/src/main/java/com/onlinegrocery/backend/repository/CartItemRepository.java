package com.onlinegrocery.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.onlinegrocery.backend.model.Cart;
import com.onlinegrocery.backend.model.CartItem;
import com.onlinegrocery.backend.model.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long>{
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}

package com.onlinegrocery.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocery.backend.dto.OrderRequestDTO;
import com.onlinegrocery.backend.dto.OrderResponseDTO;
import com.onlinegrocery.backend.model.Order;
import com.onlinegrocery.backend.security.SecurityUtil;
import com.onlinegrocery.backend.service.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    @PostMapping("/place")
    public ResponseEntity<OrderResponseDTO> placeOrder(
        @RequestBody OrderRequestDTO request) 
    {
        Long userId=SecurityUtil.getCurrentUser().id();
        return new ResponseEntity<>(
                orderService.placeOrder(request, userId),
                HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByUser() {
        Long userId=SecurityUtil.getCurrentUser().id();
     
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/status/{orderId}")
    public ResponseEntity<OrderResponseDTO> updateStatus(
            @PathVariable Long orderId,
            @RequestParam String status) 
    {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }

}

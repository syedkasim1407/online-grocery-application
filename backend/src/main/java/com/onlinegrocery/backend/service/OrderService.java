package com.onlinegrocery.backend.service;

import java.util.List;

import com.onlinegrocery.backend.dto.OrderRequestDTO;
import com.onlinegrocery.backend.dto.OrderResponseDTO;
import com.onlinegrocery.backend.model.Order;

public interface OrderService {

    OrderResponseDTO placeOrder(OrderRequestDTO request, Long userId);

    List<OrderResponseDTO> getOrdersByUser(Long userId);

    List<OrderResponseDTO> getAllOrders();

    OrderResponseDTO updateOrderStatus(Long orderId, String status);
}
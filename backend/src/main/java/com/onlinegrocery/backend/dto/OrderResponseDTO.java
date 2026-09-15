package com.onlinegrocery.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class OrderResponseDTO {
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String deliveryAddress;
    private String status;
    private String paymentMethod;
    private List<OrderItemResponseDTO> orderItems;
}

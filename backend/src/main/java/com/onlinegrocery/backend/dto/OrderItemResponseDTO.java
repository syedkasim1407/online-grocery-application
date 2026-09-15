package com.onlinegrocery.backend.dto;

import java.math.BigDecimal;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class OrderItemResponseDTO {
    private Integer quantity;

    private BigDecimal price;

    private String productName;

    private String productImageUrl;

    private String unit;

    private String brand;
}

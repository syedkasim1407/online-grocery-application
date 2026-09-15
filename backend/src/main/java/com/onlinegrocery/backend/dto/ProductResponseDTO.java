package com.onlinegrocery.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class ProductResponseDTO {
  
    private String name;

    private String description;
   
    private String imageUrl;
  
    private String unit;
  
    private String brand;

    private BigDecimal price;

    private Integer stock;

    private boolean available;

    private String category;
}

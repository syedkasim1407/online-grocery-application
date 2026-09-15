package com.onlinegrocery.backend.dto;

import java.math.BigDecimal;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CartItemResponseDTO {
  
    Integer quantity;

    BigDecimal price;
  
    String productName;
    
    String imageURL;

    BigDecimal productPrice;

}

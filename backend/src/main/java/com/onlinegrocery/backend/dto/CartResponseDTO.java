package com.onlinegrocery.backend.dto;

import java.math.BigDecimal;
import java.util.List;


import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CartResponseDTO {

    private BigDecimal totalPrice;

    private List<CartItemResponseDTO> cartItems;

}

package com.onlinegrocery.backend.dto;
import com.onlinegrocery.backend.enums.PaymentMethod;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
@Getter
public class OrderRequestDTO {

    @NotBlank
    private String deliveryAddress;

    private PaymentMethod paymentMethod;
}

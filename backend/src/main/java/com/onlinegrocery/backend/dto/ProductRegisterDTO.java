package com.onlinegrocery.backend.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;

@Getter
public class ProductRegisterDTO {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String imageUrl;

    @NotBlank
    private String unit;

    @NotBlank
    private String brand;

    @NotNull
    private BigDecimal price;

    @NotNull
    @PositiveOrZero
    private Integer stock;

    private boolean available;
}

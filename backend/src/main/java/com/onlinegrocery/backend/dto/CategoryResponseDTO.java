package com.onlinegrocery.backend.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CategoryResponseDTO {
    private String name;
    private String description;
    private String imageUrl;
    private boolean isActive;
}

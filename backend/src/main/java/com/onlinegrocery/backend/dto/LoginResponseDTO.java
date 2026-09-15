package com.onlinegrocery.backend.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponseDTO {
    String token;
    String email;
    String role;
}

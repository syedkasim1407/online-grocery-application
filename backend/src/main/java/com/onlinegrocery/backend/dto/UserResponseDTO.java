package com.onlinegrocery.backend.dto;


import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserResponseDTO {
    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private boolean enabled;

    private String role;
}

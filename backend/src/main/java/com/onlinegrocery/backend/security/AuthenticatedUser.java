package com.onlinegrocery.backend.security;

public record AuthenticatedUser(Long id,String email, String role) {
    
}

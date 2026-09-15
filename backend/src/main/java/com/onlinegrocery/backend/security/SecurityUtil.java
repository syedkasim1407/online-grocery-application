package com.onlinegrocery.backend.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {
    public static AuthenticatedUser getCurrentUser()
    {
        Authentication authentication=
            SecurityContextHolder.getContext().getAuthentication();

        return (AuthenticatedUser) authentication.getPrincipal();
    }
}

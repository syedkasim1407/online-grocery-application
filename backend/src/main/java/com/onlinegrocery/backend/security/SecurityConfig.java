package com.onlinegrocery.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter)
    {
        this.jwtAuthenticationFilter=jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
            .csrf(csrf->csrf.disable())
            .sessionManagement(session->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth->auth
                //ADMIN
                .requestMatchers(
                    "/api/user/login").permitAll()

                .requestMatchers(HttpMethod.POST, "/api/user").permitAll()

                .requestMatchers("/api/user/**")
                    .hasRole("ADMIN")
                
                //Category
                .requestMatchers(HttpMethod.POST,"/api/category")
                    .hasAnyRole("ADMIN")

                .requestMatchers(HttpMethod.GET,"/api/category")
                    .permitAll()
                
                .requestMatchers(HttpMethod.GET,"/api/category/**")
                    .permitAll()

                .requestMatchers(HttpMethod.PUT,"/api/category/**")
                    .hasRole("ADMIN")
                
                .requestMatchers(HttpMethod.DELETE,"/api/category/**")
                    .hasRole("ADMIN")
                
                //Product
                .requestMatchers( HttpMethod.GET,"/api/product/**")
                    .permitAll()

                .requestMatchers(HttpMethod.POST,"/api/product/**")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/product/**" )
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE,"/api/product/**")
                    .hasRole("ADMIN")
                
                // Cart
                .requestMatchers(HttpMethod.POST, "/api/cart")
                    .hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.GET, "/api/cart")
                    .hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.PUT, "/api/cart/update")
                    .hasRole("CUSTOMER")

                .requestMatchers(HttpMethod.DELETE, "/api/cart/remove/**")
                    .hasRole("CUSTOMER")

                // Order
                .requestMatchers(HttpMethod.POST, "/api/order/place")
                    .hasAnyRole("CUSTOMER","ADMIN")

                .requestMatchers(HttpMethod.GET, "/api/order/user")
                    .hasAnyRole("CUSTOMER", "ADMIN")

                .requestMatchers(HttpMethod.GET, "/api/order")
                    .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/api/order/status/**")
                    .hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            
            .addFilterBefore(
                jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class
            );
        return http.build();
    }
}

package com.onlinegrocery.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtUtil {
    private final SecretKey key;
    private final Long expiration;

    public JwtUtil(@Value("${jwt.secret}") String secret,@Value("${jwt.expiration}") long expiration)
    {
        this.key=Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.expiration=expiration;
    }

    public String generateToken(String email,Long id,String role)
    {
        return Jwts.builder()
        .subject(email)
        .claim("id", id)
        .claim("role", role)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis()+expiration))
        .signWith(key)
        .compact();
    }

    public String validateAndGetEmail(String token)
    {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public String validateAndGetRole(String token)
    {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .get("role",String.class);
    }

    public Long validateAndGetId(String token)
    {
        return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .getPayload()
        .get("id",Long.class);
    }
    
}

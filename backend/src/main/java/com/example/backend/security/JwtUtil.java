//package com.example.backend.security;
//
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.stereotype.Component;
//
//import javax.crypto.SecretKey;
//import java.security.Key;
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    private final String SECRET = "MyVerySecretKeyForJwtWhichShouldBeLong12345";
//    private final long EXPIRATION = 1000 * 60 * 60;
//
//    private Key getSigningKey() {
//        return Keys.hmacShaKeyFor(SECRET.getBytes());
//    }
//
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .subject(username)
//                .issuedAt(new Date())
//                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
//                .signWith(getSigningKey())
//                .compact();
//    }
//
//    public String extractUsername(String token) {
//        return Jwts.parser()
//                .verifyWith((SecretKey) getSigningKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload()
//                .getSubject();
//    }
//
//    public boolean isValid(String token, String username) {
//        return username.equals(extractUsername(token));
//    }
//}

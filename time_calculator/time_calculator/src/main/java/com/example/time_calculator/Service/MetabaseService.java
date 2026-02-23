package com.example.time_calculator.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class MetabaseService {

    @Value("${metabase.url}")
    private String metabaseUrl;

    @Value("${metabase.secret}")
    private String secret;

    @Value("${metabase.dashboard.id}")
    private Integer dashboardId;

    public String generateDashboardEmbedUrl(String partnerName) {

        long exp = System.currentTimeMillis() / 1000 + (10 * 60);

        Map<String, Object> payload = new HashMap<>();
        payload.put("resource", Map.of("dashboard", dashboardId));
        payload.put("params", Map.of("partner_name", partnerName));
        payload.put("exp", exp);

        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        String token = Jwts.builder()
                .setClaims(payload)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return metabaseUrl + "/embed/dashboard/" + token +
                "#bordered=true&titled=true";
    }
}
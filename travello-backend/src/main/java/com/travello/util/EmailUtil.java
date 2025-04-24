package com.travello.util;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Component
public class EmailUtil {

    private final RestTemplate restTemplate;
    @Value("${hunter.api.key}")
    private String HUNTER_API_KEY;

    public String verifyEmailByHunter(String email) {
        try {
            String url = "https://api.hunter.io/v2/email-verifier?email=" + email + "&api_key=" + HUNTER_API_KEY;
            JsonNode response = restTemplate.getForObject(url, JsonNode.class);
            return response != null ? response.path("data").path("status").asText() : "Data fetch error";
        } catch (Exception e) {
            return "Verification failed: " + e.getMessage();
        }
    }
}

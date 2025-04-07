package com.travello.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;

@Service
public class GeocodingService {
    @Value("${google.maps.api.key}")
    private String apiKey;
    @Autowired
    private RestTemplate restTemplate;

    public String getCoordinates (String address) {
        String url = "https://maps.googleapis.com/maps/api/geocode/json?address="
                + UriUtils.encode(address, StandardCharsets.UTF_8)
                + "&key=" + apiKey ;
        ResponseEntity<String> response = restTemplate.getForEntity(url ,String.class);
        return response.getBody();
    }
}

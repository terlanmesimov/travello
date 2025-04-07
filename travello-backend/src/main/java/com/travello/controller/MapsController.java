package com.travello.controller;

import com.travello.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maps")
public class MapsController {
    @Autowired
    private GeocodingService geocodingService;

    @GetMapping("/geocode")
    public ResponseEntity<String> geocode(@RequestParam String address) {
        String result = geocodingService.getCoordinates(address);
        return ResponseEntity.ok(result);
    }
}

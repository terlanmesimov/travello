package com.travello.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class HunterConfig {
    @Value("${hunter.api.key}")
    private String apiKey;
}

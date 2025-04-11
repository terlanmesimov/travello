package com.travello.service;

import com.travello.config.HunterConfig;
import com.travello.model.HunterEmailVericifationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailValidationService {
    @Autowired
    private HunterConfig hunterConfig;
    private final RestTemplate restTemplate = new RestTemplate();

    public boolean isEmailValid(String email) {
        String url = "https://api.hunter.io/v2/email-verifier?email=" + email + "&api_key=" + hunterConfig.getApiKey();
        try {
            HunterEmailVericifationResponse response = restTemplate.getForObject(url, HunterEmailVericifationResponse.class);
            String result = response.getData().getStatus();
            return result.equalsIgnoreCase("valid");
        }catch (Exception e) {
            e.getStackTrace();
            return false;
        }
    }
}

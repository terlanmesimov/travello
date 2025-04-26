package com.travello.util.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class OtpService {

    private final JavaMailSender mailSender;
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public boolean sendOtp(String email) {
        String otp = generateOtp();
        otpStorage.put(email, otp);
        try {
            sendEmail(email, otp);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean verifyOtp(String email, String inputOtp) {
        String validOtp = otpStorage.get(email);
        if (validOtp != null && validOtp.equals(inputOtp)) {
            otpStorage.remove(email);
            return true;
        }
        return false;
    }

    private String generateOtp() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }

    private void sendEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("johndoe13241@yandex.com");
        message.setTo(to);
        message.setSubject("Sənin OTP kodun");
        message.setText("Təsdiqləmə kodun: " + otp);
        mailSender.send(message);
    }
}



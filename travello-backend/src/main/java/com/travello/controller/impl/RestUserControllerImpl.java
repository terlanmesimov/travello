package com.travello.controller.impl;

import com.travello.controller.RestUserController;
import com.travello.dto.request.OtpDTO;
import com.travello.dto.request.UserRequestDTO;
import com.travello.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class RestUserControllerImpl implements RestUserController {

    private final UserService userService;

    @Override
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDTO userRequestDTO) {
        return userService.register(userRequestDTO);
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDTO userRequestDTO) {
        return userService.login(userRequestDTO);
    }

    @Override
    @PostMapping("/check")
    public ResponseEntity<?> getUser(@RequestBody String token) {
        return userService.getUser(token);
    }

    @Override
    @PutMapping("/change-pp")
    public ResponseEntity<?> changeImage(@RequestHeader String token, @RequestParam("profilePhoto") MultipartFile imageBase64) {
        return userService.changeImage(token, imageBase64);
    }

    @Override
    @DeleteMapping("/delete-pp")
    public ResponseEntity<?> deleteImage(@RequestHeader String token) {
        return userService.deleteImage(token);
    }

    @Override
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam String emailTo) {
        return userService.sendOtp(emailTo);
    }

    @Override
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpDTO otpDTO) {
        return userService.verifyOtp(otpDTO);
    }

    @Override
    @PutMapping("/update-pass")
    public ResponseEntity<?> updatePassword(@RequestBody OtpDTO otpDTO) {
        return userService.updatePassword(otpDTO);
    }

}

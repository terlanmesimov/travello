package com.travello.controller.impl;

import com.travello.controller.RestUserController;
import com.travello.dto.request.UserRequestDTO;
import com.travello.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return  userService.getUser(token);
    }

    @Override
    @PutMapping("/change-profile-photo/{id}")
    public String changeImage(@PathVariable Long id, @RequestBody String imageBase64) {
        return userService.changeImage(id, imageBase64);
    }

    @Override
    @PutMapping("/change-password/{id}")
    public boolean changePassword(@PathVariable Long id, @RequestParam String currentPassword, @RequestParam String newPassword) {
        return userService.changePassword(id, currentPassword, newPassword);
    }
}

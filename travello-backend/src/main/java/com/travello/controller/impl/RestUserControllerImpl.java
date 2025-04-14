package com.travello.controller.impl;

import com.travello.controller.RestUserController;
import com.travello.dto.response.UserResponseDTO;
import com.travello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/user")
public class RestUserControllerImpl implements RestUserController {
    @Autowired
    private UserService userService;

    @Override
    @PostMapping("/sign-up")
    public UserResponseDTO signUp(@RequestParam String email, @RequestParam String username, @RequestParam String password) {
        return userService.signUp(email, username, password);
    }

    @Override
    @GetMapping("/login")
    public UserResponseDTO login(@RequestParam String email, @RequestParam String password) {
        return userService.login(email, password);
    }

    @Override
    @PutMapping("/change-profile-photo/{id}")
    public String changeImage(@PathVariable Long id, @RequestBody String imageBase64) {
        return userService.changeImage(id, imageBase64);
    }

    @Override
    @PutMapping("/change-password/{id}")
    public boolean changePassword(@PathVariable Long id,@RequestParam String currentPassword, @RequestParam String newPassword) {
        return userService.changePassword(id, currentPassword, newPassword);
    }
}

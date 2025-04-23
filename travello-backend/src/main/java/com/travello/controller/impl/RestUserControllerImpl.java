package com.travello.controller.impl;

import com.travello.controller.RestUserController;
import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.UserResponseDTO;
import com.travello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class RestUserControllerImpl implements RestUserController {
    @Autowired
    private UserService userService;

    @Override
    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDTO signUp(@RequestBody UserRequestDTO userRequestDTO) {
        return userService.signUp(userRequestDTO);
    }

    @Override
    @PostMapping("/login")
    public UserResponseDTO login(@RequestBody UserRequestDTO userRequestDTO) {
        return userService.login(userRequestDTO);
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

    @Override
    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return userService.checkEmail(email);
    }

    @Override
    @GetMapping("/check-username")
    public boolean checkUsername(@RequestParam String username) {
        return userService.checkUsername(username);
    }
}

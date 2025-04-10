package com.travello.controller;

import com.travello.dto.response.UserResponseDTO;

public interface RestUserController {
    UserResponseDTO signUp(String email, String username, String password);
    UserResponseDTO login(String email, String password);
    boolean changeImage(String imageBase64);
    boolean changePassword(String newPassword);
}

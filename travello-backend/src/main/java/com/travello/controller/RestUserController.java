package com.travello.controller;

import com.travello.dto.response.UserResponseDTO;

public interface RestUserController {
    UserResponseDTO signUp(String email, String username, String password);
    UserResponseDTO login(String email, String password);
    String changeImage(Long id, String imageBase64);
    boolean changePassword( Long id, String currentPassword,String newPassword);
}

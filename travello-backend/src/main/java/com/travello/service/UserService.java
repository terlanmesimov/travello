package com.travello.service;

import com.travello.dto.response.UserResponseDTO;

public interface UserService {
    UserResponseDTO signUp (String email, String username, String password);
    UserResponseDTO login (String email, String password);
    boolean changeImage(String imageBase64);
    boolean changePassword(String newPassword);
}

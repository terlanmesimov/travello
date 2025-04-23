package com.travello.service;

import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.UserResponseDTO;

public interface UserService {
    UserResponseDTO signUp (UserRequestDTO userRequestDTO);
    UserResponseDTO login (UserRequestDTO userRequestDTO);
    String changeImage(Long id ,String imageBase64);
    boolean changePassword(Long id ,String currentPassword,String newPassword);
    boolean checkEmail(String email);
    boolean checkUsername(String username);
}

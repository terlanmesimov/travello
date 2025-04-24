package com.travello.service;

import com.travello.dto.request.UserRequestDTO;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> register(UserRequestDTO userRequestDTO);
    ResponseEntity<?> login (UserRequestDTO userRequestDTO);
    ResponseEntity<?> getUser(String token);
    String changeImage(Long id ,String imageBase64);
    boolean changePassword(Long id ,String currentPassword,String newPassword);
}

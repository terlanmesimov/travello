package com.travello.service;

import com.travello.dto.request.OtpDTO;
import com.travello.dto.request.UserRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    ResponseEntity<?> register(UserRequestDTO userRequestDTO);
    ResponseEntity<?> login (UserRequestDTO userRequestDTO);
    ResponseEntity<?> getUser(String token);
    ResponseEntity<?> changeImage(String token , MultipartFile imageBase64);
    ResponseEntity<?> deleteImage(String token);
    ResponseEntity<?> sendOtp(String emailTo);
    ResponseEntity<?> verifyOtp(OtpDTO otpDTO);
    ResponseEntity<?> updatePassword(OtpDTO otpDTO);
    ResponseEntity<?> getComments(String token);
}

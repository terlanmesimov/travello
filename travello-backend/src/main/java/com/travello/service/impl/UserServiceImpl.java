package com.travello.service.impl;

import com.travello.dto.request.OtpDTO;
import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.BlogComment;
import com.travello.entity.PlaceComment;
import com.travello.entity.User;
import com.travello.repository.BlogCommentRepository;
import com.travello.repository.PlaceCommentRepository;
import com.travello.repository.UserRepository;
import com.travello.service.UserService;
import com.travello.util.ImageUtil;
import com.travello.util.auth.EmailService;
import com.travello.util.auth.JwtService;
import com.travello.util.auth.OtpService;
import com.travello.util.mapper.CommentMapper;
import com.travello.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final OtpService otpService;
    private final CommentMapper commentMapper;
    private final PlaceCommentRepository placeCommentRepository;
    private final BlogCommentRepository blogCommentRepository;

    @Override
    public ResponseEntity<?> register(UserRequestDTO userRequestDTO) {
        String hunterEmailVerifierStatus = emailService.verifyEmailByHunter(userRequestDTO.getEmail());
        boolean isExistsUsername = userRepository.existsByUsername(userRequestDTO.getUsername());
        boolean isExistEmail = userRepository.existsByEmail(userRequestDTO.getEmail());
        if (Objects.equals(hunterEmailVerifierStatus, "valid") && !isExistsUsername && !isExistEmail) {
            User user = userMapper.mapToUser(userRequestDTO);
            userRepository.save(user);
            if (userRepository.findById(user.getId()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CREATED).body("User Registered Successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User Registration Failed");
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("hunterEmailVerifierStatus", hunterEmailVerifierStatus);
            response.put("isExistsUsername", isExistsUsername);
            response.put("isExistsEmail", isExistEmail);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public ResponseEntity<?> login(UserRequestDTO userRequestDTO) {
        Optional<User> user = userRepository.findUserByUsername(userRequestDTO.getUsername());
        Map<String, Object> response = new HashMap<>();
        if (user.isEmpty()) {
            response.put("status", 404);
        } else {
            if (!passwordEncoder.matches(userRequestDTO.getPassword(), user.get().getPassword())) {
                response.put("status", 401);
            } else {
                response.put("status", 200);
                response.put("token", jwtService.generateToken(user.get().getUsername()));
            }
        }
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> getUser(String token) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found"));
            UserResponseDTO response = userMapper.mapToResponse(user);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token Is Expired");
    }

    @Override
    public ResponseEntity<?> changeImage(String token, MultipartFile imageBase64) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found"));
            try {
                Map<String, String> data = ImageUtil.convertMultipartDataFileToBase64(imageBase64);
                user.setImageType(data.get("mimiType"));
                user.setImage(ImageUtil.decodeImageToBytes(data.get("base64String")));
            } catch (IOException ex) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File Reading Failed");
            }
            User updatedUser = userRepository.save(user);
            String encodedImage = ImageUtil.encodeImageToBase64String(user.getImage());
            String newImage = ImageUtil.joinBase64(user.getImageType(), encodedImage);
            return ResponseEntity.ok(newImage);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image Upload Failed");
    }

    @Override
    public ResponseEntity<?> deleteImage(String token) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found"));
            user.setImageType(null);
            user.setImage(null);
            User updatedUser = userRepository.save(user);
            if (updatedUser.getImage() == null && updatedUser.getImageType() == null) {
                return ResponseEntity.ok("Image Deleted Successfully");
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image Delete Failed");
    }

    @Override
    public ResponseEntity<?> sendOtp(String emailTo) {
        boolean isExistEmail = userRepository.existsByEmail(emailTo);
        if (isExistEmail) {
            boolean hasSent = otpService.sendOtp(emailTo);
            if (hasSent) return ResponseEntity.ok("Otp Sent");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Otp Sending Failed");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email Doesn't Exist");
    }

    @Override
    public ResponseEntity<?> verifyOtp(OtpDTO otpDTO) {
        boolean isVerified = otpService.verifyOtp(otpDTO.getEmail(), otpDTO.getInputOtp());
        if (isVerified) return ResponseEntity.ok("Otp Verified");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Otp Is False");
    }

    @Override
    public ResponseEntity<?> updatePassword(OtpDTO otpDTO) {
        User user = userRepository.findUserByEmail(otpDTO.getEmail());
        user.setPassword(passwordEncoder.encode(otpDTO.getNewPassword()));
        User updatedUser = userRepository.save(user);
        if (passwordEncoder.matches(otpDTO.getNewPassword(), updatedUser.getPassword())) {
            return ResponseEntity.ok("Password Updated Successfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Password Update Failed");
    }

    @Override
    public ResponseEntity<?> getComments(String token) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found"));
            List<PlaceComment> placeComments = placeCommentRepository.findPlaceCommentsByUser_Id(user.getId());
            List<CommentResponseDTO> placeCommentsResponse = new ArrayList<>();
            placeComments.forEach(placeComment -> placeCommentsResponse.add(commentMapper.mapToResponse(placeComment)));
            List<BlogComment> blogComments = blogCommentRepository.findBlogCommentsByUser_Id(user.getId());
            List<CommentResponseDTO> blogCommentsResponse = new ArrayList<>();
            blogComments.forEach(blogComment -> blogCommentsResponse.add(commentMapper.mapToResponse(blogComment)));
            List<CommentResponseDTO> response = new ArrayList<>();
            response.addAll(placeCommentsResponse);
            response.addAll(blogCommentsResponse);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
    }

}

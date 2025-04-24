package com.travello.service.impl;

import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.User;
import com.travello.repository.UserRepository;
import com.travello.service.JwtService;
import com.travello.service.UserService;
import com.travello.util.EmailUtil;
import com.travello.util.ImageUtil;
import com.travello.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final EmailUtil emailUtil;
    private final JwtService jwtService;

    @Override
    public ResponseEntity<?> register(UserRequestDTO userRequestDTO) {
        String hunterEmailVerifierStatus = emailUtil.verifyEmailByHunter(userRequestDTO.getEmail());
        boolean isExistsUser = userRepository.existsByUsername(userRequestDTO.getUsername());
        if (Objects.equals(hunterEmailVerifierStatus, "valid") && !isExistsUser) {
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
            response.put("isExistsUser", isExistsUser);
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
    public String changeImage(Long id, String imageBase64) {
        User user = userRepository.findById(id).orElseThrow();
        user.setImage(ImageUtil.decodeImageToBytes(imageBase64));
        String newImage = ImageUtil.encodeImageToBase64String(userRepository.save(user).getImage());
        return newImage;
    }

    @Override
    public boolean changePassword(Long id, String currentPassword, String newPassword) {
        if (Objects.equals(passwordEncoder.encode(currentPassword),
                userRepository.findById(id).orElseThrow().getPassword())) {
            User user = userRepository.findById(id).orElseThrow();
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }
}

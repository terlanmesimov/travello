package com.travello.service.impl;

import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.User;
import com.travello.repository.UserRepository;
import com.travello.service.UserService;
import com.travello.util.ImageUtil;
import com.travello.util.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO signUp(UserRequestDTO userRequestDTO) {
        String encodedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        User user = userMapper.mapToUser(userRequestDTO);
        return userMapper.mapToResponse(userRepository.save(user));
    }

    @Override
    public UserResponseDTO login(UserRequestDTO userRequestDTO) {
        User user = userRepository.findUserByEmail(userRequestDTO.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        if (passwordEncoder.matches(user.getPassword(), userRequestDTO.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return userMapper.mapToResponse(user);
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

    @Override
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}

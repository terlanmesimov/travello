package com.travello.service.impl;

import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.User;
import com.travello.repository.UserRepository;
import com.travello.service.EmailValidationService;
import com.travello.service.UserService;
import com.travello.util.ImageUtil;
import com.travello.util.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailValidationService emailValidationService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO signUp(String email, String username, String password) {
        if (emailValidationService.isEmailValid(email)) {
            String encodedPassword = passwordEncoder.encode(password);
            User user = userMapper.mapToUser(email, username, password);
            return userMapper.mapToResponse(userRepository.save(user));
        }
        return null;
    }

    @Override
    public UserResponseDTO login(String email, String password) {
        List<User> users = userRepository.findUserByEmail(email);
        return userMapper.mapToResponse(users.getFirst());
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

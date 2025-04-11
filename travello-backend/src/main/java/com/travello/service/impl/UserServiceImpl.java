package com.travello.service.impl;

import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.User;
import com.travello.repository.UserRepository;
import com.travello.service.EmailValidationService;
import com.travello.service.UserService;
import com.travello.util.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public boolean changeImage(String imageBase64) {
        return false;
    }

    @Override
    public boolean changePassword(String newPassword) {
        return false;
    }
}
